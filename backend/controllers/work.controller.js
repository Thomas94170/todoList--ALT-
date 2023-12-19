const WorkModel = require("../models/work.model");
const UserModel = require("../models/user.model");
const mongoose = require("mongoose");
const nodeMailer = require("nodemailer");
const dotenv = require("dotenv").config();

/**
 * @swagger
 *
 *   getWorks:
 *     summary: Récupérer toute les tâches
 *     description: Utilisation de la méthode find()
 *     responses: tout les utilisateurs sont trouvés
 *
 *  getWorkById:
 *     summary: Récupérer toute les tâches selon leurs ID
 *     description: Utilisation de la méthode findOne(), l'_id étant un object de mongoose,
 *                  il faut utiliser la méthode new mongoose.Types.ObjectId
 *     responses: tout les utilisateurs sont trouvés
 *
 */

module.exports.getWorks = async (req, res) => {
  const works = await WorkModel.find();
  console.log(works);
  res.status(200).json(works);
};

module.exports.getWorkById = async (req, res) => {
  console.log("function getWorkById lancée");
  const workId = new mongoose.Types.ObjectId(req.params.id);
  console.log(workId);
  try {
    const work = await WorkModel.findOne({ _id: workId });
    console.log(work);
    if (!work) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    return res.status(200).json(work);
  } catch (error) {
    console.error("Erreur lors de la récupération de la tâche par ID", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports.setWorks = async (req, res) => {
  // console.log("setWorks");
  // const work = await WorkModel.create({
  //   name: req.body.name,
  //   description: req.body.description,
  //   category: req.body.category,
  //   status: req.body.status,
  //   priority: req.body.priority,
  //   due_time: req.body.due_time,
  //   created_on: req.body.created_on,
  //   updated: req.body.updated,
  //   created_by: user._id,
  //   assigned_for: assignedUsers.map((user) => user._id),
  // });
  // res.status(200).json(work);
  // console.log(res.status);

  try {
    const user = await UserModel.findOne({ nickname: req.body.created_by });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const assignedUsers = await UserModel.find({
      nickname: { $in: req.body.assigned_for },
    });

    const work = await WorkModel.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      priority: req.body.priority,
      due_time: req.body.due_time,
      created_on: req.body.created_on,
      updated: req.body.updated,
      created_by: user._id,
      assigned_for: assignedUsers.map((user) => user._id),
    });

    // Envoi d'e-mails aux utilisateurs assignés
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USEREMAIL,
        pass: process.env.USERPASSWORD,
      },
    });

    assignedUsers.forEach(async (assignedUser) => {
      const mailOptions = {
        from: process.env.USEREMAIL,
        to: assignedUser.email, // Utilisez le champ approprié pour l'adresse e-mail dans votre modèle d'utilisateur
        subject: `Nouvelle tâche assignée: ${work.name}`,
        text: `Une nouvelle tâche vous a été assignée : ${work.description}`,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(
          `E-mail envoyé à ${assignedUser.email}. Réponse du serveur:`,
          info.response
        );
      } catch (error) {
        console.error(
          `Erreur lors de l'envoi de l'e-mail à ${assignedUser.email}:`,
          error
        );
      }
    });

    res.status(200).json(work);
  } catch (error) {
    console.error("Erreur lors de la création du travail :", error);
    res.status(500).json({ message: "Erreur lors de la création du travail" });
  }
};

module.exports.editWork = async (req, res) => {
  const work = await WorkModel.findById(req.params.id);

  if (!work) {
    res.status(400).json({ message: "Cette tâche n'existe pas" });
  }

  const updateWork = await WorkModel.findByIdAndUpdate(work, req.body, {
    new: true,
  });
  res.status(200).json(updateWork);
};
