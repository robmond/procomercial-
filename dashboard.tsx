import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Building2, 
  Coins, 
  Percent, 
  Download, 
  Plus,
  Eye,
  MapPin
} from "lucide-react";

export default function Dashboard() {
  const { data: portfolioStats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/portfolio/stats"],
  });

  const { data: recentProperties } = useQuery({
    queryKey: ["/api/properties"],
  });

  // Mock user data for demo
  const mockUser = {
    name: "Inversor Inteligente",
    email: "inversor@procomercial.com",
    memberSince: "Enero 2024"
  };

  if (statsLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-white border-gray-200 shadow-lg animate-pulse">
                <CardContent className="p-6">
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Dashboard Header */}
      <section className="pt-24 pb-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-poppins font-bold mb-2 text-gray-900">Panel de Control</h1>
              <p className="text-gray-600">
                Bienvenido de vuelta, <span className="text-blue-600">{mockUser.name}</span>
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50" data-testid="button-download-report">
                <Download className="w-4 h-4 mr-2" />
                Reporte
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-new-investment">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Inversión
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="pb-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Value */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-0">
                    +12.3%
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1 text-gray-900" data-testid="text-total-value">
                  {portfolioStats && portfolioStats.totalValue ? `${portfolioStats.totalValue} UF` : "1,247 UF"}
                </div>
                <div className="text-sm text-gray-600">Valor Total</div>
              </CardContent>
            </Card>

            {/* Properties Count */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-0">
                    8 activas
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1 text-gray-900" data-testid="text-properties-count">
                  {portfolioStats && portfolioStats.propertiesCount !== undefined ? portfolioStats.propertiesCount : 12}
                </div>
                <div className="text-sm text-gray-600">Propiedades</div>
              </CardContent>
            </Card>

            {/* Monthly Income */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Coins className="w-6 h-6 text-amber-600" />
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-0">
                    +8.7%
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1 text-gray-900" data-testid="text-monthly-income">
                  {portfolioStats && portfolioStats.monthlyIncome ? `${portfolioStats.monthlyIncome} UF` : "18.4 UF"}
                </div>
                <div className="text-sm text-gray-600">Ingreso Mensual</div>
              </CardContent>
            </Card>

            {/* Average Yield */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Percent className="w-6 h-6 text-purple-600" />
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-0">
                    Excelente
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1 text-gray-900" data-testid="text-average-yield">
                  {portfolioStats && portfolioStats.averageYield ? `${portfolioStats.averageYield}%` : "11.2%"}
                </div>
                <div className="text-sm text-gray-600">Rentabilidad Promedio</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Charts and Property List */}
      <section className="pb-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Performance Chart */}
            <Card className="lg:col-span-2 bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900">Rendimiento del Portfolio</CardTitle>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                      1M
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                      3M
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                      1A
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-end justify-around p-4">
                  <div className="bg-blue-400 w-8 h-16 rounded-t" title="Mes 1"></div>
                  <div className="bg-blue-500 w-8 h-20 rounded-t" title="Mes 2"></div>
                  <div className="bg-blue-500 w-8 h-24 rounded-t" title="Mes 3"></div>
                  <div className="bg-blue-600 w-8 h-32 rounded-t" title="Mes 4"></div>
                  <div className="bg-blue-600 w-8 h-28 rounded-t" title="Mes 5"></div>
                  <div className="bg-blue-700 w-8 h-36 rounded-t" title="Mes 6"></div>
                  <div className="bg-green-600 w-8 h-48 rounded-t" title="Mes Actual"></div>
                </div>
                <div className="mt-4 text-center text-sm text-gray-600">
                  Evolución mensual del portfolio
                </div>
              </CardContent>
            </Card>

            {/* Recent Properties */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900">Propiedades Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.isArray(recentProperties) && recentProperties.slice(0, 5).map((property: any) => (
                    <div key={property.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        {property.propertyType === "Bodega" && <Building2 className="w-4 h-4 text-green-600" />}
                        {property.propertyType === "Estacionamiento" && <MapPin className="w-4 h-4 text-blue-600" />}
                        {property.propertyType === "Pack" && <Coins className="w-4 h-4 text-amber-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate text-gray-900" data-testid={`text-property-name-${property.id}`}>
                          {property.name}
                        </div>
                        <div className="text-xs text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {property.commune}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Eye className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-500">{property.viewCount} viendo</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-600 text-sm font-medium" data-testid={`text-property-yield-${property.id}`}>
                          {property.annualYield}%
                        </div>
                        <div className="text-xs text-gray-600" data-testid={`text-property-price-${property.id}`}>
                          {property.price} UF
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-gray-300 text-gray-700 hover:bg-gray-50"
                  data-testid="button-view-all-properties"
                >
                  Ver Todas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
