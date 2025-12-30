type RequestMidtrans = {
  grossAmount: number;
  email: string;
  idTransaction: string;
};

export class MidtransService {
  // payment
  static async payment(
    req: RequestMidtrans
  ): Promise<{ token: string; url: string }> {
    // get midtrans auth string
    const midtransAuth = process.env.MIDTRANS_AUTH as string;

    // get midtrans url
    const MidtransUrl = process.env.MIDTRANS_URL as string;

    // payload for midtrans
    const payload = {
      transaction_details: {
        order_id: `BOOKING-${req.idTransaction}`,
        gross_amount: req.grossAmount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: req.email,
      },
    };

    //   fetch
    const midtransResponse = await fetch(MidtransUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${midtransAuth}`,
      },
      body: JSON.stringify(payload),
    });

    // convert json
    const data = await midtransResponse.json();

    return {
      token: data.token,
      url: data.redirect_url,
    };
  }
}
