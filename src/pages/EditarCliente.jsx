import { Form, useNavigate, useLoaderData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import { actualizarCliente, obtenerCliente } from "../data/clientes";
import Swal from 'sweetalert2'


export async function loader({ params }) {
    const cliente = await obtenerCliente(params.clienteId)
    if (Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'No hay resultados'
        })
    }
    return cliente
}

export async function action({ request, params }) {
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    const email = formData.get('email')

    //Validacion
    if (Object.values(datos).includes('')) {
        Swal.fire({
            icon: 'error',
            title: 'Oops.. ¡Hubo un Error!',
            text: 'Todos los campos son obligatorios!',
            confirmButtonText: 'Intentar de nuevo'
        }).then((result) => {
            if (result.value) {
                return
            }
        })

    }

    // Expresion regular para comprobar el email
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regex.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            text: 'El email no es valido',
        });

    }

    // Actualizar el cliente
    await actualizarCliente(params.clienteId, datos)
    return redirect('/')

}

function EditarCliente() {
    const navigate = useNavigate()
    const cliente = useLoaderData()


    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
            <p className='mt-10'>A continuacion podras modifiar los datos de un cliente</p>

            <div className='flex justify-end'>
                <button
                    className='bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded'
                    onClick={() => navigate(-1)}
                >Volver</button>
            </div>

            <div className='bg-white shadow rounded-md md:w-3/4 px-5 mx-auto py-10 mt-20'>

                <Form
                    method='post'
                    noValidate
                >
                    <Formulario
                        cliente={cliente}
                    />
                    <input
                        type="submit"
                        className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer' value="Editar Cliente"></input>
                </Form>
            </div>

        </>
    )
}

export default EditarCliente