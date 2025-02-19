import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { BasicReservation } from './reservation/BasicReservation';
import { PreOrderForm } from './reservation/PreOrderForm';
import { ReservationType } from '../types/reservation';

interface ReservationFormProps {
  onSubmit: (values: ReservationType, withPreOrder: boolean) => void;
}

export const ReservationForm = ({ onSubmit }: ReservationFormProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState<ReservationType | null>(null);

  const handleBasicSubmit = (values: ReservationType, withPreOrder: boolean) => {
    if (withPreOrder) {
      setBasicInfo(values);
      setStep(2);
    } else {
      onSubmit(values, false);
    }
  };

  const handlePreOrderSubmit = (preOrderItems: any) => {
    if (basicInfo) {
      onSubmit({ ...basicInfo, preOrder: preOrderItems }, true);
    }
  };

  const handleSkipPreOrder = () => {
    if (basicInfo) {
      onSubmit(basicInfo, false);
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <BasicReservation onSubmit={handleBasicSubmit} />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="mb-6 rounded-lg bg-restaurant-gold/10 p-4">
              <p className="text-restaurant-light">
                {t('reservation.preOrder.info')}
              </p>
              <p className="mt-2 text-sm text-restaurant-gold">
                {t('reservation.preOrder.recommendation')}
              </p>
            </div>

            <PreOrderForm 
              onSubmit={handlePreOrderSubmit}
              onSkip={handleSkipPreOrder}
              onBack={() => setStep(1)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 