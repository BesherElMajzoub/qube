import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Wrench, Sparkles, PenTool, HeadphonesIcon } from "lucide-react";

export default function AfterSales() {
  const { t, dir } = useLanguage();

  const services = [
    {
      icon: Wrench,
      titleKey: "afterSales.service1Title",
      descKey: "afterSales.service1Desc",
      color: "#149b9e",
    },
    {
      icon: Sparkles,
      titleKey: "afterSales.service2Title",
      descKey: "afterSales.service2Desc",
      color: "#6e408d",
    },
    {
      icon: PenTool,
      titleKey: "afterSales.service3Title",
      descKey: "afterSales.service3Desc",
      color: "#72bf44",
    },
    {
      icon: HeadphonesIcon,
      titleKey: "afterSales.service4Title",
      descKey: "afterSales.service4Desc",
      color: "#149b9e",
    },
  ];

  return (
    <div className="w-full" dir={dir}>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-foreground text-background border-b-2 border-foreground overflow-hidden">
        <div
          className="absolute top-[10%] left-[5%] w-24 h-24 rounded-full opacity-[0.08] animate-float pointer-events-none"
          style={{ background: "#72bf44" }}
        />
        <div
          className="absolute bottom-[8%] right-[6%] w-20 h-20 opacity-10 animate-float-slow pointer-events-none"
          style={{ background: "#6e408d", transform: "rotate(45deg)" }}
        />
        <div className="container relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest text-accent mb-4 animate-fade-in-up delay-100">
            {t("afterSales.title")}
          </p>
          <h1 className="heading-xl text-background mb-6 animate-fade-in-up delay-200">
            {t("afterSales.subtitle")}
          </h1>
          <div className="w-20 h-1.5 rounded-full mb-8 animate-fade-in-up delay-300" style={{ background: "linear-gradient(90deg, #149b9e, #6e408d)" }} />
          <p className="body-lg text-background opacity-85 max-w-2xl leading-relaxed animate-fade-in-up delay-400">
            {t("afterSales.description")}
          </p>
        </div>
      </section>

      {/* After-Sales Services */}
      <section className="section-spacing bg-background border-b-2 border-foreground">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="p-8 border-2 border-foreground bg-background hover:shadow-xl transition-all duration-300 group relative overflow-hidden text-center"
                >
                  <div
                    className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-1.5"
                    style={{ background: service.color }}
                  />
                  <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center border-2 border-foreground group-hover:border-accent transition-colors">
                    <Icon
                      size={32}
                      className="transition-colors duration-300"
                      style={{ color: service.color }}
                    />
                  </div>
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

      {/* CTA */}
      <section className="section-spacing bg-accent text-background border-b-2 border-foreground">
        <div className="container text-center">
          <h2 className="heading-lg mb-6 text-background">{t("afterSales.ctaTitle")}</h2>
          <p className="body-lg mb-10 max-w-2xl mx-auto opacity-90">{t("afterSales.ctaDesc")}</p>
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
