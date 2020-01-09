export default {
    getCollectionRequest: (state, data) => 
        state.list = { ...state.list, fetching: true, error: null },
    getCollectionSuccess: (state, data) => 
        state.list = { ...state.list, data, fetching: false, error: null },
    getCollectionFailure: (state, error) => 
        state.list = { ...state.list, fetching: false, error },

    showCollectionRequest: (state, data) =>
        state.detail = { ...state.detail, fetching: true, error: null },
    showCollectionSuccess: (state, data) =>
        state.detail = { ...state.detail, data, fetching: false, error: null },
    showCollectionRequest: (state, error) =>
        state.detail = { ...state.detail, fetching: false, error },
}