import { router } from "../config/config";

router.get("/", (req, res) => res.send("API is working!").status(200))