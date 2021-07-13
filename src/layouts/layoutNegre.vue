<template>

  <q-layout view="lHh Lpr lFf">
    <q-header elevated color="black" class="bg-black">
      <q-toolbar class="glossy_xxx">

        <q-img src="~assets/512.png" style="width: 48px"></q-img>

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
</style>