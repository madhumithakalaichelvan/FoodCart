
import { Card, Col, Row, Button } from "react-bootstrap";
import './Home.css'
import { useSelector, useDispatch } from "react-redux"
import { cartList, orderList, removeCartList } from "../Reducer/FoodReducer";
import './Cart.css'



export default function Cart() {
    let totalAmount =0 ;
    const dispatch = useDispatch()
    const cartListData = useSelector((state) => state.foodReducer.cartList)
    const orderLists =  useSelector((state)=> state.foodReducer.orderList)

    const handelCartCountUpdate = (type, meal) => {
        const cartListData = {
            "title": meal,
            "type": type
        }
        dispatch(cartList(cartListData))
    }

    const placeorder =(totalAmount , cartData)=>{
        const orderListData = {
            "totalAmount": totalAmount,
            "orderData": cartData
        }
        dispatch(orderList(orderListData))
        dispatch(removeCartList())
    }

    return (<>
        {cartListData.length > 0 ?
            <div>
                <Row className="cartMealRow">
                    <h5>Cart Items</h5>
                    <Col className="cartOrderCol" xs={12} md={8} lg={8} xl={8}>
                        {cartListData.length > 0 ?cartListData.filter(items=>items.count>0).map((item) => {
                            return (<>
                                <Card className="cartMealCard">
                                    <div className="cartOrderDetails">
                                        <Card.Img className="cartMealImage" variant="top" src={item.data.strMealThumb} />
                                        <div className="cartElementMargin">
                                            <Card.Title className="titlePadding" >{item.title}</Card.Title>
                                            <Card.Subtitle className="titlePadding" >{"$ " + item.data.idMeal}</Card.Subtitle>
                                        </div>
                                    </div>
                                    <div className="cartElementMargin cartIncBtn">
                                        <Button className="cartCounterBtn" onClick={() => { handelCartCountUpdate("Dec", item.title) }} >-</Button>
                                        <Button className="cartCounterBtn cartCountervalue" >{item.count}</Button>
                                        <Button className="cartCounterBtn" onClick={() => { handelCartCountUpdate("Inc", item.title) }}>+</Button>
                                    </div>
                                </Card>
                            </>)
                        }) : ""}

                    </Col>
                    <Col xs={12} md={4} lg={4} xl={4}>
                        <Card className="cardOrderDetails">
                            <Card.Body className="cartMealBody">
                                {cartListData.length > 0 ? cartListData.filter(items=>items.count>0).map((item) => {
                                    totalAmount = totalAmount + item.count*item.data.idMeal
                                    return (<>
                                        <div className="cartOrderDetails">
                                            <Card.Title className="titlePadding" >{item.title}</Card.Title>
                                            <Card.Subtitle className="titlePadding" >{item.count + " x " + item.data.idMeal + " = $ " + item.count*item.data.idMeal }</Card.Subtitle>
                                        </div>
                                    </>)
                                })
                                : ""}
                                <h5 className="totalAmount">{"Total" + " =  $ " + totalAmount}</h5>
                            </Card.Body>
                            <Button onClick={()=>{placeorder(totalAmount , cartListData)}} className="placeOrderBtn">Place Order</Button>
                        </Card>
                    </Col>
                </Row>
            </div>
            :
            <div>
                
                <Row className="orderMealRow">
                    <h1>Your cart is empty. Kindly add items to continue shopping</h1>  
                    <Col className="orderCol" xs={12} md={8} lg={8} xl={8}>
                    
                    <h4>Orders</h4>
                    {orderLists.map((order) => (
                        <Card className="orderMealCard" key={order.orderId}>
                            <div className="orderId">
                                <h5>{"Order ID : " + order.orderId}</h5>
                                <h5>{"Total : $ " + order.totalAmount}</h5>
                            </div>
                            <Card.Title className="">{"Items"}</Card.Title>
                            {order.orderData.filter(item => item.count > 0).map((item) => (
                                <div className="orderList" key={item.title}>
                                    <div className="orderDetails">
                                        <Card.Img className="orderMealImage" variant="top" src={item.data.strMealThumb} />
                                        <div className="orderElementMargin">
                                            <Card.Title className="titlePadding">{item.title}</Card.Title>
                                            <Card.Subtitle className="titlePadding">{"$ " + item.data.idMeal}</Card.Subtitle>
                                        </div>
                                    </div>
                                    <div>
                                        <Card.Subtitle className="titlePadding">{item.count + " x " + item.data.idMeal + " = $ " + item.count * item.data.idMeal}</Card.Subtitle>
                                    </div>
                                </div>
                            ))}
                        </Card>
                    ))
                        }
                    </Col>

                </Row>
            </div>}
    </>)
}