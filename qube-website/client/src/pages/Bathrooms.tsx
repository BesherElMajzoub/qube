import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Bath, Droplets, BookOpen, LayoutDashboard } from "lucide-react";

export default function Bathrooms() {
  const { t, dir } = useLanguage();

  const services = [
    {
      icon: LayoutDashboard,
      titleKey: "bathrooms.service1Title",
      descKey: "bathrooms.service1Desc",
      color: "#149b9e",
    },
    {
      icon: Droplets,
      titleKey: "bathrooms.service2Title",
      descKey: "bathrooms.service2Desc",
      color: "#6e408d",
    },
    {
      icon: BookOpen,
      titleKey: "bathrooms.service3Title",
      descKey: "bathrooms.service3Desc",
      color: "#72bf44",
    },
    {
      icon: Bath,
      titleKey: "bathrooms.service4Title",
      descKey: "bathrooms.service4Desc",
      color: "#149b9e",
    },
  ];

  return (
    <div className="w-full" dir={dir}>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-foreground text-background border-b-2 border-foreground overflow-hidden">
        <div
          className="absolute top-[12%] left-[6%] w-20 h-20 rounded-full opacity-[0.08] animate-float pointer-events-none"
          style={{ background: "#149b9e" }}
        />
        <div
          className="absolute bottom-[14%] right-[8%] w-28 h-28 rounded-sm opacity-10 animate-float-slow pointer-events-none"
          style={{ background: "#6e408d", transform: "rotate(45deg)" }}
        />
        <div className="container relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest text-accent mb-4 animate-fade-in-up delay-100">
            {t("bathrooms.title")}
          </p>
          <h1 className="heading-xl text-background mb-6 animate-fade-in-up delay-200">
            {t("bathrooms.subtitle")}
          </h1>
          <div className="w-20 h-1.5 rounded-full mb-8 animate-fade-in-up delay-300" style={{ background: "linear-gradient(90deg, #149b9e, #6e408d)" }} />
          <p className="body-lg text-background opacity-85 max-w-2xl leading-relaxed animate-fade-in-up delay-400">
            {t("bathrooms.description")}
          </p>
        </div>
      </section>

      {/* Bathroom Services Grid */}
      <section className="section-spacing bg-background border-b-2 border-foreground">
        <div className="container">
          <h2 className="heading-lg text-center mb-4">{t("bathrooms.servicesTitle")}</h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="p-8 border-2 border-foreground bg-background hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-1.5"
                    style={{ background: service.color }}
                  />
                  <Icon
                    size={40}
                    className="mb-5 transition-colors duration-300"
                    style={{ color: service.color }}
                  />
                  <h3 className="heading-sm text-foreground mb-3">
                    {t(service.titleKey)}
                  </h3>
                  <p className="body-base text-foreground opacity-80">
                    {t(service.descKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why HI-MACS for Bathrooms */}
      <section className="section-spacing bg-muted border-b-2 border-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img src="/img/LOGO (7).svg" alt="QUBE" className="w-10 h-10 object-contain" />
              <div className="w-12 h-0.5" style={{ background: "linear-gradient(90deg, #149b9e, #6e408d)" }} />
            </div>
            <h2 className="heading-lg mb-8">{t("bathrooms.whyTitle")}</h2>
            <p className="body-lg text-foreground opacity-85 leading-relaxed mb-10">
              {t("bathrooms.whyDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-accent text-background border-b-2 border-foreground">
        <div className="container text-center">
          <h2 className="heading-lg mb-6 text-background">{t("bathrooms.ctaTitle")}</h2>
          <p className="body-lg mb-10 max-w-2xl mx-auto opacity-90">{t("bathrooms.ctaDesc")}</p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-background text-accent hover:bg-background/90 font-bold text-lg px-8 py-6 flex items-center gap-2 mx-auto"
            >
              {t("hero.contactBtn")}
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
