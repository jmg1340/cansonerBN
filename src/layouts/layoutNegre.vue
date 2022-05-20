<template>

  <q-layout view="lHh Lpr lFf">
    <q-header elevated color="black" class="bg-black">
      <q-toolbar class="glossy_xxx">

        <q-img 
          class="flip animated"
          src="~assets/512.png" 
          style="width: 48px"></q-img>

        <q-toolbar-title>
          <div class="text-italic text-grey-9">Cançoner</div>
          <div class="text-caption text-weight-thin text-grey-9">grup Bona Nova</div>
        </q-toolbar-title>
<!-- 
        <q-btn
          color="grey-8"
          dense
          rounded
          @click="mostrarOpcionsCanso"
          icon="settings"
          aria-label="Opcions"
          class="q-mr-lg"
        />
 -->

<!-- 
        <q-btn
          color="brown-7" 
          label="Tornar"
          no-caps
          rounded
          push
          @click="tornarAlBuscador"
          >
        </q-btn>
 -->

        <!-- <div>Cançoner grup Bona Nova</div> -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>






</template>

<script>
export default {
  name: 'MyLayout',

  created (){
    document.addEventListener("keydown", this.funcEventTornar)
  },

  destroyed(){
    // eliminem eventListener
    document.removeEventListener("keydown", this.funcEventTornar)
  },

  data () {
    return {
      leftDrawerOpen: false,
    }
  },
  methods: {

    funcEventTornar: function(event){
      // if (event.) return
      
      switch( event.key ){

        case "T":
        case "t":
          this.tornarAlBuscador()
          break;

      } 

    },


    tornarAlBuscador: function(){
      this.$router.push({ name: 'cercar' });
    },

    mostrarOpcionsCanso: function(){
      this.$store.dispatch("modulCansoner/actActivarOpcionsCanso", true)
    }
  }
}
</script>

<style>
  divs{
    border: 1px solid black;
  }

  .negre{
    height: 100%;
    width: 100%;
  }



  .animated.flip {
    -webkit-backface-visibility: visible;
    backface-visibility: visible;
    -webkit-animation-name: flip;
    animation-name: flip;
    -webkit-animation-duration: 3s;
    animation-duration: 3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }


  @-webkit-keyframes flip {
    0% {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
      transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    40% {
      -webkit-transform: perspective(400px) translate3d(0, 0, 150px)
        rotate3d(0, 1, 0, -190deg);
      transform: perspective(400px) translate3d(0, 0, 150px)
        rotate3d(0, 1, 0, -190deg);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    50% {
      -webkit-transform: perspective(400px) translate3d(0, 0, 150px)
        rotate3d(0, 1, 0, -170deg);
      transform: perspective(400px) translate3d(0, 0, 150px)
        rotate3d(0, 1, 0, -170deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    80% {
      -webkit-transform: perspective(400px) scale3d(0.95, 0.95, 0.95);
      transform: perspective(400px) scale3d(0.95, 0.95, 0.95);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    100% {
      -webkit-transform: perspective(400px);
      transform: perspective(400px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
  }


  
  @keyframes flip {
    0% {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
      transform: perspective(400px) rotate3d(0, 1, 0, -360deg);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    40% {
      -webkit-transform: perspective(400px) translate3d(0, 0, 150px)
        rotate3d(0, 1, 0, -190deg);
      transform: perspective(400px) translate3d(0, 0, 150px)
        rotate3d(0, 1, 0, -190deg);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    50% {
      -webkit-transform: perspective(400px) translate3d(0, 0, 150px)
        rotate3d(0, 1, 0, -170deg);
      transform: perspective(400px) translate3d(0, 0, 150px)
        rotate3d(0, 1, 0, -170deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    80% {
      -webkit-transform: perspective(400px) scale3d(0.95, 0.95, 0.95);
      transform: perspective(400px) scale3d(0.95, 0.95, 0.95);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    100% {
      -webkit-transform: perspective(400px);
      transform: perspective(400px);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
  }



</style>