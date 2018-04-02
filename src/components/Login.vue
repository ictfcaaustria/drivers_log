<template>
  <div class="page-container">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      
          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>
          <md-field :class="getValidationClass('password')">
            <label for="password">Password</label>
            <md-input type="password" name="password" id="password" autocomplete="password" v-model="form.password" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.password.required">Password is required</span>
            <span class="md-error" v-else-if="!$v.form.password.minLength">Password too short (min. 4 characters)</span>
          </md-field>
       

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <div class="md-layout md-alignment-center-center ">
     <div class="md-layout-item" style="flex:0"><md-button type="submit" class="md-primary" :disabled="sending">Login</md-button></div>
        </div>
       

      <md-snackbar :md-active.sync="userSaved">Login with email {{ form.email }} was successful!</md-snackbar>
    </form>

      <md-dialog-alert
      :md-active.sync="alert"
      :md-content.sync="errmsg"
      md-confirm-text="Close" />
  </div>

</template>

<script>
import firebase from "firebase";
import "firebase/firestore";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    alert: false,
    errmsg: "Something went wrong",
    form: {
      email: null,
      password: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.email = null;
      this.form.password = null;
    },
    saveUser() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`;
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    genericerrh(err) {
      this.errmsg = err.message;
      this.alert = true;
      this.sending = false;
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.sending = true;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(
            user => {
              this.$store.commit("setuser", user);
              var vehicles = [];
              firebase
                .firestore()
                .collection("drivers-log")
                .get()
                .then(
                  snap => {
                    snap.forEach(doc => vehicles.push(doc.data()));
                    console.log("vehicles");
                    console.log(vehicles);
                    this.$store.commit("setvehicles", vehicles);
                    this.sending = false;
                    this.$router.push("Vehicles");
                  },
                  err => this.genericerrh(err)
                );
            },
            err => this.genericerrh(err)
          );

        // this.saveUser()
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>

