<template>
  <v-app>
    <Navbar />

    <v-main>
      <v-container>
      <Datoscurso v-bind:curso="curso" />
      <Notascurso v-bind:curso="curso" />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Datoscurso from "@/components/Datoscurso.vue";
import Notascurso from "@/components/Notascurso.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Infocurso",
  components: {
    Datoscurso,
    Notascurso,
    Navbar,
    Footer,
  },
  data() {
    return {
      curso: {
        nombre: "Contabilidad y presupuestos",
        creditos: 3,
        profesor: "Maritza",
        notas: [
          { nombre: "pc1", porcentaje: 30, valor: 12 },
          { nombre: "pc2", porcentaje: 20, valor: 15.83 },
          { nombre: "pc3", porcentaje: 10, valor: 10 },
          { nombre: "pc4", porcentaje: 40, valor: 15 },
        ],
      },
    };
  },
};
</script>