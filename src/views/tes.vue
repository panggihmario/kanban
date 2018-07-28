<template>
    
    <modal/>
    
</template>
<script>
import modal from '@/components/modal.vue'
export default{
     name: 'home',
  components: {
    modal
  }

}
</script>

<script>
// import firebase from 'firebase'
// var config = {
//   apiKey: 'AIzaSyAM8euLgDrltPYvM5ZQrzWPy7XXsrdpVzA',
//   authDomain: 'kanban-e0a32.firebaseapp.com',
//   databaseURL: 'https://kanban-e0a32.firebaseio.com',
//   storageBucket: ''
// }
// firebase.initializeApp(config)
// let firebasetodos = firebase.database().ref('todos')
export default {
  name: 'forBody',
  props: [],
  data () {
    return {
      newTodo: '',
      todos: [],
      status: 'start',
      rawData: [],
      doingTodos: [],
      doneTodos: []
    }
  },
  mounted () {
    this.gotData()
  },
  firebase () {
    return {
      gotodos: firebasetodos
    }
  },
  watch: {
    gotodos () {
      this.gotData()
    }
  },
  methods: {
    clear () {
      this.todos = []
      this.doingTodos = []
      this.doneTodos = []
    },
    submitTodo () {
      this.clear()
      firebase.database().ref('todos/' + this.newTodo).set({
        todo: this.newTodo,
        status: this.status
      })
      this.newTodo = ''
    },
    gotData () {
      var starCountRef = firebase.database().ref('todos/')
      starCountRef.on('value', snapshot => {
        var dataTodos = snapshot.val()
        var keys = Object.values(dataTodos)
        this.rawData = keys
        this.rawData.forEach(element => {
          if (element.status === 'start') {
            this.todos.push(element)
          }
          if (element.status === 'doing') {
            this.doingTodos.push(element)
          }
          if (element.status === 'done') {
            this.doneTodos.push(element)
          }
        })
      })
    },
    deleteTodo (key) {
      this.clear()
      this.gotodos.forEach(element => {
        if (element.todo === key) {
          firebase.database().ref('todos/' + key).set(null)
        }
      })
    },
    addToDoing (key) {
      this.clear()
      this.gotodos.forEach(element => {
        if (element.todo === key) {
          firebase.database().ref('todos/' + key).set({ todo: key, status: 'doing' })
        }
      })
    },
    backTodo (key) {
      this.clear()
      this.gotodos.forEach(element => {
        if (element.todo === key) {
          firebase.database().ref('todos/' + key).set({ todo: key, status: 'start' })
        }
      })
    },
    addToDone (key) {
      this.clear()
      this.gotodos.forEach(element => {
        if (element.todo === key) {
          firebase.database().ref('todos/' + key).set({ todo: key, status: 'done' })
        }
      })
    },
    backToDoing (key) {
      this.clear()
      this.gotodos.forEach(element => {
        if (element.todo === key) {
          firebase.database().ref('todos/' + key).set({ todo: key, status: 'doing' })
        }
      })
    }
  }
}
</script>