export default function({ store, redirect }) {
    setTimeout(() => {
        if(store.state.auth.session) {
            store.dispatch('profile/getProfile', {
                token: `Bearer ${store.state.auth.session.token}`
            })
        }
    }, 10)
}