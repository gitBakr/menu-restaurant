
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DishCardProps {
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
  isSpecial?: boolean;
}

export const DishCard = ({ name, description, price, imageUrl, isSpecial }: DishCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative overflow-hidden rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg",
        "border border-gray-100",
        isSpecial && "border-restaurant-terracotta"
      )}
    >
      {imageUrl && (
        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-restaurant-brown">{name}</h3>
          <span className="text-lg font-medium text-restaurant-ochre">{price}</span>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
        {isSpecial && (
          <span className="inline-block rounded-full bg-restaurant-terracotta px-3 py-1 text-xs font-medium text-white">
            Spécialité
          </span>
        )}
      </div>
    </motion.div>
  );
};
