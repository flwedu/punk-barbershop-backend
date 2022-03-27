import { Router } from "express";
import { Scheduling } from "../../application/domain/entities";
import { FindByIdUseCase } from "../../application/useCases/FindByIdUseCase";
import { CreateSchedulingUseCase } from "../../application/useCases/scheduling/create-scheduling";
import IRepository from "../../output/repositories/IRepository";
import EntityModelParser from "../../presentation/adapters/entity-model-parser";
import { DeleteByIdController, FindAllController, FindByController } from "../../presentation/controllers";
import { CreateEntityController } from "../../presentation/controllers/create-entity-controller";

export function configureSchedulingExpressRoutes(router: Router, repositories: Map<string, IRepository<any>>) {

    const parser = new EntityModelParser();
    const clientRepository = repositories.get("Client");
    const barberRepository = repositories.get("Barber");
    const serviceTypeRepository = repositories.get("ServiceType");
    const schedulingRepository = repositories.get("Scheduling");

    router.get("/schedules", (request, response) => {
        new FindAllController<Scheduling>(schedulingRepository, parser).handle(request, response);
    })

    router.get("/schedules/:id", (request, response) => {
        new FindByController(new FindByIdUseCase(schedulingRepository), parser).handle(request, response);
    })

    router.post("/schedules", (request, response) => {
        new CreateEntityController(new CreateSchedulingUseCase({
            schedulingRepository,
            clientRepository,
            barberRepository,
            serviceTypeRepository
        })).handle(request, response);
    })

    router.delete("/schedules/:id", (request, response) => {
        new DeleteByIdController(schedulingRepository).handle(request, response);
    })
}