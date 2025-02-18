
import { SpecialOfTheDay } from "@/components/SpecialOfTheDay";
import { MenuCategory } from "@/components/MenuCategory";

const menuData = {
  starters: [
    {
      id: 1,
      name: "Houmous",
      description: "Purée de pois chiches à l'huile d'olive et tahini",
      price: "6€",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Taboulé Libanais",
      description: "Persil, menthe, boulgour fin, tomates, oignons",
      price: "7€",
      imageUrl: "/placeholder.svg",
    },
  ],
  mains: [
    {
      id: 3,
      name: "Couscous Royal",
      description: "Semoule, légumes, agneau, poulet, merguez",
      price: "22€",
      imageUrl: "/placeholder.svg",
      isSpecial: true,
    },
    {
      id: 4,
      name: "Tajine de Poulet",
      description: "Poulet aux olives et citrons confits",
      price: "18€",
      imageUrl: "/placeholder.svg",
    },
  ],
  desserts: [
    {
      id: 5,
      name: "Baklava",
      description: "Pâtisserie aux noix et au miel",
      price: "5€",
      imageUrl: "/placeholder.svg",
    },
    {
      id: 6,
      name: "Thé à la Menthe",
      description: "Thé vert, menthe fraîche, sucre",
      price: "3€",
      imageUrl: "/placeholder.svg",
    },
  ],
};

const Index = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-restaurant-brown">
            Restaurant Oriental
          </h1>
          <p className="text-lg text-gray-600">
            Découvrez nos spécialités orientales
          </p>
        </header>

        <SpecialOfTheDay
          title="Méchoui d'Agneau"
          description="Agneau entier cuit lentement aux herbes et épices orientales, servi avec ses légumes de saison et son couscous parfumé."
          price="28€"
          imageUrl="/placeholder.svg"
        />

        <MenuCategory title="Entrées" dishes={menuData.starters} />
        <MenuCategory title="Plats Principaux" dishes={menuData.mains} />
        <MenuCategory title="Desserts" dishes={menuData.desserts} />
      </div>
    </div>
  );
};

export default Index;
