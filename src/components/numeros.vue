<template>
  <div class="row justify-center">
    <div class="col-md-8 col-sm-10 col-xs-12">
      <q-card class="text-center ">
        <div class="q-gutter-xs q-pb-xs">
          <q-radio
            v-model="seleccioCansoner"
            val="vermell"
            label="C. Vermell"
            color="red"
            
          />
          <q-radio
            v-model="seleccioCansoner"
            val="blau"
            label="C. Blau"
            color="blau"
          
          />
          <!-- 						
              <q-radio v-model="seleccioCansoner" val="nadales" label="Nadales" color="black" @input="mostrarNumerosLlibre" />
          -->
        </div>
      </q-card>

      

      <div v-if="seleccioCansoner != ''" class="column q-gutter-sm bordered">
        
        <!-- resultat -->
        <div class="row justify-center">
          <transition name="shakeX" class="animated">
            <div class="col-auto bg-grey-4 text-h3 text-center rounded-borders shadow-6 q-mt-sm" >
              &nbsp;{{ inputNumero }}&nbsp;
            </div>
          </transition>
        </div>


        <!-- TECLAT NUMERIC -->
        <div class="bordered q-gutter-xs">
          <!-- Numeros -->
          <div class="row justify-center q-gutter-xs">
            <div
              class="col-auto text-center"
              v-for="(numeroFila1, index) in teclat.fila1"
              :key="'fila2'+ index"
            >
              <q-btn
                class="text-h6"
                :color="(seleccioCansoner == 'vermell') ? 'red-9' : (seleccioCansoner == 'blau') ? 'blue-10' : 'grey-9'"
                glossy
                :label="numeroFila1"
                @click="teclejar(numeroFila1)"
              />
            </div>
          </div>
          <div class="row justify-center q-gutter-xs">
            <div
              class="col-auto text-center"
              v-for="(numeroFila2, index2) in teclat.fila2"
              :key="'fila2'+ index2"
            >
              <q-btn
                class="text-h6"
                :color="(seleccioCansoner == 'vermell') ? 'red-9' : (seleccioCansoner == 'blau') ? 'blue-10' : 'grey-9'"
                glossy
                :label="numeroFila2"
                @click="teclejar(numeroFila2)"
              />
            </div>
          </div>
          <div class="col row justify-center q-gutter-xs">
            <div
              class="col-auto text-center"
              v-for="(numeroFila3, index3) in teclat.fila3"
              :key="'fila3'+ index3"
            >
              <q-btn
                class="text-h6"
                :color="(seleccioCansoner == 'vermell') ? 'red-9' : (seleccioCansoner == 'blau') ? 'blue-10' : 'grey-9'"
                glossy
                :label="numeroFila3"
                @click="teclejar(numeroFila3)"
              />
            </div>
          </div>
          <div class="row justify-center items-center q-gutter-xs">
            <div class="col-auto text-center">
              <q-btn
                class="text-h6"
                :color="(seleccioCansoner == 'vermell') ? 'red-9' : (seleccioCansoner == 'blau') ? 'blue-10' : 'grey-9'"
                glossy
                :label="0"
                @click="teclejar(0)"
              />
            </div>
            <div class="col-auto text-center">
              <q-btn
                class="text-h7"
                :color="(seleccioCansoner == 'vermell') ? 'red-9' : (seleccioCansoner == 'blau') ? 'blue-10' : 'grey-9'"
                glossy
                label="Borrar"
                @click="inputNumero=''"
              />
            </div>
          </div>
        </div>

        <!-- <q-separator /> -->

        <div class="row justify-center q-gutter-sm">
          <div class="col-auto q-mt-xs">
            <q-btn
              class="text-h6"
              color="primary"
              :disabled="inputNumero==''"
              glossy
              label="Mostrar"
              @click="mostrarCansoNumero"
            />
          </div>
        </div>
      </div>
      <!-- final TECLAT NUMERIC -->
    </div>
  </div>
</template>

