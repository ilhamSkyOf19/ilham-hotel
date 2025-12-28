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
