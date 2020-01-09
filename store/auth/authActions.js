import Api from '../../lib/Api'
import Swal from 'sweetalert2'
import { debounce } from 'debounce'

const api = Api.create()

export default {
    async initForm({ commit }) {
        commit('initForm')
    },

    async doLogin({ router, commit }, data) {
        commit('doLoginRequest')

        const response = await api.authLogin(data)

        if (response.ok) {
            api.api.setHeaders({
                'X-AUTH-TOKEN': `Bearer ${response.data.data.token}`
            })

            commit('doLoginSuccess', response.data.data)
            commit('getProfile')

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
              
            Toast.fire({
                icon: 'success',
                title: 'You have successfully logged in.'
            })

            debounce(data.path ? this.$router.replace({ path: data.path }) : this.$router.replace({ path: '/' }), 2500)
        } else {
            commit('doLoginFailure', response)
        }
    },

    async doLogout({ commit }, data) {
        commit('doLogout')

        data.path ? this.$router.replace({ path: data.path }) : this.$router.replace({ path: '/' })
    },

    async doRegister({ commit }, data) {
        commit('doRegisterRequest')

        const response = await api.authRegister(data)

        if (response.ok) {
            api.api.setHeaders({
                'X-AUTH-TOKEN': `Bearer ${response.data.data.token}`
            })

            commit('doRegisterSuccess', response.data.data)

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
              
            Toast.fire({
                icon: 'success',
                title: 'Your account has been created.'
            })

            debounce(data.path ? this.$router.replace({ path: data.path }) : this.$router.replace({ path: '/' }), 2500)
        } else {
            commit('doRegisterFailure', response)
        }
    },

    async validateUsername({ commit }, data) {
        const response = await api.validateUsername(data)

        console.log(response)

        if (response.ok) {
            commit('validateUsernameSuccess', response.data.data)
        } else {
            commit('validateUsernameFailure', response.data.data)
        }
    },

    async validateEmail({ commit }, data) {
        const response = await api.validateEmail(data)

        if (response.ok) {
            commit('validateEmailSuccess', response.data.data)
        } else {
            commit('validateEmailFailure', response.data.data)
        }
    }
}