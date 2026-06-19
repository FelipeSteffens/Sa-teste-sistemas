import React from 'react'

import logo from '../../assets/images/OIP.png'
import FormularioLogin from '../../components/FormularioLogin'

const Login = () => {
    return (
        <>
            <div className='flex min-h-screen bg-gray-100'>
                <div className='hidden md:flex w-1/2 bg-gray-200 flex-col items-center justify-center p-8'>
                    <img src={logo} alt='Catálogo de celulares' className='mb-6' />
                </div>
                <div className='flex w-full md:w-1/2 items-center justify-center p-8'>
                    <FormularioLogin />
                </div>
            </div>
        </>
    )
}

export default Login
