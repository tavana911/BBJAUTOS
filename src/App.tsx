import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Rentals from "./pages/Rentals.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rentals" element={<Rentals />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* --- FLOATING WHATSAPP BUTTON START --- */}
        <a
          href="https://wa.me/2347078236267?text=Hello! I'm visiting your website and would like to inquire about your vehicles."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
          aria-label="Contact on WhatsApp"
        >
          <svg 
            width="30" 
            height="30" 
            viewBox="0 0 24 24" 
            fill="white" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.412c-1.935 0-3.83-.502-5.485-1.45l-.394-.23-4.073 1.067 1.085-3.974-.252-.4c-1.04-1.657-1.587-3.568-1.587-5.529 0-5.717 4.654-10.371 10.373-10.371 2.77 0 5.373 1.079 7.329 3.037 1.956 1.958 3.034 4.561 3.034 7.332 0 5.72-4.654 10.371-10.371 10.371m10.371-21.782c-2.77-2.77-6.452-4.293-10.371-4.293-8.077 0-14.651 6.574-14.651 14.651 0 2.581.674 5.1 1.951 7.351L0 24l4.135-1.085c2.155 1.173 4.588 1.794 7.059 1.794 8.08 0 14.654-6.574 14.654-14.651 0-3.913-1.523-7.595-4.293-10.371" />
          </svg>
        </a>
        {/* --- FLOATING WHATSAPP BUTTON END --- */}
        
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;