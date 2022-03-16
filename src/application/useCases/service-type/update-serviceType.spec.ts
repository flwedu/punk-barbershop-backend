import { ErrorMessage } from "../../../application/domain/errors/error-messages";
import EntityModelParser from "../../../presentation/adapters/entity-model-parser";
import {
    createFakeServiceType,
    createFakeServiceTypeProps,
} from "../../../__test_utils__/MockDataFactory";
import { setupRepository } from "../../../__test_utils__/setupFunctions";
import { ServiceType } from "../../domain/entities/serviceType";
import { UpdateServiceTypeUseCase } from "./update-serviceType";

describe("Update service type use case", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it.each([
        {
            name: "Corte legal atualizado",
            description: "Um corte legal",
            duration: "30",
            price: "50",
        },
        {
            name: "Corte legal atualizado 2",
            description: "Show de bola",
            duration: "30",
            price: "50",
        },
    ])(
        "Should update a ServiceType with the passed parameters (%o)",
        async (props) => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository(
                ServiceType,
                "update"
            );
            const sut = new UpdateServiceTypeUseCase(repository);

            const originalService = createFakeServiceType();
            repository.list.push(originalService);

            const updatedService = await sut.execute({
                id: originalService.id,
                props,
            });
            expect(
                new EntityModelParser().toModel(updatedService)
            ).toMatchObject({ ...props });
            expect(await repository.findById(originalService.id)).toMatchObject(
                updatedService
            );
            expect(repositorySpy).toHaveBeenCalledTimes(1);
        }
    );

    it.each(["2", "3", null, "0"])(
        "Should throw an error when trying to update a ServiceType with this non-existent id: %s",
        async (id) => {
            expect.assertions(2);
            const { repository, repositorySpy } = setupRepository(
                ServiceType,
                "update"
            );
            const sut = new UpdateServiceTypeUseCase(repository);

            try {
                await sut.execute({
                    id,
                    props: {
                        ...createFakeServiceTypeProps(),
                    },
                });
            } catch (err) {
                expect(err.message).toEqual(ErrorMessage.ID_NOT_FOUND(id));
                expect(repositorySpy).toHaveBeenCalledTimes(1);
            }
        }
    );

    it.each([null, "", undefined, "4.5", "ABC"])(
        "Should throw an error when trying to update a ServiceType with this invalid duration value: %s",
        async (duration) => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository(
                ServiceType,
                "update"
            );
            const sut = new UpdateServiceTypeUseCase(repository);

            const originalService = ServiceType.create(
                createFakeServiceTypeProps(),
                "1"
            );
            repository.list.push(originalService);

            try {
                await sut.execute({
                    id: "1",
                    props: {
                        name: "Updated haircut",
                        description: "A nice haircut",
                        duration,
                        price: "200",
                    },
                });
            } catch (err) {
                expect(err.message).toEqual(
                    ErrorMessage.INVALID_PARAM("duration value")
                );
                expect(repositorySpy).toBeCalledTimes(0);
                expect(
                    await repository.findById(originalService.id)
                ).toMatchObject(originalService);
            }
        }
    );

    it.each([null, "", undefined, "ABC", "a"])(
        "Should throw an error when trying to update a ServiceType with this invalid price value: %s",
        async (price) => {
            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository(
                ServiceType,
                "update"
            );
            const sut = new UpdateServiceTypeUseCase(repository);

            const originalService = ServiceType.create(
                createFakeServiceTypeProps(),
                "1"
            );
            repository.list.push(originalService);

            try {
                await sut.execute({
                    id: "1",
                    props: {
                        name: "Updated haircut",
                        description: "",
                        duration: "60",
                        price,
                    },
                });
            } catch (err) {
                expect(err.message).toEqual(
                    ErrorMessage.INVALID_PARAM("price")
                );
                expect(repositorySpy).toBeCalledTimes(0);
                expect(
                    await repository.findById(originalService.id)
                ).toMatchObject(originalService);
            }
        }
    );
});
