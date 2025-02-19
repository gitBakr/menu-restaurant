import { SpecialOfTheDay } from "@/components/SpecialOfTheDay";
import { MenuCategory } from "@/components/MenuCategory";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ContactInfo } from "@/components/ContactInfo";
import { Footer } from "@/components/Footer";
import { ReservationCalendar } from "@/components/ReservationCalendar";
import { ReservationButton } from "@/components/ReservationButton";
import { UserGuide } from '@/components/UserGuide';
import { ViewBookingButton } from '@/components/ViewBookingButton';

type Language = 'fr' | 'ar' | 'en';

const translations = {
  fr: {
    title: "Dar-Dhiafa",
    subtitle: "Découvrez nos spécialités orientales",
    categories: {
      starters: "Entrées",
      mains: "Plats Principaux",
      desserts: "Desserts"
    },
    viewMore: "Voir plus",
    viewLess: "Voir moins"
  },
  ar: {
    title: "دار الضيافة",
    subtitle: "اكتشف أطباقنا الشرقية",
    categories: {
      starters: "المقبلات",
      mains: "الأطباق الرئيسية",
      desserts: "الحلويات"
    },
    viewMore: "عرض المزيد",
    viewLess: "عرض أقل"
  },
  en: {
    title: "Dar-Dhiafa",
    subtitle: "Discover our Oriental Specialties",
    categories: {
      starters: "Starters",
      mains: "Main Courses",
      desserts: "Desserts"
    },
    viewMore: "View more",
    viewLess: "View less"
  }
};

const menuData = {
  starters: [
    {
      id: 1,
      name: "Slata Mechouia",
      description: "Salade de légumes grillés, poivrons, tomates, ail",
      price: "8€",
      imageUrl: "/dishes/s-mechouia.jpg",
      details: "Servie avec des œufs durs, thon et olives noires",
      translationKey: "mechouia"
    },
    {
      id: 2,
      name: "Brik à l'Œuf",
      description: "Croustillant de pâte malsouka, œuf, persil",
      price: "6€",
      imageUrl: "/dishes/brick.jpg",
      details: "Servi avec du citron et de la harissa maison",
      translationKey: "brik"
    },
  ],
  mains: [
    {
      id: 3,
      name: "Couscous au Poisson",
      description: "Couscous aux fruits de mer, poisson frais, légumes",
      price: "24€",
      imageUrl: "/dishes/poissons-couscous.jpg",
      details: "Préparé avec du poisson frais du jour et sauce tfaya",
      isSpecial: true,
      translationKey: "couscous"
    },
    {
      id: 4,
      name: "Ojja Merguez",
      description: "Œufs pochés, merguez, tomates, poivrons",
      price: "16€",
      imageUrl: "/dishes/ojja.jpg",
      details: "Servie dans un plat en terre cuite traditionnel",
      translationKey: "ojja"
    },
  ],
  desserts: [
    {
      id: 5,
      name: "Zriga",
      description: "Crème de sorgho au lait parfumée à l'eau de rose",
      price: "5€",
      imageUrl: "/dishes/dessert1.jpg",
      details: "Garnie de fruits secs et de miel",
      translationKey: "zriga"
    },
    {
      id: 6,
      name: "Kaak Warka",
      description: "Pâtisserie traditionnelle aux amandes",
      price: "4€",
      imageUrl: "/dishes/dessert2.jpg",
      details: "Préparée selon la recette traditionnelle tunisienne",
      translationKey: "kaak"
    },
  ],
};

