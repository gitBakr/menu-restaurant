import { useTranslation } from "react-i18next";
import { FaFacebookF, FaInstagram, FaTripadvisor } from "react-icons/fa";

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <footer className="mt-16 border-t border-restaurant-gold/20 bg-restaurant-darker py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Social Media */}
          <div className={`flex flex-col items-center md:items-${isRTL ? 'end' : 'start'}`}>
            <h3 className="mb-4 text-xl font-bold text-restaurant-gold">
              {t('footer.social.title')}
            </h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-restaurant-gold p-2 text-restaurant-dark hover:bg-restaurant-gold/80"
              >
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-restaurant-gold p-2 text-restaurant-dark hover:bg-restaurant-gold/80"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://tripadvisor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-restaurant-gold p-2 text-restaurant-dark hover:bg-restaurant-gold/80"
              >
                <FaTripadvisor className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center">
            <div className="space-x-4 text-restaurant-light">
              <a href="#" className="hover:text-restaurant-gold">
                {t('footer.links.reservations')}
              </a>
              <span>|</span>
              <a href="#" className="hover:text-restaurant-gold">
                {t('footer.links.privacy')}
              </a>
              <span>|</span>
              <a href="#" className="hover:text-restaurant-gold">
                {t('footer.links.terms')}
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className={`text-center md:text-${isRTL ? 'start' : 'end'} text-restaurant-light`}>
            {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
}; 