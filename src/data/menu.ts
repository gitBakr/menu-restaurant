export const menuData = {
  starters: [
    {
      id: 1,
      translationKey: "mechouia",
      imageUrl: "/dishes/s-mechouia.jpg",
    },
    {
      id: 2,
      translationKey: "brik",
      imageUrl: "/dishes/brick.jpg",
    },
  ],
  mains: [
    {
      id: 3,
      translationKey: "couscous",
      imageUrl: "/dishes/poissons-couscous.jpg",
      isSpecial: true,
    },
    {
      id: 4,
      translationKey: "ojja",
      imageUrl: "/dishes/ojja.jpg",
    },
    {
      id: 5,
      translationKey: "mechoui",
      imageUrl: "/dishes/agneau.jpg",
    }
  ],
  desserts: [
    {
      id: 6,
      translationKey: "zriga",
      imageUrl: "/dishes/dessert1.jpg",
    },
    {
      id: 7,
      translationKey: "kaak",
      imageUrl: "/dishes/dessert2.jpg",
    },
  ],
};

export type MenuItem = {
  id: number;
  translationKey: string;
  imageUrl: string;
  isSpecial?: boolean;
};

export type MenuSection = {
  [key: string]: MenuItem[];
}; 