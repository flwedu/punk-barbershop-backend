import { Client } from "../../domain/entities/client";
import { ClientPresentationModel } from "./models/presentation-models";

export class ClientPresentationModelAdapter {

    toModel(client: Client): ClientPresentationModel {
        const model: ClientPresentationModel = {
            id: client.id,
            name: client.props.name,
            cpf: client.props.cpf.getValue(),
            email: client.props.email.getValue(),
            birthDate: client.props.birthDate.toISOString(),
            createdAt: client.props.createdAt.toISOString()
        };
        return model;
    }
}