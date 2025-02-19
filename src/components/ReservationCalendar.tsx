import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { setHours, setMinutes, isSunday, isMonday, format } from 'date-fns';
import { fr, enUS, arSA } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import { TestModeButton } from "./TestModeButton";
import { ConfirmationModal } from "./ConfirmationModal";
import { motion, AnimatePresence } from 'framer-motion';
import { BasicReservation } from './reservation/BasicReservation';
import { PreOrderForm } from './reservation/PreOrderForm';
import { ReservationType } from '../types/reservation';

// Enregistrez les locales
registerLocale('fr', fr);
registerLocale('en', enUS);
registerLocale('ar', arSA);

interface ReservationForm {
  date: Date;
  time: Date;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

export const ReservationCalendar = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [step, setStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reservationData, setReservationData] = useState<ReservationType | null>(null);
  const [reservationId, setReservationId] = useState("");
  const [withPreOrder, setWithPreOrder] = useState(false);

  const initialValues: ReservationForm = {
    date: new Date(),
    time: setHours(setMinutes(new Date(), 0), 12),
    guests: 2,
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  };

  const validationSchema = Yup.object({
    date: Yup.date()
      .required(t('reservation.errors.dateRequired'))
      .min(new Date(), t('reservation.errors.futureDateRequired')),
    time: Yup.date().required(t('reservation.errors.timeRequired')),
    guests: Yup.number()
      .required(t('reservation.errors.guestsRequired'))
      .min(1, t('reservation.errors.minGuests'))
      .max(8, t('reservation.errors.maxGuests')),
    name: Yup.string().required(t('reservation.errors.nameRequired')),
    email: Yup.string()
      .email(t('reservation.errors.invalidEmail'))
      .required(t('reservation.errors.emailRequired')),
    phone: Yup.string().required(t('reservation.errors.phoneRequired')),
  });

  const filterTimes = (time: Date) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const selectedDay = new Date(time);

    // Fermé le lundi
    if (isMonday(selectedDay)) {
      return false;
    }

    // Dimanche : 12h00-15h00 uniquement
    if (isSunday(selectedDay)) {
      return (hours >= 12 && hours < 15);
    }

    // Mardi à Samedi
    // Déjeuner : 12h00-14h30
    // Dîner : 19h00-22h30
    return (
      // Service du déjeuner
      (hours === 12) || // 12h00-12h59
      (hours === 13) || // 13h00-13h59
      (hours === 14 && minutes <= 30) || // 14h00-14h30
      
      // Service du dîner
      (hours >= 19 && hours < 22) || // 19h00-21h59
      (hours === 22 && minutes <= 30) // 22h00-22h30
    );
  };

  const handleBasicSubmit = (values: ReservationType, wantsPreOrder: boolean) => {
    setReservationData(values);
    if (wantsPreOrder) {
      setWithPreOrder(true);
      setStep(2); // Aller à l'étape de pré-commande
    } else {
      // Aller directement à la confirmation
      finalizeReservation(values, false);
    }
  };

  const handlePreOrderSubmit = (preOrderItems: any) => {
    if (reservationData) {
      const updatedReservation = {
        ...reservationData,
        preOrder: preOrderItems
      };
      finalizeReservation(updatedReservation, true);
    }
  };

  const handleSkipPreOrder = () => {
    if (reservationData) {
      finalizeReservation(reservationData, false);
    }
  };

  const finalizeReservation = (data: ReservationType, hasPreOrder: boolean) => {
    // Simuler un appel API
    const id = Math.random().toString(36).substr(2, 9);
    setReservationId(id);
    setReservationData(data);
    setShowConfirmation(true);

    // Sauvegarder la réservation dans localStorage
    const bookingData = {
      id,
      date: data.date,
      time: format(data.time, 'HH:mm'),
      guests: data.guests,
      name: data.name,
      email: data.email,
      phone: data.phone,
      preOrder: data.preOrder || []
    };
    
    localStorage.setItem('activeBooking', JSON.stringify(bookingData));
    localStorage.setItem('hasReserved', 'true');
  };

  const formikRef = useRef<any>(null);

  const fillTestData = (values: any) => {
    if (formikRef.current) {
      formikRef.current.setValues(values);
    }
  };

  // Fonction pour obtenir la locale actuelle
  const getLocale = () => {
    switch (i18n.language) {
      case 'fr':
        return fr;
      case 'ar':
        return arSA;
      default:
        return enUS;
    }
  };

  // Fonction pour formater la date selon la locale
  const formatDate = (date: Date) => {
    return format(date, 'P', { locale: getLocale() });
  };

  // Fonction pour formater l'heure
  const formatTime = (date: Date) => {
    return format(date, 'HH:mm', { locale: getLocale() });
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setStep(1); // Réinitialiser l'étape à 1
    // Scroll vers le haut de la page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="mx-auto max-w-2xl bg-restaurant-darker p-8 rounded-xl shadow-xl">
      <TestModeButton onFill={fillTestData} />
      
      <h2 className={`text-3xl font-bold text-restaurant-gold mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        {t('reservation.title')}
      </h2>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <BasicReservation 
              onSubmit={handleBasicSubmit} 
              formikRef={formikRef}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <PreOrderForm
              onSubmit={handlePreOrderSubmit}
              onSkip={handleSkipPreOrder}
              onBack={() => setStep(1)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message de confirmation */}
      {reservationData && (
        <div className="mt-4 p-4 bg-restaurant-dark/50 rounded-lg">
          <p className="text-restaurant-light">
            {t('reservation.confirmation', {
              date: format(reservationData.date, 'P', { locale: getLocale() }),
              time: format(reservationData.time, 'HH:mm', { locale: getLocale() }),
              guests: reservationData.guests,
              interpolation: { escapeValue: false }
            })}
          </p>
        </div>
      )}

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        reservation={reservationData!}
        reservationId={reservationId}
      />
    </div>
  );
}; 