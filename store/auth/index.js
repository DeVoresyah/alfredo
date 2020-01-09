import VuexPersistence from 'vuex-persist'
import authState from './authState'
import authActions from './authActions'
import authMutations from './authMutations'
import authGetters from './authGetters'

// const vuexLocal = new VuexPersistence({
//     storage: window.localStorage,
//     reducer: (state) => ({
//         session: state.auth.session
//     })
// })

export const state = authState
export const actions = authActions
export const mutations = authMutations
export const getters = authGetters
// export const plugins = [vuexLocal.plugin]