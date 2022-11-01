<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated
      color="black"
      class="bg-yellow-3"
    >
      <q-toolbar class="glossy">
        <!-- 
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
 -->
        <q-img
          src="~assets/512.png"
          style="width: 48px"
        ></q-img>

        <q-toolbar-title>
          <div class="text-italic text-brown-9">Cançoner</div>
          <div class="text-caption text-weight-thin text-brown-9">grup Bona Nova</div>
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          @click="mostrarAbout=true"
          aria-label="Menu"
        >
          <q-icon
            name="info"
            color="blue-10"
          />
        </q-btn>
        <div class="text-caption text-brown-9">v 3.4</div>
      </q-toolbar>

      <div
        v-if="!isOnline"
        class="q-pa-sm bg-negative text-white round-borders row flex-center"
      >
        OFFLINE: no funcionarà el reproductor de les cançons
      </div>

      <q-dialog
        v-model="mostrarAbout"
        class="q-ma-md q-pa-md"
        position="top"
      >
        <q-card>
          <q-card-section class="text-white bg-grey-8">
            Si vols pregar a Déu tot cantant amb nosaltres, pots venir al
            <a
              href="https://bonanova.cat/contacte/"
              target="_blank"
              class="text-weight-bold text-blue-2 text-uppercase"
            >lloc</a> on ens trobem cada dimarts de 18:30 a 20:30.
          </q-card-section>
          <!-- 
        </q-card>

        <q-card>
 -->
          <q-card-section class="text-h6 text-black text-center">
            Agraïments
          </q-card-section>
          <q-separator
            color="red-8"
            inset
          />
          <q-card-section class="text-black">
            <q-list dense>
              <q-item>
                <q-item-section>
                  1. A Déu
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  2. A tots els autors de les cançons (Hillsong, Martin White, Martin Valverde i altres...)
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  3. Al grup BN i el seu ministeri de música
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-section class="text-white bg-grey-8 text-center">
            <q-img
              src="~assets/codiQRCansoner.png"
              style="width: 200px"
              class="q-mt-sm"
            ></q-img>
          </q-card-section>

        </q-card>
      </q-dialog>

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

  mounted () {
    window.addEventListener("online", () => {
      this.setIsOnline(true)
    })
    window.addEventListener("offline", () => {
      this.setIsOnline(false)
    })
  },


  created () {
    document.addEventListener("keydown", this.funcEventNegre)
  },

  destroyed () {
    // eliminem eventListener
    document.removeEventListener("keydown", this.funcEventNegre)
  },




  data () {
    return {
      leftDrawerOpen: false,
      mostrarAbout: false,
      isOnline: true,

    }
  },

  methods: {

    funcEventNegre: function (event) {
      // if (event.) return

      switch (event.key) {

        case "N":
        case "n":
          // Object.keys(event.target).forEach( prop => console.log( prop ))
          // console.log("event.target: " + event.target.tagName )

          // activació de la pagina "negre" excepte si la N es pulsada des del Q-input
          if (event.target.tagName.toLowerCase() !== "input")
            this.$router.push({ name: "negre" });
          break;

      }

    },





    setIsOnline: function (truefalse) {
      this.isOnline = truefalse
    }
  }
}
</script>

<style>

</style>