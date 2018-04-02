<template>
  <!-- <div class="page-container" style="min-height:100vh">
    <md-app style="min-height:100vh"> -->
        <div class="page-container" style="max-width:944px; margin: 0 auto">
    <md-app md-mode="fixed" >

      <md-app-toolbar class="md-primary">
       <md-button v-if="!($store.state.title =='Login')" @click="$router.go(-1)" class="md-icon-button">
        <md-icon>arrow_back</md-icon>
      </md-button>

        <span class="md-title">{{$store.state.title}}</span>

        
      </md-app-toolbar>


  
      <md-app-content>
      <!-- <md-app-content style="height:100%"> -->
        <router-view></router-view>

        <md-snackbar :md-active="$store.state.snack.show">{{$store.state.snack.msg}}</md-snackbar>         
         </md-app-content>
        

    </md-app>
  </div>
</template>



<script>
export default {
  name: "app"
};
</script>

<style lang="scss" scoped>
.md-app {
  min-height: 100vh;
  max-height: 400px;
  border: 1px solid rgba(#000, 0.12);
}
</style>

