import prismaClient from "../prisma"

interface UpdateCustomerProps {
  name: string
  email: string
}

class UpdateCustomerService {
  async execute(id: string, { name, email }: UpdateCustomerProps){

    if(!name || !email){
      throw new Error("Preencha todos os campos")
    }

    const customer = await prismaClient.customer.update({
      where: { id },
      data: {
        name,
        email
      }
    })

    return customer
  }
}

export { UpdateCustomerService }