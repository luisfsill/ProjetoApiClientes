import prismaClient from "../prisma";

class ListCustomersService{
  async execute(){

    const customer = await prismaClient.customer.findMany()

    return customer;

  }
}

export { ListCustomersService }