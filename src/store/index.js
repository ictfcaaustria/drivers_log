import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  
   
      
      state: {
        title : "title from vuex",
        current : {
          vehicle: null,
          log : null
        },
        user : null,
        snack : {
          show : false,
          msg : null
        }
      },
      mutations: {
        setSnack (state , obj) {
          console.log("SNACKING")
          state.snack.msg = obj.msg
          state.snack.show = true
          setTimeout(()=> {
            state.snack.show = false
            state.snack.msg = null
          },(obj.duration || 4000))
        },
        setcurrent (state, keyvalobj) {
          if (keyvalobj.val) state.current[keyvalobj.key] = keyvalobj.val
          console.log(keyvalobj)
        },
        setvehicles (state , vehicles) {
          if (vehicles) state.vehicles = vehicles
        },
        setuser (state, user) {
          if (user) {
            state.user = user
          }
        },
        settitle (state, newtitle) {
            console.log("setting the title to " + newtitle)
            state.title = newtitle
        },
        addnewlogtocurrentvehicle (state , newlog) {
          if (state.current.vehicle && newlog) {
            if (!state.current.vehicle.logs) {
              state.current.vehicle.logs = []
            }
            state.current.vehicle.logs.push(newlog)
          } else {
            throw "couldnt add newlog to store.state.current.vehicle"
          }
        },
        cleanlog (state) {
          state.current.log = null
        }
      }
    
  
})
