<template>
  <div class="page-container">
    <md-list v-for="(log,index) in $store.state.current.vehicle.logs" :key="log.id">
      <md-list-item>
        <span @click="nav(log, index)" class="md-list-item-text">{{log.title}}</span>
        <md-button @click="delete_active = true; todelete = log; todelete_index = index" class="md-icon-button md-list-action">
          <md-icon >delete</md-icon>
        </md-button>
      </md-list-item>
  </md-list> 

    <div>
    <md-dialog-confirm
      :md-active.sync="delete_active"
      md-title="Delete?"
      
      md-confirm-text="Delete"
      md-cancel-text="Cancel"
       @md-cancel="cancel_delete"
      @md-confirm="confirm_delete"
      />
  </div>

    <div>
      <md-button @click="newlog" class="md-fab md-fixed md-primary md-fab-bottom-right">
        <md-icon>add</md-icon>
      </md-button>
      </div>
  </div>
</template>

<script>
import shortid from 'shortid'
import firebase from "firebase";
import "firebase/firestore";
export default {
    name: 'Logs',
    data () {
      return {
        delete_active : false,
        todelete : null,
        todelete_index : null,
        sending : false,
      }
    },
    methods: {
      nav (log, index) {
        this.$store.commit("setcurrent" , {key: "log" , val:log})
        console.log(this.$store.state.current.log)
        this.$router.push(this.$route.path + '/' + log.id)
      },
      newlog () {
        var newid = shortid.generate()
        this.$store.commit("cleanlog")
        this.$router.push(this.$route.path + '/' + newid)
      },
      confirm_delete () {
        
        console.log("technically deleting")
        console.log(this.todelete_index)

        console.log("index:")
        console.log(this.$store.state.current.vehicle.logs[this.todelete_index])
        if (this.todelete_index > -1) {
          this.$store.state.current.vehicle.logs.splice(this.todelete_index , 1)
          firebase.firestore().collection('drivers-log').doc(this.$store.state.current.vehicle.id).set(this.$store.state.current.vehicle, { merge: true }).then(res => {
          this.sending = false
          this.changesSaved = true
          
          console.log("finished saving to firebase")
          console.log(res)
          this.todelete = null
          this.todelete_index = null
        },
         e =>  {
           this.todelete = null
          this.todelete_index = null
           this.sending = false
           alert(e)
         }
        )
        }
      },
      cancel_delete () {
        this.todelete = null
        this.todelete_index = null
      }
    }
  }
</script>
