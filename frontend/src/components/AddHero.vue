<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Add new superhero</h1>

    <form @submit.prevent="onSubmit"  class="space-y-4">

      <div>
        <label class="block font-semibold mb-1" for="nickname">Nickname</label>
        <input
            v-model="hero.nickname"
            type="text"
            class="w-full border rounded px-3 py-2"
        />
      </div>

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
            >×</button>
          </div>
          <!-- New images  -->

          <div
              class="w-32 h-32 border border-dashed rounded flex items-center justify-center text-gray-400 cursor-pointer relative">
            <input type="file" accept=".png,.jpg,.jpeg, .webp" multiple class="opacity-0 absolute inset-0 cursor-pointer" @change="onFileSelected">
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
            @click="">
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

  data() {
    return {
      hero: {
        nickname: '',
        real_name: '',
        origin_description: '',
        superpowers: '',
        catch_phrase: '',
      },
      newImages: []
    }
  },
  methods:{
    onFileSelected(event) {
      const files = Array.from(event.target.files)
      this.newImages.push(...files)
    },
    previewFile(file) {
      return window.URL.createObjectURL(file);
    },
    removeImg(array, index) {
      array.splice(index, 1);
    },
    async onSubmit() {
      try {

        const formData = new FormData();
        Object.keys(this.hero).forEach(key => {
          formData.append(key, this.hero[key]);
        })
        this.newImages.forEach(image => {
          formData.append('newImages', image);
        })
        await axios.post(`${API_BASE_URL}/api/superheroes`,formData)
        alert('Superhero added successfully!');

        this.$router.push('/');
      } catch (e) {
        console.error('Error:', e);
        alert(e.response.data.error );
      }

    }
  },



}


</script>

<style scoped>

</style>