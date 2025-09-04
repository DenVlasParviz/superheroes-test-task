<template>
  <div class="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md">

  <router-link
      :to="{ name: 'HeroDetail', params: { nickname: hero.nickname } }"
      class="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md"
  >
    <div class="w-full h-40 bg-gray-100">
      <img
          v-if="hero.images && hero.images.length"
          :src="imageUrl(hero.images[0].url)"
          class="w-full h-full object-cover"
          alt="hero"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-3xl text-gray-400">
        {{ (hero.nickname).charAt(0) }}
      </div>

    </div>

    <div class="p-3">
      <div class="text-sm font-semibold">{{ hero.nickname }}</div>
    </div>

  </router-link>
    <button
        @click="deleteCard()"
        class="cursor-pointer rounded bg-red-400  hover:bg-sky-600 transition-transform w-full text-center flex items-center justify-center">
      Delete
    </button>
  </div>
</template>

<script>
import { API_BASE_URL } from '../main.js';
import axios from "axios";

export default {
  name: 'SuperheroCard',
  props: {
    hero: { type: Object, required: true },
  },
  data() {
    return {
      superheroes: []
    };
  },
  methods: {
    API_BASE_URL() {
      return API_BASE_URL;
    },
    imageUrl(path) {
      if (!path) return '';
      const cleaned = path.replace(/\\/g, '/').replace(/^\/+/, '');
      const base = API_BASE_URL || '';
      return base.replace(/\/+$/, '') + '/' + cleaned;
    },
async    deleteCard(id){
      try{
        if (!confirm(`Are you sure you want to delete ${this.hero.nickname}?`)) {
          return;
        }
        await axios.delete(`${API_BASE_URL}/api/superheroes/${this.hero.id}`);
        this.$emit('hero-deleted', this.hero.id);
        alert('Hero deleted');


      }catch (error) {
        console.error('error deleting hero:', error);
        alert('Error deleting hero');
      }

    }
  },
};
</script>

<style scoped>
</style>