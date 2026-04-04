import { useLanguage } from '@/contexts/LanguageContext';
import { useAllProducts, useCategories } from '@/lib/useApi';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useState } from 'react';

export default function Products() {
  const { t, dir, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: allProducts } = useAllProducts();
  const { data: dynamicCategories } = useCategories('product');

  const categories = dynamicCategories?.map(cat => ({
    id: cat.name_en,
    label: language === 'ar' ? cat.name_ar : cat.name_en,
    count: allProducts?.filter(p => p.category === cat.name_en).length || 0,
  })) || [];

  const displayProducts = selectedCategory
    ? allProducts?.filter(p => p.category === selectedCategory)
    : allProducts;

  const getCategoryLabel = (nameEn: string) => {
    const cat = dynamicCategories?.find((c) => c.name_en === nameEn);
    return cat ? (language === 'ar' ? cat.name_ar : cat.name_en) : nameEn;
  };

  return (
    <div className="w-full">
      {/* Page Hero */}
      <section className="relative py-20 sm:py-28 bg-foreground text-background border-b-2 border-foreground">
        <div className="container">
          <h1 className="heading-xl text-background mb-4">{t('products.title')}</h1>
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
              {t('products.allLabel')} ({allProducts?.length || 0})
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

      {/* Products Grid */}
      <section className="section-spacing bg-background">
        <div className="container">
          {displayProducts && displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group border-2 border-foreground overflow-hidden hover:shadow-xl hover:border-accent transition-all cursor-pointer block"
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
                  <div className="p-6 bg-background">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="heading-sm text-foreground flex-1">{product.name}</h3>
                      {product.price && (
                        <span className="font-bold text-accent text-lg ml-2">${product.price}</span>
                      )}
                    </div>
                    <p className="text-sm text-foreground opacity-80 mb-4 line-clamp-3">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t-2 border-foreground">
                      <span className="text-xs font-bold text-accent uppercase">
                        {getCategoryLabel(product.category)}
                      </span>
                      <span className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                        {t('products.viewDetails')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">{t('products.noProducts')}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-accent text-background border-t-2 border-foreground">
        <div className="container text-center">
          <h2 className="heading-lg mb-6 text-background">
            {t('products.notFoundTitle')}
          </h2>
          <p className="body-lg mb-8 max-w-2xl mx-auto opacity-90">
            {t('products.notFoundDesc')}
          </p>
          <Link href="/contact">
            <Button 
              size="lg"
              className="bg-background text-accent hover:bg-background/90 font-bold text-lg px-8 py-6"
            >
              {t('products.getInTouch')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
