import { FastifyRequest, FastifyReply } from "fastify"
import { UpdateCustomerService } from '../services/UpdateCustomerService'

class UpdateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply){
    const { id } = request.params as { id: string };
    const { name, email } = request.body as { name: string, email: string};
  
    const customerService = new UpdateCustomerService()
    const customer = await customerService.execute(id, { name, email });

    reply.send(customer)
  }
}

export { UpdateCustomerController }