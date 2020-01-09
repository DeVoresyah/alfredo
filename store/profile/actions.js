import Api from '../../lib/Api'

const api = Api.create()

export default {
    async getProfile({ commit }, data) {
        commit('getProfileRequest')

        api.api.setHeaders({
            'X-AUTH-TOKEN': data.token
        })
        
        const response = await api.getProfile()

        if (response.ok) {
            commit('getProfileSuccess', response.data.data)
        } else {
            commit('getProfileFailure', response)
        }
    }
}