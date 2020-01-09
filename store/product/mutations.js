export default {
    getProductRequest: (state, data) => {
        state.latestProduct = { ...state.latestProduct, fetching: true, error: null }
    },
    getProductSuccess: (state, data) => {
        state.latestProduct = { ...state.latestProduct, data, fetching: false, error: null }
    },
    getProductFailure: (state, error) => {
        state.latestProduct = { ...state.latestProduct, fetching: false, error }
    },

    getProductDetailRequest: (state, data) =>
        state.productDetail = { ...state.productDetail, fetching: true, error: null },
    getProductDetailSuccess: (state, data) =>
        state.productDetail = { ...state.productDetail, data, fetching: false, error: null },
    getProductDetailFailure: (state, error) =>
        state.productDetail = { ...state.productDetail, fetching: false, error },
}