export default function({ store, params }) {
    const { slug } = params

    store.commit('collection/showCollectionRequest')
    store.commit('collection/getCollectionRequest')
    
    store.dispatch('collection/getCollection')
    store.dispatch('collection/showCollection', {slug})
}