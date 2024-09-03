import Invitation from '../model/inviteModel.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';



dotenv.config();


// Configuration du transporteur Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // service de messagerie
    auth: {
        user: process.env.EMAIL_USER, // votre adresse email
        pass: process.env.EMAIL_PASS // mot de passe d'application fourni par gmail
    }
});



// Récuperation de tous les invités
export const getInvitations = async (req, res) => {
    try {
        const invitations = await Invitation.find(); // Utilisation de Mongoose pour récupérer toutes les invitations
        res.status(200).json(invitations); // Renvoie les invitations au client
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la récupération des invitations' });
    }
};


// Envoie d'une invitation
export const submitInvite = async (req, res) => {
    const { nom, prenom, quartier, telephone, email } = req.body;

    if (!nom || !prenom || !quartier || !telephone || !email) {
        return res.status(400).send('Tous les champs sont requis.');
    }

    try {
        const newInvitation = new Invitation({ nom, prenom, quartier, telephone, email });
        await newInvitation.save();

        // Envoie de l'email
        const mailOptions = {
            from: 'votre_email@gmail.com', // votre adresse email
            to: email,
            subject: 'Invitation',
            text: `Bonjour Mr/Mme ${prenom},\n\nVous avez été invité à participer a mon anniversaire. Acceptez-vous l'invitation ? Répondez par "oui" ou "non" en suivant le lien ci-apres !\n\n[Accepter](http://votre-domaine.com/reponse?inviteId=${newInvitation._id}&reponse=oui) | [Refuser](http://votre-domaine.com/reponse?inviteId=${newInvitation._id}&reponse=non)\n\nMerci!`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'email:', error);
                return res.status(500).send('Erreur lors de l\'envoi de l\'email.');
            }
            console.log('Email envoyé:', info.response);
            res.send('Données enregistrées avec succès et email envoyé !');
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de l\'enregistrement des données.');
    }
};


// Supprimer une invitation
export const deleteInvitation = async (req, res) => {
    const { id } = req.params; 

    if (!id) {
        return res.status(400).send('L\'ID de l\'invitation est requis.');
    }

    try {
        const result = await Invitation.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send('Aucune invitation trouvée avec cet ID.');
        }
        res.send('Invitation supprimée avec succès !');
    } catch (err) {
        console.error('Erreur lors de la suppression de l\'invitation:', err);
        res.status(500).send('Erreur lors de la suppression de l\'invitation.');
    }
};

// Mettre à jour une invitation par ID
export const updateInvitation = async (req, res) => {
    const { id } = req.params; 
    const { nom, prenom, quartier, telephone, email } = req.body;

    if (!id) {
        return res.status(400).send('L\'ID de l\'invitation est requis.');
    }

    if (!nom || !prenom || !quartier || !telephone || !email) {
        return res.status(400).send('Tous les champs sont requis.');
    }

    try {
        const updatedInvitation = await Invitation.findByIdAndUpdate(
            id,
            { nom, prenom, quartier, telephone, email },
            { new: true, runValidators: true }
        );

        if (!updatedInvitation) {
            return res.status(404).send('Aucune invitation trouvée avec cet ID pour mise à jour.');
        }

        res.send('Invitation mise à jour avec succès !');
    } catch (err) {
        console.error('Erreur lors de la mise à jour de l\'invitation:', err);
        res.status(500).send('Erreur lors de la mise à jour de l\'invitation.');
    }
};

