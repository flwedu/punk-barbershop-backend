import { Config } from "../config/config"

const { router } = Config;

router.get("/", (req, res) => res.send("API is working!").status(200))