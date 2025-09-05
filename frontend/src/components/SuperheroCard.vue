<template>
  <div
      class="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transform transition-transform duration-300 hover:-translate-y-2">

    <router-link
        :to="{ name: 'HeroDetail', params: { nickname: hero.nickname } }"
        class="block bg-white rounded-lg overflow-hidden"
    >
      <div class="w-full h-128 bg-gray-100">
        <img
            v-if="hero.images && hero.images.length"
            :src="imageUrl(hero.images[0].url)"
            class="w-full h-full object-cover"
            alt="hero"
        />
        <div v-else class="w-full h-full flex items-center  justify-center text-3xl text-gray-400">
          {{ (hero.nickname).charAt(0) }}
        </div>
      </div>

      <div class="p-3">
        <div class=" flex justify-center text-sm font-semibold">{{ hero.nickname }}</div>
      </div>
    </router-link>


    <button
        @click="openModal"
        class="cursor-pointer rounded bg-red-400 hover:bg-red-600 transition-colors w-full flex justify-center py-2"
        type="button"
    >
      Delete
    </button>

    <!-- Modal -->
    <teleport to="body">
      <div
          v-if="showModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          @keydown.esc="closeModal"
          tabindex="-1"
      >
        <div class="relative p-4 w-full max-w-md">
          <div class="relative bg-white rounded-lg shadow-sm">
            <!-- close button -->
            <button type="button" class="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 rounded-lg "
                    @click="closeModal">
              ×
            </button>

            <div class="p-6 text-center">
              <h3 class="mb-2 text-lg font-medium text-gray-700">Are you sure you want to delete</h3>
              <p class="mb-4 text-sm text-gray-500">{{ hero.nickname }}</p>

              <div class="flex justify-center gap-3">
                <button
                    @click="confirmDelete"
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 transition-colors duration-200 ease-in-out cursor-pointer"
                >
                  Yes, I'm sure
                </button>
                <button
                    @click="closeModal"
                    class="py-2.5 px-5 bg-white rounded border hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 text-sm transition-colors duration-200 ease-in-out cursor-pointer"
                >
                  Сancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </teleport>

  </div>
</template>

<script>
import {API_BASE_URL} from '../main.js';
import axios from "axios";

export default {
  name: 'SuperheroCard',
  props: {
    hero: {type: Object, required: true},
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {

    imageUrl(path) {
      if (!path) return '';
      const cleaned = path.replace(/\\/g, '/').replace(/^\/+/, '');

      return API_BASE_URL.replace(/\/+$/, '') + '/' + cleaned;
    },

    openModal() {
      this.showModal = true;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.showModal = false;
    },

    async confirmDelete() {
      try {
        await axios.delete(`${API_BASE_URL}/api/superheroes/${this.hero.id}`);
        this.$emit('hero-deleted', this.hero.id);
        this.closeModal();
      } catch (error) {
        console.error('error deleting hero:', error);
        this.closeModal();
        alert('Error deleting hero');
      }
    },

    async deleteCard() {
      this.openModal();
    }
  },
};
</script>

<style scoped>
</style>
