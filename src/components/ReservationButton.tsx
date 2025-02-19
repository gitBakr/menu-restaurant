import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaCalendarAlt } from "react-icons/fa";

interface ReservationButtonProps {
  className?: string;
  isFloating?: boolean;
  onClick?: () => void;
}

export const ReservationButton = ({ 
  className = "", 
  isFloating = false,
  onClick 
}: ReservationButtonProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const baseClasses = `
    flex items-center gap-2 px-6 py-3 
    bg-restaurant-gold text-restaurant-dark 
    rounded-lg font-semibold 
    hover:bg-restaurant-gold/80 transition-colors
    ${isRTL ? 'flex-row-reverse' : ''}
    ${className}
  `;

  const floatingClasses = `
    fixed bottom-4 right-4 z-50 
    shadow-lg md:hidden
    rounded-full px-4
  `;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${baseClasses} ${isFloating ? floatingClasses : ''}`}
      onClick={onClick}
    >
      <FaCalendarAlt className="h-5 w-5" />
      <span>{t('reservation.cta')}</span>
    </motion.button>
  );
}; 