<template >
  <q-page class="flex flex-center negre text-h4 text-bol">
    <div class="border column q-gutter-lg">
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
    }
  },

  methods:{
    funcEventNegre: function(event){
      
      switch( event.key ){

        case "N":
        case "n":
          this.$router.back();
          break;

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