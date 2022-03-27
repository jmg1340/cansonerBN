<template>
  <div class="row justify-center">
    <div class="col-sm-11 col-xs-12">
      <div class="col items-center">
        <div class="col q-mx-sm text-caption">
          <div class="col">Cançons favorites:</div>
        </div>

        <div class="col justify-center">
          <q-markup-table dense bordered class="q-mx-sm" separator="cell">
            <thead class="bg-grey-4 text-black">
              <tr>
                <th class="text-center thCansoner">C</th>
                <th class="text-center thTitol">Titol</th>
                <th class="text-center thTitol">
                  <div class="row inline items-center justify-center">
                    <q-icon name="volume_up" class="col" />
                  </div>
                </th>
                <th class="text-center thNumero">#</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(info,index) in llistatCansonsFavorites"
                :key="`llC-${index}`"
                @click="MostrarCansoDeLaTaula(info.llibre, info.numero, info.idioma)"
              >
                <td v-if="info.llibre == 'vermell'" class="bg-red text-white text-center">V</td>
                <td v-if="info.llibre == 'blau'" class="bg-blue-10 text-white text-center">B</td>
                <td v-if="info.llibre == 'nadales'" class="bg-grey text-white text-center">N</td>

                <td @click.prevent class="q-px-xs tdTitol">
                  <q-icon name="fiber_new" color="green-14" size="sm" v-if="info.estat== 'nova'" />
                  {{ info.titol }}
                </td>

                <td class="text-center">
                  <q-icon name="volume_up" v-if="info.audio" />
                </td>
                <td class="text-center">{{info.numero}}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "componentBusacarPerText",

  data() {
    return {
      //confirmarIdioma: false,
      //idiomaConfirmat: null,

      llistaCansonsTrobades: []
    };
  },

  computed: {
    llistatCansonsFavorites: function() {
      var arrFavorites = this.$store.state.modulCansoner.favorites;
      var objCansoner = this.$store.state.modulCansoner.objCansoner;
      var llistat = [];

      arrFavorites.forEach(function(objFav) {
        var objTemp = {};
        objTemp.idCanso = objFav.idCanso;
        objTemp.idioma = objFav.idioma;
        objTemp.llibre =
          objCansoner[objFav.idCanso][objFav.idioma].cansoner.nom;
        objTemp.titol = objCansoner[objFav.idCanso][objFav.idioma].titol;
        objTemp.numero =
          objCansoner[objFav.idCanso][objFav.idioma].cansoner.numero;
        objTemp.audio = objCansoner[objFav.idCanso][objFav.idioma].audio;
        objTemp.estat = objCansoner[objFav.idCanso][objFav.idioma].estat;

        llistat.push(objTemp);
      });

      // return llistat.sort(function(a, b) {
      //   return a.numero - b.numero;
      // });

      return llistat;
    }
  },

  methods: {
    MostrarCansoDeLaTaula: function(llibre, numero, idioma) {
      this.$store.dispatch("modulCansoner/actMostrarCanso", {
        llibre: llibre,
        numero_idioma: numero + "_" + idioma
      });

      this.$router.push({ name: "canso" });
    }
  }
};
</script>


<style>
.thCansoner {
  width: 10%;
}
.thTitol {
  width: 80%;
}
.thNumero {
  width: 10%;
}

.tdTitol {
  white-space: normal !important;
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