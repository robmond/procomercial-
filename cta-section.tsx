import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Play, Shield, TrendingUp, Clock, Handshake } from "lucide-react";

export default function CTASection() {
  const handleSignup = () => {
    // TODO: Implement signup functionality
    console.log("Signup clicked");
  };



  const trustFeatures = [
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Inversión Segura",
      description: "Propiedades verificadas y con documentación completa"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Alta Rentabilidad", 
      description: "Rendimientos promedio superiores al 10% anual"
    },
    {
      icon: <Clock className="w-8 h-8 text-amber-600" />,
      title: "Proceso Rápido",
      description: "Reserva tu propiedad en menos de 5 minutos"
    },
    {
      icon: <Handshake className="w-8 h-8 text-purple-600" />,
      title: "Soporte 24/7",
      description: "Equipo especializado siempre disponible"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-50 to-green-50"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-100 rounded-full blur-3xl animate-float" style={{animationDelay: '-2s'}}></div>
      </div>

      <div className="relative container mx-auto px-6">
        {/* Main grid layout - left content, right video */}
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
          
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-poppins font-bold mb-6 text-[#374151]">
              Comienza a <span className="text-green-600">Invertir</span> Hoy
            </h2>
            <p className="text-xl text-[#374151] mb-8 leading-relaxed">
              Únete a cientos de inversionistas que ya están construyendo su patrimonio con ProComercial
            </p>
            
            {/* Single CTA button - Demo is now the video */}
            <div className="flex justify-center lg:justify-start mb-12">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-electric-blue to-emerald hover:shadow-xl hover:scale-105 transition-all text-lg px-12 py-4"
                onClick={handleSignup}
                data-testid="button-signup"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Crear Cuenta Gratis
              </Button>
            </div>
          </div>

          {/* Right side - Video aligned with title */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl stripe-card bg-white border border-gray-200">
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/MS-d083LAco"
                  title="ProComercial - Demo de la Plataforma de Inversión"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                  data-testid="video-demo"
                ></iframe>
              </div>
              
              {/* Video overlay info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                <div className="text-white">
                  <div className="flex items-center mb-2">
                    <Play className="w-5 h-5 mr-2" />
                    <h3 className="text-lg font-semibold">Demo de ProComercial</h3>
                  </div>
                  <p className="text-sm text-white/80">Descubre cómo funciona nuestra plataforma</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators distributed below - 2 below left content, 2 below video */}
        <div className="grid lg:grid-cols-2 gap-16 mt-12 max-w-7xl mx-auto">
          {/* First two cards below left content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {trustFeatures.slice(0, 2).map((feature, index) => (
              <Card 
                key={index} 
                className="stripe-card bg-white border border-gray-200 hover:scale-105 transition-all duration-300"
                data-testid={`trust-feature-${index}`}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2 text-[#374151]">{feature.title}</h3>
                  <p className="text-sm text-[#374151] leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Last two cards below video */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {trustFeatures.slice(2, 4).map((feature, index) => (
              <Card 
                key={index + 2} 
                className="stripe-card bg-white border border-gray-200 hover:scale-105 transition-all duration-300"
                data-testid={`trust-feature-${index + 2}`}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2 text-[#374151]">{feature.title}</h3>
                  <p className="text-sm text-[#374151] leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
