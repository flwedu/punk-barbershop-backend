import crypto from "crypto";
import { ErrorMessage } from "../../../application/domain/errors/error-messages";
import { createFakeServiceTypeProps } from "../../../__test_utils__/MockDataFactory";
import { setupRepository } from "../../../__test_utils__/setupFunctions";
import { ServiceType } from "../../domain/entities/serviceType";
import BusinessRuleError from "../../domain/errors/business-rule-error";
import { CreateServiceTypeUseCase } from "./create-serviceType";

describe("create serviceType use case test", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    const props = createFakeServiceTypeProps();

    describe('Should create a ServiceType', () => {

        test("without passing an id", async () => {

            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository<ServiceType>("save");
            const sut = new CreateServiceTypeUseCase(repository);

            const resultId = await sut.execute({ props: props });

            expect(resultId).toEqual(expect.any(String));
            expect(await repository.findById(resultId)).toMatchObject({ ...ServiceType });
            expect(repositorySpy).toHaveBeenCalledTimes(1);
        })

        test.each([crypto.randomUUID(), "1", "1121"])("passing an id", async (id: string) => {

            expect.assertions(3);
            const { repository, repositorySpy } = setupRepository<ServiceType>("save");
            const sut = new CreateServiceTypeUseCase(repository);

            const resultId = await sut.execute({ id, props: props });

            expect(resultId).toEqual(id);
            expect(await repository.findById(resultId)).toMatchObject({ ...ServiceType });
            expect(repositorySpy).toHaveBeenCalledTimes(1);
        })
    })

    describe('Should throw error', () => {

        describe('When using invalid input value: ', () => {

            test.each(["", "abc1", "0", null, "-1"])("duration value: %s", async (duration) => {

                expect.assertions(2);
                const { repository, repositorySpy } = setupRepository<ServiceType>("save");
                const sut = new CreateServiceTypeUseCase(repository);

                try {
                    await sut.execute({
                        props: {
                            ...props,
                            duration,
                        }
                    });

                } catch (err) {
                    expect(err.message).toEqual(ErrorMessage.INVALID_PARAM("duration value"))
                    expect(repositorySpy).not.toHaveBeenCalled();
                }

            })

            test.each(["-50", "abc", "a"])("price value: %s", async (price) => {
                expect.assertions(2);
                const { repository, repositorySpy } = setupRepository<ServiceType>("save");
                const sut = new CreateServiceTypeUseCase(repository);

                try {
                    await sut.execute({
                        props: {
                            ...props,
                            price,
                        }
                    });
                } catch (err) {
                    expect(err.message).toEqual(ErrorMessage.INVALID_PARAM("price"))
                    expect(repositorySpy).not.toHaveBeenCalled();
                }
            })
        })

        describe('With null or empty values: ', () => {

            test.each([null, undefined, ""])("%s price value", async (value) => {
                expect.assertions(2);
                const { repository, repositorySpy } = setupRepository<ServiceType>("save");
                const sut = new CreateServiceTypeUseCase(repository);

                await expect(sut.execute({
                    props: {
                        ...props,
                        price: value
                    }
                })).rejects.toEqual(new BusinessRuleError(ErrorMessage.NULL_PARAM("price")))
                expect(repositorySpy).not.toHaveBeenCalled();
            })

            test.each([null, undefined, ""])("%s name value", async (value) => {
                expect.assertions(2);
                const { repository, repositorySpy } = setupRepository<ServiceType>("save");
                const sut = new CreateServiceTypeUseCase(repository);

                await expect(sut.execute({
                    props: {
                        ...props,
                        name: value
                    }
                })).rejects.toEqual(new BusinessRuleError(ErrorMessage.NULL_PARAM("name")))
                expect(repositorySpy).not.toHaveBeenCalled();
            })
        })
    })

})