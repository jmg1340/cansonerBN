<template >
  <q-page class="negre text-h4">

    <div class="column q-mb-xl ">
      <div class="col text-caption">{{seleccioCansoner}} - {{inputNumero}}</div>
    </div>
    
    <div class="column items-center q-mt-xl">
      <div class="col q-mt-xl q-gutter-lg ">

        <div class="row">
          <img class="col q-mr-md" style="height: 50px; max-width: 50px" src="~assets/www.png" />
          <div class="col">www.bonanova.cat</div> 
        </div>
        <div class="row">
          <q-img class="col q-mr-md" style="height: 50px; max-width: 50px" src="~assets/insta.png" />
          <div class="col">@bonanova.cat</div> 
        </div>
        <div class="row">
          <q-img class="col q-mr-md" style="height: 50px; max-width: 50px" src="~assets/twitter.png" />
          <div class="col">@bonanova.cat</div> 
        </div>
        <div class="row">
          <q-img class="col q-mr-md" style="height: 50px; max-width: 75px" src="~assets/youtube.png" />
          <div class="col">canal "grup Bona Nova"</div> 
        </div>
      </div>

    </div>

  </q-page>
</template>


<script>

export default {
  name: 'negre',

  created (){
    document.addEventListener("keydown", this.funcEventNegre)
  },

  destroyed(){
    // eliminem eventListener
    document.removeEventListener("keydown", this.funcEventNegre)
  },


  data () {
    return {
      seleccioCansoner: "",
      inputNumero: ""
    }
  },

  methods:{
    funcEventNegre: function(event){
      
      switch( event.key ){

        case "N":
        case "n":
          this.$router.back();
          break;

        case "V":
        case "v":
          this.seleccioCansoner = "vermell";
          break;

        case "B":
        case "b":
          this.seleccioCansoner = "blau";
          break;


        case "VK_DELETE":   //windows
        case "kVK_ForwardDelete":  // MAC        
        case "Delete":
          this.inputNumero = "";
          break;

        case "VK_RETURN":   //windows
        case "kVK_Return":  // MAC
        case "Enter":
          this.mostrarCansoNumero();
          break;

        default:
          if (this.inputNumero.length < 3 && !isNaN(event.key)) this.inputNumero = this.inputNumero.concat(event.key);
          // this.inputNumero += event.key;
          console.log(`tecla ${event.key}`)
          break;

      } 

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

            // this.guardarVariablesSessio();
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



}

}
</script>


<style lang="css" scoped>
  .negre{
    background-color: black;
    color: #222222;
    /* text-align: center; */
  }

  .borde{
    border: 1px solid red;
  }
</style>