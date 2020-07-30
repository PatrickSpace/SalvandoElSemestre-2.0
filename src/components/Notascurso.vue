<template>
  <div>
    <v-card class="rounded-lg my-10" elevation="10">
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            @click="agregarnota()"
            absolute
            dark
            fab
            bottom
            right
            color="teal"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Agregar nota</span>
      </v-tooltip>
      <v-card-title class="pb-0">
        <v-icon color="deep-orange" large class="px-2">mdi-clipboard-text</v-icon>Notas
      </v-card-title>
      <v-divider inset></v-divider>
      <v-container class="px-5">
        <v-simple-table height="300px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Nombre</th>
                <th class="text-center">Porcentaje</th>
                <th class="text-center">Nota</th>
                <th class="text-right">Editar</th>
                <th class="text-right">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in curso.notas" :key="item.nombre">
                <td>{{ item.nombre }}</td>
                <td class="text-center">{{ item.porcentaje }}%</td>
                <td class="text-center">{{ item.valor }}</td>
                <td class="text-right">
                  <v-btn @click="editarnota(item)" icon>
                    <v-icon color="primary">mdi-pencil</v-icon>
                  </v-btn>
                </td>
                <td class="text-right">
                  <v-btn @click="borrarnota(index)" icon>
                    <v-icon color="error">mdi-close</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </v-card>
    <v-dialog v-model="dialognotas" max-width="400">
      <v-card>
        <v-card-title class="headline">Agregar nota</v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="validnota">
              <v-text-field
                v-model="newnota.nombre"
                :counter="10"
                clearable
                :rules="nombreRules"
                label="Abreviación"
                required
              ></v-text-field>
              <v-text-field
                v-model="newnota.porcentaje"
                type="number"
                max="100"
                min="1"
                clearable
                suffix="%"
                :rules="porcRules"
                label="Porcentaje"
                required
              ></v-text-field>
              <v-text-field
                type="number"
                clearable
                max="20"
                min="0"
                v-model="newnota.valor"
                :rules="notaRules"
                label="Nota"
                required
              ></v-text-field>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="cancelaragregar()">Cancelar</v-btn>
          <v-btn color="prymary" text @click="validar()">Agregar</v-btn>
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
  name: "Notascurso",
  props: { curso: Object },
  data() {
    return {
      dialognotas: false,
      validnota: true,
      snackbar:false,
      vsnack:{
        text:'',
        color:'',
      },
      newnota: {
        nombre: "",
        porcentaje: 0,
        valor: 0,
      },
      notaRules: [
        (v) => !!v || "El valor de la nota es obligatorio",
        (v) => (v && v.length <= 10) || "Use como máximo 2 caracteres",
        (v) => (v && v <= 20) || "La nota es de 20 como máximo",
        (v) => (v && v >= 0) || "La nota minima es 0",
      ],
      porcRules: [
        (v) => !!v || "El porcentaje es obligatorio",
        (v) => (v && v.length <= 10) || "Use como máximo 3 caracteres",
        (v) => (v && v <= 100) || "El porcentaje máximo es 100% ",
        (v) => (v && v >= 1) || "El porcentaje minimo es 1% ",
      ],
      nombreRules: [
        (v) => !!v || "El alias es obligatorio",
        (v) => (v && v.length <= 10) || "Use como máximo 10 caracteres",
      ],
    };
  },
  methods: {
    agregarnota() {
      this.dialognotas = true;
    },
    validar() {
      if (this.$refs.form.validate()) {
        this.curso.notas.push(this.newnota);
        this.dialognotas = false;
        this.vsnack.color='success',
        this.vsnack.text='Se agregó correctamente'
        this.snackbar= true;
      }
    },
    cancelaragregar(){
      this.dialognotas = false;
        this.$refs.form.reset();
    },
    borrarnota(index){
      this.curso.notas.splice(index,1);
      this.vsnack.color='error',
        this.vsnack.text='Se eliminó correctamente'
        this.snackbar= true;
    },
    editarnota(item){
      this.newnota.nombre= item.nombre;
      this.newnota.porcentaje= item.porcentaje;
      this.newnota.valor= item.valor;
      this.dialognotas = true;
    },
  },
};
</script>