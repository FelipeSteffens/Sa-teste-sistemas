import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    //se já tiver email no localStorage, mantém login

    useEffect(() => {
        const savedUser = localStorage.getItem("user")
        const savedEmail = localStorage.getItem("email")

        if (savedUser) {
            setUser(JSON.parse(savedUser))
        } else if (savedEmail) {
            setUser({ email: savedEmail })
        }

    }, [])

    const login = (userData) => {
        const normalizedUser = typeof userData === "string" ? { email: userData } : userData

        localStorage.setItem("user", JSON.stringify(normalizedUser))
        localStorage.setItem("email", normalizedUser.email)
        setUser(normalizedUser)
    }

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("email")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

//hook customizado para consumir o contexto

export const useAuth = () => useContext(AuthContext)
