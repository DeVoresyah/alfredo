<template>
  <main id="main-container">
    <!-- Hero -->
    <div class="bg-primary mb-3">
      <div class="bg-pattern bg-black-op-25" style="background-image: url('assets/media/various/bg-pattern.png');">
        <div class="content text-center">
          <div class="pt-50 pb-20">
            <h1 class="font-w700 text-white mb-10">Alfredo</h1>
            <h2 class="h4 font-w400 text-white-op">Beli Aja Dulu</h2>
          </div>
        </div>
      </div>
    </div>
    <!-- END Hero -->

    <div class="content content-full">
      <div class="row mt-6">
        <div class="col-12">
          <h3 class="text-primary-darker mb-3">Produk Terbaru</h3>

          <div class="row">
            <div class="col-lg-3 col-md-3" v-for="(item, index) in latestProduct && latestProduct.data" :key="index">
              <div class="block">
                <div style="width:100%; overflow:hidden;">
                  <v-lazy-image :src="item.thumbnail" class="img-fluid" />
                </div>

                <div class="block-content nice-copy">
                  <h3 class="h6 font-w700 mb-2">{{ item.title }}</h3>
                  <span class="text-primary font-w700">Rp. {{ formatIdr(item.price) }},-</span>

                  <nuxt-link class="btn btn-sm btn-block btn-primary btn-noborder mt-3 mb-3" :to="`/product/${item.slug}`">Beli</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-6" v-if="latestProduct">
        <div class="mx-auto">
          <nav aria-label="Page navigation">
            <ul class="pagination pagination-sm">
              <li class="page-item" :class="{disabled: latestProduct.page == 1}">
                <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="nextProduct({page: latestProduct.page - 1})">
                  <span aria-hidden="true">
                    <i class="fa fa-angle-left"></i>
                  </span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              <li v-for="index in latestProduct && latestProduct.lastPage" class="page-item" :class="{ active: index == latestProduct.page}" :key="index">
                <a class="page-link" href="javascript:void(0)" @click="nextProduct({page:index})">{{ index }}</a>
              </li>
              <li class="page-item" :class="{disabled: latestProduct.page == latestProduct.lastPage }">
                <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="nextProduct({page: latestProduct.page + 1})">
                  <span aria-hidden="true">
                    <i class="fa fa-angle-right"></i>
                  </span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import VLazyImage from "v-lazy-image"
import TextUtil from '../lib/TextUtil'
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'product/index',
  components: {
    VLazyImage
  },
  computed: {
    ...mapState({
      latestProduct: state => state.product.latestProduct.data
    })
  },
  methods: {
    formatIdr: (int) => new TextUtil().formatMoney(int),
    ...mapActions({
      nextProduct: 'product/getProducts'
    })
  },
  mounted() {
  }
}
</script>