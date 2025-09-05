<template>
  <div class="max-w-4xl mx-auto px-4 py-5 ">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <SuperheroCard
          v-for="h in currentCards"
          :key="h.id"
          :hero="h"
          :apiBase="apiBase"
          @hero-deleted="onHeroDeleted"
      />
    </div>


    <!--  PAGINATION  -->

    <div  class="flex justify-center items-center mt-8 space-x-2" >
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage===1"
              class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        PREV
      </button>

      <button
          v-for="page in visibleCards"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-1 rounded',
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          ]"

      >{{ page }}
      </button>

      <button @click="goToPage(currentPage+1)" :disabled="currentPage===totalPages"
              class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"

      >NEXT
      </button>
    </div>

  </div>
</template>

<script>
import SuperheroCard from './SuperheroCard.vue';
import axios from "axios";
import {API_BASE_URL} from "../main.js";

export default {
  name: 'SuperheroGrid',
  components: {SuperheroCard},

  props: {
    apiBase: {type: String, default: ''}
  },

  data() {
    return {
      heroes: [],

      currentPage: 1,
      cardsPerPage: 5

    };
  },

  computed: {

    totalPages() {
      return  Math.ceil(this.heroes.length / this.cardsPerPage);
    },
    startIndex() {
      return (this.currentPage - 1) * this.cardsPerPage;
    },
    endIndex() {
      return (this.startIndex + this.cardsPerPage);
    },
    currentCards() {
      return this.heroes.slice(this.startIndex, this.endIndex);
    },
    visibleCards() {
      const cards = [];
      for (let i = 1; i <= this.totalPages; i++) {
        cards.push(i);
      }
      return cards
    }
  },
  methods: {

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    onHeroDeleted(deletedId) {
      this.heroes = this.heroes.filter(h => h.id !== deletedId);
    }
  },

  async created() {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/superheroes/getAll`);
      this.heroes = res.data
    } catch (e) {
      console.error('Failed to fetch heroes in SuperheroGrid:', e);
      this.heroes = [];
    }
  }
};
</script>

<style scoped>
</style>
