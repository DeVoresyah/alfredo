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
              <h1 class="h4 font-w700 mt-30 mb-10">Create New Account</h1>
              <h2 class="h5 font-w400 text-muted mb-0">It’s a great day today!</h2>
            </div>
            <!-- END Header -->

            <!-- Sign Up Form -->
            <ValidationObserver v-slot="{ handleSubmit }">
              <form class="js-validation-signup" @submit.prevent="handleSubmit(onRegister)">
                <div class="block block-themed block-rounded block-shadow">
                  <div class="block-header bg-gd-emerald">
                    <h3 class="block-title">Please add your details</h3>
                  </div>
                  <div class="block-content">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <div class="form-group row">
                        <div class="col-12">
                          <label for="signup-bane">Full Name</label>
                          <input type="text" class="form-control" id="signup-bane" name="name" placeholder="eg: John Smith" v-model="name">
                          <span class="text-danger">{{ errors[0] }}</span>
                        </div>
                      </div>
                    </ValidationProvider>

                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <div class="form-group row">
                        <div class="col-12">
                          <label for="signup-username">Username</label>
                          <input type="text" class="form-control" id="signup-username" name="username" placeholder="eg: john_smith" v-model="checkUsername">
                          <span class="text-danger">{{ errors[0] }}</span>
                          <span class="text-success" v-if="usernameStatus.data && !usernameStatus.error && !errors[0]">{{ usernameStatus.data.message }}</span>
                          <span class="text-danger" v-else-if="usernameStatus.error && !errors[0]">{{ usernameStatus.error.message }}</span>
                        </div>
                      </div>
                    </ValidationProvider>

                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <div class="form-group row">
                        <div class="col-12">
                          <label for="signup-phone">Phone Number</label>
                          <input type="text" class="form-control" id="signup-phone" name="phone" placeholder="eg: 085776179376" v-model="phone">
                          <span class="text-danger">{{ errors[0] }}</span>
                        </div>
                      </div>
                    </ValidationProvider>

                    <ValidationProvider rules="required|email" v-slot="{ errors }">
                      <div class="form-group row">
                        <div class="col-12">
                          <label for="signup-email">Email</label>
                          <input type="email" class="form-control" id="signup-email" name="email" placeholder="eg: john@example.com" v-model="checkEmail">
                          <span class="text-danger">{{ errors[0] }}</span>
                          <span class="text-danger" v-if="emailStatus.error && !errors[0]">{{ emailStatus.error.message }}</span>
                          <span class="text-success" v-if="emailStatus.data && !emailStatus.error && !errors[0]">{{ emailStatus.data.message }}</span>
                        </div>
                      </div>
                    </ValidationProvider>
                    
                    <ValidationProvider name="password" rules="required|min:6" v-slot="{ errors }">
                      <div class="form-group row">
                        <div class="col-12">
                          <label for="signup-password">Password</label>
                          <input type="password" class="form-control" id="password" name="password" placeholder="********" v-model="password">
                          <span class="text-danger">{{ errors[0] }}</span>
                        </div>
                      </div>
                    </ValidationProvider>
                    
                    <ValidationProvider rules="required|min:6|confirm:@password" v-slot="{ errors }">
                      <div class="form-group row">
                        <div class="col-12">
                          <label for="signup-password-confirm">Password Confirmation</label>
                          <input type="password" class="form-control" id="password-confirm" name="password-confirm" placeholder="********" v-model="confirm_password">
                          <span class="text-danger">{{ errors[0] }}</span>
                        </div>
                      </div>
                    </ValidationProvider>
                    
                    <div class="form-group row mb-0">
                      <div class="col-sm-12 push">
                        <ValidationProvider rules="required|terms" v-slot="{ errors }">
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="signup-terms" name="terms" v-model="terms">
                            <label class="custom-control-label" for="signup-terms">I agree to Terms &amp; Conditions</label>
                          </div>
                          <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                      
                      <div class="col-sm-12 text-sm-right push">
                        <button 
                        type="submit" 
                        :disabled="registerStatus.fetching" 
                        class="btn btn-block btn-alt-success">
                          <span v-if="!registerStatus.fetching"><i class="fa fa-plus mr-10"></i> Create Account</span>
                          <span v-else><i class="fa fa-spinner fa-spin mr-10"></i> Creating Your Account</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="block-content bg-body-light">
                    <div class="form-group text-center">
                      <nuxt-link class="link-effect text-muted mr-10 mb-5 d-inline-block" to="/terms">
                        <i class="fa fa-book text-muted mr-5"></i> Read Terms
                      </nuxt-link>
                      <nuxt-link class="link-effect text-muted mr-10 mb-5 d-inline-block" to="/auth/sign-in">
                        <i class="fa fa-user text-muted mr-5"></i> Sign In
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </form>
            </ValidationObserver>
              
            <!-- END Sign Up Form -->
          </div>
        </div>
      </div>
    </div>
    <!-- END Page Content -->
  </main>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules'
import { mapState, mapActions } from 'vuex'
import { debounce } from "debounce"

extend('required', {
  ...required,
  message: `This field is required.`
})
extend('email', {
  ...email,
  message: 'Email is not valid.'
})
extend('terms', {
  validate(value) {
    return value === true;
  },
  message: "You must agree with our Terms & Conditions"
})
extend('confirm', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password doesn't match"
})
extend('min', {
  ...min,
  message ({ length }) {
    return `Minimum ${length-1} character.`
  }
})

export default {
  middleware: 'auth/authForm',
  layout: 'auth',
  head() {
    return {
      title: `Sign Up - ${process.env.npm_package_name}`
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      name: '',
      username: '',
      phone: '',
      email: '',
      password: '',
      confirm_password: '',
      terms: false
    }
  },
  computed: {
    checkUsername: {
      get: function() {
        return this.username
      },
      set: function(value) {
        debounce(this.validateUsername({ username: value }), 1000)
        this.username = value
      }
    },
    checkEmail: {
      get: function() {
        return this.email
      },
      set: function(value) {
        debounce(this.validateEmail({ email: value }), 1000)
        this.email = value
      }
    },
    ...mapState({
      registerStatus: state => state.auth.doRegister,
      usernameStatus: state => state.auth.validateUsername,
      emailStatus: state => state.auth.validateEmail
    }),
  },
  methods: {
    onRegister() {
      const { name, username, phone, email, password } = this

      const dataToSend = {
        name,
        username,
        phone_number: phone,
        email,
        password
      }

      this.doRegister(dataToSend)
    },
    ...mapActions({
      initForm: 'auth/initForm',
      validateUsername: 'auth/validateUsername',
      validateEmail: 'auth/validateEmail',
      doRegister: 'auth/doRegister'
    }),
  },
  mounted() {
    console.log("@@@ MOUNTED INIT @@@")
    this.initForm()
  }
}
</script>

<style>

</style>