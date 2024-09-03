import express from 'express';
import { SendReponse } from '../controller/reponse.Controller';



const router = express.Router();


router.get("/", SendReponse);



export default router;



