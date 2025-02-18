import { useTranslation } from "react-i18next";
import { FaMapMarkerAlt, FaPhone, FaClock } from "react-icons/fa";

export const ContactInfo = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="mt-16 bg-restaurant-darker rounded-xl p-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Adresse */}
        <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} items-start gap-4`}>
          <div className="rounded-full bg-restaurant-gold p-3">
            <FaMapMarkerAlt className="h-6 w-6 text-restaurant-dark" />
          </div>
          <div className={`flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-xl font-bold text-restaurant-gold">
              {t('contact.address.title')}
            </h3>
            <p className="text-restaurant-light">
              {t('contact.address.street')}
              <br />
              {t('contact.address.city')}
              <br />
              {t('contact.address.country')}
            </p>
          </div>
        </div>

        {/* Téléphone */}
        <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} items-start gap-4`}>
          <div className="rounded-full bg-restaurant-gold p-3">
            <FaPhone className="h-6 w-6 text-restaurant-dark" />
          </div>
          <div className={`flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-xl font-bold text-restaurant-gold">
              {t('contact.phone.title')}
            </h3>
            <p className="text-restaurant-light">
              {t('contact.phone.number')}
            </p>
          </div>
        </div>

        {/* Horaires */}
        <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} items-start gap-4`}>
          <div className="rounded-full bg-restaurant-gold p-3">
            <FaClock className="h-6 w-6 text-restaurant-dark" />
          </div>
          <div className={`flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-xl font-bold text-restaurant-gold">
              {t('contact.hours.title')}
            </h3>
            <p className="text-restaurant-light">
              {t('contact.hours.weekdays')}
              <br />
              {t('contact.hours.weekends')}
              <br />
              <span className="text-restaurant-gold text-sm italic">
                {t('contact.hours.ramadan')}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 