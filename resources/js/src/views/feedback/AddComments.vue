<template>
  <b-row>
    <b-col cols="12">
      <b-card-code title="Add Comment">
        <div v-if="validationErrors">
            <ul class="alert alert-danger">
                <li v-for="(value, key, index) in validationErrors">{{ value }}</li>
            </ul>
        </div>
        <validation-observer ref="simpleRules">
        <b-form>
            <b-row>
            <b-col md="12">
                <b-form-group>
                  <validation-provider>
                      <quill-editor v-model="content"
                                    ref="myQuillEditor"
                                    :options="editorOption"
                                    v-if="users.length > 0">
                      </quill-editor>
                  </validation-provider>
                </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="Feedback"
                  rules="required"
                >
                  <b-form-select
                    v-model="feedback_id"
                    :state="errors.length > 0 ? false : null"
                    :options="feedbackOptions"
                    placeholder="Select Feedback"
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
    required, email, confirmed,
  } from '@validations'
  import AdminApi from '../../../api/admin'
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
  import { quillEditor } from 'vue-quill-editor';

  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'


  import 'quill-mention-people/index.css'

  import Quill from 'quill';
  import atPeople from 'quill-mention-people';
  Quill.register('modules/atPeople',atPeople);
  
  export default {
    editorOption:{
      modules:{
        atPeople:{
          list:[],
        },
      }
    },
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
      quillEditor,
      BFormSelect,
    },
    data() {
      return {
        required,
        content: '',
        validationErrors: '',
        info: '',
        feedback_id: this.$route.params.id || undefined,
        feedbackOptions: [],
        users: [],
        editorOption:{
          modules:{
            atPeople:{
              list:[],
            },
          }
        }
      }
    },
    watch: {
      users: {
        handler(newUsers) {
          if (newUsers) {
            this.editorOption.modules.atPeople.list = newUsers.map(user => ({
              id: user.id,
              name: user.first_name,
            }));
            console.log('Users are ', this.editorOption.modules.atPeople.list);
          }
        },
        immediate: true,
      },
    },

    created() {
      this.getFeedbacks();
      this.getUsers();

      const feedbackId = parseInt(this.$route.params.id);
      if (!isNaN(feedbackId) && this.feedbackOptions.some(option => option.value === feedbackId)) {
        this.feedback_id = feedbackId;
      }
    },
    methods: {
      validationForm() {
        this.$refs.simpleRules.validate().then(success => {
          if (success) {
            AdminApi.addComment(
              this.info = {
                "comment" : this.content,
                "feedback_id" : this.feedback_id,
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
        resetForm(){
          this.content = '';
          this.description = '';
        },
        getFeedbacks(){
          AdminApi.getFeedbacks(
          data => {
              this.feedbackOptions = data.data.map(feedback => ({
                value: feedback.id,
                text: feedback.title,
              }));
            },
            err => {
              console.log(err);
            }
          )
        },
        getUsers(){
          AdminApi.getUsers(
          data => {
            this.users = data.data;
            this.editorOption.modules.atPeople.list = this.users.map(user => ({
              id: user.id,
              name: user.first_name,
            }));
            console.log('Users are ', this.editorOption.modules.atPeople.list)
          },
          err => {
            console.log(err);
          }
        )
      },
    }
  }
</script><style lang="scss">
    @import '~@core/scss/vue/libs/vue-good-table.scss';
    .quill-at-member ul li{
        text-align: center;
    }
</style>