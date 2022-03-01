import { Barber } from "../../application/domain/entities/barber";
import { IMRepository } from "../../output/repositories/test/IM-Repository";
import FindByIdController from "./findby-id-controller";


describe("Find by id controller", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("Shoul return 200 for a sucess query and body data contais the entity", async () => {

        expect.assertions(4);

        const repository = new IMRepository<Barber>();
        const sut = new FindByIdController(repository);

        const barber = Barber.create({
            name: "Barber",
            cpf: "12345678911",
            birthDate: "2021-01-01",
            email: "test@email.com"
        }, "1");
        const barber2 = Barber.create({
            name: "Barber 2",
            cpf: "12345678911",
            birthDate: "2021-01-01",
            email: "test@email.com"
        }, "2");
        repository.list.push(barber, barber2);

        const responseEntity = await sut.handle({ id: "1" });
        const responseEntity2 = await sut.handle({ id: "2" });

        expect(responseEntity.status).toEqual(200);
        expect(responseEntity.data).toBeTruthy();
        expect(responseEntity2.status).toEqual(200);
        expect(responseEntity2.data).toBeTruthy();
    })

    it("should return a ResponseEntity with statuscode 400 for an unsuccessful query", async () => {

        expect.assertions(1);

        const repository = new IMRepository<Barber>();
        const sut = new FindByIdController(repository);

        const responseEntity = await sut.handle({ id: "1" });

        expect(responseEntity.status).toEqual(400);
    })

})