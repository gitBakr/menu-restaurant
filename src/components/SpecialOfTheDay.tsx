import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Price } from "./Price";

interface SpecialOfTheDayProps {
  translationKey: string;
  imageUrl: string;
}

export const SpecialOfTheDay = ({ translationKey, imageUrl }: SpecialOfTheDayProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-12 overflow-hidden rounded-xl border border-restaurant-gold/20 bg-restaurant-dark/50"
    >
      <div className="relative flex flex-col md:flex-row">
        <div className="relative h-64 w-full md:h-96 md:w-1/2">
          <img
            src={imageUrl}
            alt={t(`dishes.${translationKey}.name`)}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center p-8">
          <span className="mb-2 inline-block rounded-full border border-restaurant-gold px-3 py-1 text-sm font-medium text-restaurant-gold">
            {t('special.title')}
          </span>
          <h2 className={`mb-4 text-3xl font-bold text-restaurant-gold ${isRTL ? 'text-right' : 'text-left'}`}>
            {t(`dishes.${translationKey}.name`)}
          </h2>
          <p className={`mb-6 text-restaurant-light ${isRTL ? 'text-right' : 'text-left'}`}>
            {t(`dishes.${translationKey}.description`)}
          </p>
          <Price 
            translationKey={translationKey}
            className={`text-2xl font-semibold text-restaurant-light ${isRTL ? 'text-right' : 'text-left'}`}
          />
        </div>
      </div>
    </motion.div>
  );
};
