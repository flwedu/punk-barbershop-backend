import CreateClientController from "../../presentation/controllers/client/create-client-controller";
import { FindAllController } from "../../presentation/controllers/findall-controller";
import FindByIdController from "../../presentation/controllers/findby-id-controller";
import { router } from "../config/config";
import { clientRepository } from "../config/resourcesFactory";

router.get("/clients", async (req, res) => {
    const response = await new FindAllController(clientRepository).handle();
    res.send(response);
})

router.get("/clients/:id", async (req, res) => {
    const { id } = req.params
    const response = await new FindByIdController(clientRepository).handle({ id });
    res.send(response);
})

router.post("/clients/", async (req, res) => {
    const { data } = req.body
    const response = await new CreateClientController(clientRepository).handle(data);
    res.send(response);
})