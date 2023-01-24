import Swal from 'sweetalert2'
import { useNavigate, Form, redirect } from 'react-router-dom'
import Formulario from '../components/Formulario'
import { agregarCliente } from '../data/clientes'

export async function action({ request }) {
    const formData = await request.formData()

    const datos = Object.fromEntries(formData)
    const email = formData.get('email')

    // Expresion regular para comprobar el email
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regex.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Hubo un error',
            text: 'El email no es valido',
        });
    }

    //Validacion
    if (Object.values(datos).includes('')) {
        Swal.fire({
            icon: 'error',
            title: 'Oops.. ¡Hubo un Error!',
            text: 'Todos los campos son obligatorios!',
            confirmButtonText: 'Intentar de nuevo'
        })

    }
    await agregarCliente(datos)
    return redirect('/')

}

const NuevoCliente = () => {
    const navigate = useNavigate()
    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
            <p className='mt-10'>Llena todos los campos para registrar un nuevo cliente</p>

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
                    <Formulario />
                    <input
                        type="submit"
                        className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer' value="Registrar Cliente"></input>
                </Form>
            </div>

        </>
    )
}

export default NuevoCliente