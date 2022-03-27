import "dotenv/config"
import { defaultAppConfiguration } from "./config/default-configuration";

const server = defaultAppConfiguration.getServer();
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => { console.log(`Server is running at: http://localhost:${PORT}/`) });