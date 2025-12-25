export const formatTime = (ms: number = 0): string => {
  const sec = Math.floor(ms / 1000);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? "0" + s : s}`;
};

// format currency
export const formatCurrency = (value: number): string => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
};

// get pagination
export const getPaginationWindow = (
  activePage: number,
  total: number,
  limit: number
): number[] => {
  let start: number;

  if (activePage % limit === 0) {
    // jika activePage kelipatan limit → window geser
    start = activePage;
  } else {
    // jika belum mencapai kelipatan limit → tetap window awal
    start = activePage - (activePage % limit) + 1;
  }

  const end = Math.min(start + limit - 1, total);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
