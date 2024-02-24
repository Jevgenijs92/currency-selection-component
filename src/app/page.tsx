'use client';
import ItemSelection
  from '@/app/components/ItemSelection/ItemSelection';
import { useState } from 'react';
import { Currency } from '@/app/models/models';

const currencies: Currency[] = [
  { id: 'USD', label: 'USD', numericCode: 840, symbol: '$' },
  { id: 'EUR', label: 'EUR', numericCode: 978, symbol: '€' },
  { id: 'GBP', label: 'GBP', numericCode: 826, symbol: '£' },
  { id: 'JPY', label: 'JPY', numericCode: 392, symbol: '¥' },
  { id: 'AUD', label: 'AUD', numericCode: 36, symbol: '$' },
  { id: 'CAD', label: 'CAD', numericCode: 124, symbol: '$' },
  { id: 'CHF', label: 'CHF', numericCode: 756, symbol: 'Fr' },
  { id: 'CNY', label: 'CNY', numericCode: 156, symbol: '¥' },
  { id: 'SEK', label: 'SEK', numericCode: 752, symbol: 'kr' },
  { id: 'NZD', label: 'NZD', numericCode: 554, symbol: '$' },
  { id: 'KRW', label: 'KRW', numericCode: 410, symbol: '₩' },
  { id: 'SGD', label: 'SGD', numericCode: 702, symbol: '$' },
];

const preSelectedCurrencyIds: string[] = ['EUR', 'CAD'];

export default function Home() {
  const [selectedCurrencies, setSelectedCurrencies] = useState(
    [] as Currency[]);

  const handleSelectionChange = (selected: Currency[]) => {
    setSelectedCurrencies(selected);
    console.log(selected);
  };

  return (
    <main className="page">
      <div className="wrapper">
        <ItemSelection items={currencies} selectionChange={handleSelectionChange}
                       preSelectedItemIds={preSelectedCurrencyIds}/>
      </div>
    </main>
  );
}
