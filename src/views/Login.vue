<template>
  <v-app>
    <v-main tag="div" class="d-flex">
      <v-card elevation="10" rounded class="mx-auto my-10 px-5 py-10" max-width="400">
        <v-card-title>Log In</v-card-title>
        <v-container>
          <v-form ref="form" v-model="validlogin">
            <v-text-field
              prepend-inner-icon="mdi-account"
              v-model="user"
              counter
              clearable
              :rules="emailRules"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-lock"
              v-model="psw"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="pswRules"
              label="Contraseña"
              clearable
              required
              @click:append="show = !show"
            ></v-text-field>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-btn class="primary" @click="login()" block>Ingresar</v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar color="error" v-model="snackbar" timeout="6000">
        {{ msg }}
        <template v-slot:action="{ attrs }">
          <v-btn  text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>

import firebase from "firebase";

export default {
  name: "Login",
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.user, this.psw)
          .then(
            (user) => {
              this.$router.replace('home');
            },
            (error) => {
              this.msg = error;
              this.snackbar = true;
            }
          );
      }
    },
    logout(){

    }
  },
  data() {
    return {
      validlogin: true,
      show: false,
      snackbar: false,
      msg: "",
      user: "",
      psw: "",
      emailRules: [
        (v) => !!v || "Este campo es obligatorio",
        (v) => /.+@.+\..+/.test(v) || "Ingrese un email valido",
      ],
      pswRules: [
        (v) => !!v || "Este campo es obligatorio",
        (v) =>
          (v && v.length <= 8) ||
          "La contraseña debe tener almenos 8 caracteres",
      ],
    };
  },
};
</script>