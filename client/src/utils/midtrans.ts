const snapSrc = "https://app.sandbox.midtrans.com/snap/snap.js";
// production:
// const snapSrc = "https://app.midtrans.com/snap/snap.js";

export const loadMidtransSnap = (): Promise<void> =>
  new Promise((resolve) => {
    if ((window as any).snap) return resolve();

    const script = document.createElement("script");
    script.src = snapSrc;
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    );
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
