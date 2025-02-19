import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { fr, enUS, arSA } from "date-fns/locale";
import { FaCheck, FaCalendarAlt, FaWhatsapp, FaQrcode } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: {
    name: string;
    date: Date;
    time: Date;
    guests: number;
    email: string;
    phone: string;
    preOrder?: any[];
  };
  reservationId: string;
}

export const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  reservation,
  reservationId 
}: ConfirmationModalProps) => {
  const { t, i18n } = useTranslation();
  const [showPreOrder, setShowPreOrder] = useState(false);
  const isRTL = i18n.language === 'ar';

  const getLocale = () => {
    switch (i18n.language) {
      case 'fr': return fr;
      case 'ar': return arSA;
      default: return enUS;
    }
  };

  const formatDate = (date: Date) => {
    return format(date, 'PPP', { locale: getLocale() });
  };

  const formatTime = (date: Date) => {
    return format(date, 'HH:mm', { locale: getLocale() });
  };

  const addToCalendar = () => {
    const event = {
      title: t('confirmation.calendarEvent', { restaurant: t('restaurant.name') }),
      description: t('confirmation.calendarDescription', { 
        guests: reservation.guests,
        reservationId 
      }),
      location: `${t('contact.address.street')}, ${t('contact.address.city')}`,
      startTime: reservation.time,
      endTime: new Date(reservation.time.getTime() + 2 * 60 * 60 * 1000), // +2h
    };

    // Créer l'URL Google Calendar
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startTime.toISOString()}/${event.endTime.toISOString()}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

    window.open(googleUrl, '_blank');
  };

  const shareOnWhatsApp = () => {
    const message = t('confirmation.shareMessage', {
      restaurant: t('restaurant.name'),
      date: formatDate(reservation.date),
      time: formatTime(reservation.time),
      guests: reservation.guests
    });

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleClose = () => {
    onClose();
    // Scroll vers le haut de la page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl rounded-xl bg-restaurant-dark/95 p-8 shadow-xl border border-restaurant-gold/20 my-8"
            onClick={e => e.stopPropagation()}
          >
            <div className="max-h-[80vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-restaurant-gold/20 scrollbar-track-transparent hover:scrollbar-thumb-restaurant-gold/40">
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-full bg-restaurant-gold/20 p-3">
                  <FaCheck className="h-6 w-6 text-restaurant-gold" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-restaurant-gold">
                    {t('confirmation.title')}
                  </h2>
                  <p className="text-restaurant-light/90">
                    {t('confirmation.greeting', { name: reservation.name })}
                  </p>
                </div>
              </div>

              <div className="mb-8 rounded-lg bg-restaurant-darker/80 p-4">
                <p className="text-lg text-restaurant-light">
                  {t('confirmation.details', {
                    guests: reservation.guests,
                    date: formatDate(reservation.date),
                    time: formatTime(reservation.time)
                  })}
                </p>
              </div>

              <div className="mb-6 grid gap-4 md:grid-cols-2">
                <button
                  onClick={addToCalendar}
                  className="flex items-center justify-center gap-2 rounded-lg bg-restaurant-gold px-4 py-3 text-restaurant-dark hover:bg-restaurant-gold/90 transition-colors"
                >
                  <FaCalendarAlt />
                  {t('confirmation.addToCalendar')}
                </button>
                
                <button
                  onClick={shareOnWhatsApp}
                  className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-white hover:bg-green-700 transition-colors"
                >
                  <FaWhatsapp />
                  {t('confirmation.shareWhatsApp')}
                </button>
              </div>

              <div className="mb-6 rounded-lg bg-restaurant-darker/80 p-4">
                <h3 className="mb-2 font-semibold text-restaurant-gold">
                  {t('confirmation.practicalInfo')}
                </h3>
                <p className="text-restaurant-light/90">
                  {t('contact.address.street')}<br />
                  {t('contact.address.city')}<br />
                  {t('contact.phone.number')}
                </p>
              </div>

              {reservation.preOrder && reservation.preOrder.length > 0 && (
                <div className="mb-6">
                  <button
                    onClick={() => setShowPreOrder(!showPreOrder)}
                    className="flex items-center gap-2 text-restaurant-gold hover:text-restaurant-gold/80"
                  >
                    <span>{t('confirmation.viewPreOrder')}</span>
                    <motion.span
                      animate={{ rotate: showPreOrder ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ↓
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {showPreOrder && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 overflow-hidden"
                      >
                        <div className="rounded-lg bg-restaurant-darker p-4">
                          <h4 className="mb-3 font-semibold text-restaurant-gold">
                            {t('confirmation.preOrder.title')}
                          </h4>
                          <div className="space-y-2">
                            {reservation.preOrder.map((item: any) => (
                              <div key={item.id} className="flex justify-between text-restaurant-light">
                                <span>
                                  {item.quantity}x {t(`dishes.${item.translationKey}.name`)}
                                </span>
                                <span>
                                  {t('currency.position') === 'before' ? t('currency.symbol') : ''}
                                  {(Number(t(`prices.${item.translationKey}`)) * item.quantity).toFixed(2)}
                                  {t('currency.position') === 'after' ? t('currency.symbol') : ''}
                                </span>
                              </div>
                            ))}
                            <div className="border-t border-restaurant-gold/20 pt-2 text-lg font-bold text-restaurant-gold">
                              <div className="flex justify-between">
                                <span>{t('confirmation.preOrder.total')}</span>
                                <span>
                                  {t('currency.position') === 'before' ? t('currency.symbol') : ''}
                                  {reservation.preOrder.reduce((total: number, item: any) => {
                                    return total + (Number(t(`prices.${item.translationKey}`)) * item.quantity);
                                  }, 0).toFixed(2)}
                                  {t('currency.position') === 'after' ? t('currency.symbol') : ''}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div className="flex justify-between border-t border-restaurant-gold/20 pt-6">
                <div className="qr-code">
                  <QRCodeSVG
                    value={`${window.location.origin}/reservation/${reservationId}`}
                    size={100}
                    level="M"
                    includeMargin={true}
                    className="rounded-lg bg-white p-2"
                  />
                </div>
                
                <button
                  onClick={handleClose}
                  className="text-restaurant-light hover:text-restaurant-gold transition-colors"
                >
                  {t('confirmation.close')}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 