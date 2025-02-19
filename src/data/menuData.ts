import { MenuSection, Translations } from '@/types/menu';

export const menuData: MenuSection = {
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

export const translations: Translations = {
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