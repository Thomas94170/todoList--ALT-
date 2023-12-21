const WorkModel = require("../models/work.model");
const UserModel = require("../models/user.model");
const mongoose = require("mongoose");
const nodeMailer = require("nodemailer");
const dotenv = require("dotenv").config();

/**
 * @swagger
 *
 /works:
 *   get:
 *     summary: Récupérer toutes les tâches
 *     description: Utilisation de la méthode find() pour récupérer toutes les tâches.
 *     responses:
 *       200:
 *         description: Toutes les tâches ont été récupérées avec succès.
 *         content:
 *           application/json:
 *             example:
 *               - name: Tâche 1
 *                 description: Description de la tâche 1
 *                 category: Catégorie 1
 *                 status: À faire
 *                 priority: Haute
 *                 due_time: '2023-12-31'
 *                 created_on: '2023-01-01'
 *                 updated: '2023-01-01'
 *                 created_by: utilisateur_id
 *                 assigned_for: [utilisateur_id_1, utilisateur_id_2]
 *               - name: Tâche 2
 *                 description: Description de la tâche 2
 *                 category: Catégorie 2
 *                 status: En cours
 *                 priority: Moyenne
 *                 due_time: '2023-12-31'
 *                 created_on: '2023-01-01'
 *                 updated: '2023-01-01'
 *                 created_by: utilisateur_id
 *                 assigned_for: [utilisateur_id_1, utilisateur_id_3]
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

    // j'envoi le mail aux users concerné
    console.log(process.env.USEREMAIL, process.env.USERPASSWORD);
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
        to: assignedUser.email,
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
