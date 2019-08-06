<template>
  <div>
    <div class="text-center mb-3">
      <h1>Register</h1>
    </div>
    <hr class="my-2" />
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="form-holder text-center">
          <form class="form-inline" @submit.prevent="handleSubmit">
            <fieldset>
              <div class="control-group">
                <label class="control-label h3 mb-2"  for="email">Email</label>
                <div class="controls">
                  <input v-model="$v.email.$model" type="text" id="email" name="email" placeholder class="input-xlarge" />
                </div>
                <div class="alert alert-danger" v-if="$v.email.$error">
                  Invalid email
                </div>
              </div>
              <br />
              <div class="control-group">
                <label class="control-label h3 mb-2" for="password">Password</label>
                <div class="controls">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder
                    class="input-xlarge"
                    v-model="$v.password.$model"
                  />
                </div>
                <div class="alert alert-danger" v-if="$v.password.$error">
                  Invalid password
                </div>
              </div>
              <br />
              <div class="control-group">
                <label class="control-label h3 mb-2" for="confirmPassword">Confirm Password</label>
                <div class="controls">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder
                    class="input-xlarge"
                    v-model="$v.confirmPassword.$model"
                  />
                <div class="alert alert-danger" v-if="$v.confirmPassword.$error">
                  Passwrods should match
                </div>
                </div>
              </div>
              <br />
              <br />
              <div class="control-group">
                <div class="controls">
                  <button class="btn btn-info" :disabled="$v.$invalid">Register</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { registerUser } from './../mixins/services/userService';
import { email, required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    }
  },
  mixins: [registerUser],
  validations: {
    email: { email, required },
    password: { minLength: minLength(4),  required },
    confirmPassword: { sameAsPassword:  sameAs('password') }
  },
  methods: {
    handleSubmit() {
      this.register()
        .then(data => {
          this.showNotification('success', 'User registered successfully!')
          this.$router.push('login');
        }).catch(err => {
          this.showNotification('error', err.response.data.message)
          // this.$emit('message-show', { type: 'error', text:  })
        })
    }
  }
};
</script>

<style>
</style>
