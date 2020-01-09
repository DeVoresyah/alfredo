export default {
    initForm: (state) => {
        state.doLogin = {
            data: null,
            fetching: false,
            error: null
        },
        state.doRegister = {
            data: null,
            fetching: false,
            error: null
        },
        state.validateUsername = {
            data: null,
            fetching: false,
            error: null
        },
        state.validateEmail = {
            data: null,
            fetching: false,
            error: null
        }
    },

    setContinuePath: (state, data) =>
        state.continueToPath = data,
        
    doLoginRequest: (state, data) => 
        state.doLogin = { ...state.doLogin, fetching: true, error: null },
    doLoginSuccess: (state, data) => {
        state.doLogin = { ...state.doLogin, data, fetching: false, error: null }
        state.session = data
    },
    doLoginFailure: (state, error) => 
        state.doLogin = { ...state.doLogin, fetching: false, error },

    doLogout: (state) =>
        state.session = null,

    doRegisterRequest: (state, data) =>
        state.doRegister = { ...state.doRegister, fetching: true, error: null },
    doRegisterSuccess: (state, data) => {
        state.doRegister = { ...state.doRegister, data, fetching: false, error: null },
        state.session = data
    },
    doRegisterFailure: (state, error) =>
        state.doRegister = { ...state.doRegister, fetching: false, error },

    validateUsernameRequest: (state, data) =>
        state.validateUsername = { ...state.validateUsername, fetching: true, error: null },
    validateUsernameSuccess: (state, data) =>
        state.validateUsername = { ...state.validateUsername, data, fetching: false, error: null },
    validateUsernameFailure: (state, error) =>
        state.validateUsername = { ...state.validateUsername, fetching: false, error },

    validateEmailRequest: (state, data) =>
        state.validateEmail = { ...state.validateEmail, fetching: true, error: null },
    validateEmailSuccess: (state, data) =>
        state.validateEmail = { ...state.validateEmail, data, fetching: false, error: null },
    validateEmailFailure: (state, error) =>
        state.validateEmail = { ...state.validateEmail, fetching: false, error },
}