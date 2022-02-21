import { IMClientRepository } from "../../repositories/test/IM-ClientRepository";
import { CreateClient } from "./create-client";
import { FindClient } from "./find-client";

describe("Find client use cases", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    async function setupRepository() {
        const repository = new IMClientRepository();
        const createClient = new CreateClient(repository);

        const client1 = await createClient.execute({
            name: "Client1",
            email: "email@email.com",
            birthDate: "01/01/2021",
            cpf: "00000000000",
        });

        const client2 = await createClient.execute({
            name: "Client2",
            email: "email2@email.com",
            birthDate: "02/01/2021",
            cpf: "11111111111",
        });

        return { repository, client1, client2 };
    }

    it("should use repository findById() and find a element", async () => {
        expect.assertions(3);

        const { repository, client1, client2 } = await setupRepository();
        const sut = new FindClient(repository);
        const spy = jest.spyOn(repository, "findById");

        const result1 = await sut.execute({ id: client1.id });
        const result2 = await sut.execute({ id: client2.id });

        expect(spy).toHaveBeenCalledTimes(2);
        expect(result1).toEqual(client1);
        expect(result2).toEqual(client2);
    });

    it("should use repository findById() and not find any element", async () => {
        expect.assertions(1);

        const { repository } = await setupRepository();
        const sut = new FindClient(repository);
        const spy = jest.spyOn(repository, "findById");

        sut.execute({ id: "1121" }).catch(() => {
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    it.skip("should use repository find() and find a element", async () => {
        expect.assertions(3);

        const { repository, client1, client2 } = await setupRepository();
        const sut = new FindClient(repository);
        const spy = jest.spyOn(repository, "find");

        const list1 = await sut.execute({
            props: {
                name: "Client1"
            }
        });
        const list2 = await sut.execute({
            props: {
                cpf: "11111111111"
            }
        });

        console.log(list1[0])

        expect(spy).toHaveBeenCalledTimes(2);
        expect(list1[0].props.name).toEqual("Client1");
        expect(list2[0].props.cpf).toEqual(11111111111);
    });
});
