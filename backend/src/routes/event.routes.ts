import { createEvent, deleteEvent, getAllEvent, getEventById, updateEvent } from "@/controllers/event.controller";
import e from "express";


const router = e.Router();

router.get("/", getAllEvent)
router.get("/:id", getEventById)

router.post("/", createEvent)
router.delete("/:id", deleteEvent)
router.put("/:id", updateEvent)


export default router;