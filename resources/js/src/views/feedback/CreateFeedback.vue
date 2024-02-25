<template>
  <b-row>
    <b-col cols="12">
      <b-card-code title="Create Feedback">
        <div v-if="validationErrors">
            <ul class="alert alert-danger">
                <li v-for="(value, key, index) in validationErrors">{{ value }}</li>
            </ul>
        </div>
        <validation-observer ref="simpleRules">
        <b-form>
            <b-row>
            <b-col md="6">
                <b-form-group>
                  <validation-provider
                      #default="{ errors }"
                      name="Title"
                      rules="required" >
                      <b-form-input
                        v-model="title"
                        type="text"
                        :state="errors.length > 0 ? false:null"
                        placeholder="Title" />
                      <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
            </b-col>
            <b-col md="6">
                <b-form-group>
                <validation-provider
                    #default="{ errors }"
                    name="Description"
                    rules="required" >
                    <b-form-input
                      v-model="description"
                      type="text"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Description" />
                    <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
                </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="Category"
                  rules="required"
                >
                  <b-form-select
                    v-model="category"
                    :state="errors.length > 0 ? false : null"
                    :options="categoryOptions"
                    placeholder="Select Category"
                  ></b-form-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- submit button -->
            <b-col>
                <b-button
                variant="primary"
                type="submit"
                @click.prevent="validationForm"
                >
                Submit
                </b-button>
            </b-col>
            </b-row>
        </b-form>
        </validation-observer>
    </b-card-code>
    </b-col>
  </b-row>
</template>
<script>
import BCardCode from '@core/components/b-card-code'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BFormInput, BFormGroup, BForm, BRow, BCol, BButton, BFormSelect
} from 'bootstrap-vue'
import {
  required
} from '@validations'
import AdminApi from '../../../api/admin'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCardCode,
    ValidationProvider,
    ValidationObserver,
    BFormInput,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormSelect
  },
  data() {
    return {
      title: '',
      description: '',
      category: '',
      required,
      info: '',
      validationErrors: '',
      categoryOptions: [],
    }
  },
  created() {
    this.getCategories();
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          AdminApi.createFeedback(
            this.info = {
              "title" : this.title,
              "description" : this.description,
              "category" : this.category
            },
            data=>{
              if(data.success){
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: 'Success!',
                    text: data.message,
                    icon: 'UserIcon',
                    variant: 'success',
                  },
                })
                this.resetForm()
              }else{
                if (data.status == 422){
                  this.validationErrors = data.message;
                } else {
                  this.$toast({
                    component: ToastificationContent,
                    props: {
                      title: 'Failed',
                      text: data.message,
                      icon: 'errorIcon',
                      variant: 'outline-danger',
                    },
                  })
                }
              }
            },
            err=>{
              console.log(err);
            }
          )
        }
      })
    },
    getCategories(){
          AdminApi.getCategories(
          data => {
              this.categoryOptions = data.data.map(category => ({
                value: category.id,
                text: category.name,
              }));
          },
          err => {
              console.log(err);
          }
      );
    },
    resetForm(){
      this.title = '';
      this.description = '';
      this.category = '';
    }
  },
}
</script>