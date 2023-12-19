const nodeMailer = require("nodemailer");
const dotenv = require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "gmail",
  port: 465,
  secure: true,
  auth: {
    userEmail: process.env.USEREMAIL,
    userPassword: process.env.USERPASSWORD,
  },
});

const mailOptions = {
  from: process.env.USEREMAIL,
  to: "destinataire@example.com",
  subject: "Ajout/",
  text: "Ceci est un test d'envoi d'e-mail avec Node.js et nodemailer.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Erreur lors de l'envoi de l'e-mail:", error);
  } else {
    console.log(
      "E-mail envoyé avec succès. Réponse du serveur:",
      info.response
    );
  }
});
