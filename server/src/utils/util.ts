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
