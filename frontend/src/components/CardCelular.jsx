const CardCelular = ({ celular }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <img className="w-full" src={celular.image} alt={celular.name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{celular.name}</div>
                <p className="text-gray-700 text-base">
                    Preço: R${celular.price}
                </p>
            </div>
        </div>
    );
};

export default CardCelular;