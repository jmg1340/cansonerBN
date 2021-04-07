<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated color="black" class="bg-yellow-3">
      <q-toolbar class="glossy">

        <q-img src="~assets/512.png" style="width: 48px"></q-img>

        <q-toolbar-title>
          <div class="text-italic text-brown-9">Cançoner</div>
          <div class="text-caption text-weight-thin text-brown-9">grup Bona Nova</div>
        </q-toolbar-title>

        <q-btn
          color="grey-8"
          dense
          rounded
          @click="mostrarOpcionsCanso"
          icon="settings"
          aria-label="Opcions"
          class="q-mr-lg"
        />

        <q-btn
           color="brown-7" 
           label="Tornar"
           no-caps
           rounded
           push
           @click="tornarAlBuscador"
           >
         </q-btn>


        <!-- <div>Cançoner grup Bona Nova</div> -->
      </q-toolbar>
    </q-header>


<!-- 
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>
 -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  created (){
    document.addEventListener("keydown", this.funcEventKeydown)
  },

  destroyed(){
    // eliminem eventListener
    document.removeEventListener("keydown", this.funcEventKeydown)
  },

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {

  funcEventKeydown: function(event){
      // if (event.) return
      
      switch( event.key ){

        case "T":
        case "t":
          this.tornarAlBuscador()
          break;

      } 

    },


    tornarAlBuscador: function(){
      //this.$emit("tornaAlBuscador");
      this.$router.push({ name: 'cercar' });
      //this.$router.go(-1);
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
</style>