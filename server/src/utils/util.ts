export const generateCode = (): number => {
  return Math.floor(1000 + Math.random() * 9000);
};

// format date  : 01/12/2025 10:00
export const formatDate = (date: Date): string => {
  return date
    .toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");
};

// format date : January 24, 2026
export const formatDateShort = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// format currency
export const formatCurrency = (
  value: number,
  full: boolean = false
): string => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: full ? 2 : 0,
  });
};

// format date
export const formatDateFull = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
