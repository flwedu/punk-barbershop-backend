
import { CreateBarber } from "../../../../src/application/useCases/create-barber";
import { IMBarberRepository } from "../repositories/IM-BaberRepository";

describe("create barber use cases", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("should create a new barber with valid data", async () => {

        expect.assertions(3);
        const barberRepository = new IMBarberRepository();
        const createBarber = new CreateBarber(barberRepository);
        const spy = jest.spyOn(barberRepository, "save");

        const barberData = {
            name: "Test",
            email: "barber@email.com",
            birthDate: "1980-01-05",
            cpf: "00000000000"
        }

        const barber = await createBarber.execute(barberData);

        expect(barber).toBeTruthy();
        expect(barberRepository.findById(barber.id)).toBeTruthy();
        expect(spy).toHaveBeenCalledTimes(1);
    })

    it("should not create a new barber with invalid email", async () => {

        expect.assertions(2);
        const barberRepository = new IMBarberRepository();
        const createBarber = new CreateBarber(barberRepository);
        const spy = jest.spyOn(barberRepository, "save");

        const barberData = {
            name: "Test",
            email: "",
            birthDate: "1980-01-05",
            cpf: "00000000000"
        }

        try{
            await createBarber.execute(barberData);
        }catch(err){
            expect(barberRepository.barberList.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }

    })

    it("should not create a new barber with invalid cpf", async () => {

        expect.assertions(2);
        const barberRepository = new IMBarberRepository();
        const createBarber = new CreateBarber(barberRepository);
        const spy = jest.spyOn(barberRepository, "save");

        const barberData = {
            name: "Test",
            email: "barber@email.com",
            birthDate: "1980-01-05",
            cpf: "000000000"
        }

        try{
            await createBarber.execute(barberData);
        }catch(err){
            expect(barberRepository.barberList.length).toBe(0);
            expect(spy).toHaveBeenCalledTimes(0);
        }

    })
})