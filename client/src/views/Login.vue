<template>
  <div>
    <div class="text-center mb-3">
      <h1>Login</h1>
    </div>
    <hr class="my-2" />
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="form-holder text-center">
          <form class="form-inline" @submit.prevent="handleSubmit">
            <fieldset>
              <div class="control-group">
                <label class="control-label h3 mb-2" for="email">Email</label>
                <div class="controls">
                  <input v-model="$v.email.$model" type="text" id="email" name="email" placeholder class="input-xlarge" />
                </div>
                <div class="alert alert-danger" v-if="$v.email.$error">
                  Inavlid email
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
                  Inavlid password
                </div>
              </div>
              <br />
              <div class="control-group">
                <div class="controls">
                  <button class="btn btn-info" :disabled="$v.$invalid">Login</button>
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
import { loginUser, saveUserCredentials } from './../mixins/services/userService';
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    }
  },
  mixins: [loginUser],
  validations: {
    email: {
      email,
      required
    },
    password: {
      minLength: minLength(4),
      required
    }
  },
  methods: {
    handleSubmit() {
      this.login()
        .then(({ data }) => {
          const { token } = data;
          saveUserCredentials(token);
          this.$router.push('home');
          this.$emit('login');
          this.showNotification('success', 'Login successfully!')
        });
    }
  }
};
</script>
