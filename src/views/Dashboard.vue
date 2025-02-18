<template>
    <nav class="bg-gray-800 text-white ">
       <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
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

   <div class="p-8">
    <router-link to="/newtask"> <button class="bg-green-600  text-white py-2 px-4 rounded-md hover:bg-green-400 float-right">New Task</button></router-link>
  
   <h1 class="text-2xl font-bold mb-6 italic ">Dashboard</h1>
   <div class="filters">
      <select v-model="selectedStatus"class="bg-white border-none mb-4">
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
   <table class="min-w-full bg-white border">
     <thead>
       <tr>
           <th class="px-4 py-2 border">Title</th>
           <th class="px-4 py-2 border">Description</th>
           <th class="px-4 py-2 border">Status</th>
           <th class="px-4 py-2 border">Due Date</th>
           <th class="px-4 py-2 border">Actions</th>
       </tr>
     </thead>
     <tbody>
         <tr v-for ="task in tasks" :key="task._id">
           <td class="px-4 py-2 border">{{ task.title }}</td>
           <td class="px-2 py-2 border">{{task.description}}</td>
           <td class="px-4 py-2 border">{{task.status}}</td>
           <td class="px-4 py-2 border">{{ formatDate (task.due_date) }}</td>
           <td class="px-4 py-2 border flex space-x-5">
           <router-link :to="`/dashboard/edit/${task._id}`" class="bg-blue-500 text-white font-bold px-6 py-1 rounded" @click="updateTask">Edit</router-link>
           <button class="bg-red-500 text-white font-bold px-4 py-1 rounded" @click="deleteTasks(task._id)"> Delete </button>
           </td>
       </tr>
     </tbody>
   </table>
   </div>
</template>


<script>
import axios from "axios"
export default {
    data(){
        return{
            tasks:[],
            loading:false

        }
    },
    computed:{
        isAuthenticated(){
            return !! localStorage.getItem('token');
        }
    },
  
      
        async fetchTasks(){
            this.loading = true;
            try {
                const token = localStorage.getItem('token');
                console.log('Token:', token);
                const response = await axios.get('http://localhost:8000/api/tasks', {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Response:', response);
                this.tasks = response.data;
                console.log('Tasks:', this.tasks)
            } catch (error) {
                console.log("Error fetching tasks:", error);
                
            }
            finally{
                this.loading = false;
            }
            
        },
        async deleteTasks(id){
            if (confirm('Are you sure you want to delete this task?')){
                try{
                    const token = localStorage.getItem('token')
                    await axios.delete(`http://localhost:8000/api/tasks${id}`, {
                    headers:{
                       Authorization: `Bearer ${token}`
                    }
                })
                    this.tasks = this.tasks.filter(task => task._id !== id)
                    this.$toast.success('User deleted Successfully!!!');
                }catch (error) {
                    console.log("Error deleting task:", error);
                    
                }
           } 
        },
        logout(){
            localStorage.removeItem('token')
            this.$toast.success('logged out Successfully!!!');
            this.$router.push('/login')
        },
        register(){
            this.$router.push('/login')
        },

    created(){
        this.fetchTask();
    },

    }
</script>