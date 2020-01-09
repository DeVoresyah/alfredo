export default {
    listOrderRequest: (state, data) =>
        state.list = { ...state.list, fetching: true, error: null },
    listOrderSuccess: (state, data) =>
        state.list = { ...state.list, data, fetching: false, error: null },
    listOrderFailure: (state, error) =>
        state.list = { ...state.list, fetching: false, error },

    addOrderRequest: (state, data) =>
        state.addOrder = { ...state.addOrder, fetching: true, error: null },
    addOrderSuccess: (state, data) =>
        state.addOrder = { ...state.addOrder, data, fetching: false, error: null },
    addOrderFailure: (state, error) =>
        state.addOrder = { ...state.addOrder, fetching: false, error },

    getOrderRequest: (state, data) =>
        state.getOrder = { ...state.getOrder, fetching: true, error: null },
    getOrderSuccess: (state, data) =>
        state.getOrder = { ...state.getOrder, data, fetching: false, error: null },
    getOrderFailure: (state, error) =>
        state.getOrder = { ...state.getOrder, fetching: false, error },

    confirmOrderRequest: (state, data) =>
        state.confirmation = { ...state.confirmation, fetching: true, error: null },
    confirmOrderSuccess: (state, data) =>
        state.confirmation = { ...state.confirmation, data, fetching: false, error: null },
    confirmOrderFailure: (state, error) =>
        state.confirmation = { ...state.confirmation, fetching: false, error },
}