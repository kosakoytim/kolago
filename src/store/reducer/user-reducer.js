var init_state = {
    state : {
        name : "",
        email : "",
        uid : null
    },
    success: false
}

export default function appRouteReducer(state = init_state, action) {
    switch (action.type) {
        case "SET_USER":
            return Object.assign({}, state, {
                state: action.data,
                success: true
            })
        default:
            return state;
    }
}