<template>
  <div class="max-w-3xl mx-auto p-6">
    <div class="py-2">
      <router-link
          class="text-blue-500 hover:underline inline-flex  rounded-full border  hover:scale-105 transition-transform shadow-lg px-4 py-2 font-semibold"
          :to="{ name: 'HeroDetail', params: { nickname} }"
      >
        Back to Superhero
      </router-link>
    </div>

    <h1 class="text-2xl font-bold mb-6 pt-5 ">Edit info</h1>

    <form @submit.prevent="" class="space-y-4">
      <div>
        <label class="block font-semibold mb-1" for="real_name">Real Name</label>
        <input
            v-model="hero.real_name"
            type="text"
            class="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label class="block font-semibold mb-1" for="origin_description">Origin Description</label>
        <textarea
            v-model="hero.origin_description"
            rows="4"
            class="w-full border rounded px-3 py-2"
        ></textarea>
      </div>

      <div>
        <label class="block font-semibold mb-1" for="superpowers">Superpowers</label>
        <textarea
            v-model="hero.superpowers"
            rows="3"
            class="w-full border rounded px-3 py-2"
        ></textarea>
      </div>

      <div>
        <label class="block font-semibold mb-1" for="catch_phrase">Catch Phrase</label>
        <input
            v-model="hero.catch_phrase"
            type="text"
            class="w-full border rounded px-3 py-2"
        />
      </div>

      <!-- Images -->
      <div>
        <label class="block font-semibold mb-2">Images</label>
        <div class="flex flex-wrap gap-4">
          <!--Old images-->
          <div
              v-for="(img, index) in hero.images"
              :key="index"
              class="relative w-32 h-32 border rounded overflow-hidden"
          >
            <img :src="imageUrl(img.url)" alt="Hero image" class="w-full h-full object-cover"/>
            <button
                type="button"
                @click="removeImg(hero.images, index)"
                class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm cursor-pointer "
            >
              ×
            </button>
          </div>
          <div
              v-for="(file, index) in newImages"
              :key="'new-' + index"
              class="relative w-32 h-32 border rounded overflow-hidden"
          >
            <img :src="previewFile(file)" class="w-full h-full object-cover" alt="New images"/>
            <button
                type="button"
                @click="removeImg(newImages,index)"
                class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm "
            >×
            </button>
          </div>
          <!-- New images  -->
          <div
              class="w-32 h-32 border border-dashed rounded flex items-center justify-center text-gray-400 cursor-pointer relative">
            <input type="file"  accept=".png,.jpg,.jpeg" multiple class="opacity-0 absolute inset-0 cursor-pointer" @change="onFileSelected">
            + Add
          </div>
        </div>
      </div>
      <div>

      </div>

      <div class="mt-6">
        <button
            type="submit"
            class="bg-blue-500 text-white font-semibold px-6 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
            @click="saveHero"
        >
          Save
        </button>
      </div>

    </form>
  </div>
</template>
<script>
import axios from "axios";
import {API_BASE_URL} from "../main.js";

export default {
  props: ["nickname"],

  data() {
    return {
      hero: {
        nickname:'',
        real_name: '',
        origin_description: '',
        superpowers: '',
        catch_phrase: '',
        images: [],
      },
      newImages: []
    }
  },
  methods: {
    imageUrl(path) {
      const cleaned = path.replace(/\\/g, '/').replace(/^\/+/, '');
      return API_BASE_URL.replace(/\/+$/, '') + '/' + cleaned;
    },
    onFileSelected(event) {
      const files = Array.from(event.target.files)
      this.newImages.push(...files)
    },

    // opens window to load a file from pc
    previewFile(file) {
      return window.URL.createObjectURL(file);
    },
    removeImg(array, index) {
      array.splice(index, 1);
    },


    async saveHero() {
      // updating nickname in input form causes an error, requires somehow edit because it overwrites url link
      const {nickname,real_name, origin_description, superpowers, catch_phrase, images} = this.hero;
      const formData = new FormData();
      formData.append('nickname', nickname);
      formData.append('real_name', real_name);
      formData.append('origin_description', origin_description);
      formData.append('superpowers', superpowers);
      formData.append('catch_phrase', catch_phrase);

      images.forEach(img => {
        formData.append('oldImages[]', img.url.split('/').pop());
      });

      this.newImages.forEach(image => {
        formData.append('newImages', image);
      })
      try {
        await axios.put(`${API_BASE_URL}/api/superheroes/edit/${nickname}`, formData,
            {headers: {'Content-Type': 'multipart/form-data'}});
        alert("Update has been completed")
        this.newImages = [];
      } catch (err) {
        console.log(err)
        alert('Error adding hero');
      }
    }
  },
  async mounted() {
    const res = await axios.get(`${API_BASE_URL}/api/superheroes/getHero/${this.nickname}`);
    this.hero = res.data
  },

}

</script>

<style scoped>

</style>