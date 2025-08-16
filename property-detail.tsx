import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, MapPin, Square, TrendingUp, Calendar, Eye, Camera, Play, 
  Maximize2, Share2, Heart, Calculator, Phone, Mail, MessageSquare,
  Zap, Shield, Award, Building, Car, Wifi, TreePine, X
} from "lucide-react";
import type { Property } from "@shared/schema";

export default function PropertyDetail() {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: [`/api/properties/${id}`],
    enabled: !!id,
  });

  if (error) {
    return (
      <div className="min-h-screen bg-white stripe-grid">
        <Navigation />
        <div className="container mx-auto px-6 py-20">
          <Card className="max-w-lg mx-auto bg-white border-red-200 shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="text-6xl mb-4">🏠</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Propiedad no encontrada</h2>
              <p className="text-gray-600 mb-6">
                La propiedad que buscas ya no está disponible o el enlace ha expirado.
              </p>
              <div className="space-y-3">
                <Link href="/properties">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Ver Todas las Propiedades
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Volver al Inicio
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white stripe-grid">
        <Navigation />
        <div className="container mx-auto px-6 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white stripe-grid">
        <Navigation />
        <div className="container mx-auto px-6 py-20">
          <Card className="max-w-md mx-auto bg-white border-gray-200 shadow-lg">
            <CardContent className="pt-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Propiedad no encontrada</h3>
              <p className="text-gray-600 mb-4">La propiedad que buscas no existe o ha sido removida.</p>
              <Link href="/properties">
                <Button>Volver a Propiedades</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  // Mock property images for demo
  const propertyImages = [
    property.imageUrl || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
  ];

  return (
    <div className="min-h-screen bg-white stripe-grid">
      <Navigation />
      
      {/* Hero Section - Static Image */}
      <section className="pt-20 relative overflow-hidden">
        <div className="stripe-band absolute inset-0 h-full w-full opacity-30"></div>
        
        {/* Static Main Image */}
        <div className="relative h-[60vh] overflow-hidden">
          <img 
            src={property.imageUrl || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"}
            alt={property.name}
            className="w-full h-full object-cover"
            data-testid="img-property-hero"
          />
          
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          {/* Floating Action Bar */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
            <Link href="/properties">
              <Button variant="outline" className="bg-white/95 backdrop-blur-sm border-white/30 hover:bg-white text-gray-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </Link>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="icon"
                className="bg-white/95 backdrop-blur-sm border-white/30 hover:bg-white text-gray-900"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="bg-white/95 backdrop-blur-sm border-white/30 hover:bg-white text-gray-900"
              >
                <Share2 className="w-4 h-4 text-gray-700" />
              </Button>
            </div>
          </div>
        </div>

        {/* Property Info Section - Below Image */}
        <div className="bg-white py-8">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-blue-600 text-white border-0">
                    {property.propertyType}
                  </Badge>
                  {property.discount && property.discount > 0 && (
                    <Badge className="bg-red-500 text-white border-0">
                      -{property.discount}% OFF
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3" data-testid="text-property-title">
                  {property.name}
                </h1>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="text-lg" data-testid="text-property-address">{property.address}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2" data-testid="text-property-price">
                  UF {property.price.toLocaleString()}
                </div>
                <div className="text-lg text-gray-600">
                  UF {Math.round(property.price / parseFloat(property.size)).toLocaleString()}/m²
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Metrics Dashboard */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Square className="w-8 h-8 text-blue-600" />
                <Badge variant="outline" className="text-xs">Área</Badge>
              </div>
              <div className="text-2xl font-bold text-gray-900">{property.size} m²</div>
              <div className="text-sm text-gray-600">Superficie total</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <Badge variant="outline" className="text-xs">ROI</Badge>
              </div>
              <div className="text-2xl font-bold text-gray-900">{property.annualYield}%</div>
              <div className="text-sm text-gray-600">Anual esperado</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Eye className="w-8 h-8 text-purple-600" />
                <Badge variant="outline" className="text-xs">Popular</Badge>
              </div>
              <div className="text-2xl font-bold text-gray-900">{property.viewCount || 0}</div>
              <div className="text-sm text-gray-600">Visualizaciones</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-8 h-8 text-orange-600" />
                <Badge variant="outline" className="text-xs">Score</Badge>
              </div>
              <div className="text-2xl font-bold text-gray-900">9.2</div>
              <div className="text-sm text-gray-600">Rating inversión</div>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Content Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8 h-14 bg-gray-100 p-1 rounded-2xl">
              <TabsTrigger value="overview" className="rounded-xl font-medium">Vista General</TabsTrigger>
              <TabsTrigger value="investment" className="rounded-xl font-medium">Inversión</TabsTrigger>
              <TabsTrigger value="location" className="rounded-xl font-medium">Ubicación</TabsTrigger>
              <TabsTrigger value="amenities" className="rounded-xl font-medium">Amenidades</TabsTrigger>
              <TabsTrigger value="contact" className="rounded-xl font-medium">Contacto</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-white border-gray-200 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-gray-900 flex items-center">
                        <Building className="w-6 h-6 mr-3 text-blue-600" />
                        Descripción de la Propiedad
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        Esta excepcional propiedad comercial ubicada en {property.address.split(',')[1] || 'una zona estratégica'} 
                        representa una oportunidad única de inversión en el creciente mercado inmobiliario chileno. 
                        Con {property.size} m² útiles, esta {property.propertyType.toLowerCase()} está diseñada para maximizar 
                        la rentabilidad y generar ingresos pasivos inmediatos.
                      </p>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-900 mb-4 flex items-center">
                          <Award className="w-5 h-5 mr-2" />
                          Características Destacadas
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            <span className="text-blue-800">Superficie: {property.size} m²</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-blue-800">Rentabilidad: {property.annualYield}%</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                            <span className="text-blue-800">Estado: {property.status}</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                            <span className="text-blue-800">Tipo: {property.propertyType}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Photo Gallery */}
                  <Card className="bg-white border-gray-200 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl text-gray-900 flex items-center">
                        <Camera className="w-6 h-6 mr-3 text-blue-600" />
                        Galería de Fotos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {propertyImages.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedImageIndex(index);
                              setIsImageModalOpen(true);
                            }}
                            className="relative aspect-video rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
                          >
                            <img
                              src={img}
                              alt={`Vista ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-white/90 p-2 rounded-full">
                                  <Maximize2 className="w-4 h-4 text-gray-700" />
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                        
                        {/* Add more photos placeholder */}
                        <div className="aspect-video rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500">
                          <div className="text-center">
                            <Camera className="w-6 h-6 mx-auto mb-2" />
                            <div className="text-sm">Más fotos disponibles</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <Calculator className="w-5 h-5 mr-2" />
                        Calculadora de Inversión
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-100">Inversión Total:</span>
                        <span className="text-xl font-bold">UF {property.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-100">Precio por m²:</span>
                        <span className="font-semibold">UF {Math.round(property.price / parseFloat(property.size)).toLocaleString()}</span>
                      </div>
                      <div className="bg-blue-500/30 p-4 rounded-lg">
                        <div className="text-sm text-blue-100 mb-1">Ingresos mensuales estimados</div>
                        <div className="text-2xl font-bold">
                          UF {Math.round((property.price * parseFloat(property.annualYield.toString()) / 100) / 12).toLocaleString()}
                        </div>
                      </div>
                      <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                        Simular Inversión
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-gray-200 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-900">Progreso de Ventas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Vendido</span>
                          <span className="font-semibold">65%</span>
                        </div>
                        <Progress value={65} className="h-3" />
                        <div className="text-xs text-gray-500">Quedan pocas unidades disponibles</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="investment" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Análisis Financiero</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Precio de Venta:</span>
                        <span className="text-lg font-bold">UF {property.price.toLocaleString()}</span>
                      </div>
                      {property.originalPrice && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Precio Original:</span>
                          <span className="text-gray-500 line-through">UF {property.originalPrice.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Rentabilidad Anual:</span>
                        <span className="text-lg font-bold text-green-600">{property.annualYield}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Retorno Mensual:</span>
                        <span className="font-semibold text-blue-600">
                          UF {Math.round((property.price * parseFloat(property.annualYield.toString()) / 100) / 12).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Proyección a 5 años</h4>
                      <div className="text-2xl font-bold text-green-700">
                        UF {Math.round(property.price * 1.5).toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600">Valor estimado de la propiedad</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Opciones de Financiamiento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Pago al Contado</span>
                          <Badge className="bg-green-100 text-green-700">-5% Descuento</Badge>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          UF {Math.round(property.price * 0.95).toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Financiamiento 80%</span>
                          <Badge variant="outline">Disponible</Badge>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Pie: UF {Math.round(property.price * 0.2).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Ubicación Estratégica
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="font-semibold text-gray-900 mb-2">Dirección Completa</div>
                        <div className="text-gray-700">{property.address}</div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-3">Ventajas de la Ubicación</h4>
                        <ul className="space-y-2 text-blue-800">
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            Acceso directo a vías principales
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            Zona de alto tráfico comercial
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            Cerca del transporte público
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            Área en crecimiento económico
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Mapa Interactivo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <MapPin className="w-12 h-12 mx-auto mb-2" />
                        <div>Mapa interactivo disponible</div>
                        <div className="text-sm">Próximamente con Street View 360°</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="amenities" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-600" />
                      Seguridad
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Seguridad 24/7
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Cámaras de vigilancia
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        Control de acceso
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Car className="w-5 h-5 mr-2 text-blue-600" />
                      Accesibilidad
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        Estacionamientos
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        Acceso para camiones
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        Rampas de carga
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Wifi className="w-5 h-5 mr-2 text-purple-600" />
                      Tecnología
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        Fibra óptica
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        WiFi de alta velocidad
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        Sistema inteligente
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Asesor Especializado</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-blue-200 bg-gradient-to-br from-pink-100 to-blue-100">
                        <img 
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=maria&backgroundColor=b6e3f4,c0aede,d1d4f9&accessories=prescription02&accessoriesColor=3f3f46&clothingGraphic=skull&eyes=happy&eyebrows=default&facialHair=blank&hair=longCurly&hairColor=2c1b18&mouth=smile&skin=f8b788&top=longHair"
                          alt="María Rodríguez - Asesora Inmobiliaria"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to initials if image fails
                            const container = e.currentTarget.parentElement;
                            if (container) {
                              container.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">MR</div>';
                            }
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-lg">María Rodríguez</div>
                        <div className="text-gray-600">Especialista en Inversiones Comerciales</div>
                        <div className="text-sm text-blue-600 font-medium">+15 años de experiencia</div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <MessageSquare className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-800">Consulta Inmediata por WhatsApp</span>
                      </div>
                      <p className="text-green-700 text-sm mb-4">
                        Obtén información detallada y resuelve todas tus dudas al instante. 
                        Respuesta garantizada en minutos.
                      </p>
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                        onClick={() => {
                          window.open('https://wa.me/56912345678?text=Hola%20María,%20estoy%20interesado%20en%20la%20propiedad%20' + encodeURIComponent(property?.name || ''), '_blank');
                        }}
                        data-testid="button-whatsapp-contact"
                      >
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Chatear por WhatsApp
                      </Button>
                    </div>

                    <div className="text-center text-sm text-gray-500">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Disponible ahora • Respuesta inmediata</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl">¿Listo para Invertir?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-blue-100">
                      No pierdas esta oportunidad única. Nuestro equipo está listo para 
                      acompañarte en cada paso de tu inversión.
                    </p>

                    <div className="space-y-3">
                      <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold text-lg py-3">
                        <Zap className="w-5 h-5 mr-2" />
                        Invertir Ahora
                      </Button>
                      <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                        Agendar Visita Virtual
                      </Button>
                    </div>

                    <div className="text-center text-blue-100 text-sm">
                      Respuesta garantizada en menos de 2 horas
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Image Modal with Slideshow */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full max-w-6xl max-h-screen p-6">
            {/* Close Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-8 right-8 z-10 bg-white/90 backdrop-blur-sm border-white/30 hover:bg-white"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={propertyImages[selectedImageIndex]}
                alt={`Vista ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />

              {/* Previous Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSelectedImageIndex(prev => 
                  prev === 0 ? propertyImages.length - 1 : prev - 1
                )}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-white/30 hover:bg-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              {/* Next Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSelectedImageIndex(prev => 
                  prev === propertyImages.length - 1 ? 0 : prev + 1
                )}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-white/30 hover:bg-white"
              >
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Button>

              {/* Image Counter */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {selectedImageIndex + 1} / {propertyImages.length}
              </div>

              {/* Thumbnail Navigation */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
                {propertyImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === selectedImageIndex ? 'border-white' : 'border-white/50'
                    }`}
                  >
                    <img src={img} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}