import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-lg font-bold">Catálogo de Celulares</h1>
                <div>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-white mr-4">Dashboard</Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="text-white">Admin</Link>
                            )}
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white mr-4">Login</Link>
                            <Link to="/register" className="text-white">Cadastro</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;