import apisauce from 'apisauce'

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token d5a705c1031abd1e977ff66de201a6e18/s11wXOvp6SkWXVbp/PxUVjIIy99jx+saeF3eqsGauI+0hJ2NKrNMLO/GCkBCk/',
  }

// our "constructor"
const create = (baseURL = 'http://localhost:3333/api/v1/') => {
    const api = apisauce.create({
        // base URL is read from the "constructor"
        baseURL,
        // here are some default headers
        headers: headers,
        // 10 second timeout...
        timeout: 10000
    })

    api.addResponseTransform(response => {
        if (!response.ok) {

            let msgError = "No Internet Connection"
            if (response.data && response.data.data && response.data.data.message) {
                msgError = response.data.data.message
            }

            response.data = {
                response: {
                    status: 404,
                    message: msgError
                },
                data: {
                    message: msgError
                }
            }
        }
    })

    // Auth
    const authLogin = (data) => api.post(`/account/sign-in`, data)
    const authRegister = (data) => api.post(`/account/sign-up`, data)

    // Profile
    const getProfile = (data) => api.get(`/account/profile`)

    // Validate
    const validateUsername = (data) => api.post(`/validate/username`, data)
    const validateEmail = (data) => api.post(`/validate/email`, data)

    // Product
    const getProducts = (data) => api.get(`/products?page=${data.page}`)
    const getProductDetail = (data) => api.get(`/products/${data.slug}`)

    // Collection
    const getCollections = (data) => api.get(`/category`)
    const showCollection = (data) => api.get(`/category/${data.slug}`)

    // Order
    const listOrder = (data) => api.get(`/order`, data)
    const nextOrder = (data) => api.get(`/order?page=${data.page}`, data)
    const addOrder = (data) => api.post(`/order`, data)
    const getOrder = (data) => api.get(`/order/${data.invoice}`)
    const confirmOrder = (data) => api.post(`/order/confirm`, data)

    return {
        // Validate
        validateUsername,
        validateEmail,

        // Profile
        getProfile,
        
        // Auth
        authLogin,
        authRegister,
        
        // Product
        getProducts,
        getProductDetail,

        // Collection
        getCollections,
        showCollection,

        // Order
        listOrder,
        nextOrder,
        addOrder,
        getOrder,
        confirmOrder,

        api,
        headers,
    }
}

// let's return back our create method as the default.
export default {
    create
}