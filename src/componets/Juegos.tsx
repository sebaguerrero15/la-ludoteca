import { CartActions } from "../reducers/cart-reducer"
import { Juego } from "../types/Juego"

type JuegosProps = {
  juego: Juego,
  dispatch: React.Dispatch<CartActions>
}


const Juegos = ({juego, dispatch}: JuegosProps) => {

  const {image, name, price} = juego


  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
    <div className="col-4">
        <img className="img-fluid" src={image} alt="imagen guitarra" />
    </div>
    <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p className="fw-black text-primary fs-3">${price}</p>
        <button 
            type="button"
            className="btn btn-dark w-100"
            onClick={() => dispatch({type: 'add-to-cart', payload:{item: juego}})}
        >Agregar al Carrito</button>
    </div>
</div>
  )
}

export default Juegos