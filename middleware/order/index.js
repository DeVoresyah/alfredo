export default function({ store, params, redirect }) {
    const { invoice } = params

    setTimeout(() => {
        if(!store.state.auth.session) {
            return redirect('/')
        }

        store.dispatch('order/listOrder', {q:''})
    }, 5)
}