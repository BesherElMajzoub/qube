import { useLanguage } from '@/contexts/LanguageContext';
import { useFeaturedProducts, useFeaturedProjects, useCategories } from '@/lib/useApi';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, Package, Hammer, Palette } from 'lucide-react';

export default function Home() {
  const { t, dir, language } = useLanguage();
  const { data: featuredProducts } = useFeaturedProducts();
  const { data: featuredProjects } = useFeaturedProjects();
  const { data: productCategories } = useCategories('product');
  const { data: projectCategories } = useCategories('project');

  const getProductCategoryLabel = (nameEn: string) => {
    const cat = productCategories?.find((c) => c.name_en === nameEn);
    return cat ? (language === 'ar' ? cat.name_ar : cat.name_en) : nameEn;
  };

  const getProjectCategoryLabel = (nameEn: string) => {
    const cat = projectCategories?.find((c) => c.name_en === nameEn);
    return cat ? (language === 'ar' ? cat.name_ar : cat.name_en) : nameEn;
  };

  return (
    <div className="w-full">
      {/* ===========================
          Hero Section — Animated
          =========================== */}
      <section
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f7f5fc 0%, #eef7f7 50%, #f7f7f7 100%)',
        }}
      >
        {/* Background decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, #1E1E1E 0px, #1E1E1E 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #1E1E1E 0px, #1E1E1E 1px, transparent 1px, transparent 60px)',
          }}
        />

        {/* Floating geometric shapes — using brand colours from SVG */}
        {/* Purple square — top-right */}
        <div
          className="absolute top-[8%] right-[6%] w-32 h-32 rounded-sm opacity-[0.12] animate-float-slow pointer-events-none"
          style={{ background: '#6e408d', transform: 'rotate(45deg)', animationDelay: '0s' }}
        />
        {/* Teal circle — bottom-left */}
        <div
          className="absolute bottom-[12%] left-[5%] w-48 h-48 rounded-full opacity-[0.08] animate-float pointer-events-none"
          style={{ background: '#149b9e', animationDelay: '1.5s' }}
        />
        {/* Green diamond — top-left */}
        <div
          className="absolute top-[20%] left-[8%] w-16 h-16 opacity-[0.15] animate-float pointer-events-none"
          style={{ background: '#72bf44', transform: 'rotate(45deg)', animationDelay: '3s' }}
        />
        {/* Yellow square — bottom-right */}
        <div
          className="absolute bottom-[18%] right-[10%] w-12 h-12 opacity-[0.18] animate-float-slow pointer-events-none"
          style={{ background: '#ede937', transform: 'rotate(45deg)', animationDelay: '2s' }}
        />
        {/* Large faint ring — center-right */}
        <div
          className="absolute top-1/2 right-[-5%] w-[500px] h-[500px] rounded-full border-[3px] border-[#6e408d] opacity-[0.05] -translate-y-1/2 animate-rotate-slow pointer-events-none"
        />

        {/* Main hero content */}
        <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-16 py-24">
          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-start">
            {/* Brand badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-semibold tracking-widest uppercase animate-fade-in"
              style={{
                background: 'rgba(110, 64, 141, 0.08)',
                border: '1px solid rgba(110, 64, 141, 0.2)',
                color: '#6e408d',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#6e408d' }}
              />
              Quality of Life Surfaces
            </div>

            {/* Heading */}
            <h1 className="heading-xl mb-6 animate-fade-in-up delay-100">
              {t('hero.title')}
            </h1>

            {/* Accent line */}
            <div
              className="w-20 h-1.5 mb-8 rounded-full animate-fade-in-up delay-200 mx-auto lg:mx-0"
              style={{ background: 'linear-gradient(90deg, #149b9e, #6e408d)' }}
            />

            {/* Subtitle */}
            <p className="text-2xl sm:text-3xl font-bold text-foreground mb-5 animate-fade-in-up delay-300">
              {t('hero.subtitle')}
            </p>

            {/* Description */}
            <p className="text-lg text-foreground/70 mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fade-in-up delay-400">
              {t('hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-500">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base px-8 py-6 flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  {t('hero.exploreBtn')}
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-bold text-base px-8 py-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  {t('hero.contactBtn')}
                </Button>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-10 mt-14 justify-center lg:justify-start animate-fade-in-up delay-600">
              {[
                { number: '500+', label: language === 'ar' ? 'منتج' : 'Products' },
                { number: '200+', label: language === 'ar' ? 'مشروع' : 'Projects' },
                { number: '10+', label: language === 'ar' ? 'سنوات خبرة' : 'Years' },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-start">
                  <div
                    className="text-2xl font-black"
                    style={{ color: i === 0 ? '#149b9e' : i === 1 ? '#6e408d' : '#72bf44' }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-xs text-foreground/60 font-semibold uppercase tracking-wide mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual Block — Logo + Decorative Elements */}
          <div className="flex-shrink-0 flex items-center justify-center animate-fade-in delay-300">
            <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px]">
              {/* Outer ring */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed opacity-20 animate-rotate-slow"
                style={{ borderColor: '#6e408d' }}
              />
              {/* Inner filled circle */}
              <div
                className="absolute inset-10 rounded-full opacity-[0.06]"
                style={{ background: 'radial-gradient(circle, #149b9e 0%, #6e408d 100%)' }}
              />
              {/* QUBE Logo — centered, big */}
              <div className="absolute inset-0 flex items-center justify-center animate-float">
                <img
                  src="/img/LOGO (7).svg"
                  alt="QUBE Brand"
                  className="w-52 h-52 sm:w-64 sm:h-64 object-contain drop-shadow-2xl"
                />
              </div>

              {/* Floating brand colour dots */}
              <div
                className="absolute top-4 right-12 w-4 h-4 rounded-full animate-float"
                style={{ background: '#149b9e', animationDelay: '0.5s' }}
              />
              <div
                className="absolute bottom-8 left-10 w-3 h-3 rounded-full animate-float"
                style={{ background: '#72bf44', animationDelay: '1s' }}
              />
              <div
                className="absolute top-1/2 right-2 w-2 h-2 rounded-full animate-float"
                style={{ background: '#ede937', animationDelay: '2s' }}
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-scroll-bounce opacity-50">
          <div className="w-5 h-8 border-2 border-foreground rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-foreground rounded-full" />
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-spacing bg-background border-t-2 border-b-2 border-foreground">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="w-full aspect-square bg-muted border-2 border-foreground flex items-center justify-center overflow-hidden">
                <img
                  src="/img/Gemini_Generated_Image_556hhn556hhn556h.png"
                  alt="QUBE showroom - premium surfaces"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              {/* Small logo accent */}
              <div className="flex items-center gap-3 mb-4">
                <img src="/img/LOGO (7).svg" alt="QUBE" className="w-8 h-8 object-contain" />
                <div className="w-12 h-0.5" style={{ background: 'linear-gradient(90deg, #149b9e, #6e408d)' }} />
              </div>
              <h2 className="heading-lg mb-6 text-foreground">{t('about.title')}</h2>
              <div className="w-16 h-1 bg-accent mb-6" />
              <p className="body-lg text-foreground mb-8 leading-relaxed">
                {t('about.preview')}
              </p>
              <Link href="/about">
                <Button
                  className="bg-foreground text-background hover:bg-foreground/90 font-bold flex items-center gap-2"
                >
                  Learn More
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-spacing bg-foreground text-background border-b-2 border-foreground">
        <div className="container">
          <h2 className="heading-lg text-center mb-12 text-background">{t('services.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Package, title: 'services.materials', desc: 'services.materialsDesc' },
              { icon: Hammer, title: 'services.solutions', desc: 'services.solutionsDesc' },
              { icon: Palette, title: 'services.applications', desc: 'services.applicationsDesc' },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div 
                  key={idx}
                  className="p-8 border-2 border-background bg-foreground hover:bg-accent transition-colors group"
                >
                  <Icon size={40} className="mb-6 text-background group-hover:text-foreground transition-colors" />
                  <h3 className="heading-sm mb-4 text-background group-hover:text-foreground transition-colors">
                    {t(service.title)}
                  </h3>
                  <p className="body-base text-background opacity-90 group-hover:text-foreground transition-colors">
                    {t(service.desc)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-spacing bg-background border-b-2 border-foreground">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="heading-lg text-foreground">{t('products.title')}</h2>
              <div className="w-16 h-1 bg-accent mt-4" />
            </div>
            <Link href="/products">
              <Button 
                variant="outline"
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-bold flex items-center gap-2"
              >
                View All
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts?.map((product) => (
              <div 
                key={product.id}
                className="group border-2 border-foreground overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="w-full aspect-square bg-muted border-b-2 border-foreground flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-muted-foreground">[Product Image]</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="heading-sm text-foreground mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-accent uppercase">
                      {getProductCategoryLabel(product.category)}
                    </span>
                    {product.price && (
                      <span className="font-bold text-foreground">${product.price}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section className="section-spacing bg-muted border-b-2 border-foreground">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="heading-lg text-foreground">{t('projects.title')}</h2>
              <div className="w-16 h-1 bg-accent mt-4" />
            </div>
            <Link href="/projects">
              <Button 
                variant="outline"
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-bold flex items-center gap-2"
              >
                View All
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects?.map((project) => (
              <div 
                key={project.id}
                className="group relative overflow-hidden border-2 border-foreground"
              >
                <div className="w-full aspect-video bg-muted flex items-center justify-center overflow-hidden">
                  {project.afterImageUrl ? (
                    <img 
                      src={project.afterImageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-muted-foreground">[Project Image]</span>
                  )}
                </div>
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/80 transition-colors duration-300 flex items-center justify-center">
                  <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="heading-md text-background mb-2">{project.title}</h3>
                    <p className="text-sm text-background/80 mb-4">{project.description}</p>
                    <span className="inline-block px-4 py-2 bg-accent text-background font-bold text-xs uppercase">
                      {getProjectCategoryLabel(project.category)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-accent text-background border-b-2 border-foreground">
        <div className="container text-center">
          <h2 className="heading-lg mb-6 text-background">
            {t('hero.subtitle')}
          </h2>
          <p className="body-lg mb-12 max-w-2xl mx-auto opacity-90">
            {t('hero.ctaDesc')}
          </p>
          <Link href="/contact">
            <Button 
              size="lg"
              className="bg-background text-accent hover:bg-background/90 font-bold text-lg px-8 py-6 flex items-center gap-2 mx-auto"
            >
              {t('hero.contactBtn')}
              <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
