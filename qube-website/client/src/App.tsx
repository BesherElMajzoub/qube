import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ProductDetail from "./pages/ProductDetail";
import ProjectDetail from "./pages/ProjectDetail";
import { useEffect } from "react";
import { useTrackVisitor, useSettings, useTrackClick } from "./lib/useApi";
import { useLanguage } from "./contexts/LanguageContext";

function WhatsAppFloat() {
  const { data: settings } = useSettings();
  const { mutate: trackClick } = useTrackClick();
  const { t } = useLanguage();
  const whatsappNumber = settings?.whatsapp?.replace(/\D/g, '') || '963944357001';

  return (
    <div className="fixed bottom-6 right-6 flex items-center gap-3 z-50 group">
      <span className="bg-foreground text-background text-sm font-bold px-4 py-2 rounded-full shadow-lg
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        {t('contact.sendInquiry')}
      </span>
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackClick('whatsapp_float')}
        className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.867 1.167c-1.52.92-2.529 2.314-2.529 3.808 0 1.494 1.009 2.888 2.529 3.808a9.87 9.87 0 004.871 1.167h.004c5.358 0 9.716-4.335 9.716-9.696 0-1.348-.267-2.679-.774-3.912a9.778 9.778 0 00-2.313-3.206 9.766 9.766 0 00-3.608-2.087 9.793 9.793 0 00-4.052-.888zm7.076-6.992C16.936.504 13.429 0 12.051 0 5.495 0 .16 5.335.16 11.891c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.89 0-3.176-1.237-6.167-3.48-8.477z" />
        </svg>
      </a>
    </div>
  );
}

function Router() {
  const { mutate: trackVisitor } = useTrackVisitor();

  useEffect(() => {
    trackVisitor();
  }, [trackVisitor]);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path="/about" component={About} />
          <Route path="/products" component={Products} />
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/projects" component={Projects} />
          <Route path="/projects/:id" component={ProjectDetail} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path={"/404"} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
