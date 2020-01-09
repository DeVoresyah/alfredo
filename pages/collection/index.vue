<template>
  <main id="main-container">
    <!-- Hero -->
    <div class="bg-primary mb-3">
      <div class="bg-pattern bg-black-op-25" style="background-image: url('/assets/media/various/bg-pattern.png');">
        <div class="content text-center">
          <div class="pt-50 pb-20">
            <h1 class="font-w700 text-white mb-10">Collection</h1>
            <h2 class="h4 font-w400 text-white-op">Cari Koleksi Produk Menarik</h2>
          </div>
        </div>
      </div>
    </div>
    <!-- END Hero -->

    <div class="container mt-30 mb-20">
      <div class="row" v-if="list && list.length > 0">
        <div class="col-lg-4 col-md-4" v-for="(item, index) in list" :key="index">
          <div class="block text-center bg-white mb-0">
            <div class="py-20">
              <v-lazy-image class="img-avatar collection-thumb" :src="item.thumbnail" alt="" />
            </div>
            <div class="block-content block-content-full block-content-sm bg-body-light">
              <div class="font-size-h3 font-w600">{{ item.title }}</div>
              <div class="text-muted">{{ item.desc }}</div>

              <nuxt-link :to="`collection/${item.slug}`" class="btn btn-primary btn-noborder mt-3 mb-3">Jelajahi</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VLazyImage from "v-lazy-image"

export default {
  middleware: 'collection/index',
  head() {
    return {
      title: `Collection - ${process.env.npm_package_name}`
    }
  },
  components: {
    VLazyImage
  },
  computed: {
    ...mapState({
      list: state => state.collection.list.data
    })
  }
}
</script>

<style>
  .collection-thumb {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
</style>