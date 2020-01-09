export default function({ store, params }) {
    const { slug } = params

    store.dispatch('product/getProductDetail', {slug})
}