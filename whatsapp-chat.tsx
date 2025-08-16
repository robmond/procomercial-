import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, X, Phone } from "lucide-react";

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleWhatsAppClick = () => {
    // En el futuro se conectará con el chatbot
    const message = encodeURIComponent("Hola! Me interesa conocer más sobre las oportunidades de inversión en ProComercial.");
    const whatsappUrl = `https://wa.me/56912345678?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Popup Card */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-in slide-in-from-bottom-2 duration-300">
          <Card className="w-80 bg-white border border-gray-200 shadow-2xl">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Asesor ProComercial</div>
                    <div className="text-sm text-green-600 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      En línea
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-gray-700">
                  ¡Hola! 👋 Soy tu asesor virtual. ¿Tienes alguna consulta sobre nuestras oportunidades de inversión?
                </p>
              </div>
              
              <div className="space-y-2">
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white justify-start"
                  data-testid="button-whatsapp-chat"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chatear por WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    window.location.href = 'tel:+56912345678';
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar ahora
                </Button>
              </div>
              
              <div className="text-xs text-gray-500 mt-3 text-center">
                Respuesta en menos de 5 minutos
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Pulse animation ring */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
          
          {/* Main button */}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl border-4 border-white transition-all duration-300 hover:scale-110"
            data-testid="button-whatsapp-float"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MessageCircle className="w-6 h-6" />
            )}
          </Button>
          
          {/* Notification badge */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">1</span>
            </div>
          )}
        </div>
      </div>

      {/* Tooltip for first-time users */}
      {!isOpen && (
        <div className="fixed bottom-20 right-20 z-40 animate-in fade-in duration-500 delay-1000">
          <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
            ¿Tienes consultas? ¡Escríbenos!
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </>
  );
}