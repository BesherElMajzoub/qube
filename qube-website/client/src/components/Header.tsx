import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface DropdownItem {
  key: string;
  href: string;
}

interface NavItem {
  key: string;
  href: string;
  children?: DropdownItem[];
}

function DropdownMenu({
  label,
  items,
  isActive,
  location,
}: {
  label: string;
  items: DropdownItem[];
  isActive: boolean;
  location: string;
}) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-sm font-semibold transition-colors border-b-2 pb-1 flex items-center gap-1 ${
          isActive
            ? 'text-primary border-primary'
            : 'text-foreground border-transparent hover:text-primary hover:border-primary'
        }`}
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 bg-background border-2 border-foreground shadow-xl min-w-[200px] z-50 py-2 nav-dropdown-enter">
          {items.map((item) => {
            const itemActive = location === item.href;
            return (
              <Link key={item.key} href={item.href}>
                <a
                  className={`block px-5 py-3 text-sm font-semibold transition-colors ${
                    itemActive
                      ? 'text-primary bg-muted'
                      : 'text-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.key)}
                </a>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const { language, setLanguage, t, dir } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const solutionsItems: DropdownItem[] = [
    { key: 'nav.kitchens', href: '/kitchens' },
    { key: 'nav.bathrooms', href: '/bathrooms' },
    { key: 'nav.commercial', href: '/commercial' },
  ];

  const moreItems: DropdownItem[] = [
    { key: 'nav.hiMacs', href: '/why-himacs' },
    { key: 'nav.afterSales', href: '/after-sales' },
    { key: 'nav.faq', href: '/faq' },
  ];

  const mainNavItems: NavItem[] = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.solutions', href: '#', children: solutionsItems },
    { key: 'nav.products', href: '/products' },
    { key: 'nav.projects', href: '/projects' },
    { key: 'nav.more', href: '#', children: moreItems },
    { key: 'nav.contact', href: '/contact' },
  ];

  const allMobileItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.kitchens', href: '/kitchens' },
    { key: 'nav.bathrooms', href: '/bathrooms' },
    { key: 'nav.commercial', href: '/commercial' },
    { key: 'nav.products', href: '/products' },
    { key: 'nav.projects', href: '/projects' },
    { key: 'nav.hiMacs', href: '/why-himacs' },
    { key: 'nav.afterSales', href: '/after-sales' },
    { key: 'nav.faq', href: '/faq' },
    { key: 'nav.contact', href: '/contact' },
  ];

  const isSolutionsActive = solutionsItems.some((i) => location === i.href);
  const isMoreActive = moreItems.some((i) => location === i.href);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b-2 border-foreground shadow-sm">
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-3 hover:opacity-90 transition-opacity group" aria-label="QUBE Home">
            <img
              src="/img/LOGO (7).svg"
              alt="QUBE Logo"
              className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-2xl font-black tracking-tighter text-secondary">
              QUBE
            </span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {mainNavItems.map((item) => {
            if (item.children) {
              const isActive =
                item.key === 'nav.solutions' ? isSolutionsActive : isMoreActive;
              return (
                <DropdownMenu
                  key={item.key}
                  label={t(item.key)}
                  items={item.children}
                  isActive={isActive}
                  location={location}
                />
              );
            }
            const isActive =
              location === item.href ||
              (item.href !== '/' && location.startsWith(item.href));
            return (
              <Link key={item.key} href={item.href}>
                <a
                  className={`text-sm font-semibold transition-colors border-b-2 pb-1 ${
                    isActive
                      ? 'text-primary border-primary'
                      : 'text-foreground border-transparent hover:text-primary hover:border-primary'
                  }`}
                >
                  {t(item.key)}
                </a>
              </Link>
            );
          })}
        </nav>

        {/* Language Switcher & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2 border-l-2 border-foreground pl-4">
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
              className="font-semibold"
            >
              EN
            </Button>
            <Button
              variant={language === 'ar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('ar')}
              className="font-semibold"
            >
              AR
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:bg-muted rounded transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-background border-t-2 border-foreground">
          <div className="container py-4 flex flex-col gap-1">
            {allMobileItems.map((item) => {
              const isActive =
                location === item.href ||
                (item.href !== '/' && location.startsWith(item.href));
              return (
                <Link key={item.key} href={item.href}>
                  <a
                    className={`text-sm font-semibold block py-3 px-2 transition-colors ${
                      isActive
                        ? 'text-primary bg-muted'
                        : 'text-foreground hover:text-primary hover:bg-muted'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(item.key)}
                  </a>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
