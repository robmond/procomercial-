import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChartLine, Calculator, ChevronDown, Building, TrendingUp, PieChart } from "lucide-react";
import { Link } from "wouter";

import heroImage from "@assets/HYPERLAPSE_0001 (1)_1755306872873.jpg";

export default function HeroSection() {

  const scrollToProperties = () => {
    const element = document.getElementById("propiedades");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white stripe-grid pt-20">
      {/* Stripe-style diagonal colored band - 50% of page height */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-[50vh] top-0 left-0 stripe-band"></div>
      </div>
      <div className="relative container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white drop-shadow-lg lg:text-gray-800 lg:drop-shadow-none">
                  Invierte en propiedades comerciales
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-lg drop-shadow-md lg:text-gray-700 lg:drop-shadow-none">
                Aumenta tu patrimonio de manera simple e inteligente.
              </p>
              
              <p className="text-lg text-white/80 leading-relaxed max-w-lg drop-shadow-md lg:text-gray-600 lg:drop-shadow-none">
                Bodegas, estacionamientos y oficinas que generan rentabilidad real desde 91 UF
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/properties">
                <Button 
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all text-lg px-8 py-4 w-full sm:w-auto font-semibold lg:bg-blue-600 lg:text-white lg:hover:bg-blue-700"
                  data-testid="button-explore-properties"
                >
                  <ChartLine className="w-5 h-5 mr-2" />
                  Explorar Propiedades
                </Button>
              </Link>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all text-lg px-8 py-4 w-full sm:w-auto lg:border-gray-300 lg:text-gray-700 lg:hover:bg-gray-50"
                onClick={scrollToProperties}
                data-testid="button-calculate-yield"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calcular ROI
              </Button>
            </div>
            
            {/* Key metrics in row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 text-[#374151]">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1 drop-shadow-md lg:text-[#374151] lg:drop-shadow-none text-[#374151]" data-testid="metric-max-yield">18.1%</div>
                <div className="text-sm text-white/80 lg:text-gray-500">Rentabilidad</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1 drop-shadow-md lg:text-[#374151] lg:drop-shadow-none text-[#374151]" data-testid="metric-properties-count">500+</div>
                <div className="text-sm text-white/80 lg:text-gray-500">Propiedades</div>
              </div>
              <div className="text-center lg:block hidden">
                <div className="text-3xl font-bold mb-1 drop-shadow-md lg:text-[#374151] lg:drop-shadow-none text-[#374151]" data-testid="metric-min-price">91 UF</div>
                <div className="text-sm text-white/80 lg:text-gray-500">Desde</div>
              </div>
              <div className="text-center lg:block hidden">
                <div className="text-3xl font-bold mb-1 drop-shadow-md lg:text-[#374151] lg:drop-shadow-none text-[#374151]" data-testid="metric-communes-count">15</div>
                <div className="text-sm text-white/80 lg:text-gray-500">Comunas</div>
              </div>
            </div>
          </div>
          
          {/* Right Side - City Image with Floating UI Components */}
          <div className="relative">
            {/* City Image as Background */}
            <div 
              className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src={heroImage} 
                alt="Ciudad futurista" 
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay for better component visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/60 via-transparent to-dark-blue/40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-blue/5 to-emerald/5"></div>
              

              

            </div>
            
            {/* Fixed ROI Calculator */}
            <div 
              className="absolute -bottom-6 -left-4 glass-morphism rounded-2xl p-6 backdrop-blur-lg border border-white/20 z-10 animate-float"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-emerald/20 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-emerald" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">ROI Calculator</div>
                  <div className="text-sm text-gray-300">Calcula tu rentabilidad</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-12 -right-8 glass-morphism rounded-2xl p-6 backdrop-blur-lg border border-white/20 animate-float z-10" style={{ animationDelay: '-2s' }}>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-electric-blue/20 rounded-xl">
                  <PieChart className="w-8 h-8 text-electric-blue" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">Portfolio</div>
                  <div className="text-sm text-gray-300">Gestiona tus inversiones</div>
                </div>
              </div>
            </div>

            {/* Fixed floating element */}
            <div 
              className="absolute top-8 left-1/3 glass-morphism rounded-2xl p-4 backdrop-blur-lg border border-white/20 z-10 animate-float"
              style={{ animationDelay: '-4s' }}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber/20 rounded-lg">
                  <Building className="w-6 h-6 text-amber" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">500+ Propiedades</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={scrollToProperties}
          className="rounded-full hover:bg-gray-100"
          data-testid="button-scroll-down"
        >
          <ChevronDown className="w-6 h-6 text-gray-600" />
        </Button>
      </div>
    </section>
  );
}
