import { Client, Props } from "../../../../src/domain/entities/client";
import { IMRepository } from "./IM-Abstract-Repository";

export class IMClientRepository extends IMRepository<Client> {
  save(props: Props<Client>, id?: string): Promise<Client> {
    const result = Client.create(props, id);

    this.list.push(result)

    return Promise.resolve(result);
  }


}
