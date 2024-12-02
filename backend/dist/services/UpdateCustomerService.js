"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class UpdateCustomerService {
    async execute(id, { name, email }) {
        if (!name || !email) {
            throw new Error("Preencha todos os campos");
        }
        const customer = await prisma_1.default.customer.update({
            where: { id },
            data: {
                name,
                email
            }
        });
        return customer;
    }
}
exports.UpdateCustomerService = UpdateCustomerService;
