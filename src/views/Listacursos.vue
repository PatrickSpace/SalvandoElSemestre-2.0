<template>
  <v-app>
    <Navbar />
    <v-main>
      <Cursos />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Cursos from "@/components/Cursos.vue";

export default {
  name: "Listacursos",
  components: {Cursos, Navbar, Footer},
};
</script>

