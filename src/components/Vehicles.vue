<template>
  <div class="page-container">
    <md-list v-for="vehicle in $store.state.vehicles" :key="vehicle.id">
      <md-list-item @click="nav(vehicle)">
        <span class="md-list-item-text">{{vehicle["name"]}}</span>
      </md-list-item>
  </md-list>
  </div>
</template>

<script>
  export default {
    name: 'Vehicles',
    methods: {
      nav (vehicle) {
        this.$store.commit("setcurrent" , {key: "vehicle" , val:vehicle})
        // console.log(this.$store.state.current.vehicle)
        this.$router.push(this.$route.path + '/' + vehicle.id)
      }
    }
  }
</script>
