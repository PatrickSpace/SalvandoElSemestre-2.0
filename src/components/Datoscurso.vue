<template>
  <div>
    <v-card class="rounded-lg my-10" elevation="10">
      <v-row justify="center">
        <v-col cols="12" class="py-0">
          <v-card-title class="pb-0">
            <v-icon color="orange darken-1" large class="px-2">mdi-fire</v-icon>
            {{curso.nombre}}
          </v-card-title>
          <v-divider inset></v-divider>
        </v-col>
        <v-col cols="5">
          <v-card-text>
            Creditos:
            <b>{{curso.creditos}}</b>
            <br />Profe:
            <b>{{curso.profesor}}</b>
          </v-card-text>
        </v-col>
        <v-col align-self="center" class="text-center" cols="4">
          <h3 :class="colornota">{{puntajeactual}}</h3>
          <small>Nota al {{porcentajeactual}}%</small>
        </v-col>
        <v-col cols="3" align-self="center" class="text-center px-0">
          <v-progress-circular
            width="2"
            size="50"
            rotate="-90"
            :value="porcentajeactual"
            :color="colorprogress"
          >
            <small>{{porcentajeactual}}%</small>
          </v-progress-circular>
        </v-col>
      </v-row>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            @click="dialogdatos = true"
            absolute
            light
            fab
            bottom
            right
            color="primary"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Editar curso</span>
      </v-tooltip>
    </v-card>
    <v-dialog v-model="dialogdatos" max-width="400">
      <v-card>
        <v-card-title class="headline">Editar curso</v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="validdatos">
              <v-text-field
                v-model="curso.nombre"
                :counter="30"
                clearable
                :rules="nombreRules"
                label="Nombre"
                required
              ></v-text-field>
              <v-text-field
                v-model="curso.profesor"
                :counter="30"
                clearable
                :rules="profeRules"
                label="Profesor"
                required
              ></v-text-field>
              <v-text-field
                type="number"
                clearable
                v-model="curso.creditos"
                :rules="creditosRules"
                label="Número de creditos"
                required
              ></v-text-field>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="cancelaragregar()">Cancelar</v-btn>
          <v-btn color="primary" text @click="validar()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" bottom :color="vsnack.color" timeout="6000">
      {{ vsnack.text }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: "Datoscurso",
  props: {
    curso: Object,
  },
  data: () => ({
    notaacumulada: 0,
    porcentajeacumulado: 0,
    dialogdatos: false,
    validdatos: true,
    snackbar: false,
    vsnack: {
      text: "",
      color: "",
    },
    nombreRules: [
      (v) => !!v || "El nombre del curso es obligatorio",
      (v) => (v && v.length <= 30) || "Use como máximo 30 caracteres",
    ],
    profeRules: [
      (v) => !!v || "El nombre del profesor es obligatorio",
      (v) => (v && v.length <= 30) || "Use como máximo 30 caracteres",
    ],
    creditosRules: [(v) => !!v || "El número de creditos es obligatorio"],
  }),
  methods: {
    validar() {
      if (this.$refs.form.validate()) {
        this.dialogdatos = false;
        (this.vsnack.color = "success"),
          (this.vsnack.text = "Se guardó correctamente");
        this.snackbar = true;
      }
    },
    cancelaragregar() {
      this.dialogdatos = false;
    },
  },
  computed: {
    porcentajeactual() {
      this.porcentajeacumulado = 0;
      for (var item of this.curso.notas) {
        item.porcentaje = parseFloat(item.porcentaje);
        this.porcentajeacumulado = parseFloat(this.porcentajeacumulado);
        this.porcentajeacumulado = this.porcentajeacumulado + item.porcentaje;
      }
      return this.porcentajeacumulado;
    },
    puntajeactual() {
      this.notaacumulada = 0;
      for (var item of this.curso.notas) {
        this.notaacumulada =
          this.notaacumulada + (item.valor * item.porcentaje) / 100;
      }
      this.notaacumulada = Math.round(this.notaacumulada * 100) / 100;
      return parseFloat(this.notaacumulada);
    },
    colorprogress() {
      if (this.porcentajeactual <= 30) {
        return "red";
      } else if (this.porcentajeactual > 30 && this.porcentajeactual < 60) {
        return "amber";
      } else if (this.porcentajeactual >= 60) {
        return "success";
      }
    },
     colornota() {
      if (this.puntajeactual < 12.5) {
        return "red--text";
      } else if (this.puntajeactual >= 12.5) {
        return "green--text";
      }
    },
  },
};
</script>
