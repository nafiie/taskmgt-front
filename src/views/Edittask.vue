<template>
    <nav class="bg-gray-800 text-white ">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div class="flex justify-between h-16 items-center ">
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold">Task Management App</h1>
                </div>
                <div class="flex items-center space-x-4">
                <router-link to="/" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm  font-md">Home</router-link>
                <div v-if="isAuthenticated">
                <router-link to="/dashboard" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm  font-md">Dashboard</router-link>
        
              </div>
                 <div v-if="!isAuthenticated">
                <router-link to="/login" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm  font-md">Login</router-link>
              </div>
               <div v-else>
             <button @click="logout" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm  font-md">Logout</button>
            </div>
              
                </div>
            </div>
        </div>
    </nav>

    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 class="text-2xl font-extrabold text-indigo-800 mb-4"> Edit Task </h2>
     
    <form @submit.prevent="updateTask">
      <label for="title">Title:</label><br>
      <input  class="mt-1 p-2 w-full border rounded-md" type="text" id="title" v-model="task.title" required><br>
      <label for="description">Description:</label>
      <textarea  class="mt-1 p-2 w-full border rounded-md" id="description" v-model="task.description" required></textarea>
      <label for="status">Status:</label><br>
      <select class="mt-1 p-2 w-full border rounded-md" id="status" v-model="task.status" required>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <label for="due_date">Due Date:</label>
      <input  class="mt-1 p-2 w-full border rounded-md" type="date" id="due_date" v-model="task.due_date" required>
      <button type="submit" class="bg-indigo-800 text-white py-2 px-4 rounded-md hover:bg-indigo-600 w-25 mt-4">
          <span v-if="loading">
            <svg class="animate-spin text-center h-5 w-5 mb-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Loading...
          </span>
          <span v-else>
          Edit Task</span>
        </button>
    </form>
    <div class="mt-4 p-2 text-center">
      <p :class="{'text-green-500': success, 'text-red-500': !success}">{{ message }}</p>
    </div>
    </div>

     </template>

  <script>
  import axios from 'axios';
    export default {
        data(){
            return{
                task:{
                    title:'', 
                    description:'',
                    status:'',
                    due_date:''
                },
                success: false,
                loading: false
                

            }
        },
        computed:{
        isAuthenticated(){
            return !! localStorage.getItem('token');
        }
    },
    created(){
            this.fetchTask();
        },
    methods:{
            async fetchTask(){
                try {
                    const token = localStorage.getItem('token')
                    const response = await axios.get(`http://localhost:8000/api/tasks/${this.$route.params.id}`, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                    this.task = response.data;
                    console.log('Task data:', this.task);
                    console.log('Due date:', this.task.due_date);
                })
                } catch (error) {
                    console.log("Error fetching task:", error);   
                }
            },

            async updateTask(){
                this.loading = true
                try {
                    const token = localStorage.getItem('token')
                    const response = await axios.put(`http://localhost:8000/api/tasks/${this.$route.params.id}`, this.task, {
                    headers:{
                        Authorization: `Bearer ${token}`
                        }
                    })
                    
                    this.$toast.success('task updated Successfully!!!');
                    this.$router.push('/dashboard')
                } catch (error) {
                    console.log("Error fetching tasks:", error);   
                }finally{
                    this.loading = false;
                }                                
            },
            logout(){
            localStorage.removeItem('token')
            this.$router.push('/login')
        },
        register(){
            this.$router.push('/login')
        }
            
        },
       
    }

</script>
     

  