<script>
export default {
  name: "componentBuscarPerNumero",

  created() {

    if (this.$q.sessionStorage.getItem("key_seleccioCansoner"))
      this.seleccioCansoner = this.$q.sessionStorage.getItem( "key_seleccioCansoner" );

    // eventListener per grabar pulsacions de tecles per a nous codis de cançons
    document.addEventListener("keydown", this.funcEventKeydown)

  },

  destroyed(){
    this.guardarVariablesSessio();
    // eliminem eventListener
    document.removeEventListener("keydown", this.funcEventKeydown)

  },

  data() {
    return {
      // tabSeleccionat: null,

      seleccioCansoner: "",
      //numerosLlibre: [],
      inputNumero: "",
      teclat: {
        fila1: [7, 8, 9],
        fila2: [4, 5, 6],
        fila3: [1, 2, 3]
      },

    };
  },

  methods: {

    funcEventKeydown: function(event){
      // if (event.) return
      
      switch( event.key ){
        case "VK_RETURN":   //windows
        case "kVK_Return":  // MAC
        case "Enter":
          console.log(`inputNumero: ${this.inputNumero}`);
          this.mostrarCansoNumero();
          break;

        case "VK_DELETE":   //windows
        case "kVK_ForwardDelete":  // MAC        
        case "Delete":
          this.inputNumero = "";
          break;

        case "V":
        case "v":
          this.seleccioCansoner = "vermell";
          //this.inputNumero = "";
          break;

        case "B":
        case "b":
          this.seleccioCansoner = "blau";
          //this.inputNumero = "";
          break;

        default:
          if (this.inputNumero.length < 3 && !isNaN(event.key)) this.inputNumero = this.inputNumero.concat(event.key);
          // this.inputNumero += event.key;
          console.log(`tecla ${event.key}`)
          break;
      } 

    },





    teclejar: function(numero) {
      let x = this.inputNumero;
      if (x.length < 3) this.inputNumero = x.concat(numero);
    },

    mostrarCansoNumero: function() {
      console.log("Estic a MOSTRAR_CANSO_NUMERO !!");

      // Hi ha cançons que, per cada idioma, tenen mateix cançoner i
      // numero. En aquests casos, cal preguntar quin idioma triar.

      // Mirar si al getter "getObjCansonsLlibre" existeixen les propietats
      // num_CAT i num_ES. "getObjCansonsLlibre" depen de state.llibre per lo
      // que primer haig d'actualitzar state.llibre

      this.$store.dispatch(
        "modulCansoner/actModificarLlibre",
        this.seleccioCansoner
      );
      console.log("state.llibre MODIFICAT");

      // Un cop actualitzat, miro si existeixen les 2 propietats de l'idioma, segons el numero:
      
      if (
        ! this.$store.getters["modulCansoner/getObjCansonsLlibre"][
          this.inputNumero + "_CAT"
        ] &&
        ! this.$store.getters["modulCansoner/getObjCansonsLlibre"][
          this.inputNumero + "_ES"
        ]
      ) {
        
        console.log("No existeix numero al llibre")
        this.$q.notify({
          message: 'El número ' + this.inputNumero + ' no existeix',
          icon: 'sentiment_very_dissatisfied',
          position: 'top',
          timeout: 1000
        })



      } else if (
        this.$store.getters["modulCansoner/getObjCansonsLlibre"][
          this.inputNumero + "_CAT"
        ] &&
        this.$store.getters["modulCansoner/getObjCansonsLlibre"][
          this.inputNumero + "_ES"
        ]
      ) {
        this.$q
          .dialog({
            title:
              "La següent cançó te mateix cançoner i número de cançó per cada idioma. Quin idioma vols veure ?",
            //message: 'Tria idioma:',
            options: {
              type: "radio",
              model: null,
              // inline: true,
              items: [
                { label: "Català", value: "CAT", color: "secondary" },
                { label: "Castellà", value: "ES" }
              ]
            },
            cancel: false,
            stackButtons: true,
            persistent: true
          })
          .onOk(data => {
            let idioma = data;
            this.$store.dispatch("modulCansoner/actMostrarCanso", {
              llibre: this.seleccioCansoner,
              numero_idioma: this.inputNumero + "_" + idioma
            });

            this.guardarVariablesSessio();
            this.$router.push({ name: "canso" });
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      } else {
        //debugger
        let idioma = this.$store.getters["modulCansoner/getObjCansonsLlibre"][
          this.inputNumero + "_CAT"
        ]
          ? "CAT"
          : "ES";

        this.$store.dispatch("modulCansoner/actMostrarCanso", {
          llibre: this.seleccioCansoner,
          numero_idioma: this.inputNumero + "_" + idioma
        });

        // this.guardarVariablesSessio();
        this.$router.push({ name: "canso" });
      }
    },

    // animateCSS: (element, animation, prefix = 'animate__') => {
    //   // We create a Promise and return it
    //   new Promise((resolve, reject) => {
    //     const animationName = `${prefix}${animation}`;
    //     const node = document.querySelector(element);

    //     node.classList.add(`${prefix}animated`, animationName);

    //     // When the animation ends, we clean the classes and resolve the Promise
    //     function handleAnimationEnd() {
    //       node.classList.remove(`${prefix}animated`, animationName);
    //       resolve('Animation ended');
    //     }

    //     node.addEventListener('animationend', handleAnimationEnd, {once: true});
    //   });
    // },


    guardarVariablesSessio: function() {
      // this.$q.sessionStorage.set("key_tabSeleccionat", this.tabSeleccionat);
      this.$q.sessionStorage.set("key_seleccioCansoner", this.seleccioCansoner);

    }
  }
};
</script>


<style>

  .shakeX-enter {
    transition: all .3s ease;
  }




  .DIVcasella {
    width: 50px;
    height: 50px;
  }

  .DIVred {
    background-color: red;
  }
  .DIVblue {
    background-color: blue;
  }
  .DIVgrey {
    background-color: grey;
  }

  .borde {
    border: 1px solid black;
  }
</style>