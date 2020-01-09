export default {
    getProfileRequest: (state) =>
        state.profile = { ...state.profile, fetching: true, error: null },
    getProfileSuccess: (state, data) =>
        state.profile = { ...state.profile, data, fetching: false, error: null },
    getProfileFailure: (state, error) =>
        state.profile = { ...state.profile, fetching: false, error },
}