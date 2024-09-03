import Invitation from "../model/inviteModel/js";






export const SendReponse = async (req, res) => {
    const { inviteId, reponse } = req.query;

    if (!inviteId || !reponse) {
        return res.status(400).send('ID d\'invitation ou réponse manquante.');
    }

    try {
        // Trouver l'invitation par ID
        const invitation = await Invitation.findById(inviteId);
        if (!invitation) {
            return res.status(404).send('Invitation non trouvée.');
        }

        // Mettre à jour l'invitation avec la réponse
        invitation.reponse = reponse; 
        await invitation.save();

        res.send(`Merci pour votre réponse : ${reponse}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors du traitement de la réponse.');
    }
};
