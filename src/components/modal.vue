<template>
    

    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn round slot="activator" color="primary" >Add Task</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="task" label="Task" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" v-on:click="add()" flat @click.native="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
 

</template>



<script>
import database from '@/firebase/fb.js'

export default {
  data () {
    return {
      dialog: false,
      task : '',
      arrTask : [],
      status : "todo"
    }
  },
  methods : {
    add(){
      console.log("add")
      database.ref('tasks/').push({
        task : this.task,
        status : this.status
      },function(err){
        if(err){
          console.log(err)
        }else{
          console.log('berhasil')
        }
      })
    },
 
  },
 
}
</script>

