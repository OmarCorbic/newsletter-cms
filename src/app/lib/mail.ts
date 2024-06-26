import nodemailer from "nodemailer";

export async function sendMail(html: string, recievers: string[] | string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const bcc = Array.isArray(recievers) ? recievers.join(", ") : recievers;
  const mailOptions = {
    from: "corbicomar@gmail.com",
    bcc: bcc,
    subject: "Newsletter",
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      throw new Error("There was an issue sending your message. ");
    } else {
      console.log("Email sent:", info.response);
      throw new Error("Your message has been successfully sent.");
    }
  });
}
