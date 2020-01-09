export default function({ store, redirect }) {
    if(store.state.auth.session) {
        if (store.state.auth.continueToPath) {
            return redirect(continueToPath)
        } else {
            return redirect('/')
        }
    }
}