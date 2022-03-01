import { IMRepository } from "../../../output/repositories/test/IM-Repository";
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
    ])("Sould return update a service type for object (%o)", async (props) => {
        expect.assertions(3);
        const repository = new IMRepository<ServiceType>();
        const sut = new UpdateServiceTypeUseCase(repository);
        const repositorySpy = jest.spyOn(repository, "update");

        repository.list.push(
            ServiceType.create(
                {
                    name: "Nice haircut",
                    description: "A nice haircut",
                    duration: "30",
                    price: "50",
                },
                "1"
            )
        );

        const updated = await sut.execute({
            id: "1",
            props,
        });
        expect(repositorySpy).toBeCalledTimes(1);
        expect(repository.list.at(0).props.name).toEqual(props.name);
        expect(updated.props.name).toEqual(props.name);
    });

    it.each(["2", "3", null, "0"])(
        "Sould throw error to a invalid service type id %d",
        async (id) => {
            expect.assertions(2);
            const repository = new IMRepository<ServiceType>();
            const sut = new UpdateServiceTypeUseCase(repository);
            const repositorySpy = jest.spyOn(repository, "update");

            repository.list.push(
                ServiceType.create(
                    {
                        name: "Corte legal",
                        description: "Um corte legal",
                        duration: "30",
                        price: "50",
                    },
                    "1"
                )
            );

            try {
                await sut.execute({
                    id,
                    props: {
                        name: "Corte legal atualizado",
                        description: "Um corte legal",
                        duration: "30",
                        price: "50",
                    },
                });
            } catch (err) {
                expect(repositorySpy).toBeCalledTimes(1);
                expect(repository.list.at(0).props.name).toEqual("Corte legal");
            }
        }
    );

    it.each([null, "", undefined, "4.5", "ABC"])(
        "Sould throw error to a request with invalid duration: %s",
        async (duration) => {
            expect.assertions(2);
            const repository = new IMRepository<ServiceType>();
            const sut = new UpdateServiceTypeUseCase(repository);
            const repositorySpy = jest.spyOn(repository, "update");

            repository.list.push(ServiceType.create(
                {
                    name: "Corte legal",
                    description: "Um corte legal",
                    duration: "30",
                    price: "50",
                },
                "1"
            ));

            try {
                const updated = await sut.execute({
                    id: "1",
                    props: {
                        name: "Updated haircut",
                        description: "A nice haircut",
                        duration,
                        price: "200",
                    },
                });
            } catch (err) {
                expect(repositorySpy).toBeCalledTimes(0);
                expect(repository.list.at(0).props.name).toEqual("Corte legal");
            }
        }
    );

    it.each([null, "", undefined, "ABC"])(
        "Sould throw error to a request with invalid price: %s",
        async (price) => {
            expect.assertions(2);
            const repository = new IMRepository<ServiceType>();
            const sut = new UpdateServiceTypeUseCase(repository);
            const repositorySpy = jest.spyOn(repository, "update");

            repository.list.push(ServiceType.create(
                {
                    name: "Corte legal",
                    description: "Um corte legal",
                    duration: "30",
                    price: "50",
                },
                "1"
            ));

            try {
                const updated = await sut.execute({
                    id: "1",
                    props: {
                        name: "Updated haircut",
                        description: "",
                        duration: "60",
                        price,
                    },
                });
            } catch (err) {
                expect(repositorySpy).toBeCalledTimes(0);
                expect(repository.list.at(0).props.name).toEqual("Corte legal");
            }
        }
    );
});
