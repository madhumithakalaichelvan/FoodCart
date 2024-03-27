import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "selectedCategoryTitle": "",
    "selectedMealsTitle": "",
    "cartList": [],
    "orderList":[]
}               

const FoodReducer = createSlice({
    name: "FoodReducer",
    initialState,
    reducers: {
        categories(state, action) {
            state["categories"] = action.payload
        },
        selectedCategory(state, action) {
            state["selectedCategory"] = action.payload
            state["selectedCategoryTitle"] = action.payload
        },
        selectedCategoryTitle(state, action) {
            state["selectedCategoryTitle"] = action.payload
        },
        selectedMeals(state, action) {
            state["selectedMeals"] = action.payload
        },
        selectedMealsTitle(state, action) {
            state["selectedMealsTitle"] = action.payload
        },
        cartList(state, action) {
            switch (action.payload.type) {
                case "Inc":
                    return {
                        ...state,
                        cartList: state.cartList.map(item => {
                            if (item.title === action.payload.title) {
                                return {
                                    ...item,
                                    count: item.count + 1
                                };
                                                            }
                                                        return item;
                        })
                    };
                    case "Dec":
                        return {
                            ...state,
                            cartList: state.cartList
                                .map(item => {
                                    if (item.title === action.payload.title) {
                                        const newCount = item.count > 0 ? item.count - 1 : item.count;
                                        if (newCount > 0) {
                                            return {
                                                ...item,
                                                count: newCount
                                            };
                                        } else {
                                            return undefined;
                                        }
                                    }
                                    return item;
                                })
                                .filter(item => item !== undefined)
                        };
                    case "default":
                        return {
                            ...state,
                            cartList: [...state.cartList, action.payload]
                        };
                    default:
                        return state;
                    
            }
        },
        removeCartList(state,action){
            return {
                ...state,
                cartList : []
            }
        },
        orderList(state,action){
            if(action.payload.totalAmount == 0 || action.payload.orderData == []){
                return state
            }
            const newOrderId = state.orderList.length > 0 ? state.orderList[state.orderList.length - 1].orderId + 1 : 100;
            const newOrder = {
              orderId: newOrderId,
              totalAmount: action.payload.totalAmount,
              orderData: action.payload.orderData
            };
          
            return {
              ...state,
              orderList: [...state.orderList, newOrder]
            };
        }
    }

})

export const { categories, selectedCategory, selectedCategoryTitle, selectedMealsTitle, selectedMeals, cartList,removeCartList ,orderList } = FoodReducer.actions

export default FoodReducer.reducer