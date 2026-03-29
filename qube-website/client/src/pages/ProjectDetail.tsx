import { useLanguage } from '@/contexts/LanguageContext';
import { useProject, useCategories } from '@/lib/useApi';
import { Link, useParams } from 'wouter';
import { ArrowLeft, ArrowRight, Tag, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function ProjectDetail() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id || '0');
  const { language, dir } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);

  const { data: project, isLoading, isError } = useProject(id);
  const { data: projectCategories } = useCategories('project');

  const getCategoryLabel = (nameEn: string) => {
    const cat = projectCategories?.find((c) => c.name_en === nameEn);
    return cat ? (language === 'ar' ? cat.name_ar : cat.name_en) : nameEn;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground opacity-60">{language === 'ar' ? 'جارٍ التحميل...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="heading-lg text-foreground mb-4">
            {language === 'ar' ? 'المشروع غير موجود' : 'Project Not Found'}
          </h2>
          <Link href="/projects">
            <Button className="bg-accent text-background">
              {language === 'ar' ? 'العودة للمشاريع' : 'Back to Projects'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const title = language === 'ar' ? project.titleAr : project.title;
  const description = language === 'ar' ? project.descriptionAr : project.description;
  const caseStudy = language === 'ar' ? project.caseStudyAr : project.caseStudy;
  const BackIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const images = project.images || [];
  const allImages = [
    ...(project.beforeImageUrl ? [project.beforeImageUrl] : []),
    ...(project.afterImageUrl ? [project.afterImageUrl] : []),
    ...images,
  ];

  return (
    <div className="w-full" dir={dir}>
      {/* Breadcrumb */}
      <section className="py-6 bg-muted border-b-2 border-foreground">
        <div className="container">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-accent transition-colors">
            <BackIcon size={16} />
            {language === 'ar' ? 'العودة إلى المشاريع' : 'Back to Projects'}
          </Link>
        </div>
      </section>

      {/* Hero image */}
      <section className="bg-background border-b-2 border-foreground">
        <div className="container py-8">
          {/* Main image viewer */}
          {allImages.length > 0 ? (
            <div className="relative w-full aspect-video border-2 border-foreground overflow-hidden bg-muted">
              <img
                src={allImages[activeImage]}
                alt={title || ''}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage(i => (i - 1 + allImages.length) % allImages.length)}
                    title={language === 'ar' ? 'السابق' : 'Previous'}
                    aria-label={language === 'ar' ? 'الصورة السابقة' : 'Previous image'}
                    className="absolute start-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 border-2 border-foreground flex items-center justify-center hover:bg-accent hover:text-background transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setActiveImage(i => (i + 1) % allImages.length)}
                    title={language === 'ar' ? 'التالي' : 'Next'}
                    aria-label={language === 'ar' ? 'الصورة التالية' : 'Next image'}
                    className="absolute end-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 border-2 border-foreground flex items-center justify-center hover:bg-accent hover:text-background transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                  {/* Thumbnails */}
                  <div className="absolute bottom-4 start-0 end-0 flex justify-center gap-2 px-4">
                    {allImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        title={`${language === 'ar' ? 'صورة' : 'Image'} ${idx + 1}`}
                        aria-label={`${language === 'ar' ? 'الانتقال إلى صورة' : 'Go to image'} ${idx + 1}`}
                        className={`w-2.5 h-2.5 rounded-full border-2 transition-colors ${activeImage === idx ? 'bg-accent border-accent' : 'bg-background border-foreground'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="w-full aspect-video border-2 border-foreground bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">{language === 'ar' ? 'لا توجد صورة' : 'No Image'}</span>
            </div>
          )}

          {/* Thumbnail strip */}
          {allImages.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  title={`${language === 'ar' ? 'عرض الصورة ' : 'View image '}${idx + 1}`}
                  aria-label={`${language === 'ar' ? 'عرض الصورة ' : 'View image '}${idx + 1}`}
                  className={`flex-shrink-0 w-20 h-20 border-2 overflow-hidden transition-colors ${activeImage === idx ? 'border-accent' : 'border-foreground opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Info */}
      <section className="section-spacing bg-background border-b-2 border-foreground">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
                  <Tag size={14} />
                  {getCategoryLabel(project.category)}
                </span>
              </div>
              <h1 className="heading-xl text-foreground mb-6">{title}</h1>
              {description && (
                <p className="body-lg text-foreground opacity-80 leading-relaxed mb-8">{description}</p>
              )}
              {caseStudy && (
                <div className="p-6 border-2 border-accent bg-muted">
                  <h3 className="heading-sm text-foreground mb-4">
                    {language === 'ar' ? 'دراسة الحالة' : 'Case Study'}
                  </h3>
                  <p className="body-base text-foreground leading-relaxed">{caseStudy}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {project.featured === 1 && (
                <div className="p-4 bg-accent text-background font-bold text-center">
                  {language === 'ar' ? '⭐ مشروع مميز' : '⭐ Featured Project'}
                </div>
              )}
              {/* Before/After */}
              {project.beforeImageUrl && project.afterImageUrl && (
                <div className="border-2 border-foreground overflow-hidden">
                  <div className="grid grid-cols-2">
                    <div className="relative">
                      <img src={project.beforeImageUrl} alt="Before" className="w-full aspect-square object-cover" />
                      <span className="absolute bottom-2 start-2 bg-foreground text-background text-xs font-bold px-2 py-1">
                        {language === 'ar' ? 'قبل' : 'Before'}
                      </span>
                    </div>
                    <div className="relative border-s-2 border-foreground">
                      <img src={project.afterImageUrl} alt="After" className="w-full aspect-square object-cover" />
                      <span className="absolute bottom-2 start-2 bg-accent text-background text-xs font-bold px-2 py-1">
                        {language === 'ar' ? 'بعد' : 'After'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <Link href="/contact">
                <Button className="w-full bg-accent text-background hover:bg-accent/90 font-bold flex items-center justify-center gap-2 py-3">
                  <Phone size={18} />
                  {language === 'ar' ? 'تواصل معنا' : 'Start a Project'}
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" className="w-full border-2 border-foreground text-foreground font-bold py-3">
                  {language === 'ar' ? 'مشاريع أخرى' : 'More Projects'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
