import { useEffect } from "react"
import CustomApi from "../Api/CustomApi"
import { useDispatch , useSelector} from "react-redux"
import { categories}    from "../Reducer/FoodReducer"
import './Home.css';
import AllCategory from "./AllCategory";
import SingleCategory from "./SingleCategory";

export default function Home() {
    
    const dispatch = useDispatch()
    const fetchcall = async () => {
        const data = await CustomApi("https://www.themealdb.com/api/json/v1/1/categories.php")
        console.log(data,"categorydata")
        if (data) {
            dispatch(categories(data.categories))
        }
    }

    const selectedCategory = useSelector((state)=>state.foodReducer.selectedCategoryTitle)
    console.log("selectedcategory",selectedCategory)

    useEffect(() => {
        fetchcall()
    }, [])

    return (<>
        {selectedCategory == "" ? <AllCategory></AllCategory> : <SingleCategory></SingleCategory>}
    </>)
}