export default function({ store, redirect }) {
    setTimeout(() => {
        if(!store.state.auth.session) {
            if (store.state.auth.continueToPath) {
                return redirect(store.state.auth.continueToPath)
            } else {
                return redirect('/auth/sign-in')
            }
        }
    }, 5)
}