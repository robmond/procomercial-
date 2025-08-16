import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import type { CalculatorInput } from "@shared/schema";

export default function InvestmentCalculator() {
  const [calculatorData, setCalculatorData] = useState<CalculatorInput>({
    amount: 200,
    expectedYield: 12,
    period: 3,
    propertyType: "Estacionamiento",
  });

  const [results, setResults] = useState({
    futureValue: 272,
    totalProfit: 72,
    monthlyIncome: 2.0,
    yearlyReturn: 24,
    totalROI: 36,
  });

  const calculationMutation = useMutation({
    mutationFn: async (input: CalculatorInput) => {
      const response = await apiRequest("POST", "/api/calculate", input);
      return await response.json();
    },
    onSuccess: (data) => {
      setResults(data);
    },
  });

  const handleInputChange = (field: keyof CalculatorInput, value: any) => {
    const newData = { ...calculatorData, [field]: value };
    setCalculatorData(newData);
    
    // Auto-calculate when inputs change
    calculationMutation.mutate(newData);
  };

  const propertyTypes = [
    { value: "Bodega", label: "Bodega" },
    { value: "Estacionamiento", label: "Estacionamiento" },
    { value: "Pack", label: "Pack" },
    { value: "Oficina", label: "Oficina" },
  ];

  return (
    <section id="calculadora" className="py-20 relative bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-gray-900">
              Calculadora de <span className="text-blue-600">Inversión</span>
            </h2>
            <p className="text-xl text-gray-600">
              Simula tu inversión y descubre el potencial de crecimiento
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Calculator inputs */}
            <div className="space-y-6">
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-poppins text-gray-900">Parámetros de Inversión</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Investment Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-gray-700">Monto de Inversión (UF)</Label>
                    <div className="relative">
                      <Input
                        id="amount"
                        type="number"
                        value={calculatorData.amount}
                        onChange={(e) => handleInputChange("amount", parseInt(e.target.value) || 0)}
                        className="bg-white border-gray-300 text-gray-900 pr-12"
                        min="50"
                        max="10000"
                        data-testid="input-investment-amount"
                      />
                      <span className="absolute right-4 top-3 text-gray-500 text-sm">UF</span>
                    </div>
                  </div>

                  {/* Expected Yield */}
                  <div className="space-y-4">
                    <Label className="text-gray-700">Rentabilidad Esperada (%)</Label>
                    <Slider
                      value={[calculatorData.expectedYield]}
                      onValueChange={(value) => handleInputChange("expectedYield", value[0])}
                      min={3}
                      max={25}
                      step={0.5}
                      className="w-full"
                      data-testid="slider-expected-yield"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>3%</span>
                      <span className="text-green-600 font-semibold">{calculatorData.expectedYield}%</span>
                      <span>25%</span>
                    </div>
                  </div>

                  {/* Investment Period */}
                  <div className="space-y-2">
                    <Label htmlFor="period" className="text-gray-700">Período (años)</Label>
                    <Select
                      value={calculatorData.period.toString()}
                      onValueChange={(value) => handleInputChange("period", parseInt(value))}
                    >
                      <SelectTrigger className="bg-white border-gray-300 text-gray-900" data-testid="select-investment-period">
                        <SelectValue placeholder="Selecciona el período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 año</SelectItem>
                        <SelectItem value="3">3 años</SelectItem>
                        <SelectItem value="5">5 años</SelectItem>
                        <SelectItem value="10">10 años</SelectItem>
                        <SelectItem value="15">15 años</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Property Type */}
                  <div className="space-y-3">
                    <Label className="text-gray-700">Tipo de Propiedad</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {propertyTypes.map((type) => (
                        <Button
                          key={type.value}
                          variant={calculatorData.propertyType === type.value ? "default" : "outline"}
                          className={
                            calculatorData.propertyType === type.value
                              ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                          }
                          onClick={() => handleInputChange("propertyType", type.value)}
                          data-testid={`button-property-type-${type.value.toLowerCase()}`}
                        >
                          {type.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results visualization */}
            <div className="space-y-6">
              {/* Results summary */}
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-poppins text-center text-gray-900">
                    Proyección de Inversión
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center">
                      <div 
                        className="text-3xl font-bold text-green-600 mb-2"
                        data-testid="text-future-value"
                      >
                        {results.futureValue} UF
                      </div>
                      <div className="text-sm text-gray-600">Valor Final</div>
                    </div>
                    <div className="text-center">
                      <div 
                        className="text-3xl font-bold text-blue-600 mb-2"
                        data-testid="text-total-profit"
                      >
                        {results.totalProfit} UF
                      </div>
                      <div className="text-sm text-gray-600">Ganancia</div>
                    </div>
                  </div>

                  {/* Monthly income breakdown */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Arriendo Mensual</span>
                      <span 
                        className="font-semibold text-green-600"
                        data-testid="text-monthly-income"
                      >
                        {results.monthlyIncome} UF
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Ganancia Anual</span>
                      <span 
                        className="font-semibold text-blue-600"
                        data-testid="text-yearly-return"
                      >
                        {results.yearlyReturn} UF
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">ROI Total</span>
                      <span 
                        className="font-semibold text-amber-600"
                        data-testid="text-total-roi"
                      >
                        {results.totalROI}%
                      </span>
                    </div>
                  </div>

                  <Link href="/properties">
                    <Button 
                      className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white hover:shadow-lg transition-all"
                      data-testid="button-find-properties"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Encontrar Propiedades
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Investment timeline */}
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-4 text-gray-900">Crecimiento Proyectado</h4>
                  <div className="h-32 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg flex items-end justify-around p-4">
                    <div className="bg-blue-400 w-8 h-8 rounded" title="Año 1"></div>
                    <div className="bg-blue-500 w-8 h-12 rounded" title="Año 2"></div>
                    <div className="bg-blue-600 w-8 h-16 rounded" title="Año 3"></div>
                    <div className="bg-green-600 w-8 h-24 rounded" title="Total"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>Año 1</span>
                    <span>Año 2</span>
                    <span>Año 3</span>
                    <span>Total</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
