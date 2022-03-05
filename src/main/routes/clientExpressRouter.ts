import { Router } from "express";
import { clientRepository } from "../../main/config/resourcesFactory";
import CreateClientController from "../../presentation/controllers/client/create-client-controller";
import { FindAllController } from "../../presentation/controllers/findall-controller";
import FindByIdController from "../../presentation/controllers/findby-id-controller";



export default function configureClientRoutes(router: Router){

    router.get("/clients", function (_, res) {
        new FindAllController(clientRepository).handle().then(
            result => res.status(result.status).send(result.data)
        ).catch(err => res.send(err));
    })
    
    router.get("/clients/:id", function (req, res) {
        const { id } = req.params
        new FindByIdController(clientRepository).handle({ id }).then(
            result => res.status(result.status).send(result.data)
        ).catch(err => res.send(err));
    })
    
    router.post("/clients", function (req, res) {
        new CreateClientController(clientRepository).handle({ props: req.body }).then(
            result => res.status(result.status).send(result.data)
        ).catch(err => res.send(err));
    })
}
