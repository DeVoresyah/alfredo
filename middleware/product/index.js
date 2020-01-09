export default function({ store }) {
    store.commit('product/getProductRequest')
    store.dispatch('product/getProducts', {page:1})
}