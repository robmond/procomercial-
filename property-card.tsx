import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="stripe-card bg-white border border-gray-200 overflow-hidden transition-all duration-300 group hover:shadow-lg">
      <div className="relative">
        <Link href={`/properties/${property.id}`} className="block relative overflow-hidden">
          <img 
            src={property.imageUrl || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"} 
            alt={property.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            data-testid={`img-property-${property.id}`}
          />
          {/* Hover overlay for better UX indication */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </Link>
        
        {/* Discount badge */}
        {property.discount && property.discount > 0 && (
          <Badge className="absolute top-4 left-4 bg-red-500 text-white border-0 z-10">
            -{property.discount}%
          </Badge>
        )}
      </div>
      
      <CardContent className="p-6">
        {/* Property status */}
        <p className="text-gray-500 text-sm mb-2">
          {property.propertyType} en venta
        </p>
        
        {/* Property name */}
        <h3 
          className="text-xl font-semibold mb-4 text-gray-900" 
          data-testid={`text-property-name-${property.id}`}
        >
          {property.name}
        </h3>
        
        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-gray-900" data-testid={`text-property-price-${property.id}`}>
            UF {property.price.toLocaleString()}
          </span>
        </div>
        
        {/* Property details */}
        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-1">
            {property.size} m² útiles
          </p>
          <p 
            className="text-gray-500 text-sm" 
            data-testid={`text-property-address-${property.id}`}
          >
            {property.address.split(',')[0]}...
          </p>
        </div>
        
        {/* Status badges and button */}
        <div className="flex justify-between items-center mb-4">
          <Badge 
            variant="secondary" 
            className="bg-green-100 text-green-700 border-green-200"
          >
            Disponible
          </Badge>
          
          <Badge 
            variant="outline" 
            className="border-indigo-200 text-indigo-600"
          >
            Destacado
          </Badge>
        </div>

        {/* View details button */}
        <Link href={`/properties/${property.id}`}>
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            data-testid={`button-view-property-${property.id}`}
          >
            Ver Detalles
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
