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

  const result = await transporter.sendMail(mailOptions);
  console.log("Mail result: ", result);
}
