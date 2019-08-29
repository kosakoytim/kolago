var init_state = {
    state : {
        id: "",
        brand : "",
        category : "",
        companyAddress: "",
        companyName: "",
        description: "",
        franchiseCount: 0,
        history: "",
        logo: "",
        photos: [],
        price: 0,
        revenueEstimation: ""
    }
}

export default function chosenFranchiseReducer(state = init_state, action) {
    switch (action.type) {
        case "SET_CHOSEN_FRANCHISE":
            return Object.assign({}, state, {
                state: action.data
            })
        default:
            return state;
    }
}