import { MenuItem as MenuItemType } from '@/types/menu';
import { MenuItem } from './MenuItem';
import { TFunction } from 'i18next';

interface MenuSectionProps {
  title: string;
  dishes: MenuItemType[];
  expandedDishes: number[];
  onToggleDetails: (id: number) => void;
  t: TFunction;
}

export const MenuSection = ({ 
  title, 
  dishes, 
  expandedDishes, 
  onToggleDetails,
  t 
}: MenuSectionProps) => {
  return (
    <div className="mb-12 text-center">
      <h2 className="relative mb-8 inline-block font-serif text-3xl font-bold text-restaurant-gold">
        <span className="absolute -left-16 top-1/2 h-px w-12 bg-restaurant-gold/50"></span>
        {title}
        <span className="absolute -right-16 top-1/2 h-px w-12 bg-restaurant-gold/50"></span>
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {dishes.map((dish) => (
          <MenuItem
            key={dish.id}
            dish={dish}
            expanded={expandedDishes.includes(dish.id)}
            onToggle={onToggleDetails}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}; 