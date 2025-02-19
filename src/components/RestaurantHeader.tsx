import { TFunction } from 'i18next';

interface RestaurantHeaderProps {
  t: TFunction;
}

export const RestaurantHeader = ({ t }: RestaurantHeaderProps) => {
  return (
    <header className="mb-16 text-center pt-16">
      <div className="mx-auto mb-6 w-32 border-b-2 border-restaurant-gold" />
      <div className="relative inline-block">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-px w-full bg-restaurant-gold/30"></div>
        </div>
        <h1 className="relative mb-4 bg-restaurant-dark px-8 font-serif text-5xl font-bold text-restaurant-gold">
          {t('restaurant.name')}
        </h1>
      </div>
      <div className="relative">
        <div className="mx-auto mb-6 w-48 border-b-2 border-restaurant-gold" />
        <p className="text-lg text-restaurant-light">
          {t('restaurant.subtitle')}
        </p>
        <div className="mx-auto mt-6 w-32 border-b-2 border-restaurant-gold" />
      </div>
    </header>
  );
}; 