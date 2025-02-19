import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarCheck, FaBell } from 'react-icons/fa';
import { format } from 'date-fns';
import { fr, enUS, arSA } from 'date-fns/locale';
import { QRCodeSVG } from "qrcode.react";

interface Booking {
  id: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  preOrder?: any[];
}

export const ViewBookingButton = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [hasNotification, setHasNotification] = useState(false);
  const [timeInfo, setTimeInfo] = useState<string>('');

  useEffect(() => {
    const booking = localStorage.getItem('activeBooking');
    if (booking) {
      const parsedBooking = JSON.parse(booking);
      setActiveBooking(parsedBooking);
      
      // Vérifier si c'est aujourd'hui
      const bookingDate = new Date(parsedBooking.date);
      const today = new Date();
      
      if (bookingDate.toDateString() === today.toDateString()) {
        setTimeInfo(t('booking.today'));
        // Calculer les heures restantes
        const hours = Math.round((bookingDate.getTime() - today.getTime()) / (1000 * 60 * 60));
        if (hours > 0) {
          setTimeInfo(t('booking.timeRemaining', { hours }));
        }
      }
    }
  }, [t]);

  const getLocale = () => {
    switch (i18n.language) {
      case 'fr': return fr;
      case 'ar': return arSA;
      default: return enUS;
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPP', { locale: getLocale() });
  };

  const handleCancel = () => {
    if (window.confirm(t('booking.confirmCancel'))) {
      localStorage.removeItem('activeBooking');
      setActiveBooking(null);
      setIsOpen(false);
    }
  };

  const resendConfirmation = () => {
    // Simuler l'envoi d'email
    alert(t('booking.confirmationResent'));
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed top-4 left-4 z-40 flex items-center gap-2 px-4 py-2 rounded-lg 
          ${activeBooking 
            ? 'bg-restaurant-gold text-restaurant-dark' 
            : 'bg-restaurant-darker text-restaurant-light'} 
          transition-colors hover:bg-restaurant-gold/90`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaCalendarCheck className="h-5 w-5" />
        <span className="hidden md:inline">{t('booking.viewButton')}</span>
        {timeInfo && (
          <span className="text-sm font-medium">{timeInfo}</span>
        )}
        {hasNotification && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"
          />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl rounded-xl bg-restaurant-dark/95 p-8 shadow-xl border border-restaurant-gold/20 my-8"
              onClick={e => e.stopPropagation()}
            >
              {activeBooking ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-restaurant-gold">
                    {t('booking.activeBooking')}
                  </h2>

                  <div className="rounded-lg bg-restaurant-darker/80 p-6 space-y-4">
                    <p className="text-restaurant-light">
                      {t('booking.details', {
                        date: formatDate(activeBooking.date),
                        time: activeBooking.time,
                        guests: activeBooking.guests
                      })}
                    </p>
                    <p className="text-restaurant-gold">
                      {t('booking.reference')}: {activeBooking.id}
                    </p>

                    {activeBooking.preOrder && (
                      <div className="border-t border-restaurant-gold/20 pt-4 mt-4">
                        <h3 className="text-lg font-semibold text-restaurant-gold mb-2">
                          {t('booking.preOrder')}
                        </h3>
                        {/* Affichage de la pré-commande */}
                      </div>
                    )}

                    <div className="flex justify-center">
                      <QRCodeSVG
                        value={`${window.location.origin}/booking/${activeBooking.id}`}
                        size={150}
                        level="M"
                        includeMargin={true}
                        className="rounded-lg bg-white p-2"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={resendConfirmation}
                      className="text-restaurant-light hover:text-restaurant-gold transition-colors"
                    >
                      {t('booking.resendConfirmation')}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      {t('booking.cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaCalendarCheck className="mx-auto h-12 w-12 text-restaurant-gold/50 mb-4" />
                  <p className="text-restaurant-light">
                    {t('booking.noActiveBooking')}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 