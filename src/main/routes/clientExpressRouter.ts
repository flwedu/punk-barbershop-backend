import { Router } from "express";
import { Client } from "../../application/domain/entities";
import IRepository from "../../output/repositories/IRepository";
import { FindAllController, FindByIdController } from "../../presentation/controllers";
import { CreateClientController } from "../../presentation/controllers/client";

export default function configureClientRoutes(router: Router, repository: IRepository<any>) {

    router.get("/clients", (request, response) => {
        new FindAllController<Client>(repository).handle(request, response);
    })

    router.get("/clients/:id", (request, response) => {
        new FindByIdController<Client>(repository).handle(request, response);
    })

    router.post("/clients", (request, response) => {
        new CreateClientController(repository).handle(request, response);
    })
}
