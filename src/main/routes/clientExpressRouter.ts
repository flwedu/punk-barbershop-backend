import { Router } from "express";
import IRepository from "output/repositories/IRepository";
import { FindAllController, FindByIdController } from "presentation/controllers";
import { CreateClientController } from "presentation/controllers/client";

export default function configureClientRoutes(router: Router, repository: IRepository<any>){

    router.get("/clients", function (_, res) {
        new FindAllController(repository).handle().then(
            result => res.status(result.status).send(result.data)
        ).catch(err => res.send(err));
    })
    
    router.get("/clients/:id", function (req, res) {
        const { id } = req.params
        new FindByIdController(repository).handle({ id }).then(
            result => res.status(result.status).send(result.data)
        ).catch(err => res.send(err));
    })
    
    router.post("/clients", function (req, res) {
        new CreateClientController(repository).handle({ props: req.body }).then(
            result => res.status(result.status).send(result.data)
        ).catch(err => res.send(err));
    })
}
