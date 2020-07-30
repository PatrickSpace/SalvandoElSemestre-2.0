<template>
  <v-footer color="black" padless>
    <v-row justify="center" no-gutters>
      <v-btn
        :to="link.ruta"
        v-for="link in links"
        :key="link.nombre"
        color="white"
        text
        rounded
        class="my-2"
      >{{ link.nombre }}</v-btn>
      <v-col class="lighten-2 py-4 text-center white--text" cols="12">
        Powered by:
        <v-btn
          text
          dark
          color="teal"
          rounded
          href="http://boxellcompany.com"
          target="_blank"
        >Boxell Company</v-btn>
        <br />
        &copy; {{ new Date().getFullYear() }} —
        <strong>Salvando el Semestre</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  name: "Footer",
  data: () => ({
    links: [
      { nombre: "Sugerencias", ruta: "/sugerencias" },
      { nombre: "Politica y privacidad", ruta: "/politica" },
    ],
  }),
};
</script>