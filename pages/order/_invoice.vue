<template>
  <main id="main-container" v-if="order.data">
    <!-- Hero -->
    <div class="bg-primary mb-3">
      <div class="bg-pattern bg-black-op-25" style="background-image: url('/assets/media/various/bg-pattern.png');">
        <div class="content text-center">
          <div class="pt-50 pb-20">
            <h1 class="font-w700 text-white mb-10">Order #{{ order.data.invoice_id }}</h1>
          </div>
        </div>
      </div>
    </div>
    <!-- END Hero -->

    <div class="container mt-30 mb-20">
      <div class="row">
        <div class="col-md-8 col-lg-8 mx-auto">
          <div class="block">
            <div 
            class="block-content pb-3 ribbon ribbon-bookmark"
            :class="{'ribbon-warning': order.data.status == 'waiting_payment'}">
              <div class="ribbon-box">
                {{ renderStatus(order.data.status) }}
              </div>

              <div class="headerPayment">
                <h4 class="text-center font-w700">Jumlah Yang Harus Dibayar:</h4>
                <h3 class="text-center text-danger font-w700">Rp{{ formatIdr(order.data.total) }}</h3>
              </div>

              <div class="alert alert-warning" role="alert">
                <p class="mb-0 text-center"><b>*Catatan:</b> Pastikan jumlah nominal yang ditransfer sama seperti jumlah di atas agar transaksi dapat kami proses dengan cepat.</p>
              </div>

              <h5 class="text-center mb-0">Transfer Pembayaran Ke:</h5>
              <div class="text-center pb-5" style="margin-bottom:20px;">
                <img src="/assets/media/bca.png" width="150" />
                <h4 class="font-w700 mb-0 ml-10">80770822619 (a/n Edo Rahayu)</h4>
              </div>

              <h5 class="font-w700">Panduan Pembayaran</h5>
              <div id="accordion" role="tablist" aria-multiselectable="true">
                <div class="block block-bordered block-rounded mb-2">
                  <div class="block-header" role="tab" id="atmbca_h1">
                    <a class="font-w600" data-toggle="collapse" data-parent="#accordion" href="#atm_bca" aria-expanded="true" aria-controls="atm_bca">Melalui ATM</a>
                  </div>
                  <div id="atm_bca" class="collapse show" role="tabpanel" aria-labelledby="atmbca_h1" data-parent="#accordion">
                    <div class="block-content">
                      <ol>
                        <li>Masukkan Kartu ATM &amp; PIN</li>
                        <li>Pilih "Transaksi Lainnya"</li>
                        <li>Pilih "Transfer"</li>
                        <li>Pilih "Ke Rek Bank Lain"</li>
                        <li>Masukkan kode bank <b>014</b> </li>
                        <li>Masukkan nomor rekening tujuan <b>80770822619</b> </li>
                        <li>Masukkan jumlah transfer Rp{{ formatIdr(order.data.total) }}</li>
                        <li>Baca kembali detail pembayaran dan konfirmasi transaksi</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div class="block block-bordered block-rounded mb-2">
                  <div class="block-header" role="tab" id="mbca_h2">
                    <a class="font-w600" data-toggle="collapse" data-parent="#accordion" href="#mbca" aria-expanded="true" aria-controls="mbca">m-BCA (BCA Mobile)</a>
                  </div>
                  <div id="mbca" class="collapse" role="tabpanel" aria-labelledby="mbca_h2" data-parent="#accordion">
                    <div class="block-content">
                      <ol>
                        <li>Lakukan log in pada aplikasi BCA Mobile</li>
                        <li>Pilih menu m-BCA, kemudian masukkan kode akses m-BCA</li>
                        <li>Pilih "m-Transfer" kemudian "Daftar Transfer - Antar Rekening"</li>
                        <li>Masukkan nomor rekening <b>80770822619</b> </li>
                        <li>Klik "Send" dan masukkan PIN untuk mendaftarkan nomor rekening tujuan anda</li>
                        <li>Pilih "Transfer - Antar Rekening"</li>
                        <li>Pilih nomor rekening tujuan</li>
                        <li>Masukkan jumlah uang <b>Rp{{ formatIdr(order.data.total) }}</b></li>
                        <li>Klik "Send" dan masukkan PIN</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div class="block block-bordered block-rounded mb-2">
                  <div class="block-header" role="tab" id="ibanking_h3">
                    <a class="font-w600" data-toggle="collapse" data-parent="#accordion" href="#ibanking" aria-expanded="true" aria-controls="ibanking">Internet Banking</a>
                  </div>
                  <div id="ibanking" class="collapse" role="tabpanel" aria-labelledby="ibanking_h3" data-parent="#accordion">
                    <div class="block-content">
                      <ol>
                        <li>Login ke website Mandiri Online dengan memasukkan user ID dan PIN</li>
                        <li>Pilih menu "Transfer"</li>
                        <li>Lalu pilih "Ke Bank Lain"</li>
                        <li>Masukkan kode bank <b>014</b> </li>
                        <li>Masukkan rekening tujuan <b>80770822619</b> </li>
                        <li>Masukkan jumlah transfer <b>Rp{{ formatIdr(order.data.total) }}</b> </li>
                        <li>Klik Lanjut</li>
                        <li>Periksa kembali transaksi, kemudian klik Kirim</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-center mb-2" style="margin-top:20px;">
                <nuxt-link class="btn btn-hero btn-primary mx-auto text-center" to="/confirmation">
                  <span class="h5 font-w700 text-white">Konfirmasi Pembayaran</span>
                </nuxt-link>
              </div>
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
    middleware: 'order/show',
    head() {
      return {
        title: this.order.data && `Order #${this.order.data.invoice_id} - ${process.env.npm_package_name}`
      }
    },
    computed: {
      ...mapState({
        order: state => state.order.getOrder
      })
    },
    methods: {
      formatIdr: (int) => new TextUtil().formatMoney(int),
      renderStatus: (status) => {
        switch(status) {
          case "waiting_payment":
            return "Menunggu Pembayaran"
            break;
          
          case "on_process":
            return "Sedang Diproses"
            break;

          case "complete":
            return "Selesai"
            break;
        }
      }
    }
}
</script>

<style>
.headerPayment {
  border-bottom: 1px solid #ced4da;
  margin-bottom: 20px;
  margin-top: 30px;
}
.bankPayment {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>