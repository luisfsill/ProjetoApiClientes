"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCustomersController = void 0;
const ListCustomersService_1 = require("../services/ListCustomersService");
class ListCustomersController {
    async handle(request, reply) {
        const ListCustomerService = new ListCustomersService_1.ListCustomersService();
        const customers = await ListCustomerService.execute();
        reply.send(customers);
    }
}
exports.ListCustomersController = ListCustomersController;
