<template>
  <main id="main-container">
    <!-- Hero -->
    <div class="bg-primary mb-3">
      <div class="bg-pattern bg-black-op-25" style="background-image: url('/assets/media/various/bg-pattern.png');">
        <div class="content text-center">
          <div class="pt-50 pb-20">
            <h1 class="font-w700 text-white mb-10">Konfirmasi Pembayaran</h1>
            <h2 class="h4 font-w400 text-white-op">Lakukan konfirmasi pembayaran agar pesanan cepat diproses</h2>
          </div>
        </div>
      </div>
    </div>
    <!-- END Hero -->

    <div class="container mt-30 mb-20">
      <div class="row">
        <div class="col-md-8 col-lg-8 mx-auto">
          <div class="block">
            <div class="block-content nice-copy">
              <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmit)">
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label" for="example-hf-email">Jumlah Pembayaran</label>
                    <div class="col-lg-7">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <div class="input-group">
                          <div class="input-group-prepend">
                              <span class="input-group-text">
                                  <label>Rp</label>
                              </span>
                          </div>
                          <input class="form-control" name="jumlah_bayar" placeholder="0" v-model="amountChange">
                        </div>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label" for="sender-name">a/n Rekening Pengirim</label>
                    <div class="col-lg-7">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <input type="name" class="form-control" id="sender-name" name="name" v-model="name">
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label" for="sender-bank">No. Rekening Pengirim</label>
                    <div class="col-lg-7">
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <input type="name" class="form-control" id="sender-bank" name="bank" v-model="bank">
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  
                  
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label" for="example-hf-email">No. Invoice/Tagihan</label>
                    <div class="col-lg-7">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <label>#</label>
                          </span>
                        </div>
                        <ValidationProvider rules="required" v-slot="{ errors }">
                          <input type="text" class="form-control" name="invoice" v-model="invoice">
                          <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>
                  </div>
                  
                  <div class="form-group row">
                    <label class="col-lg-3 col-form-label">Bukti Pembayaran</label>
                    <div class="col-7">
                        <ValidationProvider rules="required" v-slot="{ errors }" v-if="!screenshoot">
                          <div class="custom-file" >
                            <!-- Populating custom file input label with the selected filename (data-toggle="custom-file-input" is initialized in Helpers.coreBootstrapCustomFileInput()) -->
                            <input type="file" class="custom-file-input" id="screenshot" name="screenshot" data-toggle="custom-file-input" @change="onFileChange">
                            <label class="custom-file-label" for="screenshot">Pilih file</label>
                          </div>
                          <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>
                        <div v-else>
                          <img :src="imgPreview" class="img-fluid" />
                          <div style="display:flex;align-items:center;">
                            <button class="btn btn-alt-danger mx-auto mt-10" @click="removeImage">Remove</button>
                          </div>
                        </div>
                    </div>
                  </div>

                  <div class="form-group row">
                      <div class="col-lg-9 ml-auto">
                          <button type="submit" class="btn btn-alt-primary" :disabled="confirmStatus.fetching">
                            <span v-if="confirmStatus.fetching">Mengirim...</span>
                            <span v-else>Kirim</span>
                          </button>
                      </div>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import TextUtil from '../lib/TextUtil'
import { mapState, mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: `This field is required.`
})

export default {
  middleware: 'auth/user',
  head() {
    return {
      title: `Konfirmasi Pembayaran - ${process.env.npm_package_name}`
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      screenshoot: null,
      imgPreview: '',
      amount: "",
      name: '',
      bank: '',
      invoice: '',
    }
  },
  computed: {
    amountChange: {
      get() {
        return this.amount
      },
      set(value) {
        const regex = /^[0-9\.]*$/g
        this.amount = regex.test(value) ? this.formatIdr(value) : ""
      }
    },
    ...mapState({
      confirmStatus: state => state.order.confirmation
    })
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.screenshoot = files[0]
      this.createImage(files[0])
    },
    createImage(file) {
      const image = new Image()
      const reader = new FileReader()
      const vm = this

      reader.onload = (e) => {
        vm.imgPreview = e.target.result
      };
      reader.readAsDataURL(file)
    },
    removeImage(e) {
      this.imgPreview = ''
      this.screenshoot = null
    },
    onSubmit() {
      const dataToSend = new FormData()
      dataToSend.append("proof[proof]", this.screenshoot)
      dataToSend.append("amount", this.moneyToInt(this.amount))
      dataToSend.append("sender_name", this.name)
      dataToSend.append("sender_bank", this.bank)
      dataToSend.append("invoice_id", this.invoice)

      this.confirmOrder(dataToSend)
    },
    formatIdr: (int) => new TextUtil().formatMoney(int),
    moneyToInt: (int) => new TextUtil().moneytoInt(int),
    ...mapActions({
      confirmOrder: 'order/confirmOrder'
    })
  }
}
</script>

<style>

</style>