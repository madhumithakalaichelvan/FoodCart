import { useSelector, useDispatch} from "react-redux"
import { Card, Col, Row, Button } from "react-bootstrap";
import { useEffect, useState} from "react";
import { selectedCategoryTitle, selectedMealsTitle, selectedMeals, cartList } from "../Reducer/FoodReducer";
import './Home.css'
import CustomApi from "../Api/CustomApi";


export default function SingleCategory() {

    const dispatch = useDispatch()

    const data = useSelector((state) => state.foodReducer.selectedCategory)
    const selectedTitle = useSelector((state) => state.foodReducer.selectedCategoryTitle)
    const selectedMealTitle = useSelector((state) => state.foodReducer.selectedMealsTitle)
    const selectedMealData = useSelector((state) => state.foodReducer.selectedMeals)
    const cartListData = useSelector((state) => state.foodReducer.cartList)
    const selectedMealCartcount = cartListData.find((item) =>
        item.title == selectedMealTitle
    )
    const [isLoading, setIsLoading] = useState([]);

    useEffect(() => {

        return () => {
            dispatch(selectedCategoryTitle(''))
            dispatch(selectedMealsTitle(''))
        }
    }, [])

    const handelSelectedCategory = () => {
        dispatch(selectedMealsTitle(''))
    }

    const handelAllCategory = () => {
        dispatch(selectedCategoryTitle(''))
    }


    const handelMeals = async (item,itemIndex) => {
               setIsLoading(prev => ({
            ...prev,
            [itemIndex]: true 
        }));
        const data = await CustomApi("https://www.themealdb.com/api/json/v1/1/search.php?s=" + item)
        dispatch(selectedMeals(data))
        dispatch(selectedMealsTitle(item))

        const cartListData = {
            "title": item,
            "count": 1,
            "type": "default",
            "data": data.meals[0]
        }
        dispatch(cartList(cartListData))
        setIsLoading(prev => ({
            ...prev,
            [itemIndex]: false
        }));
    }

    const handelCartCountUpdate = (type, meal) => {
                const cartListData = {
            "title": meal,
            "type": type
        }
        dispatch(cartList(cartListData))
    }

    return (<>
        <h5 className="categoryRoute"><span onClick={() => { handelAllCategory() }} className="clickEvent">All Category</span><span className="clickEvent" onClick={() => { handelSelectedCategory() }}>{"/ " + selectedTitle}</span><span>{selectedMealTitle == "" ? "": "/ " + selectedMealTitle}</span></h5>
        {selectedMealTitle == "" ? <div>
            <Row className="categoriesRow">
                {data?.data?.meals?.length > 0 ? data.data.meals.map((item, index) => {
                    const cartdata = cartListData.find((data) => data.title == item.strMeal)
                    return (<>
                        <Col className="categoriesColSingle" xs={6} md={4} lg={3} xl={3} >
                            <Card className="">
                                <Card.Img className="categoriesImage" variant="top" src={item.strMealThumb} />
                                <Card.Body className="categoriesBody">
                                    <Card.Title className="titlePadding" >{item.strMeal}</Card.Title>
                                    <Card.Subtitle className="titlePadding" >{"$ " + item.idMeal}</Card.Subtitle>
                                    {cartdata == undefined || cartdata == {} || cartdata.count == 0 ?
                                        <Button   disabled={isLoading[index]} onClick={() => {handelMeals(item.strMeal,index) }} className="addtoCardButton" variant="primary">{isLoading[index] ? 'Adding...' : 'Add To Cart'}</Button>
                                        : 
                                        <span className="addtoCardButton">
                                            <Button className="cartCounterBtn" onClick={() => { handelCartCountUpdate("Dec", item.strMeal) }} >-</Button>
                                            <Button className="cartCountervalue" >{cartdata.count}</Button>
                                            <Button className="cartCounterBtn" onClick={() => { handelCartCountUpdate("Inc", item.strMeal) }}>+</Button>
                                        </span>
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    </>)
                })
                : ""}
            </Row>
        </div> :
            <div>
                <Row className="selectedMealRow">
                    <Col xs={12} md={7} lg={7} xl={7}>
                        <Card className="selectedMealCard">
                            <Card.Img className="selectedMealImage" variant="top" src={selectedMealData?.meals[0]?.strMealThumb} />
                        </Card>
                    </Col>
                    <Col xs={12} md={5} lg={5} xl={5}>
                        <Card className="selectedMealCard">
                            <Card.Body className="selectedMealBody">
                                <Card.Title className="titlePadding" >{selectedMealData?.meals[0]?.strMeal}</Card.Title>
                                <Card.Subtitle className="titlePadding" >{"$ " + selectedMealData?.meals[0]?.idMeal}</Card.Subtitle>
                                <Card.Text className="selectedMealText">{selectedMealData?.meals[0]?.strInstructions}</Card.Text>
                                <span className="">
                                    <Button className="cartCounterBtn" onClick={() => { handelCartCountUpdate("Dec", selectedMealData?.meals[0]?.strMeal) }} >-</Button>
                                    <Button className="cartCountervalue" >{selectedMealCartcount?.count}</Button>
                                    <Button className="cartCounterBtn" onClick={() => { handelCartCountUpdate("Inc", selectedMealData?.meals[0]?.strMeal) }}>+</Button>
                                </span>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        }

    </>)
}