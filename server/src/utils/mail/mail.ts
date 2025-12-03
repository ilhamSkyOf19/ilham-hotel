import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

// create transport
const transport = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_HOST || "",
  port: process.env.EMAIL_SMTP_PORT ? Number(process.env.EMAIL_SMTP_PORT) : 465,
  secure: process.env.EMAIL_SMTP_SECURE === "true",
  auth: {
    user: process.env.EMAIL_SMTP_USER || "",
    pass: process.env.EMAIL_SMTP_PASS || "",
  },
  requireTLS: true,
});

// send email
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    // send email
    await transport.sendMail({
      from: process.env.EMAIL_SMTP_USER as string,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.log(error);
  }
};

// render email
export const renderEmail = async (
  template: string,
  data: any
): Promise<string> => {
  const content = await ejs.renderFile(
    path.join(__dirname, `./templates/${template}`),
    data
  );

  return content as string;
};
