
import { getUserById, loginUser, registerUser } from "@/controllers/user.controller";
import e from "express";


const router = e.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/user/:id", getUserById)

export default  router;