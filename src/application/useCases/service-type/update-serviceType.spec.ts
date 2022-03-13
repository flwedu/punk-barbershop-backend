import faker from "@faker-js/faker";
import EntityModelParser from "../../../presentation/adapters/entity-model-parser";
import { ErrorMessage } from "../../../application/domain/errors/error-messages";
import { IMRepository } from "../../../output/repositories/test/IM-Repository";
import { ServiceType } from "../../domain/entities/serviceType";
import { UpdateServiceTypeUseCase } from "./update-serviceType";

describe("Update service type use case", () => {

    function setup() {
        const repository = new IMRepository<ServiceType>();
        const sut = new UpdateServiceTypeUseCase(repository);
        const repositorySpy = jest.spyOn(repository, "update");
        return { repository, sut, repositorySpy };
    }

    function generateServiceTypeProps() {
        return {
            name: faker.lorem.words(15),
            description: faker.lorem.words(25),
            duration: "120",
            price: "50"
        }
    }

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
    ])("Should update a ServiceType with the passed parameters (%o)", async (props) => {
        expect.assertions(3);
        const { repository, sut, repositorySpy } = setup();

        const originalService = ServiceType.create(generateServiceTypeProps())
        repository.list.push(originalService);

        const updatedService = await sut.execute({
            id: originalService.id,
            props,
        });
        expect(new EntityModelParser().toModel(updatedService)).toMatchObject({ ...props });
        expect(await repository.findById(originalService.id)).toMatchObject(updatedService);
        expect(repositorySpy).toHaveBeenCalledTimes(1);
    });


    it.each(["2", "3", null, "0"])(
        "Should throw an error when trying to update a ServiceType with this non-existent id: %s",
        async (id) => {
            expect.assertions(2);
            const { sut, repositorySpy } = setup();

            try {
                await sut.execute({
                    id,
                    props: {
                        ...generateServiceTypeProps()
                    },
                });
            } catch (err) {
                expect(err.message).toEqual(ErrorMessage.ID_NOT_FOUND(id))
                expect(repositorySpy).toHaveBeenCalledTimes(1);
            }
        }
    );

    it.each([null, "", undefined, "4.5", "ABC"])(
        "Should throw an error when trying to update a ServiceType with this invalid duration value: %s",
        async (duration) => {
            expect.assertions(3);
            const { repository, sut, repositorySpy } = setup();

            const originalService = ServiceType.create(
                generateServiceTypeProps(),
                "1"
            )
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
                expect(err.message).toEqual(ErrorMessage.INVALID_PARAM("duration value"))
                expect(repositorySpy).toBeCalledTimes(0);
                expect(await repository.findById(originalService.id)).toMatchObject(originalService);
            }
        }
    );

    it.each([null, "", undefined, "ABC", "a"])(
        "Should throw an error when trying to update a ServiceType with this invalid price value: %s",
        async (price) => {
            expect.assertions(3);
            const { repository, sut, repositorySpy } = setup();

            const originalService = ServiceType.create(
                generateServiceTypeProps(),
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
                expect(err.message).toEqual(ErrorMessage.INVALID_PARAM("price"))
                expect(repositorySpy).toBeCalledTimes(0);
                expect(await repository.findById(originalService.id)).toMatchObject(originalService);
            }
        }
    );
});


