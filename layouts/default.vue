<template>
  <div id="page-container" class="sidebar-inverse side-scroll page-header-fixed page-header-inverse main-content-boxed">
    <!-- Sidebar -->
      <nav id="sidebar">
          <!-- Sidebar Content -->
          <div class="sidebar-content">
              <!-- Side Header -->
              <div class="content-header content-header-fullrow bg-black-op-10">
                  <div class="content-header-section text-center align-parent">
                      <!-- Close Sidebar, Visible only on mobile screens -->
                      <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
                      <button type="button" class="btn btn-circle btn-dual-secondary d-lg-none align-v-r" data-toggle="layout" data-action="sidebar_close">
                          <i class="fa fa-times text-danger"></i>
                      </button>
                      <!-- END Close Sidebar -->

                      <!-- Logo -->
                      <div class="content-header-item">
                          <a class="link-effect font-w700" href="index.html">
                              <i class="si si-fire text-primary"></i>
                              <span class="font-size-xl text-dual-primary-dark">code</span><span class="font-size-xl text-primary">base</span>
                          </a>
                      </div>
                      <!-- END Logo -->
                  </div>
              </div>
              <!-- END Side Header -->

              <!-- Side Main Navigation -->
              <div class="content-side content-side-full">
                  <!--
                  Mobile navigation, desktop navigation can be found in #page-header

                  If you would like to use the same navigation in both mobiles and desktops, you can use exactly the same markup inside sidebar and header navigation ul lists
                  -->
                  <ul class="nav-main">
                      <li>
                          <a href="bd_dashboard.html"><i class="si si-compass"></i>Dashboard</a>
                      </li>
                      <li class="nav-main-heading">Layout</li>
                      <li class="open">
                          <a class="nav-submenu" data-toggle="nav-submenu" href="#"><i class="si si-puzzle"></i>Variations</a>
                          <ul>
                              <li>
                                  <a href="bd_variations_hero_simple_1.html">Hero Simple 1</a>
                              </li>
                              <li>
                                  <a href="bd_variations_hero_simple_2.html">Hero Simple 2</a>
                              </li>
                              <li>
                                  <a href="bd_variations_hero_simple_3.html">Hero Simple 3</a>
                              </li>
                              <li>
                                  <a class="active" href="bd_variations_hero_simple_4.html">Hero Simple 4</a>
                              </li>
                              <li>
                                  <a href="bd_variations_hero_image_1.html">Hero Image 1</a>
                              </li>
                              <li>
                                  <a href="bd_variations_hero_image_2.html">Hero Image 2</a>
                              </li>
                              <li>
                                  <a href="bd_variations_hero_image_3.html">Hero Image 3</a>
                              </li>
                              <li>
                                  <a href="bd_variations_hero_image_4.html">Hero Image 4</a>
                              </li>
                              <li>
                                  <a href="bd_variations_hero_video_1.html">Hero Video 1</a>
                              </li>
                              <li>
                                  <a href="bd_variations_hero_video_2.html">Hero Video 2</a>
                              </li>
                              <li>
                                  <a class="nav-submenu" data-toggle="nav-submenu" href="#">More Options</a>
                                  <ul>
                                      <li>
                                          <a href="javascript:void(0)">Another Link</a>
                                      </li>
                                      <li>
                                          <a href="javascript:void(0)">Another Link</a>
                                      </li>
                                      <li>
                                          <a href="javascript:void(0)">Another Link</a>
                                      </li>
                                  </ul>
                              </li>
                          </ul>
                      </li>
                      <li class="nav-main-heading">Other Pages</li>
                      <li>
                          <a href="bd_search.html"><i class="si si-magnifier"></i>Search</a>
                      </li>
                      <li>
                          <a href="be_pages_dashboard.html"><i class="si si-action-undo"></i>Go Back</a>
                      </li>
                  </ul>
              </div>
              <!-- END Side Main Navigation -->
          </div>
          <!-- Sidebar Content -->
      </nav>
    <!-- END Sidebar -->

    <!-- Header -->
    <header id="page-header">
      <!-- Header Content -->
      <div class="content-header">
        <!-- Left Section -->
        <div class="content-header-section">
          <!-- Logo -->
          <div class="content-header-item">
            <nuxt-link class="link-effect font-w700 mr-5" to="/">
              <i class="fa fa-shopping-bag text-primary"></i>
              <span class="font-size-xl text-dual-primary-dark">alfre</span><span class="font-size-xl text-primary">do</span>
            </nuxt-link>
          </div>
          <!-- END Logo -->
        </div>
        <!-- END Left Section -->

        <!-- Middle Section -->
        <div class="content-header-section d-none d-lg-block">
          <ul class="nav-main-header">
            <li>
              <nuxt-link to="/best-seller"><i class="si si-fire"></i>Terlaris</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/collection"><i class="si si-layers"></i>Koleksi</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/about"><i class="si si-info"></i>Tentang Kami</nuxt-link>
            </li>
          </ul>
          <!-- END Header Navigation -->
        </div>
          <!-- END Middle Section -->

        <!-- Right Section -->
        <div class="content-header-section">
          <button type="button" class="btn btn-circle btn-dual-secondary" data-toggle="layout" data-action="header_search_on">
            <i class="fa fa-search"></i>
          </button>

          <div class="btn-group ml-5" role="group">
              <button type="button" class="btn btn-circle btn-dual-secondary" id="page-header-themes-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fa fa-user-circle"></i>
              </button>
              <div class="dropdown-menu dropdown-menu-right min-width-150" aria-labelledby="page-header-themes-dropdown" v-if="session !== null">
                  <h6 class="dropdown-header text-center">Hi, {{ profile && profile.username }}</h6>
                  <nuxt-link class="btn btn-sm btn-block btn-alt-secondary" data-toggle="layout" data-action="header_fixed_toggle" to="/order">Orders</nuxt-link>
                  <button class="btn btn-sm btn-block btn-alt-secondary mb-10" data-toggle="layout" data-action="header_style_inverse_toggle" @click="onLogout">Sign Out</button>
              </div>
              <div class="dropdown-menu dropdown-menu-right min-width-150" aria-labelledby="page-header-themes-dropdown" v-else>
                  <h6 class="dropdown-header text-center">Account</h6>
                  <button class="btn btn-sm btn-block btn-alt-secondary" data-toggle="layout" data-action="header_fixed_toggle" @click="onLogin">Sign In</button>
                  <button class="btn btn-sm btn-block btn-alt-secondary mb-10" data-toggle="layout" data-action="header_style_inverse_toggle" @click="onRegister">Sign Up</button>
              </div>
          </div>
          
          <button type="button" class="btn btn-circle btn-dual-secondary d-lg-none" data-toggle="layout" data-action="sidebar_toggle">
            <i class="fa fa-navicon"></i>
          </button>
        </div>
        <!-- END Right Section -->
      </div>
      <!-- END Header Content -->

      <!-- Header Search -->
      <div id="page-header-search" class="overlay-header">
        <div class="content-header content-header-fullrow">
          <form action="bd_search.html" method="post">
            <div class="input-group">
              <div class="input-group-prepend">
                <button type="button" class="btn btn-secondary px-15" data-toggle="layout" data-action="header_search_off">
                  <i class="fa fa-times"></i>
                </button>
              </div>
              <input type="text" class="form-control" placeholder="Search or hit ESC.." id="page-header-search-input" name="page-header-search-input">
              <div class="input-group-append">
                <button type="submit" class="btn btn-secondary px-15">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- END Header Search -->

      <!-- Header Loader -->
      <!-- Please check out the Activity page under Elements category to see examples of showing/hiding it -->
      <div id="page-header-loader" class="overlay-header bg-primary">
        <div class="content-header content-header-fullrow text-center">
          <div class="content-header-item">
            <i class="fa fa-sun-o fa-spin text-white"></i>
          </div>
        </div>
      </div>
      <!-- END Header Loader -->
    </header>
    <!-- END Header -->

    <!-- Start Nuxt App -->
    <nuxt />
    <!-- End Nuxt App -->

    <!-- Footer -->
    <footer id="page-footer">
      <div class="content py-20 font-size-xs clearfix">
        <div class="float-right">
          Built with <i class="fa fa-heart text-pulse"></i> by <a class="font-w600" href="https://github.com/DeVoresyah" target="_blank">Rully Ardiansyah</a>
        </div>
        <div class="float-left">
          &copy; <span class="js-year-copy">2019</span> <a class="font-w600" href="/" target="_blank">Alfredo</a>
        </div>
      </div>
    </footer>
    <!-- END Footer -->
  </div>
  
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      session: state => state.auth.session,
      profile: state => state.profile.profile.data
    })
  },
  methods: {
    onLogin() {
      this.$store.commit('auth/setContinuePath', this.$route.path)
      this.$router.push('/auth/sign-in')
    },
    onRegister() {
      this.$store.commit('auth/setContinuePath', this.$route.path)
      this.$router.push('/auth/sign-up')
    },
    onLogout() {
      this.doLogout({ path: this.$route.path })
    },
    ...mapActions({
      doLogout: 'auth/doLogout'
    })
  },
  mounted() {
    console.log("default value", this.session)
  }
}
</script>

<style>
.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance:textfield;
}
</style>
