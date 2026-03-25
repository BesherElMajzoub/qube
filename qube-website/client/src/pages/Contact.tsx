import { useLanguage } from '@/contexts/LanguageContext';
import { useSubmitContact, useSettings } from '@/lib/useApi';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const { t, dir } = useLanguage();
  const { data: settings } = useSettings();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const submitMutation = useSubmitContact();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await submitMutation.mutateAsync({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        message: formData.message,
      });

      toast.success('Message sent successfully! We will contact you soon.');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Page Hero */}
      <section className="relative py-20 sm:py-28 bg-foreground text-background border-b-2 border-foreground">
        <div className="container">
          <h1 className="heading-xl text-background mb-4">{t('contact.title')}</h1>
          <div className="w-20 h-1 bg-accent"></div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-spacing bg-background border-b-2 border-foreground">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="heading-md text-foreground mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-foreground mb-2">
                    {t('contact.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-foreground bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-foreground mb-2">
                    {t('contact.phone')} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-foreground bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="+966 (0) 123 456 789"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-foreground mb-2">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-foreground bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-foreground mb-2">
                    {t('contact.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-foreground bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-accent text-background hover:bg-accent/90 font-bold text-lg py-3"
                >
                  {isLoading ? 'Sending...' : t('contact.send')}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="heading-md text-foreground mb-8">Contact Information</h2>

              <div className="space-y-8">
                {/* Main Contact Info */}
                <div className="p-6 border-2 border-foreground bg-muted">
                  <h3 className="heading-sm text-foreground mb-6">Get in Touch</h3>

                  <div className="space-y-4">
                    <a 
                      href="tel:+966123456789"
                      className="flex items-start gap-4 group hover:text-accent transition-colors"
                    >
                      <Phone size={24} className="text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-foreground">Phone</p>
                        <p className="text-foreground opacity-80">+966 (0) 123 456 789</p>
                      </div>
                    </a>

                    <a 
                      href="mailto:info@qube.com"
                      className="flex items-start gap-4 group hover:text-accent transition-colors"
                    >
                      <Mail size={24} className="text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-foreground">Email</p>
                        <p className="text-foreground opacity-80">info@qube.com</p>
                      </div>
                    </a>

                    <div className="flex items-start gap-4">
                      <Clock size={24} className="text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-foreground">Business Hours</p>
                        <p className="text-foreground opacity-80">Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                        <p className="text-foreground opacity-80">Friday - Saturday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Locations */}
                {settings && (
                  <div className="p-6 border-2 border-foreground bg-muted">
                    <h3 className="heading-sm text-foreground mb-4">Our Location</h3>
                    <div className="space-y-4">
                      <div className="pb-4">
                        <div className="flex items-start gap-2 mt-2">
                          <MapPin size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground opacity-80">{settings.address_en}</p>
                        </div>
                        <p className="text-sm text-foreground opacity-80 mt-2">{settings.phone1}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted border-b-2 border-foreground">
        <div className="container">
          <h2 className="heading-md text-foreground text-center mb-8">Find Us On The Map</h2>
          <div className="w-full h-96 bg-foreground border-2 border-foreground flex items-center justify-center">
            <span className="text-background text-lg">[Google Maps Integration]</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-accent text-background border-t-2 border-foreground">
        <div className="container text-center">
          <h2 className="heading-lg mb-6 text-background">
            Have Questions?
          </h2>
          <p className="body-lg mb-8 max-w-2xl mx-auto opacity-90">
            Our team is ready to help you find the perfect surface solutions for your project.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-background text-accent hover:bg-background/90 font-bold text-lg px-8 py-6"
          >
            <a href="https://wa.me/966123456789" target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
