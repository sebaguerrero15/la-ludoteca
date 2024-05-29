import type { Juego, CartItem } from "../types/Juego"
import { db } from "../data/db"



export type CartActions =
{ type: 'add-to-cart', payload: {item: Juego} } |
{ type: 'remove-from-cart', payload: {id: Juego['id']}} |
{ type: 'decrease-from-cart', payload: {id: Juego['id']}} |
{ type: 'increase-from-cart', payload: {id: Juego['id']}} |
{ type: 'clear-cart'}

export type CartState = {
    data: Juego[],
    cart: CartItem[]
}

const initialCart = () : CartItem[] => {
    const localStorageCart  = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

export const initialState : CartState = {
    data: db,
    cart: initialCart()
}

const MAX_ITEMS = 5
const MIN_ITEMS = 1



export const CartReducer = (
    state: CartState = initialState,
    action: CartActions
) => {
    if(action.type === 'add-to-cart') {
        const itemExist = state.cart.find(juego => juego.id === action.payload.item.id)
        let updateCart : CartItem[] = []
              if(itemExist){
                updateCart = state.cart.map(item => {
                    if(item.id === action.payload.item.id){
                        if(item.quantity < MAX_ITEMS){
                            return {...item, quantity: item.quantity +1}
                        } else {
                            return item
                        }
                    }else {
                        return item
                    }
                })
                 
              }else {
                const newItem: CartItem = {...action.payload.item, quantity : 1}
                updateCart = [...state.cart, newItem]
              }
        return {
            ...state,
            cart: updateCart

        }
    }

    if(action.type === 'remove-from-cart') {
        const updatedCart = state.cart.filter(item => item.id !== action.payload.id)
        return {
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === 'increase-from-cart') {
            const cart = state.cart.map(item => {
                if(item.id === action.payload.id && item.quantity < MAX_ITEMS){
                    return { ...item, 
                        quantity: item.quantity + 1}
                }
                return item
            })
         
        return {
            ...state,
            cart
        }
    }

    if(action.type === 'decrease-from-cart') {
        const cart = state.cart.map(item => {
            if(item.id === action.payload.id && item.quantity > MIN_ITEMS){
                return { ...item, 
                    quantity: item.quantity - 1}
            }
            return item
        })
        
        return {
            ...state,
            cart
        }
    }

    if(action.type === 'clear-cart') {
        return {
            ...state,
            cart:[]
        }
    }
    return state
}