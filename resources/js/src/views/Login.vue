<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Login -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <b-img
          :src="appLogoImage"
          alt="logo"
        />
        </b-link>
        <!-- form -->
        <validation-observer
          ref="loginValidation"
          #default="{invalid}"
        >
          <b-form
            class="auth-login-form mt-2"
            @submit.prevent
          >

            <b-form-group
              label-for="email"
              label="Email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  id="email"
                  v-model="userEmail"
                  name="login-email"
                  :state="errors.length > 0 ? false:null"
                  placeholder="john@example.com"
                  autofocus
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <b-form-group>
              <div class="d-flex justify-content-between">
                <label for="password">Password</label>
                <b-link :to="{name:'forgot-password'}">
                  <small>Forgot Password?</small>
                </b-link>
              </div>
              <validation-provider
                #default="{ errors }"
                name="Password"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    :type="passwordFieldType"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false:null"
                    name="login-password"
                    placeholder="Password"
                  />

                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <b-button
              variant="primary"
              type="submit"
              block
              :disabled="invalid"
               @click="validationForm"
            >
              Sign in
            </b-button>
          </b-form>
          <b-link :to="{name:'register'}">
            <small>Don't have an account? Register!</small>
          </b-link>
        </validation-observer>
      </b-card>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton,
  BForm,
  BFormInput,
  BFormGroup,
  BCard,
  BLink,
  BImg,
  BCardTitle,
  BCardText,
  BInputGroup,
  BInputGroupAppend,
  BFormCheckbox,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import ValidateUser from '../../api/login' 

export default {
  components: {
    // BSV
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BCard,
    BCardTitle,
    BLink,
    BImg,
    VuexyLogo,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
    	appLogoImage: require('@/assets/images/logo/logo.png'),
      userEmail: '',
      password: '',
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    validationForm() {
      this.$refs.loginValidation.validate().then(success => {
        if (success) {
          var info = {
            "email" : this.userEmail,
            "password" : this.password
          }
          ValidateUser.getUserInfo(
            info, 
            data=>{
              if(data.success){
                this.$router.push({ name: 'home'});
              }else{
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Invalid Credentials',
                    text: 'Email or Password is incorrect',
                    icon: 'UserIcon',
                    variant: 'danger',
                  },
                })
              }
            },
            err=>{
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Error!',
                  text: err.message,
                  icon: 'UserIcon',
                  variant: 'danger',
                },
              })
            }
          )
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/pages/page-auth.scss';
</style>
