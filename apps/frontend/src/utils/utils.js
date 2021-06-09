export const getBackColor = (key) => {
    const colors = {
        'Reparar': "text-yellow-600 bg-yellow-200 ",
        'Cotizar': "text-blue-600 bg-blue-200 ",
        'Comprar Pieza': "text-purple-600 bg-purple-200 ",
        'Esperando Refacción': "text-pink-600 bg-pink-200 ",
        'Entregar': "text-green-600 bg-green-200 ",
        'Entregado': "text-green-900 bg-green-500 ",
        'Pendiente': "text-pink-900 bg-pink-500 ",
        'En Otro Taller': "text-blue-900 bg-blue-500 ",
        'Perdido o Comprado': "text-red-900 bg-red-500 "
    }

    return colors[key]
};