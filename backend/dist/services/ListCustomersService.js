"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCustomersService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class ListCustomersService {
    async execute() {
        const customer = await prisma_1.default.customer.findMany();
        return customer;
    }
}
exports.ListCustomersService = ListCustomersService;
