<template>
  <header class="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Home -->
        <div class="flex items-center">
          <router-link
              to="/"
              class="text-white text-lg font-semibold hover:underline focus:outline-none"
          >
            Home
          </router-link>
        </div>

        <!-- Add -->
        <div class="flex items-center">
          <router-link
              to="/addHero"
              class="inline-flex items-center gap-2 px-3 py-1 bg-white text-red-500 rounded-full shadow hover:scale-105 transition-transform"
              aria-label="Add new superhero"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
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
