import "dotenv/config";
import IRepository from "../../output/repositories/IRepository";

export class ServerConfig<T, R> {
    private repositories = new Map<string, IRepository<any>>();
    private router: R;

    constructor(private readonly server: T) { }

    getServer(): T {
        return this.server;
    }

    setRepository(name: string, repository: IRepository<any>) {
        this.repositories.delete(name);
        this.repositories.set(name, repository);
        return this;
    }

    setRepositories(
        repositoriesList: { name: string; repository: IRepository<any> }[]
    ) {
        repositoriesList.forEach((item) => {
            this.repositories.delete(item.name);
            this.repositories.set(item.name, item.repository);
        });
        return this;
    }

    getRepository(name: string) {
        return this.repositories.get(name);
    }

    addRouterConfig(fn: Function) {
        // Execute the configure router function with the app router and repositories
        fn(this.router, this.repositories);
        return this;
    }

    setRouter(router: R) {
        this.router = router;
        return this;
    }

    getRouter(): R {
        return this.router;
    }
}