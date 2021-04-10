<template>
  <div class="flex-start q-pa-md">
  
    <div class="q-gutter-md">
      

      <!-- boto superior CATALA / CASTELLA -->

      <div class="row justify-center" v-if="this.arrIdiomes.length > 1">
        <q-btn-toggle
          push
          color="brown"
          text-color="white"
          toggle-color="orange"
          toggle-text-color="black"
          glossy
          v-model="strIdioma"
          :options="optionsToggle"
          @click="vesAlComensament"
        />
      </div>





      <div
        
        class="bg-brown-1 shadow-1 rounded-borders q-mb-lg"
      >
        <div 
          v-for="(idioma,index) in arrIdiomes"
          v-if="idioma == strIdioma"
          :key="`idioma-${index}`"
          :name="idioma" 
          class="column no-wrap flex-start"

          v-touch-swipe.mouse.left="properaCanso"
          v-touch-swipe.mouse.right="anteriorCanso"
        >
          



          <div class="">
            <div class="row justify-between items-center">

              
              <!-- numero canço - llibre -->
              <div class="col block " >
                <q-chip 
                  :color="(objCanso[idioma].cansoner.nom == 'vermell') ? 'red-8' : (objCanso[idioma].cansoner.nom == 'blau') ? 'blue-8' : 'grey-8'" 
                  text-color="white"
                  
                >
                  <q-avatar color="black" text-color="white text-bold">
                    {{objCanso[idioma].cansoner.numero}}
                  </q-avatar>
                  llibre {{objCanso[idioma].cansoner.nom}}
                </q-chip>                
              </div>

              <!-- icona cor -->
              <div class="col-auto text-center ">
                <q-icon
                  v-if="esCansoFavorita == false"
                  style= "color: #545454; font-size: 1.5rem;"
                  dense
                  name="favorite_border"
                  @click="afegirFavorits()"
                />

                <transition
                  name="bounce"
                >
                  <q-icon
                    v-if="esCansoFavorita == true"
                    style= "color: #ff0000; font-size: 2rem;"
                    dense
                    name="favorite"
                    @click="treureFavorits()"
                  />
                </transition>

              </div>

              
              <!-- icona email -->
              <div class="col text-right" >
                <q-btn
                  color="grey-8"
                  flat
                  dense
                  @click="advertenciaCorreu=true"
                  icon="mail"
                  aria-label="Enviar"
                  v-if="!opcions.amagaSocialLinks"
                />
              </div>

            </div>

            
            
            <!-- Reproductor multimèdia -->
            <q-media-player
              type="audio"
              background-color="black"
              radius="1rem"
              :sources="objCanso[idioma].audio"
              v-if="objCanso[idioma].audio && !opcions.amagaReproductor"
              class="q-mx-xs"
            >
            </q-media-player>

          </div>




          <!-- ESTROFES i TORNADES -->

          <div class="q-my-md text-center">
            
            <q-card
              v-for="(obj, indexParagraf) in objCanso[idioma].lletra"
              :key="`Canso-${indexParagraf}`"
            >
              <q-card-section class="q-my-xs">
                <p 
                  v-for="(linia, indexLinia) in obj.paragraf"
                  :key="`L-${indexLinia}`"
                  v-bind:style="{ fontSize : opcions.pfontSize + 'px', fontWeight: opcions.pbold ? 'bold' : ''}"
                  :class="{classTornada: obj.tipus=='tornada'}"
                  >
                    {{ linia  }}
                </p>
              </q-card-section>
            </q-card>
          </div>
          <br><br><br><br><br><br><br>
        </div>
        <!-- <div style="{margin-top: 100px}"/> -->
      </div>




      <!-- boto inferior CATALA / CASTELLA -->

      <div class="row justify-center" v-if="this.arrIdiomes.length > 1">
        <q-btn-toggle
          push
          color="brown"
          text-color="white"
          toggle-color="orange"
          toggle-text-color="black"
          glossy
          v-model="strIdioma"
          :options="optionsToggle"
          @click="vesAlComensament"
        />
      </div>

    </div>
    <br/><br/><br/><br/><br/><br/><br/>




    <!-- dialeg per OPCIONS -->

    <q-dialog v-model="activarOpcionsCanso" persistent>
      <q-card style="width: 350px" class="q-px-sm q-pb-md">
        
        <div class="text-blue">
          <div class="text-h6">Opcions lletra cançó</div>
        </div>
        <q-card-section>

          <q-item dense>
            <q-item-section avatar>
              <q-icon name="format_size" />
            </q-item-section>
            <q-item-section>
              <q-slider 
                color="red"
                label
                label-always
                v-model="opcions.pfontSize"
                :min="10"
                :max="80"
                :step="1" />
            </q-item-section>
          </q-item>

          <q-item dense class="q-mt-xs">
            <q-item-section avatar>
              <q-checkbox v-model="opcions.pbold" label="Negreta" color="black" />
            </q-item-section>
          </q-item>
        </q-card-section>

        <div class="text-blue">
          <div class="text-h6" >Altres opcions</div>
        </div>
        <q-card-section>
          <q-item dense class="">
            <q-item-section avatar>
              <q-checkbox v-model="opcions.amagaReproductor" label="Amaga sempre reproductor" color="black" />
            </q-item-section>
          </q-item>
          <q-separator color="red-8" inset />
          <q-item dense class="">
            <q-item-section avatar>
              <q-checkbox v-model="opcions.amagaSocialLinks" label="Amaga correu" color="black" />
            </q-item-section>
          </q-item>
          <q-separator color="red-8" inset />
          <q-item dense class="">          
            <q-item-section avatar>
              <q-checkbox v-model="activarCanviCanso" label="Canviar cançó al lliscar dit horitzontalment" color="black" />
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" @click="tancarOpcionsCanso" />
        </q-card-actions>
      </q-card>
    </q-dialog>





  <!-- dialeg per ADVERTENCIA CORREU -->

    <q-dialog v-model="advertenciaCorreu" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red-10 text-white" style="width: 450px">
        <q-card-section>
          <div class="text-h6 ">Advertència</div>
        </q-card-section>

        <q-card-section class=" bg-red-9 text-whiteq-pt-none">
          S'utilitzarà la teva app del correu. Si la teva app és GMAIL no funcionarà bé:<br/>
          1. Si la cançó te àudio, el seu enllaç no s'incorporà correctament al correu i la lletra no s'incorpora.<br/>
          2. Si la cançó no te àudio, la lletra s'incorpora tota seguida sense respectar finals de paràgraf. 
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" @click="enviarCorreu" />
        </q-card-actions>
      </q-card>
    </q-dialog>



  </div>


