import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { fr, enUS, arSA } from 'date-fns/locale';
import { ReservationType } from '../../types/reservation';
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { isSunday, isMonday } from 'date-fns';

// Enregistrer les locales
registerLocale('fr', fr);
registerLocale('en', enUS);
registerLocale('ar', arSA);

interface BasicReservationProps {
  onSubmit: (values: ReservationType, withPreOrder: boolean) => void;
  formikRef?: React.RefObject<any>;
}

export const BasicReservation = ({ onSubmit, formikRef }: BasicReservationProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [showPreOrderOptions, setShowPreOrderOptions] = useState(false);
  const [formValues, setFormValues] = useState<ReservationType | null>(null);

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

  const handleSubmit = (values: ReservationType) => {
    setFormValues(values);
    setShowPreOrderOptions(true);
  };

  return (
    <div>
      <Formik
        innerRef={formikRef}
        initialValues={{
          date: new Date(),
          time: new Date(),
          guests: 2,
          name: '',
          email: '',
          phone: '',
        }}
        validationSchema={Yup.object({
          date: Yup.date().required(t('reservation.errors.dateRequired')),
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
        })}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-restaurant-gold mb-2">
                  {t('reservation.date')}
                </label>
                <ReactDatePicker
                  selected={values.date}
                  onChange={(date: Date) => setFieldValue('date', date)}
                  minDate={new Date()}
                  locale={i18n.language as 'fr' | 'en' | 'ar'}
                  dateFormat="P"
                  className="w-full p-2 rounded bg-restaurant-dark text-restaurant-light border border-restaurant-gold/30 focus:border-restaurant-gold"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="mt-1 text-red-500 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-restaurant-gold mb-2">
                  {t('reservation.time')}
                </label>
                <ReactDatePicker
                  selected={values.time}
                  onChange={(time) => setFieldValue('time', time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption={t('reservation.time')}
                  dateFormat="HH:mm"
                  filterTime={filterTimes}
                  className="w-full rounded-lg bg-restaurant-dark p-3 text-restaurant-light border border-restaurant-gold/30 focus:border-restaurant-gold"
                  popperPlacement="bottom"
                  popperProps={{
                    strategy: "fixed"
                  }}
                  portalId="root"
                />
                <ErrorMessage
                  name="time"
                  component="div"
                  className="mt-1 text-red-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-restaurant-gold mb-2">
                {t('reservation.guests')}
              </label>
              <Field
                type="number"
                name="guests"
                min="1"
                max="8"
                className="w-full p-2 rounded bg-restaurant-dark text-restaurant-light border border-restaurant-gold/30 focus:border-restaurant-gold"
              />
              <ErrorMessage
                name="guests"
                component="div"
                className="mt-1 text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-restaurant-gold mb-2">
                {t('reservation.name')}
              </label>
              <Field
                type="text"
                name="name"
                className="w-full p-2 rounded bg-restaurant-dark text-restaurant-light border border-restaurant-gold/30 focus:border-restaurant-gold"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="mt-1 text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-restaurant-gold mb-2">
                {t('reservation.email')}
              </label>
              <Field
                type="email"
                name="email"
                className="w-full p-2 rounded bg-restaurant-dark text-restaurant-light border border-restaurant-gold/30 focus:border-restaurant-gold"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="mt-1 text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-restaurant-gold mb-2">
                {t('reservation.phone')}
              </label>
              <Field
                type="tel"
                name="phone"
                className="w-full p-2 rounded bg-restaurant-dark text-restaurant-light border border-restaurant-gold/30 focus:border-restaurant-gold"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="mt-1 text-red-500 text-sm"
              />
            </div>

            {!showPreOrderOptions && (
              <button
                type="submit"
                className="w-full py-3 px-6 bg-restaurant-gold text-restaurant-dark rounded-lg font-semibold hover:bg-restaurant-gold/80 transition-colors"
              >
                {t('reservation.submit')}
              </button>
            )}
          </Form>
        )}
      </Formik>

      {showPreOrderOptions && formValues && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-lg bg-restaurant-gold/10 p-6"
        >
          <h3 className="mb-4 text-xl font-bold text-restaurant-gold">
            {t('reservation.preOrder.info')}
          </h3>
          <p className="mb-6 text-restaurant-light">
            {t('reservation.preOrder.recommendation')}
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => onSubmit(formValues, true)}
              className="w-full rounded-lg bg-restaurant-gold py-3 text-restaurant-dark"
            >
              {t('reservation.withPreOrder')}
            </button>

            <button
              onClick={() => onSubmit(formValues, false)}
              className="w-full rounded-lg border border-restaurant-gold bg-transparent py-3 text-restaurant-gold"
            >
              {t('reservation.basicOnly')}
            </button>

            <p className="mt-2 text-center text-sm text-restaurant-light">
              {t('reservation.preOrder.optional')}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}; 