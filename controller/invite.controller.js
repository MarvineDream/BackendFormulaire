import db from '../model/db.js';

// Récuperation de tous les invités
export const getInvitations = async (req, res) => {
    const sql = 'SELECT * FROM renseignements';

    try {
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des invitations:', err);
                return res.status(500).json({ message: 'Erreur lors de la récupération des invitations' });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Erreur inattendue:', error);
        res.status(500).json({ message: 'Erreur inattendue lors de la récupération des invitations' });
    }
};


// Envoie d'une invitation
 export const submitInvite = async (req, res) => {
    const { nom, prenom, quartier, telephone, email } = req.body;

    if (!nom || !prenom || !quartier || !telephone || !email) {
        return res.status(400).send('Tous les champs sont requis.');
    }

    const sql = 'INSERT INTO renseignements (nom, prenom, quartier, telephone, email) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nom, prenom, quartier, telephone, email], (err, result) => {
        if (err) {
            return res.status(500).send('Erreur lors de l\'enregistrement des données.');
        }
        res.send('Données enregistrées avec succès !');
    });
};


// Supprimer une invitation
export const deleteInvitation = async (req, res) => {
    const { id } = req.params; 

    if (!id) {
        return res.status(400).send('L\'ID de l\'invitation est requis.');
    }

    const sql = 'DELETE FROM renseignements WHERE id = ?'; 
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'invitation:', err);
            return res.status(500).send('Erreur lors de la suppression de l\'invitation.');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Aucune invitation trouvée avec cet ID.');
        }

        res.send('Invitation supprimée avec succès !');
    });
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

    const sql = 'UPDATE renseignements SET nom = ?, prenom = ?, quartier = ?, telephone = ?, email = ? WHERE id = ?';
    db.query(sql, [nom, prenom, quartier, telephone, email, id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour de l\'invitation:', err);
            return res.status(500).send('Erreur lors de la mise à jour de l\'invitation.');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Aucune invitation trouvée avec cet ID pour mise à jour.');
        }

        res.send('Invitation mise à jour avec succès !');
    });
};


