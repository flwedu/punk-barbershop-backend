import { Router } from "express";
import { ServiceType } from "../../application/domain/entities";
import { FindByIdUseCase } from "../../application/useCases/FindByIdUseCase";
import { CreateServiceTypeUseCase } from "../../application/useCases/service-type/create-serviceType";
import { UpdateServiceTypeUseCase } from "../../application/useCases/service-type/update-serviceType";
import IRepository from "../../output/repositories/IRepository";
import EntityModelParser from "../../presentation/adapters/entity-model-parser";
import { DeleteByIdController, FindAllController, FindByController, UpdateEntityController } from "../../presentation/controllers";
import { CreateEntityController } from "../../presentation/controllers/create-entity-controller";

export function configureServiceTypeExpressRoutes(router: Router, repositories: Map<string, IRepository<any>>) {

    const parser = new EntityModelParser();
    const repository = repositories.get("ServiceType");

    router.get("/services", (request, response) => {
        new FindAllController<ServiceType>(repository, parser).handle(request, response);
    })

    router.get("/services/:id", (request, response) => {
        new FindByController(new FindByIdUseCase(repository), parser).handle(request, response);
    })

    router.post("/services", (request, response) => {
        new CreateEntityController(new CreateServiceTypeUseCase(repository)).handle(request, response);
    })

    router.put("/services/:id", (request, response) => {
        new UpdateEntityController(new UpdateServiceTypeUseCase(repository)).handle(request, response);
    })

    router.delete("/services/:id", (request, response) => {
        new DeleteByIdController(repository).handle(request, response);
    })
}