const Index = () => {
  const { t, i18n } = useTranslation();
  const [showReservation, setShowReservation] = useState(false);

  const scrollToReservation = () => {
    setShowReservation(true);
    // Scroll to reservation section
    document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('languageChanged', 'true');
  };

  return (
    <div className="min-h-screen bg-restaurant-dark px-4 py-8">
      <ViewBookingButton />
      {/* Floating button for mobile */}
      <ReservationButton 
        isFloating 
        onClick={scrollToReservation}
      />

      <div className="mx-auto max-w-7xl">
        {/* Déplacer les boutons de langue dans un conteneur fixe en haut à droite */}
        <div className="fixed top-0 right-0 z-50 p-4 bg-restaurant-dark/95 backdrop-blur-sm rounded-bl-xl border-b border-l border-restaurant-gold/20">
          <div className="flex gap-2">
            <button
              onClick={() => handleLanguageChange('fr')}
              className={`px-3 py-1 rounded transition-colors ${
                i18n.language === 'fr'
                  ? 'bg-restaurant-gold text-restaurant-dark'
                  : 'bg-restaurant-darker text-restaurant-gold border border-restaurant-gold hover:bg-restaurant-darker/80'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => handleLanguageChange('ar')}
              className={`px-3 py-1 rounded transition-colors ${
                i18n.language === 'ar'
                  ? 'bg-restaurant-gold text-restaurant-dark'
                  : 'bg-restaurant-darker text-restaurant-gold border border-restaurant-gold hover:bg-restaurant-darker/80'
              }`}
            >
              عربي
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-3 py-1 rounded transition-colors ${
                i18n.language === 'en'
                  ? 'bg-restaurant-gold text-restaurant-dark'
                  : 'bg-restaurant-darker text-restaurant-gold border border-restaurant-gold hover:bg-restaurant-darker/80'
              }`}
            >
              EN
            </button>
          </div>
        </div>

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

        {/* Desktop button after header */}
        <div className="hidden md:flex justify-center mt-8">
          <ReservationButton onClick={scrollToReservation} />
        </div>

        <SpecialOfTheDay
          translationKey="mechoui"
          imageUrl="/dishes/agneau.jpg"
        />

        {/* Desktop button after special */}
        <div className="hidden md:flex justify-center mt-8">
          <ReservationButton onClick={scrollToReservation} />
        </div>

        <div className="rounded-xl bg-restaurant-darker p-8 shadow-xl">
          <div className="mb-12 text-center">
            <h2 className="relative mb-8 inline-block font-serif text-3xl font-bold text-restaurant-gold">
              <span className="absolute -left-16 top-1/2 h-px w-12 bg-restaurant-gold/50"></span>
              {t('categories.starters')}
              <span className="absolute -right-16 top-1/2 h-px w-12 bg-restaurant-gold/50"></span>
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {menuData.starters.map((dish) => (
                <div key={dish.id} 
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
                        <span className="text-restaurant-gold">
                          {t('currency.position') === 'before' ? t('currency.symbol') : ''}
                          {t(`prices.${dish.translationKey}`)}
                          {t('currency.position') === 'after' ? t('currency.symbol') : ''}
                        </span>
                      </div>
                      <p className="mt-2 text-restaurant-light">
                        {t(`dishes.${dish.translationKey}.description`)}
                      </p>
                      <p className="mt-1 text-sm italic text-restaurant-gold/70">
                        {t(`dishes.${dish.translationKey}.details`)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12 text-center mt-12">
            <h2 className="relative mb-8 inline-block font-serif text-3xl font-bold text-restaurant-gold">
              <span className="absolute -left-16 top-1/2 h-px w-12 bg-restaurant-gold/50"></span>
              {t('categories.mains')}
              <span className="absolute -right-16 top-1/2 h-px w-12 bg-restaurant-gold/50"></span>
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {menuData.mains.map((dish) => (
                <div key={dish.id} 
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
                        <span className="text-restaurant-gold">
                          {t('currency.position') === 'before' ? t('currency.symbol') : ''}
                          {t(`prices.${dish.translationKey}`)}
                          {t('currency.position') === 'after' ? t('currency.symbol') : ''}
                        </span>
                      </div>
                      <p className="mt-2 text-restaurant-light">
                        {t(`dishes.${dish.translationKey}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12 text-center mt-12">
            <h2 className="relative mb-8 inline-block font-serif text-3xl font-bold text-restaurant-gold">
              <span className="absolute -left-16 top-1/2 h-px w-12 bg-restaurant-gold/50"></span>
              {t('categories.desserts')}
              <span className="absolute -right-16 top-1/2 h-px w-12 bg-restaurant-gold/50"></span>
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {menuData.desserts.map((dish) => (
                <div key={dish.id} 
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
                        <span className="text-restaurant-gold">
                          {t('currency.position') === 'before' ? t('currency.symbol') : ''}
                          {t(`prices.${dish.translationKey}`)}
                          {t('currency.position') === 'after' ? t('currency.symbol') : ''}
                        </span>
                      </div>
                      <p className="mt-2 text-restaurant-light">
                        {t(`dishes.${dish.translationKey}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
