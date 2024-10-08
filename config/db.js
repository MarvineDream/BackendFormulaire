import mongoose from 'mongoose';



const db = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/AnniversaireDB');
        console.log('Connexion à MongoDB réussie !');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB:', error);
        process.exit(1); // Quitte le processus avec une erreur
    }
};

export default db;