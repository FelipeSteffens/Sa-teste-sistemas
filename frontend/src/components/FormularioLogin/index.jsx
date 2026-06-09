import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify'

import { useNavigate } from 'react-router'

import axios from 'axios'

// Contexto
import { useAuth } from '../../contexts/AuthContext'

// Modal
import Modal from '../Modal'
import CriarUsuario from '../CriarUsuario'

const FormularioLogin = () => {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const navigate = useNavigate()

    const { login, user } = useAuth()

    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (user) {
            navigate('/painel')
        }
    }, [user, navigate])

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.get('http://localhost:3000/users', {
                params: { email, password: senha }
            })

            if (response.data.length === 0) {
                toast.error('Usuário não encontrado. Verifique o email e senha', { autoClose: 3000, hideProgressBar: true });
                return;
            }

            login(email)

            toast.success('Login realizado com sucesso!', { autoClose: 2000 })

            setTimeout(() => navigate('/painel', 2000))

        } catch (error) {
            console.error('Erro ao verificar usuário', error)
            toast.error('Erro ao conectar com o servidor', { autoClose: 3000 })
        }
    }

    return (
        <div className='max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg'>
            <h2 className='text-2xl font-bold text-center mb-6'>Entrar</h2>

            <form onSubmit={handleLogin} className='space-y-4'>
                <fieldset>
                    <label htmlFor='email' className='block text-sm font-medium mb-1'>Email</label>
                    <input type='email' id='email' data-testid="login-email" value={email} onChange={(e) => setEmail(e.target.value)} required className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                </fieldset>

                <fieldset>
                    <label htmlFor='password' className='block text-sm font-medium mb-1'>Senha:</label>
                    <input type='password' id='password' data-testid="login-password" minLength={8} value={senha} onChange={(e) => setSenha(e.target.value)} required className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                </fieldset>

                <button type='submit' data-testid="login-submit" className='w-full bg-cyan-700 text-white p-2 rounded-lg hover:bg-cyan-800 transition-colors'>Entrar</button>
            </form>

            <div className='flex justify-between mt-4 text-sm'>
                <button onClick={() => toast.info('Funcionalidade em desenvolvimento')} className='text-blue-600 hover:underline cursor-pointer'>Esqueceu sua senha?</button>
                <button data-testid="open-register" onClick={() => setIsModalOpen(true)} className='text-blue-600 hover:underline cursor-pointer'>Criar Conta</button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CriarUsuario />
            </Modal>
        </div>
    )
}

export default FormularioLogin
