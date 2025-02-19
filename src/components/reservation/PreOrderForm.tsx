import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { menuData } from '../../data/menu';

interface PreOrderFormProps {
  onSubmit: (preOrder: any) => void;
  onSkip: () => void;
  onBack: () => void;
}

interface OrderItem {
  id: number;
  quantity: number;
  translationKey: string;
}

export const PreOrderForm = ({ onSubmit, onSkip, onBack }: PreOrderFormProps) => {
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);

  const handleQuantityChange = (id: number, translationKey: string, quantity: number) => {
    if (quantity === 0) {
      setSelectedItems(prev => prev.filter(item => item.id !== id));
    } else {
      setSelectedItems(prev => {
        const existing = prev.find(item => item.id === id);
        if (existing) {
          return prev.map(item => 
            item.id === id ? { ...item, quantity } : item
          );
        }
        return [...prev, { id, translationKey, quantity }];
      });
    }
  };

  const getTotalPrice = () => {
    return selectedItems.reduce((total, item) => {
      const price = Number(t(`prices.${item.translationKey}`));
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-restaurant-light hover:text-restaurant-gold"
        >
          ← {t('reservation.back')}
        </button>
        <button
          onClick={onSkip}
          className="text-restaurant-gold hover:underline"
        >
          {t('reservation.skipPreOrder')}
        </button>
      </div>

      {/* Liste des plats à pré-commander */}
      <div className="space-y-8">
        {Object.entries(menuData).map(([category, dishes]) => (
          <div key={category} className="rounded-lg bg-restaurant-darker p-4">
            <h3 className="mb-4 text-xl font-bold text-restaurant-gold">
              {t(`categories.${category}`)}
            </h3>
            <div className="space-y-4">
              {dishes.map((dish) => (
                <div key={dish.id} className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <img
                      src={dish.imageUrl}
                      alt={t(`dishes.${dish.translationKey}.name`)}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-restaurant-gold">
                        {t(`dishes.${dish.translationKey}.name`)}
                      </h4>
                      <p className="text-sm text-restaurant-light">
                        {t(`dishes.${dish.translationKey}.description`)}
                      </p>
                      <p className="text-restaurant-gold">
                        {t('currency.position') === 'before' ? t('currency.symbol') : ''}
                        {t(`prices.${dish.translationKey}`)}
                        {t('currency.position') === 'after' ? t('currency.symbol') : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const current = selectedItems.find(item => item.id === dish.id)?.quantity || 0;
                        handleQuantityChange(dish.id, dish.translationKey, Math.max(0, current - 1));
                      }}
                      className="rounded-full bg-restaurant-gold/20 p-2 text-restaurant-gold hover:bg-restaurant-gold/30"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-restaurant-light">
                      {selectedItems.find(item => item.id === dish.id)?.quantity || 0}
                    </span>
                    <button
                      onClick={() => {
                        const current = selectedItems.find(item => item.id === dish.id)?.quantity || 0;
                        handleQuantityChange(dish.id, dish.translationKey, current + 1);
                      }}
                      className="rounded-full bg-restaurant-gold/20 p-2 text-restaurant-gold hover:bg-restaurant-gold/30"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <div className="mt-6 rounded-lg bg-restaurant-gold/10 p-4">
          <h3 className="mb-2 font-bold text-restaurant-gold">
            {t('reservation.preOrder.summary')}
          </h3>
          <div className="space-y-2">
            {selectedItems.map((item) => (
              <div key={item.id} className="flex justify-between text-restaurant-light">
                <span>
                  {item.quantity}x {t(`dishes.${item.translationKey}.name`)}
                </span>
                <span>
                  {t('currency.position') === 'before' ? t('currency.symbol') : ''}
                  {(Number(t(`prices.${item.translationKey}`)) * item.quantity).toFixed(2)}
                  {t('currency.position') === 'after' ? t('currency.symbol') : ''}
                </span>
              </div>
            ))}
            <div className="border-t border-restaurant-gold/20 pt-2 text-lg font-bold text-restaurant-gold">
              <div className="flex justify-between">
                <span>{t('reservation.preOrder.total')}</span>
                <span>
                  {t('currency.position') === 'before' ? t('currency.symbol') : ''}
                  {getTotalPrice().toFixed(2)}
                  {t('currency.position') === 'after' ? t('currency.symbol') : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={onSkip}
          className="px-6 py-2 text-restaurant-light hover:text-restaurant-gold"
        >
          {t('reservation.orderLater')}
        </button>
        <button
          onClick={() => onSubmit(selectedItems)}
          className="rounded-lg bg-restaurant-gold px-6 py-2 text-restaurant-dark"
          disabled={selectedItems.length === 0}
        >
          {t('reservation.confirmPreOrder')}
        </button>
      </div>
    </div>
  );
}; 