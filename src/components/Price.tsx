import { useTranslation } from "react-i18next";

interface PriceProps {
  translationKey: string;
  className?: string;
}

export const Price = ({ translationKey, className = "" }: PriceProps) => {
  const { t, i18n } = useTranslation();
  const price = t(`prices.${translationKey}`);
  const symbol = t('currency.symbol');
  const position = t('currency.position');

  return (
    <span className={className}>
      {position === 'before' ? symbol : ''}
      {price}
      {position === 'after' ? ` ${symbol}` : ''}
    </span>
  );
}; 