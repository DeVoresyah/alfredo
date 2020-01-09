import Api from '../../lib/Api'

const api = Api.create()

export default {
    async getProducts({ commit }, data) {
        const response = await api.getProducts(data)

        if (response.ok) {
            commit('getProductSuccess', response.data.data)
        } else {
            commit('getProductFailure', response)
        }
    },

    async getProductDetail({ commit }, data) {
        commit('getProductDetailRequest')

        const response = await api.getProductDetail(data)

        if (response.ok) {
            commit('getProductDetailSuccess', response.data.data)
        } else {
            commit('getProductDetailFailure', response)
        }
    }
}