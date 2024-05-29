export type Juego = {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number
}


//extiende de Juego
export type CartItem = Juego & {
    quantity: number
}
