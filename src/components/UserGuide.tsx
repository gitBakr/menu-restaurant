import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLanguage, FaUtensils, FaCalendarAlt, FaClipboardList, FaCheckCircle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

export const UserGuide = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [neverShowAgain, setNeverShowAgain] = useState(false);

  // Observer pour détecter quand l'utilisateur arrive à la section réservation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !localStorage.getItem('hasReserved')) {
          setIsOpen(true);
        }
      });
    });

    const reservationSection = document.querySelector('#reservation');
    if (reservationSection) {
      observer.observe(reservationSection);
    }

    return () => observer.disconnect();
  }, []);

  // Vérifier les conditions pour afficher le guide
  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('hasSeenGuide');
    const neverShow = localStorage.getItem('neverShowGuide');
    const languageChanged = localStorage.getItem('languageChanged');

    if (neverShow === 'true') {
      return;
    }

    // Première visite ou changement de langue
    if ((!hasSeenGuide || languageChanged === 'true') && !neverShowAgain) {
      setIsOpen(true);
      if (languageChanged === 'true') {
        localStorage.removeItem('languageChanged');
      }
    }
  }, [neverShowAgain]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenGuide', 'true');
  };

  const handleNeverShow = () => {
    setNeverShowAgain(true);
    setIsOpen(false);
    localStorage.setItem('neverShowGuide', 'true');
  };

  const steps = [
    { icon: <FaLanguage />, key: 'language' },
    { icon: <FaUtensils />, key: 'menu' },
    { icon: <FaCalendarAlt />, key: 'datetime' },
    { icon: <FaClipboardList />, key: 'booking' },
    { icon: <FaCheckCircle />, key: 'confirmation' }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 rounded-full bg-restaurant-gold p-3 text-restaurant-dark shadow-lg hover:bg-restaurant-gold/80"
        aria-label={t('guide.help')}
      >
        <FaUtensils className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl rounded-xl bg-restaurant-dark/95 p-8 shadow-xl border border-restaurant-gold/20 my-8"
            >
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 text-restaurant-light hover:text-restaurant-gold"
              >
                <IoMdClose className="h-6 w-6" />
              </button>

              <h2 className="mb-8 text-2xl font-bold text-restaurant-gold">
                {t('guide.title')}
              </h2>

              <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-6 scrollbar-thin scrollbar-thumb-restaurant-gold/20 scrollbar-track-transparent hover:scrollbar-thumb-restaurant-gold/40">
                {steps.map((step, index) => (
                  <div key={step.key} className="flex items-start gap-4 p-4 rounded-lg bg-restaurant-darker/80 hover:bg-restaurant-darker transition-colors">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-restaurant-gold/20 text-restaurant-gold">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-restaurant-gold">
                        {t(`guide.steps.${step.key}.title`)}
                      </h3>
                      <p className="text-restaurant-light/90">
                        {t(`guide.steps.${step.key}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-restaurant-gold/20 pt-6">
                <label className="flex items-center gap-2 text-restaurant-light hover:text-restaurant-gold transition-colors">
                  <input
                    type="checkbox"
                    checked={neverShowAgain}
                    onChange={(e) => setNeverShowAgain(e.target.checked)}
                    className="rounded border-restaurant-gold/20 bg-restaurant-darker text-restaurant-gold focus:ring-restaurant-gold/50"
                  />
                  {t('guide.neverShow')}
                </label>

                <button
                  onClick={handleClose}
                  className="rounded-lg bg-restaurant-gold px-6 py-2 text-restaurant-dark hover:bg-restaurant-gold/90 transition-colors"
                >
                  {t('guide.gotIt')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 