<template>
  <div class="max-w-5xl mx-auto p-6 space-y-6 bg-gray-100">
    <div class="flex items-center justify-between">
      <blockquote class="relative border-l-4 border-gray-400 pl-6 italic text-gray-700">
        “{{ hero.catch_phrase }}”
        <footer class="text-right mt-2 text-gray-500">— {{ hero.nickname }}</footer>
      </blockquote>
      <router-link
          :to="{ name: 'EditHero', params: { nickname } }"
          class="text-blue-500 hover:underline inline-flex rounded-full border border-dashed hover:scale-105 transition-transform shadow-lg px-4 py-2 font-semibold"
      >
        Edit
      </router-link>
    </div>

    <!-- main block   -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">


      <!-- left block -->
      <div class="md:col-span-2 bg-gray-100 p-4 rounded">
        <h2 class="font-bold border-b border-gray-400 pb-1 mb-4">
          General Information
        </h2>
        <p class=" leading-relaxed text-base">
          {{ hero.origin_description }}
        </p>
      </div>

      <!-- right block -->
      <div class="bg-gray-200 p-4 rounded text-center max-w-full break-words">
        <h2 class="text-lg font-bold  border-b border-gray-400 pb-1 mb-4">{{ hero?.nickname }}</h2>
        <div class='relative' v-if="hero && hero.images && hero.images.length">
          <img
              :src="imageUrl(hero.images[currentImageIndex].url)"
              class="w-full rounded-lg mb-2  h-85" alt="Image"
          />
          <div class="flex justify-between mt-2">
            <!-- prev button -->
            <button
                @click="prevImage"
                :disabled="currentImageIndex === 0"
                class="absolute left-1 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-700 text-white rounded opacity-70 hover:opacity-100 disabled:opacity-30"
            >
              ‹
            </button>

            <!-- next button -->
            <button
                @click="nextImage"
                :disabled="currentImageIndex === hero.images.length - 1"
                class="absolute right-1 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-700 text-white rounded opacity-70 hover:opacity-100 disabled:opacity-30"
            >
              ›
            </button>
          </div>
        </div>
        <div class="bg-gray-200 p-4 rounded">
          <h2 class="text-lg font-bold mb-2 text-center">General Information</h2>
          <div class="divide-y divide-gray-300 text-sm">
            <div class="grid grid-cols-2 py-2">
              <div class="font-semibold">Real name</div>
              <div>{{ hero.real_name }}</div>
            </div>
            <div class="grid grid-cols-2 py-2">
              <div class=" break-words font-semibold">Superpowers</div>
              <div>{{ hero.superpowers }}</div>
            </div>
            <div class="grid grid-cols-2 py-2 border-b border-gray-300">
              <div class="font-semibold ">Catchphrase</div>
              <div>{{ hero.catch_phrase }}</div>
            </div>

          </div>
        </div>

      </div>

    </div>


  </div>
</template>

<script>
import {API_BASE_URL} from "../main.js";
import axios from "axios";

export default {

  props: ["nickname"],
  data() {
    return {
      hero: [],
      currentImageIndex: 0
    };
  },
  async created() {
    const res = await axios.get(`${API_BASE_URL}/api/superheroes/getHero/${this.nickname}`);
    this.hero = res.data
  },
  methods: {
    imageUrl(path) {
      const cleaned = path.replace(/\\/g, '/').replace(/^\/+/, '');
      const base = API_BASE_URL || '';
      return base.replace(/\/+$/, '') + '/' + cleaned;
    },
    prevImage() {
      if (this.currentImageIndex > 0) this.currentImageIndex--;
    },
    nextImage() {
      if (this.currentImageIndex < this.hero.images.length - 1) this.currentImageIndex++;
    }
  },
  watch: {
    hero: {
      handler(newHero) {
        if (newHero && newHero.nickname) {
          document.title = `${newHero.nickname} — Hero Details`;
        }
      },
      immediate: true,
      deep: true
    }
  },
};
</script>
