import { Router } from "express";
import { Client } from "../../application/domain/entities";
import { CreateClientUseCase } from "../../application/useCases/client/create-client";
import UpdateClientUseCase from "../../application/useCases/client/update-client";
import { FindByIdUseCase } from "../../application/useCases/FindByIdUseCase";
import IRepository from "../../output/repositories/IRepository";
import { DeleteByIdController, FindAllController, FindByController, UpdateEntityController } from "../../presentation/controllers";
import { CreateEntityController } from "../../presentation/controllers/create-entity-controller";


export function configureClientExpressRoutes(router: Router, repositories: Map<string, IRepository<any>>) {

    const repository = repositories.get("Client");

    router.get("/clients", (request, response) => {
        new FindAllController<Client>(repository).handle(request, response);
    })

    router.get("/clients/:id", (request, response) => {
        new FindByController(new FindByIdUseCase(repository)).handle(request, response);
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
