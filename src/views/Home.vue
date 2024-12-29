<template>
    <nav class="bg-gray-800 text-white ">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div class="flex justify-between h-16 items-center ">
                <div class="flex items-center">
               <h1 class="text-2xl font-bold text-white">Welcome to Task Manager</h1>
                </div>
                <div class="flex items-center space-x-4">
      
                </div>
            </div>
        </div>
    </nav>

    <div>
        
       <!-- Features Section -->
    <section class="features bg-white py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-extrabold text-indigo-800 mt-2">Key Features</h2>
        <div class="flex flex-wrap justify-center">
          <div class="w-full md:w-1/3 xl:w-1/4 p-6">
            
            <h3 class="text-lg font-bold text-indigo-600 underline">Task Management</h3>
            <p class="text-gray-600">Create, edit, and delete tasks with ease</p>
          </div>
          <div class="w-full md:w-1/3 xl:w-1/4 p-6">
            
            <h3 class="text-lg font-bold  text-indigo-600 underline">Due Date Tracking</h3>
            <p class="text-gray-600">Stay on top of deadlines with our due date tracking feature</p>
          </div>
          <div class="w-full md:w-1/3 xl:w-1/4 p-6">
            
            
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta bg-gray-800 py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-white">Get Started Today!</h2>
        <p class="text-lg text-white">Register for a free account and start managing your tasks with ease</p>
        <router-link to="/register"><button class="bg-indigo-800 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded mt-6">Register Now!</button></router-link> 
      </div>
    </section>
  </div>

    <footer class="bg-gray-200 py-4 mt-auto text-center fixed bottom-0 left-0 w-full">
    <p class="text-gray-600">&copy; {{ new Date().getFullYear() }} Task Management App</p>
  </footer>
</template>

<script>
export default {
    computed:{
        isAuthenticated(){
            return !! localStorage.getItem('token');
        }
    },

    methods:{
        logout(){
            localStorage.removeItem('token')
            this.$router.push('/login')
        },
        register(){
            this.$router.push('/login')
        }
    }

}

</script>