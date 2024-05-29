import { useMemo } from "react";
import { CartActions } from "../reducers/cart-reducer";
import { FaShoppingCart } from "react-icons/fa";
import { CartItem } from "../types/Juego";

type HeaderProps = {
  cart: CartItem[]
  dispatch: React.Dispatch<CartActions>
}

const Header = ({ cart, dispatch} : HeaderProps) => {

  const isEmpty = useMemo( () => cart.length === 0, [cart])

  const cartTotal = useMemo( () => cart.reduce((total, carrito) => total + (carrito.price * carrito.quantity), 0 ), [cart])
    
  return (
    <header className="py-3 header items-center">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="./public/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <FaShoppingCart className="cursor-pointer text-white text-3xl" />

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                    <>
                  <table className="w-100 table">
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {cart.map((carrito) => (
                        <tr key={carrito.id}>
                          <td>
                            <img
                              className="img-fluid"
                              src={carrito.image}
                              alt={carrito.name}
                            />
                          </td>
                          <td>{carrito.name}</td>
                          <td className="fw-bold">${carrito.price}</td>
                          <td className="flex align-items-start gap-4">
                            <button type="button" className="btn btn-dark" onClick={() => dispatch({type: 'decrease-from-cart', payload: {id: carrito.id}})}>
                              
                              -
                            </button>
                            {carrito.quantity}
                            <button type="button" className="btn btn-dark" onClick={() => dispatch({type: 'increase-from-cart', payload: {id: carrito.id}})}>
                              +
                            </button>
                          </td>
                          <td>
                            <button onClick={() => dispatch({type: 'remove-from-cart', payload: {id: carrito.id}})} className="btn btn-danger" type="button">
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              
                <p className="text-end">
                  Total pagar: <span className="fw-bold">${cartTotal}</span>
                </p>
                </>
                  )}
                <button
                onClick={() => dispatch({type: 'clear-cart'})} 
                className="btn btn-dark w-100 mt-3 p-2">
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
