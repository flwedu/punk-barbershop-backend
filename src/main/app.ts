import { Config } from "./config/config";

const server = Config.server;
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => { console.log(`Server is running at: http://localhost:${PORT}/`) });