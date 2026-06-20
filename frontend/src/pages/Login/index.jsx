import React from 'react'

import loginCatalogo from '../../assets/images/login-catalogo.png'
import FormularioLogin from '../../components/FormularioLogin'

const Login = () => {
    return (
        <main className='min-h-screen bg-white md:grid md:grid-cols-2'>
            <section className='h-64 overflow-hidden bg-cyan-50 md:h-screen'>
                <img
                    src={loginCatalogo}
                    alt='Celulares do catálogo'
                    className='h-full w-[235%] max-w-none object-cover object-left'
                />
            </section>

            <section className='flex items-center justify-center px-5 py-10 sm:px-8'>
                <FormularioLogin />
            </section>
        </main>
    )
}

export default Login
