<template>
  <main id="main-container">
    <!-- Hero -->
    <div class="bg-primary mb-3">
      <div class="bg-pattern bg-black-op-25" style="background-image: url('assets/media/various/bg-pattern.png');">
        <div class="content text-center">
          <div class="pt-50 pb-20">
            <h1 class="font-w700 text-white mb-10">Order List</h1>
            <h2 class="h4 font-w400 text-white-op">Check your all orders</h2>
          </div>
        </div>
      </div>
    </div>
    <!-- END Hero -->

    <div class="container mt-30 mb-20">
      <div class="row">
        <div class="col-sm-12">
          <div class="block">
            <div class="block-content">
              <div class="table-responsive" v-if="listOrder.data && listOrder.data.data.length > 0">
                <div class="row ml-0 mr-0">
                  <div class="col-md-4 col lg-4 ml-auto">
                    <div class="form-group row">
                      <label class="col-lg-4 pr-0 col-form-label" for="search-label">Search Invoice</label>
                      <div class="col-lg-8 pr-0">
                          <input class="form-control" id="search-label" name="query" v-model="query" v-debounce:500ms="onSearch">
                      </div>
                    </div>
                  </div>
                </div>

                <table class="table table-striped table-vcenter">
                  <thead class="thead-light">
                    <tr>
                      <th>Invoice</th>
                      <th style="width:40%">Product</th>
                      <th>Quantity</th>
                      <th style="width:20%">Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in listOrder.data && listOrder.data.data" :key="index">
                      <td>
                        <nuxt-link :to="`/order/${item.invoice_id}`">#{{ item.invoice_id }}</nuxt-link>
                      </td>
                      <td>{{ item.product.title }}</td>
                      <td>{{ item.qty }}</td>
                      <td>Rp{{ formatIdr(item.total) }}</td>
                      <td>
                        <span 
                        class="badge" 
                        :class="{
                          'badge-warning': item.status == 'waiting_payment'
                        }">{{ renderStatus(item.status) }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div class="row ml-0 mr-0">
                  <div class="ml-auto">
                    <nav aria-label="Page navigation">
                      <ul class="pagination pagination-sm">
                        <li class="page-item" :class="{disabled: listOrder.data.page == 1}">
                          <a class="page-link" href="javascript:void(0)" aria-label="Previous" @click="nextProduct({page:listOrder.data.page - 1, q:query})">
                            <span aria-hidden="true">
                              <i class="fa fa-angle-left"></i>
                            </span>
                            <span class="sr-only">Previous</span>
                          </a>
                        </li>
                        <li v-for="index in listOrder.data && listOrder.data.lastPage" class="page-item" :class="{ active: index == listOrder.data.page}" :key="index">
                          <a class="page-link" href="javascript:void(0)" @click="nextProduct({page:index, q:query})">{{ index }}</a>
                        </li>
                        <li class="page-item" :class="{disabled: listOrder.data.page == listOrder.data.lastPage }">
                          <a class="page-link" href="javascript:void(0)" aria-label="Next" @click="nextProduct({page:listOrder.data.page + 1, q:query})">
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
              <h4 class="font-w700 text-center" v-else>No Data Available</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import TextUtil from '../../lib/TextUtil'
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'order/index',
  head() {
    return {
      title: `Order List - ${process.env.npm_package_name}`
    }
  },
  data() {
    return {
      query: ''
    }
  },
  computed: {
    ...mapState({
      listOrder: state => state.order.list
    })
  },
  methods: {
    renderStatus: (status) => {
      switch(status) {
        case "waiting_payment":
          return "Menunggu Pembayaran"
      }
    },
    onSearch() {
      this.getListOrder({ q: this.query })
    },
    formatIdr: (int) => new TextUtil().formatMoney(int),
    ...mapActions({
      nextOrder: 'order/nextOrder',
      getListOrder: 'order/listOrder'
    })
  },
}
</script>

<style>

</style>