import { Router } from "express";
import { Client } from "../../application/domain/entities";
import { CreateClientUseCase } from "../../application/useCases/client/create-client";
import UpdateClientUseCase from "../../application/useCases/client/update-client";
import IRepository from "../../output/repositories/IRepository";
import { DeleteByIdController, FindAllController, FindByIdController, UpdateEntityController } from "../../presentation/controllers";
import { CreateEntityController } from "../../presentation/controllers/create-entity-controller";


export function configureClientRoutes(router: Router, repository: IRepository<any>) {

    router.get("/clients", (request, response) => {
        new FindAllController<Client>(repository).handle(request, response);
    })

    router.get("/clients/:id", (request, response) => {
        new FindByIdController<Client>(repository).handle(request, response);
    })

    router.post("/clients", (request, response) => {
        new CreateEntityController(new CreateClientUseCase(repository)).handle(request, response);
    })

    router.put("/clients/:id", (request, response) => {
        new UpdateEntityController(new UpdateClientUseCase(repository)).handle(request, response);
    })

    router.delete("/clients/:id", (request, response) => {
        new DeleteByIdController(repository).handle(request, response);
    })
}
