import { useLanguage } from '@/contexts/LanguageContext';
import { useAllProjects, useCategories } from '@/lib/useApi';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useState } from 'react';

export default function Projects() {
  const { t, dir, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: allProjects } = useAllProjects();
  const { data: dynamicCategories } = useCategories('project');

  const categories = dynamicCategories?.map(cat => ({
    id: cat.name_en,
    label: language === 'ar' ? cat.name_ar : cat.name_en,
    count: allProjects?.filter(p => p.category === cat.name_en).length || 0,
  })) || [];

  const displayProjects = selectedCategory
    ? allProjects?.filter(p => p.category === selectedCategory)
    : allProjects;

  const getCategoryLabel = (nameEn: string) => {
    const cat = dynamicCategories?.find((c) => c.name_en === nameEn);
    return cat ? (language === 'ar' ? cat.name_ar : cat.name_en) : nameEn;
  };

  return (
    <div className="w-full">
      {/* Page Hero */}
      <section className="relative py-20 sm:py-28 bg-foreground text-background border-b-2 border-foreground">
        <div className="container">
          <h1 className="heading-xl text-background mb-4">{t('projects.title')}</h1>
          <div className="w-20 h-1 bg-accent"></div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-background border-b-2 border-foreground">
        <div className="container">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={selectedCategory === null ? 'default' : 'outline'}
              className={`font-bold border-2 ${
                selectedCategory === null
                  ? 'bg-accent text-background border-accent'
                  : 'border-foreground text-foreground'
              }`}
            >
              All Projects ({allProjects?.length || 0})
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                className={`font-bold border-2 ${
                  selectedCategory === cat.id
                    ? 'bg-accent text-background border-accent'
                    : 'border-foreground text-foreground'
                }`}
              >
                {cat.label} ({cat.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="section-spacing bg-background">
        <div className="container">
          {displayProjects && displayProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group relative overflow-hidden border-2 border-foreground hover:border-accent transition-all block cursor-pointer"
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
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/85 transition-colors duration-300 flex items-center justify-center p-6">
                    <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="heading-md text-background mb-3">{project.title}</h3>
                      <p className="text-sm text-background/90 mb-4 line-clamp-3">{project.description}</p>
                      <span className="inline-block px-4 py-2 bg-accent text-foreground font-bold text-xs uppercase mb-4">
                        {getCategoryLabel(project.category)}
                      </span>
                      <div className="text-background text-sm opacity-75">
                        {language === 'ar' ? 'اضغط لعرض التفاصيل ←' : 'Click to view details →'}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Before & After Comparison Section */}
      <section className="section-spacing bg-muted border-t-2 border-foreground">
        <div className="container">
          <h2 className="heading-lg text-foreground text-center mb-12">Transformation Showcase</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayProjects?.slice(0, 2).map((project) => (
              <div key={project.id} className="border-2 border-foreground overflow-hidden">
                <div className="grid grid-cols-2 gap-0">
                  <div className="aspect-square bg-muted flex items-center justify-center border-r-2 border-foreground">
                    {project.beforeImageUrl ? (
                      <img 
                        src={project.beforeImageUrl} 
                        alt="Before"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-muted-foreground text-sm">Before</span>
                    )}
                  </div>
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    {project.afterImageUrl ? (
                      <img 
                        src={project.afterImageUrl} 
                        alt="After"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-muted-foreground text-sm">After</span>
                    )}
                  </div>
                </div>
                <div className="p-6 bg-background">
                  <h3 className="heading-sm text-foreground mb-2">{project.title}</h3>
                  <p className="text-sm text-foreground opacity-80 mb-4">{project.caseStudy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-accent text-background border-t-2 border-foreground">
        <div className="container text-center">
          <h2 className="heading-lg mb-6 text-background">
            {t('projects.readyTitle')}
          </h2>
          <p className="body-lg mb-8 max-w-2xl mx-auto opacity-90">
            {t('projects.readyDesc')}
          </p>
          <Link href="/contact">
            <Button 
              size="lg"
              className="bg-background text-accent hover:bg-background/90 font-bold text-lg px-8 py-6"
            >
              {t('projects.startProject')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
