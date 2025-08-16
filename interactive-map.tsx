import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function InteractiveMap() {
  const { data: communes } = useQuery({
    queryKey: ["/api/communes"],
  });

  const mapMarkers = [
    { id: 1, name: "Las Condes", properties: 8, x: "75%", y: "25%", color: "bg-green-600", yield: ">12%" },
    { id: 2, name: "Santiago Centro", properties: 15, x: "50%", y: "50%", color: "bg-blue-600", yield: "8-12%" },
    { id: 3, name: "San Joaquín", properties: 6, x: "65%", y: "65%", color: "bg-amber-600", yield: "<8%" },
    { id: 4, name: "La Florida", properties: 4, x: "75%", y: "75%", color: "bg-purple-600", yield: "8-12%" },
  ];

  return (
    <section className="py-20 relative bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-gray-900">
            Explora por <span className="text-blue-600">Ubicación</span>
          </h2>
          <p className="text-xl text-gray-700">
            Descubre oportunidades de inversión en toda la Región Metropolitana
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="bg-white border-gray-200 shadow-lg overflow-hidden">
            {/* Map header with filters */}
            <CardHeader className="border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-gray-900">Mapa Interactivo</CardTitle>
                  <p className="text-gray-600 text-sm">Propiedades disponibles por comuna</p>
                </div>
                <div className="flex items-center space-x-3 mt-4 md:mt-0">
                  <Select>
                    <SelectTrigger 
                      className="bg-white border-gray-300 w-48"
                      data-testid="select-map-commune"
                    >
                      <SelectValue placeholder="Todas las comunas" />
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
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    data-testid="button-filter-map"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrar
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Map container */}
              <div className="relative h-96">
                {/* Google Maps iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106321.16059023593!2d-70.7699137!3d-33.4569397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5410425af2f%3A0x8475d53c400f0931!2sSantiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1692811234567!5m2!1ses!2scl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-b-lg"
                  title="Mapa de Santiago - Ubicaciones de Propiedades Comerciales"
                  data-testid="google-maps-iframe"
                />
                
                {/* Property markers overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {mapMarkers.map((marker, index) => (
                    <div 
                      key={marker.id}
                      className="absolute animate-pulse group cursor-pointer pointer-events-auto"
                      style={{ 
                        left: marker.x, 
                        top: marker.y, 
                        animationDelay: `${index}s` 
                      }}
                      data-testid={`map-marker-${marker.name.toLowerCase().replace(' ', '-')}`}
                    >
                      <div 
                        className={`w-6 h-6 ${marker.color} rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg border-2 border-white`}
                      >
                        <span className="text-xs font-bold text-white">{marker.properties}</span>
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 shadow-lg p-3 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <div className="font-semibold text-gray-900">{marker.name}</div>
                        <div className="text-gray-600">{marker.properties} propiedades</div>
                        <div className="text-green-600">{marker.yield}</div>
                        {/* Arrow */}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border-l border-t border-gray-200 rotate-45"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map legend */}
                <Card className="absolute bottom-4 left-4 bg-white border-gray-200 shadow-lg z-20">
                  <CardContent className="p-4">
                    <h4 className="text-sm font-semibold mb-3 text-gray-900">Leyenda</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-600 rounded-full border border-gray-300"></div>
                        <span className="text-gray-700">Alto rendimiento ({'>'}12%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full border border-gray-300"></div>
                        <span className="text-gray-700">Rendimiento medio (8-12%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-amber-600 rounded-full border border-gray-300"></div>
                        <span className="text-gray-700">Rendimiento bajo ({'<'}8%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Comuna stats */}
              <div className="p-6 border-t border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600 mb-1" data-testid="stat-total-properties">
                      33
                    </div>
                    <div className="text-sm text-gray-600">Propiedades Totales</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600 mb-1" data-testid="stat-communes-count">
                      15
                    </div>
                    <div className="text-sm text-gray-600">Comunas</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-amber-600 mb-1" data-testid="stat-min-price">
                      91
                    </div>
                    <div className="text-sm text-gray-600">Precio Mín. (UF)</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600 mb-1" data-testid="stat-max-yield">
                      18.1%
                    </div>
                    <div className="text-sm text-gray-600">Rentabilidad Máx.</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
