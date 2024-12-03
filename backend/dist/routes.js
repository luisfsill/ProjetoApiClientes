"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = routes;
const CreateCustomerController_1 = require("./controllers/CreateCustomerController");
const ListCustomersController_1 = require("./controllers/ListCustomersController");
const DeleteCustomerController_1 = require("./controllers/DeleteCustomerController");
const UpdateCustomerController_1 = require("./controllers/UpdateCustomerController");
async function routes(fastify, options) {
    fastify.get("/teste", async (request, reply) => {
        return { ok: true };
    });
    fastify.post("/customer", async (request, reply) => {
        return new CreateCustomerController_1.CreateCustomerController().handle(request, reply);
    });
    fastify.get("/customers", async (request, reply) => {
        return new ListCustomersController_1.ListCustomersController().handle(request, reply);
    });
    fastify.delete("/customer", async (request, reply) => {
        return new DeleteCustomerController_1.DeleteCustomerController().handle(request, reply);
    });
    fastify.put("/customer/:id", async (request, reply) => {
        return new UpdateCustomerController_1.UpdateCustomerController().handle(request, reply);
    });

    fastify.get("/", async (request, reply) => {
        return { message: "Bem-vindo à API!" };
    });
    
}
