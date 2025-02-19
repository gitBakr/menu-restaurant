import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "@/types/menu";
import { menuData } from "@/data/menuData";
import { SpecialOfTheDay } from "@/components/SpecialOfTheDay";
import { MenuSection } from "@/components/menu/MenuSection";
import { LanguageSelector } from "@/components/LanguageSelector";
import { RestaurantHeader } from "@/components/RestaurantHeader";
import { ContactInfo } from "@/components/ContactInfo";
import { Footer } from "@/components/Footer";
import { ReservationCalendar } from "@/components/ReservationCalendar";
import { UserGuide } from '@/components/UserGuide';
import { ViewBookingButton } from '@/components/ViewBookingButton';

const Index = () => {
  const [expandedDishes, setExpandedDishes] = useState<number[]>([]);
  const { t, i18n } = useTranslation();
  const [showReservation, setShowReservation] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('languageChanged', 'true');
  };

  const toggleDishDetails = (dishId: number) => {
    setExpandedDishes(prev => 
      prev.includes(dishId) 
        ? prev.filter(id => id !== dishId) 
        : [...prev, dishId]
    );
  };

  const scrollToReservation = () => {
    setShowReservation(true);
    document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-restaurant-dark px-4 py-8">
      <ViewBookingButton />

      <div className="mx-auto max-w-7xl">
        <LanguageSelector 
          currentLanguage={i18n.language as Language} 
          onLanguageChange={handleLanguageChange} 
        />

        <RestaurantHeader t={t} />

        <SpecialOfTheDay
          translationKey="mechoui"
          imageUrl="/dishes/agneau.jpg"
        />

        <div className="rounded-xl bg-restaurant-darker p-8 shadow-xl">
          <MenuSection
            title={t('categories.starters')}
            dishes={menuData.starters}
            expandedDishes={expandedDishes}
            onToggleDetails={toggleDishDetails}
            t={t}
          />

          <div className="mt-12">
            <MenuSection
              title={t('categories.mains')}
              dishes={menuData.mains}
              expandedDishes={expandedDishes}
              onToggleDetails={toggleDishDetails}
              t={t}
            />
          </div>

          <div className="mt-12">
            <MenuSection
              title={t('categories.desserts')}
              dishes={menuData.desserts}
              expandedDishes={expandedDishes}
              onToggleDetails={toggleDishDetails}
              t={t}
            />
          </div>
        </div>

        <div id="reservation">
          <ReservationCalendar />
        </div>

        <ContactInfo />
        <Footer />
        <UserGuide />
      </div>
    </div>
  );
};

export default Index;
