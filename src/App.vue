<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <Tplayer/>
  </div>
</template>

<script>
  import Tplayer from "@/components/Tplayer";
  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components:{Tplayer},
  }
</script>

<style>

</style>
