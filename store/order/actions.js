import Api from '../../lib/Api'
import Swal from 'sweetalert2'

const api = Api.create()

export default {
    async listOrder({ state, commit }, data) {
        commit('listOrderRequest')

        const { token } = this.state.auth.session
        api.api.setHeaders({
            'X-AUTH-TOKEN': `Bearer ${token}`
        })
        
        const response = await api.listOrder(data)

        if (response.ok) {
            commit('listOrderSuccess', response.data.data)
        } else {
            commit('listOrderFailure', response)
        }
    },
    async nextOrder({ state, commit }, data) {
        commit('listOrderRequest')

        const { token } = this.state.auth.session
        api.api.setHeaders({
            'X-AUTH-TOKEN': `Bearer ${token}`
        })
        
        const response = await api.listOrder(data)

        if (response.ok) {
            commit('listOrderSuccess', response.data.data)
        } else {
            commit('listOrderFailure', response)
        }
    },
    async addOrder({ state, commit }, data) {
        commit('addOrderRequest')

        const { token } = this.state.auth.session
        api.api.setHeaders({
            'X-AUTH-TOKEN': `Bearer ${token}`
        })

        const response = await api.addOrder(data)

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        if (response.ok) {
            commit('addOrderSuccess', response.data.data)
            Toast.fire({
                icon: 'success',
                title: 'You have successfully bought this product.'
            })

            setTimeout(() => this.$router.push(`/order/${response.data.data.invoice_id}`), 2000)
        } else {
            commit('addOrderFailure', response)
            Toast.fire({
                icon: 'error',
                title: 'Failed to buy this product, please try again.'
            })
        }
    },

    async getOrder({ commit }, data) {
        commit('getOrderRequest')

        const { token } = this.state.auth.session
        api.api.setHeaders({
            'X-AUTH-TOKEN': `Bearer ${token}`
        })

        const response = await api.getOrder(data)

        if (response.ok) {
            commit('getOrderSuccess', response.data.data)
        } else {
            commit('getOrderFailure', response)
        }
    },

    async confirmOrder({ commit }, data) {
        commit('confirmOrderRequest')

        const { token } = this.state.auth.session
        api.api.setHeaders({
            'X-AUTH-TOKEN': `Bearer ${token}`
        })

        const response = await api.confirmOrder(data)

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        if (response.ok) {
            commit('confirmOrderSuccess', response.data.data)

            Toast.fire({
                icon: 'success',
                title: 'Thanks! We have receive your payment confirmation.'
            })

            setTimeout(() => this.$router.push(`/order`), 2000)
        } else {
            commit('confirmOrderFailure', response)
        }
    }
}