<template>
  <main id="main-container">
    <!-- Page Content -->
    <div class="bg-body-dark bg-pattern" style="background-image: url('/assets/media/various/bg-pattern-inverse.png');">
      <div class="row mx-0 justify-content-center">
          <div class="hero-static col-lg-6 col-xl-4">
              <div class="content content-full overflow-hidden">
                <!-- Header -->
                <div class="py-30 text-center">
                  <nuxt-link class="link-effect font-w700" to="/">
                    <i class="fa fa-shopping-bag text-primary"></i>
                    <span class="font-size-xl text-dual-primary-dark">alfre</span><span class="font-size-xl text-primary">do</span>
                  </nuxt-link>
                  <h1 class="h4 font-w700 mt-30 mb-10">Welcome to Your Dashboard</h1>
                  <h2 class="h5 font-w400 text-muted mb-0">It’s a great day today!</h2>
                </div>
                <!-- END Header -->

                <!-- Sign In Form -->
                <ValidationObserver v-slot="{ handleSubmit }">
                  <form class="js-validation-signin" @submit.prevent="handleSubmit(onLogin)">
                    <div class="block block-themed block-rounded block-shadow">
                      <div class="block-header bg-gd-dusk">
                        <h3 class="block-title">Please Sign In</h3>
                      </div>
                      <div class="block-content">
                        <ValidationProvider rules="required|email" v-slot="{ errors }">
                          <div class="form-group row">
                            <div class="col-12">
                              <label for="login-email">Email</label>
                              <input type="text" class="form-control" id="login-email" name="email" v-model="email">
                              <span class="text-danger">{{ errors[0] }}</span>
                            </div>
                          </div>
                        </ValidationProvider>

                        <ValidationProvider rules="required" v-slot="{ errors }">
                          <div class="form-group row">
                            <div class="col-12">
                              <label for="login-password">Password</label>
                              <input type="password" class="form-control" id="login-password" name="password" v-model="password">
                              <span class="text-danger">{{ errors[0] }}</span>
                            </div>
                          </div>
                        </ValidationProvider>

                        <div class="form-group row mb-0">
                          <div class="col-sm-6 d-sm-flex align-items-center push">
                            <div class="custom-control custom-checkbox mr-auto ml-0 mb-0">
                              <input type="checkbox" class="custom-control-input" id="login-remember-me" name="login-remember-me">
                              <label class="custom-control-label" for="login-remember-me">Remember Me</label>
                            </div>
                          </div>
                          <div class="col-sm-6 text-sm-right push">
                            <button type="submit" class="btn btn-alt-primary" :disabled="loginStatus.fetching">
                              <span v-if="loginStatus.fetching"><i class="fa fa-spinner fa-spin mr-10"></i> Signing</span>
                              <span v-else><i class="si si-login mr-10"></i> Sign In</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="block-content bg-body-light">
                        <div class="form-group text-center">
                          <nuxt-link class="link-effect text-muted mr-10 mb-5 d-inline-block" to="/auth/sign-up">
                            <i class="fa fa-plus mr-5"></i> Create Account
                          </nuxt-link>
                          <nuxt-link class="link-effect text-muted mr-10 mb-5 d-inline-block" to="/auth/forgot-password">
                            <i class="fa fa-warning mr-5"></i> Forgot Password
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                  </form>
                </ValidationObserver>
                <!-- END Sign In Form -->
              </div>
          </div>
      </div>
    </div>
    <!-- END Page Content -->
  </main>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import { mapState, mapActions } from 'vuex'

extend('required', {
  ...required,
  message: `This field is required.`
})
extend('email', {
  ...email,
  message: 'Email is not valid.'
})

export default {
  middleware: 'auth/authForm',
  layout: 'auth',
  head() {
    return {
      title: `Sign In - ${process.env.npm_package_name}`
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      continuePath: state => state.auth.continueToPath,
      loginStatus: state => state.auth.doLogin
    })
  },
  methods: {
    onLogin() {
      const { email, password } = this

      const dataToSend = {
        email,
        password,
        path: this.continuePath
      }

      this.doLogin(dataToSend)
    },
    ...mapActions({
      doLogin: 'auth/doLogin'
    })
  }
}
</script>

<style>

</style>