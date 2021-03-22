
const initialState = {
    cart: 0,
    prodId:[],
    pizzaId:[],
    beverageId:[],
    sidesAdded:[],
    pizzaAdded:[],
    beverageAdded:[]
}


const reducer = (state = initialState, action) => {
    // Increase Side 
    if (action.type === 'ADD') {
        // console.log("previous added" + state.sidesAdded);
        // console.log("In redux increment" + action.payload);
        return {
            ...state,
            prodId: [action.value, ...state.prodId],
            cart: state.cart + 1,
            sidesAdded: action.payload    
        }
    }
    // Decresae side
    if (action.type === 'REMOVE') {
        // console.log("previously removed" + state.sidesAdded);
        // console.log("In redux" + action.payload)
        const filteredId = state.prodId.filter(prod => prod !== action.value)
        return {
            ...state,
            prodId: filteredId,
            cart: state.cart -1,
            sidesAdded: action.payload         
        }
    }

// Increment pizza
    if (action.type === 'INCREMENT') {
        return {
            ...state,
            pizzaId: [action.value, ...state.pizzaId],
            cart: state.cart + 1,
            pizzaAdded:action.payload         
        } 
    }
// Decrement Pizza
    if (action.type === 'DECREMENT') {
        const filteredId = state.pizzaId.filter(pizza => pizza !== action.value)
        return {
            ...state,
            pizzaId: filteredId,
            cart: state.cart -1,
            pizzaAdded:action.payload          
        }
    }

    // Increment Beverage
    if (action.type === 'INCREASE') {
        return {
            ...state,
            beverageId: [action.value, ...state.beverageId],
            cart: state.cart + 1,
            beverageAdded:action.payload          
        } 
    }

    // Decrease beverage
    if (action.type === 'DECREASE') {
        const filteredId = state.beverageId.filter(beverage => beverage !== action.value)
        return {
            ...state,
            beverageId: filteredId,
            cart: state.cart -1,
            beverageAdded:action.payload           
        }
    }
    
    return state;
};

export default reducer;