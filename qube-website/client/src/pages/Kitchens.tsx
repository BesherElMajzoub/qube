import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Layers, PaintBucket, LayoutGrid, Table2 } from "lucide-react";

export default function Kitchens() {
  const { t, dir } = useLanguage();

  const services = [
    {
      icon: Layers,
      titleKey: "kitchens.service1Title",
      descKey: "kitchens.service1Desc",
      color: "#149b9e",
    },
    {
      icon: PaintBucket,
      titleKey: "kitchens.service2Title",
      descKey: "kitchens.service2Desc",
      color: "#6e408d",
    },
    {
      icon: LayoutGrid,
      titleKey: "kitchens.service3Title",
      descKey: "kitchens.service3Desc",
      color: "#72bf44",
    },
    {
      icon: Table2,
      titleKey: "kitchens.service4Title",
      descKey: "kitchens.service4Desc",
      color: "#149b9e",
    },
  ];

  return (
    <div className="w-full" dir={dir}>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-foreground text-background border-b-2 border-foreground overflow-hidden">
        {/* Decorative shapes */}
        <div
          className="absolute top-[10%] right-[5%] w-24 h-24 rounded-sm opacity-10 animate-float-slow pointer-events-none"
          style={{ background: "#149b9e", transform: "rotate(45deg)" }}
        />
        <div
          className="absolute bottom-[10%] left-[5%] w-32 h-32 rounded-full opacity-[0.06] animate-float pointer-events-none"
          style={{ background: "#6e408d" }}
        />
        <div className="container relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest text-accent mb-4 animate-fade-in-up delay-100">
            {t("kitchens.title")}
          </p>
          <h1 className="heading-xl text-background mb-6 animate-fade-in-up delay-200">
            {t("kitchens.subtitle")}
          </h1>
          <div className="w-20 h-1.5 rounded-full mb-8 animate-fade-in-up delay-300" style={{ background: "linear-gradient(90deg, #149b9e, #6e408d)" }} />
          <p className="body-lg text-background opacity-85 max-w-2xl leading-relaxed animate-fade-in-up delay-400">
            {t("kitchens.description")}
          </p>
        </div>
      </section>

      {/* Kitchen Solutions Grid */}
      <section className="section-spacing bg-background border-b-2 border-foreground">
        <div className="container">
          <h2 className="heading-lg text-center mb-4">{t("kitchens.servicesTitle")}</h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="p-8 border-2 border-foreground bg-background hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Accent bar */}
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

      {/* Why QUBE for Kitchens */}
      <section className="section-spacing bg-muted border-b-2 border-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img src="/img/LOGO (7).svg" alt="QUBE" className="w-10 h-10 object-contain" />
              <div className="w-12 h-0.5" style={{ background: "linear-gradient(90deg, #149b9e, #6e408d)" }} />
            </div>
            <h2 className="heading-lg mb-8">{t("kitchens.whyTitle")}</h2>
            <p className="body-lg text-foreground opacity-85 leading-relaxed mb-10">
              {t("kitchens.whyDesc")}
            </p>
            <Link href="/products">
              <Button
                variant="outline"
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-bold flex items-center gap-2 mx-auto"
              >
                {t("products.viewAll")}
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-accent text-background border-b-2 border-foreground">
        <div className="container text-center">
          <h2 className="heading-lg mb-6 text-background">{t("kitchens.ctaTitle")}</h2>
          <p className="body-lg mb-10 max-w-2xl mx-auto opacity-90">{t("kitchens.ctaDesc")}</p>
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
