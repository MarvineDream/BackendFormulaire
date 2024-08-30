import express from 'express';
import { deleteInvitation, getInvitations, submitInvite, updateInvitation } from '../controller/invite.controller.js';


const router = express.Router();

router.get("/", getInvitations);

router.post("/", submitInvite);

router.put("/:id", updateInvitation);

router.delete("/:id", deleteInvitation);






export default router;