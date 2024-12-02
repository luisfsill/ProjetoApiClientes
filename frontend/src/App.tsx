import { useEffect, useState, useRef, FormEvent } from "react"
import {FiTrash, FiEdit2} from "react-icons/fi"
import { api } from "./services/api"

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export default function App(){
  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const [editingCustomer, setEditingCustomer] = useState<CustomerProps | null>(null)
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadCustomers();
  }, [])

  async function loadCustomers() {
    const response = await api.get("/customers")
    setCustomers(response.data);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if(!nameRef.current?.value || !emailRef.current?.value) return;

    if (editingCustomer) {
      try {
        const response = await api.put(`/customer/${editingCustomer.id}`, {
          name: nameRef.current?.value,
          email: emailRef.current?.value
        })

        setCustomers(currentCustomers => 
          currentCustomers.map(customer => 
            customer.id === editingCustomer.id ? response.data : customer
          )
        )

        setEditingCustomer(null)
      } catch (err) {
        console.log(err);
      }
    } else {
      const response = await api.post("/customer", {
        name: nameRef.current?.value,
        email: emailRef.current?.value
      })

      setCustomers(allCustomers => [...allCustomers, response.data])
    }

    nameRef.current.value = ""
    emailRef.current.value = ""
  }

  function handleEdit(customer: CustomerProps) {
    setEditingCustomer(customer)
    
    if (nameRef.current && emailRef.current) {
      nameRef.current.value = customer.name
      emailRef.current.value = customer.email
    }
  }

  async function handleDelete(id: string) {
    try {
      await api.delete("/customer", {
        params:{
          id: id,
        }
      })

      const allCustomers = customers.filter( (customer) => customer.id !== id )
      setCustomers(allCustomers)

    } catch(err) {
      console.log(err);
    }
  }

  return(
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">
          {editingCustomer ? 'Editar Cliente' : 'Clientes'}
        </h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome:</label>
          <input
            type="text"
            placeholder="Digite seu nome completo..."
            className="w-full mb-5 p-2 rounded"
            ref={nameRef}
          />

          <label className="font-medium text-white">Email:</label>
          <input
            type="email"
            placeholder="Digite seu E-mail..."
            className="w-full mb-5 p-2 rounded"
            ref={emailRef}
          />

          <input
            type="submit"
            value={editingCustomer ? "Atualizar" : "Cadastrar"}
            className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
          />

          {editingCustomer && (
            <button 
              type="button"
              onClick={() => {
                setEditingCustomer(null)
                if (nameRef.current && emailRef.current) {
                  nameRef.current.value = ""
                  emailRef.current.value = ""
                }
              }}
              className="mt-2 w-full p-2 bg-red-500 rounded font-medium"
            >
              Cancelar Edição
            </button>
          )}
        </form>

        <section className="flex flex-col gap-4">
          {customers.map( (customer) => (
            <article
              key={customer.id}
              className="w-full bg-white rounded p-2 relative hover:scale-105 duration-300"
            >
              <p><span className="font-medium">Nome: </span>{customer.name}</p>
              <p><span className="font-medium">Email: </span>{customer.email}</p>
              <p><span className="font-medium">Status: </span>{customer.status ? "ATIVO" : "INATIVO"}</p>
  
              <div className="absolute right-0 top-0 flex">
                <button
                  className="bg-blue-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-2 top-12"
                  onClick={() => handleEdit(customer)}
                >
                  <FiEdit2 size={18} color="#fff"/>
                </button>
                <button
                  className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-2 top-2"
                  onClick={() => handleDelete(customer.id)}
                >
                  <FiTrash size={18} color="#fff"/>
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}