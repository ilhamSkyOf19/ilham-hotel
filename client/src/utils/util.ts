export const formatTime = (ms: number = 0): string => {
  const sec = Math.floor(ms / 1000);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? "0" + s : s}`;
};

// format date
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(date);
};

// get local today date
export const getTodayLocal = (date: Date = new Date()): string => {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().split("T")[0];
};

// add month for max
export const addMonths = (date: Date, months: number): Date => {
  const d = new Date(date);

  d.setMonth(d.getMonth() + months);

  return d;
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

// generate url img
export const generateUrlImg = (data: { img: string; path: string }): string => {
  return `${import.meta.env.VITE_BASE_LOCAL_URL_IMG_SERVER}/${data.path}/${
    data.img
  }`;
};

// get start
export const getStars = (
  star: number
): {
  bintangPenuh: number;
  bintangSetengah: boolean;
  bintangKosong: number;
} => {
  // max star
  const maxStar: number = 5;

  // get bintang penuh
  const bintangPenuh: number = Math.floor(star > 5 ? 5 : star);
  // get setengah bintang
  const bintangSetengah: boolean = (star > 5 ? 5 : star) % 1 >= 0.5; //
  // get bintang kosong
  const bintangKosong: number =
    maxStar - bintangPenuh - (bintangSetengah ? 1 : 0); // 5 - 3 - (1) = 1;

  return {
    bintangPenuh,
    bintangSetengah,
    bintangKosong,
  };
};

// get total days between two dates
export const getTotalDays = (checkIn: Date, checkOut: Date): number => {
  // start
  const start = new Date(
    checkIn.getFullYear(),
    checkIn.getMonth(),
    checkIn.getDate()
  );
  const end = new Date(
    checkOut.getFullYear(),
    checkOut.getMonth(),
    checkOut.getDate()
  );

  // check
  if (end <= start) return 0;

  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  // return
  return Math.ceil((end.getTime() - start.getTime()) / MS_PER_DAY);
};

// add Days
export const addDays = (date: Date, day: number): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + day);
};

// min Days
export const minDays = (date: Date, day: number): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - day);
};
