<template>
  <main id="main-container" v-if="product.data">
    <!-- Hero -->
    <div class="bg-primary mb-3">
      <div class="bg-pattern bg-black-op-25" style="background-image: url('/assets/media/various/bg-pattern.png');">
        <div class="content text-center">
          <div class="pt-50 pb-20">
            <h1 class="font-w700 text-white mb-10">{{ product.data.title }}</h1>
          </div>
        </div>
      </div>
    </div>
    <!-- END Hero -->

    <div class="container mt-30 mb-20">
        <div class="row">
            <div class="col-sm-12">
                <div class="block">
                    <div class="block-content nice-copy">
                        <div class="row mb-3 pb-2">
                            <div class="col-md-4 col-lg-4">
                                <v-lazy-image :src="product.data.thumbnail" class="img-fluid" />
                            </div>
                            
                            <div class="col-md-8 col-lg-8 productWrapper">
                                <div>
                                    <h2 class="h3 font-w700 mb-2">{{ product.data.title }}</h2>
                                    <span class="text-muted">Stock: {{ product.data.stock }}</span>

                                    <p class="text-primary-darker mt-10"><span class="h5 font-w700">Description:</span> <br> {{ product.data.desc }}</p>
                                </div>

                                <div>
                                    <h4 class="font-w700">Price: Rp{{ formatIdr(product.data.price * quantity) }},-</h4>
                                    
                                    <div class="row">
                                        <div class="col-md-6 col-lg-6">
                                            <div class="inputWrapper mt-10">
                                                <h5 class="font-w700 mb-0 mr-10">Quantity:</h5>
                                                <div class="input-group ml-5">
                                                    <div class="input-group-prepend">
                                                        <button type="button" class="btn btn-secondary" :disabled="quantity <= 1" @click="delQty"><i class="fa fa-minus"></i></button>
                                                    </div>
                                                    <input type="number" class="form-control" id="quantity" name="quantity" v-model="changeQty">
                                                    <div class="input-group-append">
                                                        <button type="button" class="btn btn-secondary" :disabled="quantity >= product.data.stock" @click="addQty"><i class="fa fa-plus"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-6">
                                            <button class="btn btn-primary btn-hero btn-block" @click="onBuy"><span class="h5 font-w700 text-white">Buy Now</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </main>
</template>

<script>
import VLazyImage from "v-lazy-image"
import TextUtil from '../../lib/TextUtil'
import { mapState, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
    middleware: 'product/show',
    head() {
        return {
            title: this.product.data && `${this.product.data.title} - ${process.env.npm_package_name}`
        }
    },
    components: {
        VLazyImage
    },
    data() {
        return {
            quantity: 1
        }
    },
    computed: {
        changeQty: {
            get: function() {
                return this.quantity
            },
            set: function(value) {
                value >= this.product.data.stock ? this.quantity = this.product.data.stock : this.quantity = value
            }
        },
        ...mapState({
            session: state => state.auth.session,
            product: state => state.product.productDetail
        })
    },
    methods: {
        formatIdr: (int) => new TextUtil().formatMoney(int),
        addQty() {
            this.quantity = this.quantity + 1
        },
        delQty() {
            this.quantity = this.quantity - 1
        },
        onBuy() {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            
            if (!this.session) {
                Toast.fire({
                    icon: 'error',
                    title: 'Please login to continue'
                })
            } else {
                const { id } = this.product.data
                
                const dataToBuy = {
                    product_id: id,
                    qty: this.quantity
                }

                this.addOrder(dataToBuy)
            }
        },
        ...mapActions({
            addOrder: 'order/addOrder'
        })
    },
}
</script>

<style>
.productWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.inputWrapper {
    display: flex;
    align-items: center;
}
</style>