import { Link } from "react-router-dom";
import './Header.css'
import { useSelector } from "react-redux";
import settingIcon from "../Assets/setting.png"
import cartImage from "../Assets/carticons.png"


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
                    <li id="setting" ><Link ><img src={settingIcon} width= "25px" height= "25px"></img></Link></li>
                    <li id="cart" ><Link to={'/cart'} ><img src={cartImage} width= "25px" height= "25px"></img>{totalCount > 0 && <span className="notification-badge">{totalCount}</span>}</Link></li>
                </ul>
            </nav>
    </>)
}