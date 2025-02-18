
import { motion } from "framer-motion";

interface SpecialOfTheDayProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

export const SpecialOfTheDay = ({ title, description, price, imageUrl }: SpecialOfTheDayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-12 overflow-hidden rounded-xl bg-restaurant-cream"
    >
      <div className="relative flex flex-col md:flex-row">
        <div className="relative h-64 w-full md:h-96 md:w-1/2">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center p-8">
          <span className="mb-2 inline-block rounded-full bg-restaurant-terracotta px-3 py-1 text-sm font-medium text-white">
            Spécialité du jour
          </span>
          <h2 className="mb-4 text-3xl font-bold text-restaurant-brown">{title}</h2>
          <p className="mb-6 text-gray-600">{description}</p>
          <span className="text-2xl font-semibold text-restaurant-ochre">{price}</span>
        </div>
      </div>
    </motion.div>
  );
};
