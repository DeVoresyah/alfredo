<template>
  <main id="main-container" v-if="collection">
    <!-- Hero -->
    <div class="bg-primary mb-3">
      <div class="bg-pattern bg-black-op-25" style="background-image: url('/assets/media/various/bg-pattern.png');">
        <div class="content text-center">
          <div class="pt-50 pb-20">
            <h1 class="font-w700 text-white mb-10">{{ collection.data[0].title }}</h1>
            <h2 class="h4 font-w400 text-white-op">{{ collection.data[0].desc }}</h2>
          </div>
        </div>
      </div>
    </div>
    <!-- END Hero -->

    <div class="container mt-30 mb-20">
      <div class="row">
        <div class="col-lg-3 col-md-3">
          <div class="list-group push" v-if="list && list.length > 0">
            <nuxt-link 
            v-for="(item, index) in list"
            :key="index"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" 
            :class="{ active: collection.data[0].title == item.title}"
            :to="item.slug">
              {{ item.title }}
            </nuxt-link>
          </div>
        </div>

        <div class="col-lg-9 col-md-9">
          <div class="row" v-if="product.length > 0">
            <div class="col-lg-4 col-md-4" v-for="(item, index) in product" :key="index">
              <div class="block">
                <div style="width:100%; overflow:hidden;">
                  <v-lazy-image :src="item.thumbnail" class="img-fluid" />
                </div>

                <div class="block-content">
                  <h3 class="h6 font-w700 mb-2">{{ item.title }}</h3>
                  <span class="text-primary font-w700">Rp. {{ formatIdr(item.price) }},-</span>

                  <nuxt-link class="btn btn-sm btn-block btn-primary btn-noborder mt-3 mb-3" :to="`/product/${item.slug}`">Beli</nuxt-link>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-else="">
            <div class="mx-auto">
              <h3 class="text-center">No Data Available</h3>
            </div>
          </div>

          <div class="row mt-6" v-if="product.length > 0">
            <div class="mx-auto">
              <nav aria-label="Page navigation">
                <ul class="pagination pagination-sm">
                  <li class="page-item" :class="{disabled: collection.page == 1}">
                    <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="nextProduct({page: collection.page - 1})">
                      <span aria-hidden="true">
                        <i class="fa fa-angle-left"></i>
                      </span>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>
                  <li v-for="index in collection && collection.lastPage" class="page-item" :class="{ active: index == collection.page}" :key="index">
                    <a class="page-link" href="javascript:void(0)" @click="nextProduct({page:index})">{{ index }}</a>
                  </li>
                  <li class="page-item" :class="{disabled: collection.page == collection.lastPage}">
                    <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="nextProduct({page: collection.page + 1})">
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
      </div>
    </div>
  </main>
</template>

<script>
import VLazyImage from "v-lazy-image"
import TextUtil from '../../lib/TextUtil'
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'collection/show',
  head() {
    return {
      title: this.collection&& `${this.collection.data[0].title} - ${process.env.npm_package_name}`
    }
  },
  components: {
    VLazyImage
  },
  computed: {
    ...mapState({
      collection: state => state.collection.detail.data,
      product: state => state.collection.detail.data.data[0].product,
      list: state => state.collection.list.data
    })
  },
  methods: {
    formatIdr: (int) => new TextUtil().formatMoney(int),
    ...mapActions({
      nextProduct: 'product/getProducts'
    })
  },
  mounted() {
    console.log(this.collection)
  }
}
</script>

<style>

</style>