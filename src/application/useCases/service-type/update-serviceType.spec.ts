import { ErrorMessage } from "../../../application/domain/errors/error-messages";
import {
    createFakeServiceTypeProps
} from "../../../__test_utils__/MockDataFactory";
import { setupRepository } from "../../../__test_utils__/setupFunctions";
import { ServiceType } from "../../domain/entities/serviceType";
import BusinessRuleError from "../../domain/errors/business-rule-error";
import ResourceNotFound from "../../domain/errors/resource-not-found";
import { UpdateServiceTypeUseCase } from "./update-serviceType";

describe("Update ServiceType use case", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const oldProps = createFakeServiceTypeProps();
    const newProps = createFakeServiceTypeProps();

    describe('Should update a Service Type', () => {

        test.each([newProps])('With the passed parameters', async (props) => {
            const { repository, repositorySpy } = setupRepository<ServiceType>("update");
            const sut = new UpdateServiceTypeUseCase(repository);

            const original = ServiceType.create(oldProps);
            await repository.save(original);

            const updatedId = await sut.execute({
                id: original.id,
                props,
            });

            expect.assertions(3);
            expect(await repository.findById(original.id)).toMatchObject(ServiceType.create(props, updatedId));
            expect(repositorySpy).toHaveBeenCalledTimes(1);
            expect(updatedId).toEqual(original.id);
        })
    })

    describe('Should throw Error: ', () => {

        test.each(["2", "3", null, "0"])(
            "When trying to update with this non-existent id: %s",
            async (id) => {
                expect.assertions(2);
                const { repository, repositorySpy } = setupRepository<ServiceType>("update");
                const sut = new UpdateServiceTypeUseCase(repository);

                await expect(sut.execute({
                    id,
                    props: {
                        ...newProps,
                    },
                }))
                    .rejects
                    .toEqual(new ResourceNotFound(ErrorMessage.ID_NOT_FOUND(id)));
                expect(repositorySpy).toHaveBeenCalledTimes(1);
            }
        );

        describe('When trying to update with invalid value: ', () => {
            test.each([null, "", undefined, "4.5", "ABC"])(
                "%s duration value",
                async (duration) => {
                    expect.assertions(3);
                    const { repository, repositorySpy } = setupRepository<ServiceType>("update");
                    const sut = new UpdateServiceTypeUseCase(repository);

                    const originalService = ServiceType.create(
                        createFakeServiceTypeProps(),
                        "1"
                    );
                    await repository.save(originalService);

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

            test.each(["ABC", "a", "-150"])(
                "%s price value",
                async (price) => {
                    expect.assertions(3);
                    const { repository, repositorySpy } = setupRepository<ServiceType>("update");
                    const sut = new UpdateServiceTypeUseCase(repository);

                    const originalService = ServiceType.create(
                        oldProps,
                        "1"
                    );
                    await repository.save(originalService);

                    try {
                        await sut.execute({
                            id: "1",
                            props: {
                                ...newProps,
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
        })

        describe('When using null or empty values', () => {

            test.each([null, undefined, ""])("% price value", async (price) => {
                expect.assertions(2);
                const { repository, repositorySpy } = setupRepository<ServiceType>("update");
                const sut = new UpdateServiceTypeUseCase(repository);

                const original = ServiceType.create(oldProps);
                await repository.save(original);
                await expect(sut.execute({
                    id: original.id, props: {
                        ...newProps,
                        price
                    }
                })).rejects.toEqual(new BusinessRuleError(ErrorMessage.NULL_PARAM("price")))
                expect(repositorySpy).not.toHaveBeenCalled();
            })
        })
    })
});
