import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t, dir } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.products', href: '/products' },
    { key: 'nav.projects', href: '/projects' },
    { key: 'nav.contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b-2 border-foreground">
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/">
          <a className="text-3xl font-black tracking-tighter text-foreground hover:opacity-80 transition-opacity">
            QUBE
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href}>
              <a className="text-sm font-semibold text-foreground hover:text-accent transition-colors border-b-2 border-transparent hover:border-accent pb-1">
                {t(item.key)}
              </a>
            </Link>
          ))}
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
            className="md:hidden p-2 text-foreground hover:bg-muted rounded transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-background border-t-2 border-foreground">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link key={item.key} href={item.href}>
                <a
                  className="text-sm font-semibold text-foreground hover:text-accent transition-colors block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </a>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
