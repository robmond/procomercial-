import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PropertyCard from "./property-card";
import { ArrowRight } from "lucide-react";
import type { Property } from "@shared/schema";

export default function PropertyShowcase() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const { data: properties, isLoading, error } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const propertyTypes = [
    { key: "all", label: "Todas" },
    { key: "Bodega", label: "Bodegas" },
    { key: "Estacionamiento", label: "Estacionamientos" },
    { key: "Pack", label: "Packs" },
    { key: "Oficina", label: "Oficinas" },
  ];

  const filteredProperties = properties?.filter(property => 
    activeFilter === "all" || property.propertyType === activeFilter
  ) || [];

  // Show only first 6 properties for showcase
  const showcaseProperties = filteredProperties.slice(0, 6);

  return (
    <section id="propiedades" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Propiedades <span className="text-indigo-600">Destacadas</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre oportunidades de inversión verificadas con rentabilidades atractivas
          </p>
        </div>

        {/* Property filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {propertyTypes.map((type) => (
            <Button
              key={type.key}
              variant={activeFilter === type.key ? "default" : "outline"}
              className={
                activeFilter === type.key
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }
              onClick={() => setActiveFilter(type.key)}
              data-testid={`button-filter-${type.key}`}
            >
              {type.label}
            </Button>
          ))}
        </div>

        {/* Property grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="stripe-card animate-pulse bg-white border border-gray-200">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="stripe-card max-w-md mx-auto bg-white border border-red-200">
            <CardContent className="pt-6 text-center">
              <p className="text-red-600">Error al cargar propiedades. Por favor, intenta de nuevo.</p>
            </CardContent>
          </Card>
        ) : showcaseProperties.length === 0 ? (
          <Card className="stripe-card max-w-md mx-auto bg-white border border-gray-200">
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600">
                No se encontraron propiedades del tipo seleccionado.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* View all button */}
        <div className="text-center mt-12">
          <Link href="/properties">
            <Button 
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-all px-8 py-4"
              data-testid="button-view-all-properties"
            >
              Ver Todas las Propiedades
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
