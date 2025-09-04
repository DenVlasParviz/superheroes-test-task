<template>
  <div class="max-w-4xl mx-auto px-4 py-5">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <SuperheroCard
          v-for="h in displayed"
          :key="h.id"
          :hero="h"
          :apiBase="apiBase"
      />
    </div>
  </div>
</template>

<script>
import SuperheroCard from './SuperheroCard.vue';

export default {
  name: 'SuperheroGrid',
  components: { SuperheroCard },

  props: {
    apiBase: { type: String, default: '' }
  },

  data() {
    return {
      heroes: []
    };
  },

  computed: {
    displayed() {
      return (this.heroes || []).slice(0, 5);
    }
  },

  async created() {
    try {
      const res = await fetch('http://localhost:3000/api/superheroes/getAll');
      this.heroes =  await res.json();
    } catch (e) {
      console.error('Failed to fetch heroes in SuperheroGrid:', e);
      this.heroes = [];
    }
  }
};
</script>

<style scoped>
</style>
