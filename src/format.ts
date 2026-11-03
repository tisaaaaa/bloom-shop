const euro = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });

export const formatPrice = (value: number) => euro.format(value);
