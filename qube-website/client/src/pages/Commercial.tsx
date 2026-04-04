import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowRight,
  Store,
  Building2,
  Plane,
  Stethoscope,
  LayoutGrid,
  Flame,
  Minus,
  Palette,
  Shield,
} from "lucide-react";

export default function Commercial() {
  const { t, dir } = useLanguage();

  const sectors = [
    { icon: Store, key: "commercial.sector1", color: "#149b9e" },
    { icon: Building2, key: "commercial.sector2", color: "#6e408d" },
    { icon: Plane, key: "commercial.sector3", color: "#72bf44" },
    { icon: Stethoscope, key: "commercial.sector4", color: "#149b9e" },
    { icon: LayoutGrid, key: "commercial.sector5", color: "#6e408d" },
  ];

  const advantages = [
    {
      icon: Flame,
      titleKey: "commercial.adv1Title",
      descKey: "commercial.adv1Desc",
      color: "#149b9e",
    },
    {
      icon: Minus,
      titleKey: "commercial.adv2Title",
      descKey: "commercial.adv2Desc",
      color: "#6e408d",
    },
    {
      icon: Palette,
      titleKey: "commercial.adv3Title",
      descKey: "commercial.adv3Desc",
      color: "#72bf44",
    },
    {
      icon: Shield,
      titleKey: "commercial.adv4Title",
      descKey: "commercial.adv4Desc",
      color: "#149b9e",
    },
  ];

  return (
    <div className="w-full" dir={dir}>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-foreground text-background border-b-2 border-foreground overflow-hidden">
        <div
          className="absolute top-[15%] right-[4%] w-20 h-20 opacity-10 animate-float-slow pointer-events-none"
          style={{ background: "#72bf44", transform: "rotate(45deg)" }}
        />
        <div
          className="absolute bottom-[10%] left-[6%] w-36 h-36 rounded-full opacity-[0.06] animate-float pointer-events-none"
          style={{ background: "#149b9e" }}
        />
        <div className="container relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest text-accent mb-4 animate-fade-in-up delay-100">
            {t("commercial.title")}
          </p>
          <h1 className="heading-xl text-background mb-6 animate-fade-in-up delay-200">
            {t("commercial.subtitle")}
          </h1>
          <div className="w-20 h-1.5 rounded-full mb-8 animate-fade-in-up delay-300" style={{ background: "linear-gradient(90deg, #149b9e, #6e408d)" }} />
          <p className="body-lg text-background opacity-85 max-w-2xl leading-relaxed animate-fade-in-up delay-400">
            {t("commercial.description")}
          </p>
        </div>
      </section>

      {/* Sectors We Serve */}
      <section className="section-spacing bg-background border-b-2 border-foreground">
        <div className="container">
          <h2 className="heading-lg text-center mb-4">{t("commercial.sectors")}</h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {sectors.map((sector, idx) => {
              const Icon = sector.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-6 border-2 border-foreground bg-background hover:bg-muted transition-colors group"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0 border-2 border-foreground group-hover:border-accent transition-colors"
                    style={{ color: sector.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <span className="font-bold text-foreground text-lg">
                    {t(sector.key)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="section-spacing bg-muted border-b-2 border-foreground">
        <div className="container">
          <h2 className="heading-lg text-center mb-4">{t("commercial.advantagesTitle")}</h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {advantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div
                  key={idx}
                  className="p-8 border-2 border-foreground bg-background hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-1.5"
                    style={{ background: adv.color }}
                  />
                  <Icon
                    size={40}
                    className="mb-5 transition-colors duration-300"
                    style={{ color: adv.color }}
                  />
                  <h3 className="heading-sm text-foreground mb-3">
                    {t(adv.titleKey)}
                  </h3>
                  <p className="body-base text-foreground opacity-80">
                    {t(adv.descKey)}
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
          <h2 className="heading-lg mb-6 text-background">{t("commercial.ctaTitle")}</h2>
          <p className="body-lg mb-10 max-w-2xl mx-auto opacity-90">{t("commercial.ctaDesc")}</p>
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
