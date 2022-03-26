import { Router } from "express";
import { Barber } from "../../application/domain/entities";
import { CreateBarberUseCase } from "../../application/useCases/barber/create-barber";
import { UpdateBarberUseCase } from "../../application/useCases/barber/update-barber"
import { FindByIdUseCase } from "../../application/useCases/FindByIdUseCase";
import IRepository from "../../output/repositories/IRepository";
import EntityModelParser from "../../presentation/adapters/entity-model-parser";
import { FindAllController, FindByController, UpdateEntityController, DeleteByIdController } from "../../presentation/controllers";
import { CreateEntityController } from "../../presentation/controllers/create-entity-controller";

export function configureBarberExpressRoutes(router: Router, repositories: Map<string, IRepository<any>>) {

    const parser = new EntityModelParser();
    const repository = repositories.get("Barber");

    router.get("/barbers", (request, response) => {
        new FindAllController<Barber>(repository, parser).handle(request, response);
    })

    router.get("/barbers/:id", (request, response) => {
        new FindByController(new FindByIdUseCase(repository), parser).handle(request, response);
    })

    router.post("/barbers", (request, response) => {
        new CreateEntityController(new CreateBarberUseCase(repository)).handle(request, response);
    })

    router.put("/barbers/:id", (request, response) => {
        new UpdateEntityController(new UpdateBarberUseCase(repository)).handle(request, response);
    })

    router.delete("/barbers/:id", (request, response) => {
        new DeleteByIdController(repository).handle(request, response);
    })
}