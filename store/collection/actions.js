import Api from '../../lib/Api'

const api = Api.create()

export default {
    async getCollection({ commit }, data) {
        const response = await api.getCollections(data)

        if (response.ok) {
            commit('getCollectionSuccess', response.data.data)
        } else {
            commit('getCollectionFailure', response)
        }
    },

    async showCollection({ commit }, data) {
        const response = await api.showCollection(data)

        if (response.ok) {
            commit('showCollectionSuccess', response.data.data)
        } else {
            commit('showCollectionFailure', response)
        }
    },
}