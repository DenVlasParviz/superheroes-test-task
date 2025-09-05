<template>
  <header class="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Home -->
        <div class="flex items-center">
          <router-link
              to="/"
              class="text-blue-500 text-lg font-semibold border rounded-full bg-white  px-2 hover:underline focus:outline-none"
          >
            Home
          </router-link>
        </div>

        <!-- Add -->
        <div class="flex items-center">
          <router-link
              to="/addHero"
              class="inline-flex items-center gap-2 px-3 py-1 bg-white text-blue-500 rounded-full shadow hover:scale-105 transition-transform"
          >
            Add new superhero
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import router from "../router/index.js";

export default {
  methods: {
    router() {
      return router
    }
  },
  emits: ["home", "create"]
};
</script>
