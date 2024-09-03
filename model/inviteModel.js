import db from '../config/db.js';
import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    quartier: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true }
});

// Créer le modèle
const Invitation = mongoose.model('Invitation', invitationSchema);

// Fonction pour insérer des renseignements
export const insertRenseignements = async (data) => {
    try {
        const invitation = new Invitation(data);
        const result = await invitation.save();
        return result;
    } catch (err) {
        throw new Error(err);
    }
};



export default Invitation;