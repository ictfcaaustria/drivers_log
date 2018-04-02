<template>
  <div>

    
    <form novalidate class="md-layout" @submit.prevent="validateForm">
   <md-card >
      <md-card-header>
        <div class="md-title">Card without hover effect</div>
      </md-card-header>

      <md-card-content>
      

              <!-- <md-field >
                <label for="title">Title</label>
                <md-input name="title" id="title" autocomplete="given-title" v-model="form.title" />
 
              </md-field>
             -->

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

               <md-field :class="getValidationClass('starting_date')">
                <label for="starting_date">Starting date</label>
                <md-input name="starting_date" id="starting_date" v-model="form.starting_date" :disabled="sending" />
                <span class="md-helper-text">DD.MM.YYYY HH:MM</span>
                <span class="md-error" v-if="!$v.form.starting_date.required">The starting date is required</span>
              </md-field>

                <md-field :class="getValidationClass('finishing_date')">
                <label for="finishing_date">Finishing date</label>
                <md-input name="finishing_date" id="finishing_date" v-model="form.finishing_date" :disabled="sending" />
                <span class="md-helper-text">DD.MM.YYYY HH:MM</span>
                <!-- <span class="md-error" v-if="!$v.form.finishing_date.required">The finishing date is required</span> -->
              </md-field>
      
               <md-field :class="getValidationClass('starting_location')">
                <label for="starting_location">Starting location</label>
                <md-input name="starting_location" id="starting_location" v-model="form.starting_location" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.starting_location.required">The starting location is required</span>
              </md-field>

                <md-field :class="getValidationClass('finishing_location')">
                <label for="finishing_location">Finishing location</label>
                <md-input name="finishing_location" id="finishing_location" v-model="form.finishing_location" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.finishing_location.required">The finishing location is required</span>
              </md-field>

              <md-switch class="md-primary" v-model="form.andback" :disabled="sending">... and back</md-switch>

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

               <md-card-expand>
     <md-card-actions md-alignment="space-between">
       <label for="expand">Additional info</label>
          <md-card-expand-trigger>
            <md-button name="expand" id="expand" class="md-icon-button">
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
               <md-field :class="getValidationClass('parking_location')">
                <label for="parking_location">Parking location</label>
                <md-input name="parking_location" id="parking_location" v-model="form.parking_location" :disabled="sending" />
              </md-field>

              <md-field :class="getValidationClass('fuel_left')">
                <label for="fuel_left">Fuel left (%)</label>
                <md-input name="fuel_left" id="fuel_left" v-model="form.fuel_left" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.fuel_left.numeric">The fuel left must be a number</span>
              </md-field>
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>

       

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <div class="md-layout md-alignment-center-center">
     <div class="md-layout-item" style="flex:0"></div>
        </div>
        
      

      <md-snackbar :md-active.sync="$store.state.changesSaved">Changes saved with database.</md-snackbar>

      </md-card-content>

      <md-card-actions>
        <md-button type="submit" class="md-primary" :disabled="sending">Save</md-button>
      </md-card-actions>
    </md-card>
    
    </form>
  </div>
</template>

<script>
  import firebase from "firebase";
  import "firebase/firestore";
  import moment from 'moment'
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
      form: {
        title : null,
        driver : null,
        starting_location : null,
        finishing_location : null,
        starting_date : moment().format('DD.MM.YYYY hh:mm'),
        finishing_date : null,
        andback : false,
        starting_milage : null,
        finishing_milage : null,
        parking_location : null,
        fuel_left : null
      },
      isnew : false,
      sending: false,
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
          // required,
          numeric
        },
        starting_date: {
          required
        },
        finishing_date: {
          // required
        },
        starting_location: {
          required
        },
        finishing_location : {
          // required
        },
        fuel_left : {
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
        if (this.isnew) {
          this.$store.commit('addnewlogtocurrentvehicle' , this.form)
        }
        console.log(this.$store.state.current.vehicle)
        firebase.firestore().collection('drivers-log').doc(this.$store.state.current.vehicle.id).set(this.$store.state.current.vehicle, { merge: true }).then(res => {
          this.sending = false
          this.$store.commit("setSnack" ,  {show: true, msg : "Saved log changes to db."})
          this.$router.go(-1)
          console.log("finished saving to firebase")
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
      if (this.$store.state.current.log) {
        this.form = this.$store.state.current.log
      } else {
        this.form.driver = this.$store.state.user.email
        this.isnew = true;
      }
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
  .md-card {
    margin: 0;
    margin-bottom:16px;
    width:100%;
  }
</style>