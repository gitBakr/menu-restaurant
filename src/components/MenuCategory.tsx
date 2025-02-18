
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
        className="mb-6"
      >
        <span className="text-xs font-medium uppercase tracking-wider text-restaurant-sage">
          Nos plats
        </span>
        <h2 className="text-2xl font-bold text-restaurant-brown">{title}</h2>
      </motion.div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dishes.map((dish) => (
          <DishCard key={dish.id} {...dish} />
        ))}
      </div>
    </section>
  );
};
