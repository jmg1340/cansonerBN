<template >
  <q-page class="negre text-h4">

    <div class="column  ">
      <div class="col text-right text-caption">{{seleccioCansoner}} - {{inputNumero}}</div>
    </div>

    <div class="column items-center ">
      <div class="col q-gutter-lg ">

        <img v-if="imatgeJesus" class="col q-mr-md" src="~assets/Jesus.png" style="width: 89%"/>
        <!-- <img v-if="imatgeJesus" class="col q-mr-md" src="~assets/JesusUlls.gif" style="width: 89%"/> -->

        <!-- <div class="row">
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
        </div>-->

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
      inputNumero: "",
      imatgeJesus: false
    }
  },

  methods:{
    funcEventNegre: function(event){

      switch( event.key ){

        case "T":
        case "t":
          this.$router.push({ name: 'cercar' });
          break;

        case "J":
        case "j":
          this.imatgeJesus = !this.imatgeJesus
          break;

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

    mostrarCansoNumero: async function() {
      console.log("Estic a MOSTRAR_CANSO_NUMERO !!");

      // 1. Trobar el idCanso i l'idioma corresponent al llibre i numero seleccionats
      const objIDCansoIdioma = await this.$store.dispatch("modulCansoner/actObtenirIdCansoIdioma", {
                        llibre: this.seleccioCansoner,
                        numero: this.inputNumero
                      });

      console.log("objIDCansoIdioma", objIDCansoIdioma)
      let {idCanso, idioma} = objIDCansoIdioma


      if (idCanso === null) {

        console.log("No existeix numero al llibre")
        this.$q.notify({
          message: 'La cançó amb nº ' + this.inputNumero + ' no existeix',
          icon: 'sentiment_very_dissatisfied',
          position: 'top',
          timeout: 1000
        })
        return

      } else if ( idioma === "escollir idioma") {
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
          .onOk( data =>   {
            idioma = data;
            this.$router.push({ name: "cansoDesdeNegre", query: { idCanso,  idioma } });
          })
          .onCancel(() =>  { })// console.log('>>>> Cancel')
          .onDismiss(() => { });// console.log('I am triggered on both OK and Cancel')

      } else {
        this.$router.push({ name: "cansoDesdeNegre", query: { idCanso,  idioma } });
      }


      // this.guardarVariablesSessio();





      return

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
