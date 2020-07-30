<template>
  <v-container>
    <v-card class="mt-5" v-for="(ciclo) in ciclos" :key="ciclo.nombre" elevation="10">
      <v-toolbar dark style="background-color:black;">
        <v-toolbar-title>{{ciclo.nombre}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" dark icon>
              <v-icon large :color="completado(ciclo).color">{{completado(ciclo).icon}}</v-icon>
            </v-btn>
          </template>
          <span>{{completado(ciclo).text}}</span>
        </v-tooltip>
      </v-toolbar>
      <v-list three-line>
        <v-list-item
          v-for="curso in ciclo.cursos"
          :key="curso.id"
          link
          :to="{name:'curso', params: curso}"
        >
          <v-list-item-content>
            <v-list-item-title>{{ curso.title }}</v-list-item-title>
            <v-list-item-subtitle>
              Creditos:
              <b>{{ curso.creditos }}</b>
              <br />
              Nota al {{curso.porcentaje}}% :
              <b :class="colornota(curso)">{{curso.acumulado}}</b>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-progress-circular
              width="3"
              size="60"
              rotate="-90"
              :value="curso.porcentaje"
              :color="colorprogress(curso)"
            >{{curso.porcentaje}}%</v-progress-circular>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <v-card-text v-if="ciclo.cursos.length===0">Agregue alguna nota</v-card-text>
        <v-card-text v-else>Ponderado: {{ponderadoacumulado(ciclo)}}</v-card-text>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="borrarciclo(ciclo)" v-bind="attrs" v-on="on" icon>
              <v-icon color="error">mdi-trash-can</v-icon>
            </v-btn>
          </template>
          <span>Eliminar Ciclo</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="editarciclo(ciclo)" v-bind="attrs" v-on="on" icon>
              <v-icon color="primary">mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Editar Ciclo</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="agregarcurso(ciclo)" v-bind="attrs" v-on="on" icon>
              <v-icon color="teal">mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Agregar Curso</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
    <!---------FORM PARA AGREGAR UN CURSO------------>
    <v-dialog v-model="dialogcurso" max-width="400">
      <v-card>
        <v-card-title class="headline">Agregar Curso</v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="formcurso" v-model="cursoform">
              <v-text-field
                v-model="newcurso.nombre"
                :counter="30"
                clearable
                :rules="cursoRules.nombre"
                label="Nombre del ciclo"
                required
                hint="Ej: Calculo 2"
              ></v-text-field>
              <v-text-field
                v-model="newcurso.creditos"
                type="number"
                :rules="cursoRules.creditos"
                label="Número de creditos"
                required
                hint="Creditos desde 1 a 8"
              ></v-text-field>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialogcurso=!dialogcurso">Cancelar</v-btn>
          <v-btn color="primary" text @click="validarcurso()">Agregar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!---------FORM PARA AGREGAR UN CICLO------------>
    <v-dialog v-model="dialogciclo" max-width="400">
      <v-card>
        <v-card-title class="headline">Ciclo</v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="formciclo" v-model="cicloform">
              <v-text-field
                v-model="newciclo.nombre"
                :counter="10"
                clearable
                :rules="nombreRules"
                label="Nombre del ciclo"
                required
                hint="Ej: 2020-01, 2019-2"
              ></v-text-field>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialogciclo=!dialogciclo">Cancelar</v-btn>
          <v-btn color="primary" text @click="validarciclo()">Agregar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!---------BOTON AGREGAR CICLO------------>
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-fab-transition>
          <v-btn
            @click="agregarciclo()"
            v-bind="attrs"
            v-on="on"
            color="teal"
            dark
            fixed
            bottom
            right
            fab
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>
      <span>Agregar nuevo ciclo</span>
    </v-tooltip>

    <!---------DIALOG PARA BORRAR UN CICLO------------>
    <div class="text-center">
      <v-bottom-sheet v-model="borrardialog">
        <v-sheet class="text-center" height="200px">
          <div class="py-5">¿Desea borrar el ciclo: {{cicloselceted.nombre}}?</div>
          <v-btn color="red" dark @click="borrarcicloconfirm()">Borrar</v-btn>
          <br />
          <v-btn class="mt-6" text color="red" @click="borrardialog = !borrardialog">close</v-btn>
        </v-sheet>
      </v-bottom-sheet>
    </div>
    <!---------SNACKBAR------------>
    <v-snackbar v-model="snackbar" bottom :color="vsnack.color" timeout="6000">
      {{ vsnack.text }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
export default {
  name: "Cursos",
  data: () => ({
    cicloselceted: {},
    borrardialog: false,
    dialogciclo: false,
    cicloform: true,
    newciclo: {
      nombre: "",
      cursos: [],
    },
    nombreRules: [
      (v) => !!v || "El nombre es obligatorio",
      (v) => (v && v.length <= 10) || "Use como máximo 10 caracteres",
    ],

    dialogcurso: false,
    cursoform: true,
    newcurso: {
      nombre: "",
      creditos: 0,
    },
    cursoRules: {
      nombre: [
        (v) => !!v || "El nombre es obligatorio",
        (v) => (v && v.length <= 30) || "Use como máximo 30 caracteres",
      ],
      creditos: [
        (v) => !!v || "Los creditos son obligatorios",
        (v) => (v && v >= 1) || "La xantidad mínima es 1 credito",
        (v) => (v && v <= 8) || "La xantidad máxima es 8 creditos",
      ],
    },
    snackbar: false,
    vsnack: {
      text: "",
      color: "",
    },
    ciclos: [
      {
        nombre: "2020-01",
        cursos: [
          {
            id: 1,
            title: "Calculo 1",
            creditos: 4,
            porcentaje: 100,
            acumulado: 11.0,
          },
          {
            id: 2,
            title: "Fisica 2",
            creditos: 4,
            porcentaje: 50,
            acumulado: 11.0,
          },
          {
            id: 3,
            title: "Programación web",
            creditos: 4,
            porcentaje: 30,
            acumulado: 11.0,
          },
        ],
      },
      {
        nombre: "2020-02",
        cursos: [
          {
            id: 1,
            title: "mate",
            creditos: 4,
            porcentaje: 100,
            acumulado: 8.0,
          },
          {
            id: 2,
            title: "comu",
            creditos: 4,
            porcentaje: 100,
            acumulado: 11.0,
          },
        ],
      },
    ],
  }),

  methods: {
    ponderadoacumulado(ciclo) {
      let cursos1 = ciclo.cursos;
      let sumacredxnota = 0;
      let totalcreditos = 0;
      for (var cur of cursos1) {
        totalcreditos = totalcreditos + cur.creditos;
        sumacredxnota = sumacredxnota + cur.creditos * cur.acumulado;
      }
      return Math.round((sumacredxnota / totalcreditos) * 100) / 100;
    },
    completado(ciclo) {
      let curs = ciclo.cursos;
      if (ciclo.cursos.length === 0) {
        return {
          color: "red",
          icon: "mdi-timelapse",
          text: "Ciclo sin cursos",
        };
      }
      for (var curso of curs) {
        if (curso.porcentaje !== 100) {
          return {
            color: "orange",
            icon: "mdi-timelapse",
            text: "Ciclo pendiente",
          };
        }
      }
      return {
        color: "success",
        icon: "mdi-check-circle",
        text: "Ciclo completado",
      };
    },
    borrarciclo(ciclo) {
      this.cicloselceted = ciclo;
      this.borrardialog = true;
    },
    borrarcicloconfirm() {
      let idciclo = "Ciclo: " + this.cicloselceted.nombre + " borrado";
      alert(idciclo);
      this.borrardialog = false;
    },
    colorprogress(curso) {
      let porc = curso.porcentaje;
      if (porc <= 30) {
        return "red";
      } else if (porc > 30 && porc < 60) {
        return "amber";
      } else if (porc >= 60) {
        return "success";
      }
    },
    colornota(curso) {
      let valor = curso.valor;
      if (valor < 12.5) {
        return "red--text";
      } else if (valor >= 12.5) {
        return "green--text";
      }
    },
    agregarciclo() {
      this.newciclo.nombre = "";
      this.dialogciclo = true;
    },
    validarciclo() {
      if (this.$refs.formciclo.validate()) {
        this.ciclos.push(this.newciclo);
        this.dialogciclo = false;
        (this.vsnack.color = "success"),
          (this.vsnack.text = "Se agregó correctamente");
        this.snackbar = true;
      }
    },
    agregarcurso(ciclo) {
      this.newcurso.nombre = "";
      this.newcurso.creditos = 0;
      
      this.dialogcurso = true;
    },
    validarcurso() {
      if (this.$refs.formcurso.validate()) {     
        //this.ciclo.cursos.push(this.newcurso);
        this.dialogcurso = false;
        (this.vsnack.color = "success"),
          (this.vsnack.text = "Se agregó correctamente");
        this.snackbar = true;
      }
    },
  },
  computed: {},
};
</script>