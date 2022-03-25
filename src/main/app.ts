import "dotenv/config"
import { defaultAppConfig } from "./config/config";

const server = defaultAppConfig.getServer();
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => { console.log(`Server is running at: http://localhost:${PORT}/`) });