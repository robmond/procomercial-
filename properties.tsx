import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import PropertyCard from "@/components/property-card";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, X } from "lucide-react";
import type { Property, PropertyFilters } from "@shared/schema";

export default function Properties() {
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [searchQuery, setSearchQuery] = useState("");
  
  // Count active filters
  const activeFiltersCount = Object.keys(filters).filter(key => filters[key as keyof PropertyFilters] !== undefined).length;

  const { data: allProperties, isLoading, error } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const { data: communes } = useQuery({
    queryKey: ["/api/communes"],
  });

  // Enhanced client-side filtering that combines search and filters
  const displayProperties = allProperties?.filter(property => {
    // Text search - check multiple fields
    if (searchQuery && searchQuery.trim().length > 0) {
      const searchTerm = searchQuery.toLowerCase().trim();
      const searchableText = [
        property.name,
        property.address,
        property.commune,
        property.propertyType,
        property.unitNumber,
        property.status
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }

    // Apply filters
    if (filters.propertyType && property.propertyType !== filters.propertyType) {
      return false;
    }
    
    if (filters.commune && property.commune !== filters.commune) {
      return false;
    }
    
    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }
    
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }

    return true;
  }) || [];

  const handleFilterChange = (key: keyof PropertyFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === "all" ? undefined : value
    }));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-6 py-20">
          <Card className="max-w-md mx-auto bg-white border-red-200 shadow-lg">
            <CardContent className="pt-6 text-center">
              <p className="text-red-600">Error al cargar propiedades. Por favor, intenta de nuevo.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white stripe-grid">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="stripe-band absolute inset-0 h-full w-full"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6 text-gray-900">
              Explora <span className="text-blue-600">Propiedades</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Encuentra la inversión perfecta entre nuestro catálogo de propiedades comerciales en Chile
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="bg-white border-gray-200 shadow-lg max-w-6xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-gray-900">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtros de Búsqueda
                </div>
                {(activeFiltersCount > 0 || searchQuery) && (
                  <div className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {searchQuery ? 'Búsqueda activa' : `${activeFiltersCount} filtro${activeFiltersCount > 1 ? 's' : ''} activo${activeFiltersCount > 1 ? 's' : ''}`}
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Buscar: bodega, estacionamiento, Las Condes, Portal..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 text-lg bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    data-testid="input-search-properties"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      data-testid="button-clear-search"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                {/* Quick Search Suggestions */}
                {!searchQuery && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-sm text-gray-500">Búsquedas populares:</span>
                    {['bodega', 'estacionamiento', 'Las Condes', 'pack', 'Santiago'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setSearchQuery(suggestion)}
                        className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                        data-testid={`suggestion-${suggestion}`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Filters Section */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filtros Avanzados
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {/* Property Type Filter */}
                  <Select onValueChange={(value) => handleFilterChange("propertyType", value)}>
                    <SelectTrigger className="bg-white border-gray-300" data-testid="select-property-type">
                      <SelectValue placeholder="Tipo de Propiedad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los tipos</SelectItem>
                      <SelectItem value="Bodega">Bodega</SelectItem>
                      <SelectItem value="Estacionamiento">Estacionamiento</SelectItem>
                      <SelectItem value="Pack">Pack</SelectItem>
                      <SelectItem value="Oficina">Oficina</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Commune Filter */}
                  <Select onValueChange={(value) => handleFilterChange("commune", value)}>
                    <SelectTrigger className="bg-white border-gray-300" data-testid="select-commune">
                      <SelectValue placeholder="Comuna" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las comunas</SelectItem>
                      {Array.isArray(communes) && communes.map((commune: any) => (
                        <SelectItem key={commune.id} value={commune.name}>
                          {commune.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Price Range */}
                  <Input
                    type="number"
                    placeholder="Precio mínimo (UF)"
                    onChange={(e) => handleFilterChange("minPrice", e.target.value ? parseInt(e.target.value) : undefined)}
                    className="bg-white border-gray-300"
                    data-testid="input-min-price"
                  />
                  <Input
                    type="number"
                    placeholder="Precio máximo (UF)"
                    onChange={(e) => handleFilterChange("maxPrice", e.target.value ? parseInt(e.target.value) : undefined)}
                    className="bg-white border-gray-300"
                    data-testid="input-max-price"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium text-blue-600">{displayProperties?.length || 0}</span>
                      <span>de {allProperties?.length || 0} propiedades</span>
                    </div>
                    
                    {/* Active filters indicator */}
                    {(searchQuery || activeFiltersCount > 0) && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-blue-600 font-medium">
                          {searchQuery ? 'Filtro de búsqueda activo' : `${activeFiltersCount} filtro${activeFiltersCount > 1 ? 's' : ''} aplicado${activeFiltersCount > 1 ? 's' : ''}`}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setFilters({});
                        setSearchQuery("");
                      }}
                      className="border-gray-300 hover:bg-gray-50 flex items-center gap-2"
                      data-testid="button-clear-filters"
                    >
                      <X className="w-4 h-4" />
                      Limpiar Filtros
                    </Button>
                    
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6 shadow-md hover:shadow-lg transition-all"
                      onClick={() => {
                        // Scroll to results and provide visual feedback
                        const element = document.getElementById('properties-results');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                        
                        // Optional: Add a brief loading animation effect
                        const button = document.querySelector('[data-testid="button-search-properties"]') as HTMLElement;
                        if (button) {
                          button.style.transform = 'scale(0.95)';
                          setTimeout(() => {
                            button.style.transform = 'scale(1)';
                          }, 150);
                        }
                      }}
                      data-testid="button-search-properties"
                    >
                      <Search className="w-4 h-4" />
                      {searchQuery ? 'Buscar' : 'Ver Resultados'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{displayProperties?.length || 0}</div>
              <div className="text-gray-600">Propiedades Disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">12.5%</div>
              <div className="text-gray-600">Rentabilidad Promedio</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
              <div className="text-gray-600">Comunas Disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">4</div>
              <div className="text-gray-600">Tipos de Propiedad</div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section id="properties-results" className="py-20">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-white border-gray-200 shadow-lg animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : displayProperties?.length === 0 ? (
            <Card className="bg-white border-gray-200 shadow-lg max-w-md mx-auto">
              <CardContent className="pt-6 text-center">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">No se encontraron propiedades</h3>
                <p className="text-gray-600">
                  {searchQuery ? "Intenta con otros términos de búsqueda" : "Modifica los filtros para ver más resultados"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {displayProperties?.length || 0} propiedades encontradas
                </h2>
                
                <Select onValueChange={(value) => {
                  // TODO: Implement sorting logic
                  console.log("Sort by:", value);
                }}>
                  <SelectTrigger className="w-48 bg-white border-gray-300" data-testid="select-sort">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                    <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                    <SelectItem value="yield-desc">Mayor rentabilidad</SelectItem>
                    <SelectItem value="size-desc">Mayor tamaño</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayProperties?.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
