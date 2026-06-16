import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const CriarUsuario = () => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [isPasswordMatch, setIsPasswordMatch] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    const isPasswordValid = () => senha.length >= 8 && senha === confirmarSenha

    const resetForm = () => {
        setEmail('')
        setSenha('')
        setConfirmarSenha('')
        setIsPasswordMatch(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isPasswordValid()) {
            setIsPasswordMatch(false)
            return
        }

        setIsSaving(true)

        try {
            await axios.post('http://localhost:3000/users', { email, password: senha })
            setIsSaving(false)
            resetForm()
            toast.success('Usuário criado com sucesso!', { autoClose: 2000, hideProgressBar: true })
        } catch (error) {
            console.error('Erro ao criar usuário', error)
            toast.error('Erro ao criar o usuário!', { autoClose: 2000, hideProgressBar: true })
            setIsSaving(false)
        }
    }

    return (
        <div className='w-full max-w-md p-6 bg-white rounded-xl'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Criar Usuário</h2>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor='email' className='block text-sm font-medium mb-1'>Email:</label>
                    <input type='email' id='email' data-testid="register-email" value={email} onChange={(e) => setEmail(e.target.value)} required className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                </fieldset>

                <fieldset>
                    <label htmlFor='password' className='block text-sm font-medium mb-1'>Senha:</label>
                    <input type='password' id='password' data-testid="register-password" value={senha} onChange={(e) => setSenha(e.target.value)} required minLength={8} className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                </fieldset>

                <fieldset>
                    <label htmlFor='confirmPassword' className='block text-sm font-medium mb-1'>Confirmar Senha:</label>
                    <input type='password' id='confirmPassword' data-testid="register-confirm" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required minLength={8} className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    {!isPasswordMatch && (<p className='text-red-500 text-sm mt-1'>As senhas não correspondem</p>)}
                </fieldset>

                <div>
                    <button data-testid="register-submit" type='submit' disabled={isSaving} className={`w-full p-2 rounded-lg text-white mt-4 ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'} transition-colors`}>{isSaving ? 'Salvando ...' : 'Criar Usuário'}</button>
                </div>
            </form>
        </div>
    )
}

export default CriarUsuario
