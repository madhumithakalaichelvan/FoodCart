import { Link } from "react-router-dom";
import './Header.css'
import { useSelector } from "react-redux";


export default function Header (){

    const cartlistdata = useSelector(state=> state.foodReducer.cartList)
    var totalCount = 0;
    for (let item of cartlistdata) {
        totalCount += item.count;
    }
    return(<>
         <nav>
                <ul>
                    <li id="home" ><Link  to={'/home'} > Home </Link></li>
                    <li id="setting" ><Link >Settings</Link></li>
                    <li id="cart" ><Link to={'/cart'} >Cart {totalCount > 0 && <span className="notification-badge">{totalCount}</span>}</Link></li>
                </ul>
            </nav>
    </>)
}