export default function({ store }) {
    store.commit('collection/getCollectionRequest')
    store.dispatch('collection/getCollection')
}