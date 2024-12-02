"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerController = void 0;
const UpdateCustomerService_1 = require("../services/UpdateCustomerService");
class UpdateCustomerController {
    async handle(request, reply) {
        const { id } = request.params;
        const { name, email } = request.body;
        const customerService = new UpdateCustomerService_1.UpdateCustomerService();
        const customer = await customerService.execute(id, { name, email });
        reply.send(customer);
    }
}
exports.UpdateCustomerController = UpdateCustomerController;