</template>






<script>
import VueAplayer from 'vue-aplayer'


export default {
  name: 'canso',

  components: {
      'a-player': VueAplayer
  },

  created(){
    
    if (this.$q.localStorage.getItem("CansonerBN_key_opcions"))
      this.opcions = this.$q.localStorage.getItem("CansonerBN_key_opcions");

    this.strIdioma = this.idiomaCansoSeleccionada
    this.windowHeight = window.innerHeight + 'px'

    this.optionsToggle = []
    this.arrIdiomes.forEach( function(idioma) {
      this.optionsToggle.push({
        label: (idioma == "CAT") ? "CATALÀ" : "CASTELLÀ" ,
        value: idioma
      })
    },this)


    this.codiCanso = "";
    
    document.addEventListener("keydown", this.funcEventNegre)
  },

  destroyed () {
    // guardem les opcions
    this.$q.localStorage.set("CansonerBN_key_opcions", this.opcions);
    document.removeEventListener("keydown", this.funcEventNegre)
  },

  data () {
    return {
      strIdioma: null,
      optionsToggle: null,

      activarCanviCanso: false,
      advertenciaCorreu: false,
      opcions: {
        pfontSize: 16,
        pbold: false,
        amagaReproductor: false,
        amagaSocialLinks: false       
      },


    }
  },

  computed: {
    objCansoner: function (){
      return this.$store.state.modulCansoner.objCansoner
    },

    idCanso: function (){
      return this.$store.state.modulCansoner.idCanso
    },

    objCanso: function (){
      return this.objCansoner[this.idCanso]
    },

    arrIdiomes: function (){
      return Object.keys(this.objCansoner[this.idCanso])
    },

    idiomaCansoSeleccionada: function (){
      return this.$store.state.modulCansoner.idioma
    },

    llibre: function (){
      return this.$store.state.modulCansoner.llibre
    },

    activarOpcionsCanso: function (){
      return this.$store.state.modulCansoner.activarOpcionsCanso
    },

    esCansoFavorita: function () {
      var arrFavorites = this.$store.state.modulCansoner.favorites
      
      var x = false
      x = arrFavorites.some( function (obj) {
        return obj.idCanso == this.idCanso && obj.idioma == this.strIdioma
      }, this)
      return x
    }



  },

  methods: {

    funcEventNegre: function(event){     
      switch( event.key ){
        case "N":
        case "n":
          this.$router.push({ name: "negre" });         
          break;
      } 
    },




    afegirFavorits: function () {
      let objecte = {
        idCanso : this.idCanso,
        idioma : this.strIdioma
      }
      console.log("AFEGIR objecte: " + JSON.stringify(objecte))
      this.$store.dispatch("modulCansoner/actAfegirFavorits", objecte );

      var arrFavorites = this.$store.state.modulCansoner.favorites
      this.$q.localStorage.set("CansonerBN_key_favorits", arrFavorites);
      
    },

    treureFavorits: function () {
      let objecte = {
        idCanso : this.idCanso,
        idioma : this.strIdioma
      }
      console.log("TREURE objecte: " + JSON.stringify(objecte))

      var arrFavorites = this.$store.state.modulCansoner.favorites
      console.log(JSON.stringify(arrFavorites))

      var index = arrFavorites.findIndex(function(obj_arr){
        return obj_arr.idCanso === objecte.idCanso && obj_arr.idioma === objecte.idioma
      })
      console.log("Index: " + index)
      this.$store.dispatch("modulCansoner/actTreureFavorits", index );
      console.log(JSON.stringify(arrFavorites))

      var arrFavorites = this.$store.state.modulCansoner.favorites
      this.$q.localStorage.set("CansonerBN_key_favorits", arrFavorites);

    },

    enviarCorreu: function(){
      this.advertenciaCorreu = false

      let asumpte = "Cançó \"" + this.objCansoner[this.idCanso][this.strIdioma].titol.toUpperCase() + "\""
      let text = "" 


      /* si existeix audio, incorporem enllaç al missatge*/
      let arrAudio = this.objCansoner[this.idCanso][this.strIdioma].audio

      if (arrAudio != null){
        text = "ÀUDIO:\n"
        text += "https://drive.google.com/open?id=" + arrAudio[0].src.substring(arrAudio[0].src.lastIndexOf("=")+1)
      }

      text += "\n\n\nLLETRA:\n\n"   // %0D%0A = return


      /* Incorporem la lletra de la canço */
      this.objCansoner[this.idCanso][this.strIdioma].lletra.forEach( function (objEstrofa) {

        objEstrofa.paragraf.forEach( function (linia) {
          text += linia + "\n"
        })
        text += "\n\n"
      })



      /* Al GMAIL es trunca el contingut de text per lo que encodeURIComponent */
      // if (this.$q.platform.is.android) {
      //   text = encodeURIComponent(text)
      // }


      location.href = "mailto:?subject=" + asumpte + "&body=" + encodeURIComponent(text)

    },

    tancarOpcionsCanso: function(){
      this.$store.dispatch("modulCansoner/actActivarOpcionsCanso", false)
    },

    vesAlComensament: function(){
      // console.log("Estic a vesAlComensament")
      window.scrollTo(0, 0)
    },



    properaCanso: function(){
      if ( this.activarCanviCanso)
        this.mostrarSeguentCanso (this.objCanso[this.strIdioma].cansoner.numero + 1)
    },
    anteriorCanso: function(){
      if ( this.activarCanviCanso)
        this.mostrarSeguentCanso (this.objCanso[this.strIdioma].cansoner.numero - 1)
    },

    mostrarSeguentCanso: function(nouNumero){
      console.log("*** Estic a SEGUENT_CANSO ***")

      // debugger
      // let nouNumero = (endavant_endarrere = "endavant") ? this.objCanso[this.strIdioma].cansoner.numero + 1  :  this.objCanso[this.strIdioma].cansoner.numero - 1 

      //console.log ("state.llibre MODIFICAT")

    
      // Un cop actualitzat, 1er miro no existeixen les 2 propietats:
      if ( !this.$store.getters['modulCansoner/getObjCansonsLlibre'][nouNumero + "_CAT"] &&  !this.$store.getters['modulCansoner/getObjCansonsLlibre'][nouNumero + "_ES"] ) {

        this.$q.dialog({
          title: 'Alerta',
          message: 'La canso amb numero ' + nouNumero + ' NO EXISTEIX al cançoner ' + this.objCanso[this.strIdioma].cansoner.nom
        }).onOk(() => {
          // console.log('OK')

        }).onCancel(() => {
          // console.log('Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })        

    
      // 2on miro si existeixen les 2 propietats:
      } else if ( this.$store.getters['modulCansoner/getObjCansonsLlibre'][nouNumero + "_CAT"] &&  this.$store.getters['modulCansoner/getObjCansonsLlibre'][nouNumero + "_ES"] ) {


          this.$q.dialog({
            title: 'La següent cançó te mateix cançoner i número de cançó per cada idioma. Quin idioma vols veure ?',
            //message: 'Tria idioma:',
            options: {
              type: 'radio',
              model: null,
              // inline: true,
              items: [
                { label: 'Català', value: 'CAT', color: 'secondary' },
                { label: 'Castellà', value: 'ES' },
              ]
            },
            cancel: false,
            persistent: true
          }).onOk(data => {
            
            let idioma = data

            //this.$store.dispatch("modulCansoner/actModificarLlibre", this.objCanso[this.strIdioma].cansoner.nom)

            console.log("ACTMostrarCanso")
            // debugger
            this.$store.dispatch("modulCansoner/actMostrarCanso", 
              {
                llibre: this.objCanso[this.strIdioma].cansoner.nom,
                numero_idioma: nouNumero + "_" + idioma
              }
            )
 
            //this.$router.push({ name: 'canso'});            

            this.optionsToggle =[]
            this.arrIdiomes.forEach( function(idioma) {
              this.optionsToggle.push({
                label: (idioma == "CAT") ? "CATALÀ" : "CASTELLÀ" ,
                value: idioma
              })
            },this)

            this.strIdioma = idioma

          }).onCancel(() => {
            // console.log('>>>> Cancel')
          }).onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          })


      } else {
        //debugger 
        let idioma = ( this.$store.getters['modulCansoner/getObjCansonsLlibre'][nouNumero + "_CAT"] ) ? "CAT": "ES"
        console.log("ELSE idioma: " + idioma)
        
        this.$store.dispatch("modulCansoner/actMostrarCanso", 
          {
            llibre: this.objCanso[this.strIdioma].cansoner.nom,
            numero_idioma: nouNumero + "_" + idioma
          }
        )


        // this.$router.push({ name: 'canso'});            

        this.optionsToggle =[]
        this.arrIdiomes.forEach( function(idioma) {
          this.optionsToggle.push({
            label: (idioma == "CAT") ? "CATALÀ" : "CASTELLÀ" ,
            value: idioma
          })
        },this)

        this.strIdioma = idioma

      }

    },



  },


}
</script>


<style lang="css" scoped>
/*
  @media screen and (min-width: 100px) { 
    p{
      font-size: 1.3em !important;
    }

  }

  @media screen and (min-width: 768px) { 
    p{
      font-size: 2em !important;
    }

  }

*/

.borde {
  border: 1px solid blue;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  /* animation: bounce-in .5s reverse; */
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}


  .classTornada{
    color: #cc0000;
    /*font-weight: bold;*/
  }


</style>