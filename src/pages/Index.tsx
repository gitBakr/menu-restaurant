import { SpecialOfTheDay } from "@/components/SpecialOfTheDay";
import { MenuCategory } from "@/components/MenuCategory";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ContactInfo } from "@/components/ContactInfo";

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

  return (
    <div className="min-h-screen bg-restaurant-dark px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <button
            onClick={() => i18n.changeLanguage('fr')}
            className={`px-3 py-1 rounded ${
              i18n.language === 'fr'
                ? 'bg-restaurant-gold text-restaurant-dark'
                : 'bg-restaurant-darker text-restaurant-gold border border-restaurant-gold'
            }`}
          >
            FR
          </button>
          <button
            onClick={() => i18n.changeLanguage('ar')}
            className={`px-3 py-1 rounded ${
              i18n.language === 'ar'
                ? 'bg-restaurant-gold text-restaurant-dark'
                : 'bg-restaurant-darker text-restaurant-gold border border-restaurant-gold'
            }`}
          >
            عربي
          </button>
          <button
            onClick={() => i18n.changeLanguage('en')}
            className={`px-3 py-1 rounded ${
              i18n.language === 'en'
                ? 'bg-restaurant-gold text-restaurant-dark'
                : 'bg-restaurant-darker text-restaurant-gold border border-restaurant-gold'
            }`}
          >
            EN
          </button>
        </div>

        <header className="mb-16 text-center">
          <div className="mx-auto mb-6 w-32 border-b-2 border-restaurant-gold" />
          <h1 className="mb-4 font-serif text-5xl font-bold text-restaurant-gold">
            {t('restaurant.name')}
          </h1>
          <div className="relative">
            <div className="mx-auto mb-6 w-48 border-b-2 border-restaurant-gold" />
            <p className="text-lg text-restaurant-light">
              {t('restaurant.subtitle')}
            </p>
            <div className="mx-auto mt-6 w-32 border-b-2 border-restaurant-gold" />
          </div>
        </header>

        <SpecialOfTheDay
          translationKey="mechoui"
          imageUrl="/dishes/agneau.jpg"
        />

        <MenuCategory 
          title={t('categories.starters')} 
          dishes={menuData.starters}
        />
        <MenuCategory 
          title={t('categories.mains')} 
          dishes={menuData.mains}
        />
        <MenuCategory 
          title={t('categories.desserts')} 
          dishes={menuData.desserts}
        />

        <ContactInfo />
      </div>
    </div>
  );
};

export default Index;
