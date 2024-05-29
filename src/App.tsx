import { useReducer, useEffect } from "react"
import Header from "./componets/Header"
import Footer from "./componets/Footer"
import Juegos from "./componets/Juegos"
import { CartReducer, initialState } from "./reducers/cart-reducer"


const App = () => {

const [state, dispatch] = useReducer(CartReducer, initialState)
  
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(state.cart))
}, [state.cart]);


  return (
    <>
    <Header 
    cart={state.cart} 
    dispatch={dispatch}   
    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Productos Destacados</h2>

        <div className="row mt-5">
            {state.data.map((juego) => (
                <Juegos 
                key={juego.id} 
                juego={juego}
                dispatch={dispatch}
            />
            ))}

        </div>
    </main>
    <Footer />
    </>
  )
}

export default App