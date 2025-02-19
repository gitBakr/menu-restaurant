import { MenuItem as MenuItemType } from '@/types/menu';
import { TFunction } from 'i18next';
import { cn } from '@/lib/utils';

interface MenuItemProps {
  dish: MenuItemType;
  expanded: boolean;
  onToggle: (id: number) => void;
  t: TFunction;
}

export const MenuItem = ({ dish, expanded, onToggle, t }: MenuItemProps) => {
  return (
    <div 
      className="relative overflow-hidden rounded-lg border border-restaurant-gold/20 p-6 transition-all hover:border-restaurant-gold/40"
    >
      <div className="flex gap-4">
        <img
          src={dish.imageUrl}
          alt={t(`dishes.${dish.translationKey}.name`)}
          className="h-24 w-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-serif text-xl text-restaurant-gold">
              {t(`dishes.${dish.translationKey}.name`)}
            </h3>
            <span className="text-lg font-medium text-white">
              {t('currency.position') === 'before' ? t('currency.symbol') : ''}
              {t(`prices.${dish.translationKey}`)}
              {t('currency.position') === 'after' ? t('currency.symbol') : ''}
            </span>
          </div>
          <button
            className="mt-2 text-sm text-gray-400 hover:text-white transition-colors"
            onClick={() => onToggle(dish.id)}
          >
            {expanded ? t('actions.viewLess') : t('actions.viewMore')}
          </button>
          {expanded && (
            <div className="mt-2 space-y-2">
              <p className="text-restaurant-light">
                {t(`dishes.${dish.translationKey}.description`)}
              </p>
              <p className="text-sm italic text-restaurant-gold/70">
                {t(`dishes.${dish.translationKey}.details`)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 