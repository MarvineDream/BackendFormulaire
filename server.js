import express from 'express';
import inviteRoutes from './routes/invite.route.js';
import cors from 'cors';
import db from '../Backend/config/db.js';


const app = express();
app.use(cors());
db();

const PORT = process.env.PORT || 3004;




// Middleware pour permettre l'accès à l'API (CORS)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permet l'accès depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '1800');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, Origin, X-Requested-With, Content, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    // Gérer les requêtes OPTIONS
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // Répondre avec un statut 204 pour les requêtes OPTIONS
    }

    next(); // Passer au middleware suivant
});


//Middleware qui traite les données de la requeste
app.use(express.json());
app.use(express.urlencoded( {extended: true}));


//Middleware qui conduit a la route Invite
app.use("/submit", inviteRoutes);
app.use("/reponse", (req, res) => {
    res.json({ message: "Voici la page pour votre reponse !"});
});


app.listen(PORT, () => {
    console.log(`Le serveur écoute bien au port ${PORT}`);
});

 