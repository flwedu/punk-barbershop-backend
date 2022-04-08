import "dotenv/config"
import { defaultAppConfiguration } from "./config/default-configuration";
import { testInMemoryAppConfiguration } from "./config/test-configuration";

let server;
if (!process.env.MODE || process.env.MODE == "test") {
    server = testInMemoryAppConfiguration.getServer();
}
else {
    server = defaultAppConfiguration.getServer();
}
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => { console.log(`Server is running at: http://localhost:${PORT}/`) });