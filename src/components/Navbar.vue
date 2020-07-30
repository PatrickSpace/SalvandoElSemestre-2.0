<template>
  <div class="mb-10">
    <v-app-bar color="black" dark absolute hide-on-scroll >
      <v-btn to="/" icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-toolbar-title>Salvando el Semestre</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <span>Ver perfil</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon @click.stop="dialog = true">
            <v-icon color="error">mdi-power</v-icon>
          </v-btn>
        </template>
        <span>Cerrar sesión</span>
      </v-tooltip>
    </v-app-bar>
    
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Cerrar sesión</v-card-title>
        <v-card-text>Deberá iniciar sesión otra vez.</v-card-text>
        <v-card-actions>
          <v-btn color="dark" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="error" text @click="logout()">Salir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: "Navbar",
  data: () => ({
    dialog: false,
  }),
  methods:{
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.replace('/login');
      })
    }
  }
};
</script>