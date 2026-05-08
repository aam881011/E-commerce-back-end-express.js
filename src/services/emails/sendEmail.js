import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplate.js";
import jwt from "jsonwebtoken";

export const sendEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    // host: "smtp.forwardemail.net",
    // port: 465,
    // secure: true,
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASS,
    },
  });

  let token = jwt.sign({ email }, "secret-key");
  try {
    const htmlContent = await emailTemplate(token); // Await the promise

    const info = await transporter.sendMail({
      from: `"test send email 👻" <${process.env.EMAIL_NAME}>`, // sender address
      // to: "mohamed.d.azhry@gmail.com",
      to: email,
      subject: "Hello ✔", // Subject line
      // text: "Hello world?", // plain text body
      // html: "<div style='color:red'>Hello world?</div>", // html body
      html: htmlContent, // html body
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error in sending email:", error);
  }
};

// sendEmail().catch(console.error);
