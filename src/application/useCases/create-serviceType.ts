import { ServiceType } from "../../domain/entities/serviceType";
import { Duration } from "../../domain/valueObjects/Duration";
import IRepository from "../repositories/IRepository";

type CreateServiceTypeRequest ={
    name: string,
    description: string,
    duration: string,
    price: string,
}

export class CreateServiceType{

    constructor(private repository: IRepository<ServiceType>){}

    async execute(request: CreateServiceTypeRequest){

        // Check values
        if (request.name.length < 2 || request.name.length > 25){
            throw new Error("name must contain more than 2 characters and no more than 25 characters")
        }
        if (request.name.length < 2 || request.name.length > 50){
            throw new Error("desciption must contain more than 2 characters and less than 50 characters")
        }

        if(request.price.length < 1 || !/^\d+[\.\,]?\d{0,2}$/.test(request.price.replace(",", ""))) {
            throw new Error("invalid price value")
        }

        const serviceTypeProps = {
            ...request,
            duration: Duration.of(request.duration)
        }

        return await this.repository.save(serviceTypeProps);
    }

}