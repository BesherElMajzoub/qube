import { useLanguage } from '@/contexts/LanguageContext';
import { useFeaturedProducts, useFeaturedProjects } from '@/lib/useApi';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowRight, Package, Hammer, Palette } from 'lucide-react';

export default function Home() {
  const { t, dir } = useLanguage();
  const { data: featuredProducts } = useFeaturedProducts();
  const { data: featuredProjects } = useFeaturedProjects();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 border-2 border-foreground opacity-10"></div>
        
        {/* Geometric background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-5 transform rotate-45"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent opacity-5 transform -rotate-45"></div>

        <div className="container relative z-10 text-center">
          <div className="mb-8 animate-fade-in">
            <h1 className="heading-xl mb-4 text-foreground">
              {t('hero.title')}
            </h1>
            <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
            <p className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg sm:text-xl text-foreground opacity-80 mb-12">
              {t('hero.description')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/products">
              <Button 
                size="lg" 
                className="bg-accent text-background hover:bg-accent/90 font-bold text-lg px-8 py-6 flex items-center gap-2"
              >
                {t('hero.exploreBtn')}
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-bold text-lg px-8 py-6"
              >
                {t('hero.contactBtn')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-foreground rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-spacing bg-background border-t-2 border-b-2 border-foreground">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="w-full aspect-square bg-muted border-2 border-foreground flex items-center justify-center">
                <span className="text-muted-foreground text-lg">[Featured Image]</span>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="heading-lg mb-6 text-foreground">{t('about.title')}</h2>
              <div className="w-16 h-1 bg-accent mb-6"></div>
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
              <div className="w-16 h-1 bg-accent mt-4"></div>
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
                      {product.category}
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
              <div className="w-16 h-1 bg-accent mt-4"></div>
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
                      {project.category}
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
            Transform your space with QUBE's premium decorative materials and surface solutions.
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
