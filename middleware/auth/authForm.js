import { debounce } from 'debounce'

export default function({ isServer, req, store, redirect }) {
    
    setTimeout(() => {
        console.log(store.state.auth)
        if(store.state.auth.session) {
            if (store.state.auth.continueToPath != '') {
                return redirect(store.state.auth.continueToPath)
            } else {
                return redirect('/')
            }
        } else {
            store.dispatch('auth/initForm')
        }
    }, 10)
}