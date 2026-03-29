import { useLanguage } from '@/contexts/LanguageContext';
import { useProduct, useCategories } from '@/lib/useApi';
import { Link, useParams } from 'wouter';
import { ArrowLeft, ArrowRight, Tag, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductDetail() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id || '0');
  const { language, dir } = useLanguage();

  const { data: product, isLoading, isError } = useProduct(id);
  const { data: productCategories } = useCategories('product');

  const getCategoryLabel = (nameEn: string) => {
    const cat = productCategories?.find((c) => c.name_en === nameEn);
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

  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="heading-lg text-foreground mb-4">
            {language === 'ar' ? 'المنتج غير موجود' : 'Product Not Found'}
          </h2>
          <Link href="/products">
            <Button className="bg-accent text-background">
              {language === 'ar' ? 'العودة للمنتجات' : 'Back to Products'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const name = language === 'ar' ? product.nameAr : product.name;
  const description = language === 'ar' ? product.descriptionAr : product.description;
  const BackIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  return (
    <div className="w-full" dir={dir}>
      {/* Breadcrumb */}
      <section className="py-6 bg-muted border-b-2 border-foreground">
        <div className="container">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-accent transition-colors">
            <BackIcon size={16} />
            {language === 'ar' ? 'العودة إلى المنتجات' : 'Back to Products'}
          </Link>
        </div>
      </section>

      {/* Product Detail */}
      <section className="section-spacing bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="order-1">
              <div className="relative w-full aspect-square border-2 border-foreground overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={name || ''}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-lg">
                      {language === 'ar' ? 'لا توجد صورة' : 'No Image'}
                    </span>
                  </div>
                )}
                {product.featured === 1 && (
                  <div className="absolute top-4 start-4 bg-accent text-background text-xs font-bold px-3 py-1 uppercase">
                    {language === 'ar' ? 'مميز' : 'Featured'}
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="order-2 flex flex-col justify-center">
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
                  <Tag size={14} />
                  {getCategoryLabel(product.category)}
                </span>
              </div>

              <h1 className="heading-xl text-foreground mb-6">{name}</h1>

              {product.price && (
                <p className="text-3xl font-black text-accent mb-6">${product.price}</p>
              )}

              {description && (
                <p className="body-lg text-foreground opacity-80 leading-relaxed mb-8">
                  {description}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="w-full sm:w-auto bg-accent text-background hover:bg-accent/90 font-bold flex items-center gap-2 px-8 py-3">
                    <Phone size={18} />
                    {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" className="w-full sm:w-auto border-2 border-foreground text-foreground font-bold px-8 py-3">
                    {language === 'ar' ? 'منتجات أخرى' : 'More Products'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
