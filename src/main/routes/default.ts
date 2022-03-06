import { Router } from "express";

export function configureMiscRoutes(router: Router) {

    router.get("/", (request, response) => response.status(200).json({ message: "API is working!" }));
}
