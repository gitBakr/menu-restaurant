
import { motion } from "framer-motion";
import { DishCard } from "./DishCard";

interface Dish {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
  isSpecial?: boolean;
}

interface MenuCategoryProps {
  title: string;
  dishes: Dish[];
}

export const MenuCategory = ({ title, dishes }: MenuCategoryProps) => {
  return (
    <section className="mb-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center"
      >
        <div className="mx-auto mb-4 w-24 border-b border-restaurant-gold" />
        <h2 className="text-3xl font-bold text-restaurant-gold">{title}</h2>
        <div className="mx-auto mt-4 w-24 border-b border-restaurant-gold" />
      </motion.div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {dishes.map((dish) => (
          <DishCard key={dish.id} {...dish} />
        ))}
      </div>
    </section>
  );
};
