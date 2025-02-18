import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Price } from "./Price";

export type Dish = {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  details?: string;
  isSpecial?: boolean;
  translationKey: string;
};

type Props = {
  title: string;
  dishes: Dish[];
};

export const MenuCategory = ({ title, dishes }: Props) => {
  const [selectedDish, setSelectedDish] = useState<number | null>(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="mb-12">
      <h2 className={`mb-6 text-3xl font-bold text-restaurant-gold ${isRTL ? 'text-right' : 'text-left'}`}>
        {title}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {dishes.map((dish) => (
          <div key={dish.id} 
            className="rounded-lg bg-restaurant-darker p-4 shadow-lg 
              border border-restaurant-gold/30 hover:border-restaurant-gold/60 
              transition-colors duration-300"
          >
            <div className="flex gap-4">
              <img
                src={dish.imageUrl}
                alt={t(`dishes.${dish.translationKey}.name`)}
                className="h-24 w-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className={`text-xl font-semibold text-restaurant-gold ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t(`dishes.${dish.translationKey}.name`)}
                </h3>
                <p className={`text-restaurant-light ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t(`dishes.${dish.translationKey}.description`)}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <Price 
                    translationKey={dish.translationKey}
                    className="text-lg font-bold text-restaurant-gold"
                  />
                  <button
                    onClick={() => setSelectedDish(selectedDish === dish.id ? null : dish.id)}
                    className="rounded bg-restaurant-gold px-3 py-1 text-sm text-restaurant-dark hover:bg-restaurant-gold/80"
                  >
                    {t(selectedDish === dish.id ? 'actions.viewLess' : 'actions.viewMore')}
                  </button>
                </div>
              </div>
            </div>
            {selectedDish === dish.id && dish.details && (
              <div className={`mt-4 border-t border-restaurant-gold/20 pt-4 text-restaurant-light ${isRTL ? 'text-right' : 'text-left'}`}>
                {t(`dishes.${dish.translationKey}.details`)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
