<template>
  <v-row class="pa-6">
    <v-col>
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="login">
        <v-text-field v-model="form.email" :rules="rules.email" label="E-mail" required></v-text-field>
        <v-text-field
          v-model="form.password"
          :rules="[rules.password.required, rules.password.min]"
          label="Password"
          required
          :type="show_password ? 'text' : 'password'"
          :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show_password = !show_password"
        ></v-text-field>

        <v-checkbox v-model="form.remember_me" label="Remember me"></v-checkbox>

        <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">Login</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
// import http from "../api/http";
import axios from "axios";
export default {
  data: () => ({
    show_password: false,
    valid: true,
    form: {
      email: "",
      password: "",
      remember_me: false,
    },
    rules: {
      password: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 6 || "Min 6 characters",
      },
      email: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    },
  }),

  methods: {
    login() {
      axios
        .post("http://localhost:8000/api/login", {
          email: this.form.email,
          password: this.form.password,
        })
        .then((response) => {
          // console.log(response);
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
          localStorage.setItem("jwt", response.data.data.token);

          if (localStorage.getItem("jwt") != null) {
            this.$emit("loggedIn");
            console.log(this.$route.query.nextUrl);
            if (this.$route.query.nextUrl != null) {
              this.$router.push(this.$route.query.nextUrl);
            } else {
              this.$router.push("/home");
            }
          }
        })
        .catch(function (error) {
          console.error(error.response);
        });
    },
  },
};
</script>

<style>
</style>