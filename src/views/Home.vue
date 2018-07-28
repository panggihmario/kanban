<template>
   
  <v-app id="inspire">
      <modal/>
    <v-container fluid>
      <v-layout row>
        <v-flex xs4  >
          <div id="app">
              <v-app id="inspire">
                <div
                  id="e3"
                  style="max-width: 400px; "
                  class="grey lighten-3"
                >
                  <v-toolbar
                    color="red"
                    dark
                  >
                    <v-toolbar-side-icon> </v-toolbar-side-icon>
                    <v-toolbar-title>To Do</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <i class="fas fa-grin-beam-sweat fa-2x"></i>
                  </v-toolbar>
              
                  <v-card  v-for="(task,index) in rawTask" :key=index >
                    <v-container
                      fluid
                      grid-list-lg
                    >
                        <v-flex xs12>
                          <v-card color="blue-grey darken-2" class="white--text text-md-center" >
                            <v-card-title primary-title class="text-md-center" >
                             
                                    {{task.task}}
                              
                            </v-card-title>
                            <v-card-actions>
                                  <v-layout row>
                                    <v-flex xs6>
                                 <v-btn small color="red" dark v-on:click="deleteTask(index)">Delete</v-btn>
                                    </v-flex>
                                  <v-flex xs6>
                                 <v-btn small color="primary" dark v-on:click="updateToProgress(index)">Update</v-btn>
                                    </v-flex>
                                  </v-layout>
                            </v-card-actions>
                                  
                          </v-card>
                        </v-flex>
                    </v-container>
                  </v-card>
                </div>
              </v-app>
</div>
        </v-flex>
        <v-flex xs4>
                  <div id="app">
                  <v-app id="inspire">
                <div
                  id="e3"
                  style="max-width: 400px; "
                  class="grey lighten-3"
                >
                  <v-toolbar
                    color="orange"
                    dark
                  >
                    <v-toolbar-side-icon></v-toolbar-side-icon>
                    <v-toolbar-title>In Progress</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <i class="fas fa-sad-cry fa-2x"></i>
                  </v-toolbar>
              
                  <v-card v-for="(task,index) in rawProgress" :key=index>
                    <v-container
                      fluid
                      grid-list-lg
                    >
                        <v-flex xs12 >
                          <v-card color="blue-grey darken-2" class="white--text text-md-center">
                            <v-card-title primary-title class="text-md-center">
                              {{task.task}}
                            </v-card-title>
                            <v-card-actions>
                                  <v-layout row>
                                    <v-flex xs6>
                                 <v-btn small color="red" dark v-on:click="backToDo(index)">Back</v-btn>
                                    </v-flex>
                                  <v-flex xs6>
                                 <v-btn small color="primary" dark v-on:click="updateToComplete(index)">Update</v-btn>
                                    </v-flex>
                                  </v-layout>
                            </v-card-actions>
                          </v-card>
                        </v-flex>
                    </v-container>
                  </v-card>
                </div>
              </v-app>
</div>
        </v-flex>
        <v-flex xs4>
       
                  <div id="app">
              <v-app id="inspire">
                <div
                  id="e3"
                  style="max-width: 400px; "
                  class="grey lighten-3"
                >
                  <v-toolbar
                    color="green"
                    dark
                  >
                    <v-toolbar-side-icon></v-toolbar-side-icon>
                    <v-toolbar-title>Complete</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <i class="far fa-smile-beam fa-2x"></i>
                  </v-toolbar>
              
                  <v-card primary-title v-for="(task,index) in rawComplete" :key=index>
                    <v-container
                      fluid
                      grid-list-lg
                    >
                        <v-flex xs12 >
                          <v-card color="blue-grey darken-2" class="white--text text-md-center">
                            <v-card-title primary-title class="text-md-center"  >
                             {{task.task}}
                            </v-card-title>
                            <v-card-actions>
                                  <v-layout row>
                                    <v-flex xs6>
                                 <v-btn small color="red" dark v-on:click="backToProgress(index)">Back</v-btn>
                                    </v-flex>
                                  <v-flex xs6>
                                 <v-btn small color="green" dark v-on:click="completeTask(index)">Done</v-btn>
                                    </v-flex>
                                  </v-layout>
                            </v-card-actions>
                          </v-card>
                        </v-flex>
                    </v-container>
                  </v-card>
                </div>
              </v-app>
</div>
         
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>

</template>

<script>
import modal from '@/components/modal.vue'
import database from '@/firebase/fb.js'
import swal from 'sweetalert';


let fireTask = database.ref('task')
export default{
     name: 'home',
    components: {
    modal
  },
  data(){
    return {
      data : '' ,
      arrTask : [],
      arrProgress : [],
      rawTask : {},
      rawProgress : {},
      rawComplete : {}
    }
  },
  firebase(){
    return {
      dataTask : fireTask
    }
  },
  watch :{
    dataTask(){
      this.showData
    }
  },
  methods : {
        clear(){
          this.arrTask = []
          this.arrProgress = []
        },
       showDataTask(){
         let self = this
        database.ref('tasks/').on('value',(snapshot)=>{
          var data = snapshot.val()
          self.rawTask =snapshot.val()
        })
      },
      showDataProgress(){
           let self = this
          database.ref('progress/').on('value',(snapshot)=>{
          var data = snapshot.val()
          self.rawProgress =snapshot.val()
        })
      },
      showDataComplete(){
        let self = this
        database.ref('complete/').on('value',(snapshot)=>{
          // var data = snapshot.val()
          self.rawComplete = snapshot.val()
        })
      },
      updateToProgress(index){
          database.ref('tasks').child(index).once('value')
          .then(snapshot  =>{
              let tes =snapshot.val()
              console.log(tes.task)
              database.ref(`/progress/${index}`).set(tes,function(err){
                if(err){
                  console.log('error')
                }else{
                  console.log('success')
                }
              })
              database.ref(`tasks/${index}`).remove()
          }) 
      },
      updateToComplete(index){
        // console.log(index)
        database.ref(`progress/${index}`).once('value')
        .then(snapshot=>{
          let objComplete = snapshot.val()
          database.ref(`complete/${index}`).set(objComplete,function(err){
            if(err){
              console.log('error')
            }else{
              console.log('success')
            }
          })
          database.ref(`progress/${index}`).remove()
        })
      },
      backToProgress(index){
        // console.log(index)
        database.ref(`complete/${index}`).once('value')
        .then(snapshot=>{
          let objProg = snapshot.val()
          database.ref(`progress/${index}`).set(objProg,function(err){
            if(err){
              console.log('error')
            }else{
              console.log('success')
            }
          })
          database.ref(`complete/${index}`).remove()
        })
      },
      backToDo(index){
        // console.log(index)
        database.ref(`progress/${index}`).once('value')
        .then(snapshot=>{
          let objProgress = snapshot.val()
          // console.log(objProgress);
          database.ref(`/tasks/${index}`).set(objProgress,function(err){
            if(err){
              console.log('error')
            }else{
              console.log('success')
            }
          })
          database.ref(`progress/${index}`).remove()
        })
      },
      deleteTask(index){
        // console.log(index)
        database.ref(`tasks/${index}`).remove()
      },
      completeTask(index){
        // console.log(index)
        database.ref(`complete/${index}`).remove()
        swal("Good job!", "You finished the task!", "success");
      }
    
  },
  mounted(){
    this.showDataTask()
    this.showDataProgress()
    this.showDataComplete()
  }

}
</script>
