<template>
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
    <button
        class="cursor-pointer rounded bg-amber-200  w-full text-center flex items-center justify-center">
      Text
    </button>
  </router-link>
</template>

<script>
import { API_BASE_URL } from '../main.js';

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
    }
  },
};
</script>

<style scoped>
</style>