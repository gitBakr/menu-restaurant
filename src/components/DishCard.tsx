
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DishCardProps {
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
  isSpecial?: boolean;
}

export const DishCard = ({ name, description, price, isSpecial }: DishCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative overflow-hidden rounded-lg p-4",
        "border border-restaurant-gold/20 bg-restaurant-dark/50",
        isSpecial && "border-restaurant-gold"
      )}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-restaurant-gold">{name}</h3>
          <span className="text-lg font-medium text-restaurant-light">{price}</span>
        </div>
        <p className="text-sm text-restaurant-light/80">{description}</p>
        {isSpecial && (
          <span className="inline-block rounded-full border border-restaurant-gold px-3 py-1 text-xs font-medium text-restaurant-gold">
            Spécialité
          </span>
        )}
      </div>
    </motion.div>
  );
};
