<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateForm">

              <md-field :class="getValidationClass('title')">
                <label for="title">Title</label>
                <md-input name="title" id="title" v-model="form.title" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.title.required">The title is required</span>
              </md-field>

               <md-field :class="getValidationClass('driver')">
                <label for="driver">Driver</label>
                <md-input name="driver" id="driver" v-model="form.driver" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.driver.required">The driver is required</span>
              </md-field>

              
                 <md-checkbox v-model="form.andback" value="true">... and back</md-checkbox>
              

               <md-field :class="getValidationClass('starting_milage')">
                <label for="starting_milage">Starting milage</label>
                <md-input name="starting_milage" id="starting_milage" v-model="form.starting_milage" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.starting_milage.required">The starting milage is required</span>
                <span class="md-error" v-if="!$v.form.starting_milage.numeric">Enter numbers only</span>
              </md-field>

                <md-field :class="getValidationClass('finishing_milage')">
                <label for="finishing_milage">Finishing milage</label>
                <md-input name="finishing_milage" id="finishing_milage" v-model="form.finishing_milage" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.finishing_milage.required">The finishing milage is required</span>
                <span class="md-error" v-if="!$v.form.finishing_milage.numeric">Enter numbers only</span>
              </md-field>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <div class="md-layout">
    <div class="md-layout-item"></div>
     <div class="md-layout-item"><md-button type="submit" class="md-primary" :disabled="sending">Save</md-button></div>
      <div class="md-layout-item"></div>
        </div>
        
      

      <md-snackbar :md-active.sync="changesSaved">Changes saved with database.</md-snackbar>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength,
    numeric
  } from 'vuelidate/lib/validators'

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      boolean : false,
      form: {
        title : null,
        driver : null,
        andback : false,
        starting_milage : null,
        finishing_milage : null,

      },
      userSaved: false,
      changesSaved : false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        title: {
          required
        },
        driver: {
          required
        },
        starting_milage: {
          required,
          numeric
        },
        finishing_milage: {
          required,
          numeric
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.firstName = null
        this.form.lastName = null
        this.form.age = null
        this.form.gender = null
        this.form.email = null
      },
      saveLog () {
        // set in firebase
        this.sending = true
        console.log("setting in firebase")
       
        this.$store.commit('addnewlogtocurrentvehicle' , this.form)
       console.log(this.$store.state.current.vehicle)
        firebase.firestore().collection('test').doc(this.$store.state.current.vehicle.id).set(this.$store.state.current.vehicle, { merge: true }).then(res => {
          this.sending = false
          this.changesSaved = true
          this.$router.go(-1)
          console.log("finished saving to firebase")
          console.log(res)
        },
         e =>  {
           this.sending = false
           alert(e)
         }
        )


      },
      validateForm () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveLog()
        }
      }
    },
    mounted : function () {
      console.log(this.$store.state.user)
      this.form.driver = this.$store.state.user.email
    }
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>