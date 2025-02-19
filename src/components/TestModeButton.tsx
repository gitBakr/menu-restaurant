import { useTranslation } from "react-i18next";
import { FaFlask } from "react-icons/fa";
import { addDays, setHours, setMinutes } from "date-fns";

interface TestModeButtonProps {
  onFill: (values: any) => void;
}

export const TestModeButton = ({ onFill }: TestModeButtonProps) => {
  const { t } = useTranslation();

  const getNextWorkingDay = () => {
    let date = new Date();
    let daysToAdd = 1;
    
    // Skip to next non-Monday
    while (addDays(date, daysToAdd).getDay() === 1) {
      daysToAdd++;
    }
    
    return addDays(date, daysToAdd);
  };

  const handleClick = () => {
    const testDate = getNextWorkingDay();
    const testTime = setHours(setMinutes(new Date(), 0), 12);

    onFill({
      name: "Test User",
      email: "test@example.com",
      phone: "+216 99 999 999",
      guests: 4,
      date: testDate,
      time: testTime,
      specialRequests: ""
    });
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 left-4 z-50 
        flex items-center gap-2 px-3 py-2 
        bg-gray-800 text-gray-300 
        rounded-lg text-sm opacity-50 
        hover:opacity-100 transition-opacity"
    >
      <FaFlask className="h-4 w-4" />
      <span>{t('dev.testMode')}</span>
    </button>
  );
}; 