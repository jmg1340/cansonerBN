<template>
  <div class="flex-start q-pa-md">
  
<!-- padding arrows -->

<!-- 
    <div class="row justify-center q-mb-md" v-if="this.arrIdiomes.length > 1">
      <q-btn-toggle
        push
        color="brown"
        text-color="white"
        toggle-color="orange"
        toggle-text-color="black"
        glossy
        v-model="slide"
        :options="optionsToggle"
      />
    </div>
 -->



    <div class="q-gutter-md">
      <q-carousel
        v-model="slide"
        transition-prev="slide-left"
        transition-next="slide-right"
        animated
        
        
        :height="windowHeight"
        class="bg-brown-1 shadow-1 rounded-borders q-mb-lg"
      >
        <q-carousel-slide 
          v-for="idioma,index in arrIdiomes"
          :key="`idioma-${index}`"
          :name="idioma" 
          class="column no-wrap flex-start"
        >
          


          <div class="">
            <div class="row justify-between q-gutter-md">

              <div class="block">
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


              <q-media-player
                type="audio"
                background-color="black"
                radius="1rem"
                :sources="objCanso[idioma].audio"
                v-if="objCanso[idioma].audio"
              >
<!-- 
                <template v-if="overlay" v-slot:overlay>
                  <div>
                    <img
                      src="statics/quasar-logo.png"
                      style="width: 30vw; max-width: 50px; opacity: 0.25;"
                    >
                  </div>
                </template>
 -->
              </q-media-player>




<!-- 
              <audio controls v-if="objCanso[idioma].audio" class="rounded-borders">
                <!-- <source :src="'ruta' + objCanso[idioma].audio + '.mp3'"> --
                <source :src="objCanso[idioma].audio.mp3" type="audio/mpeg">
                <source :src="objCanso[idioma].audio.ogg" type="audio/ogg">
                Audio no suportat.
              </audio>
 -->

            </div>
          </div>






          <div class="q-my-md text-center">
            
            <q-card
              v-for="(obj, indexParagraf) in objCanso[idioma].lletra"
              :keys="`C-${indexParagraf}`"
            >
              <q-card-section class="q-my-xs">
                <p 
                  v-for="(linia, indexLinia) in obj.paragraf"
                  :keys="`L-${indexLinia}`"
                  :class="{classTornada: obj.tipus=='tornada'}" 
                  >
                    {{ linia  }}
                </p>
              </q-card-section>
            </q-card>
          </div>
          <br><br><br><br><br><br><br>
        </q-carousel-slide>
        <!-- <div style="{margin-top: 100px}"/> -->
      </q-carousel>


      <div class="row justify-center" v-if="this.arrIdiomes.length > 1">
        <q-btn-toggle
          push
          color="brown"
          text-color="white"
          toggle-color="orange"
          toggle-text-color="black"
          glossy
          v-model="slide"
          :options="optionsToggle"
        />
      </div>

    </div>





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
    this.slide = this.idiomaCansoSeleccionada
    this.windowHeight = window.innerHeight + 'px'

    this.optionsToggle = []
    this.arrIdiomes.forEach( function(idioma) {
      this.optionsToggle.push({
        label: (idioma == "CAT") ? "CATALÀ" : "ESPANYOL" ,
        value: idioma
      })
    },this)
  },


  data () {
    return {
      slide: null,
      optionsToggle: null,
      windowHeight: null,
      src1: 'https://www.youtube.com/embed/dy9nwe9_xzw',
      sources: [
        {
          // src: 'https://youtu.be/dy9nwe9_xzw',
          src: 'https://docs.google.com/uc?export=&id=14MmWTvEgblk3cZ2JgX6c0QWgEOy_yRJQ',
          // src: 'https://ftp.nluug.nl/pub/graphics/blender/demo/movies/ToS/ToS-4k-1920.mov',
          type: 'audio/mp3'
        }
      ]

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



  }

}
</script>


<style lang="css" scoped>

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


  .dadesCanso{
    /*font-size: 1.5em;*/
    color: blue;
    font-weight: bold;
  }

  .classTornada{
    color: red;
    font-weight: bold;
  }


</style>