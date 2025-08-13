import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const htm = `
<div>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg w-96">
          <h2 class="text-lg font-bold mb-4">{{ todo ? 'Edit TODO' : 'Add TODO' }}</h2>
           <div class="mb-4">
              <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
              <input type="text" id="title" v-model="editedTodo.title" class="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:border-blue-500" placeholder="Todo Title" />
           </div>
          <div v-if="todo" class="mb-4">
              <label for="completed" class="block text-gray-700 text-sm font-bold mb-2">Completed</label>
               <input type="checkbox" id="completed" v-model="editedTodo.completed" class="mr-2" />
           </div>
          <div class="flex justify-end">
              <button @click="close" class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2">
                  Cancel
              </button>
              <button @click="save" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Save
              </button>
          </div>
      </div>
  </div>
</div>
`;

import { watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
      todo: {
          type: Object,
          default: null
      },
  },
  data() {
    return {
      editedTodo: {
          title: '',
          completed: false,
      },
    };
  },
    watch: {
      todo: {
          handler(newTodo) {
            this.editedTodo = newTodo ? { ...newTodo } : { title: '', completed: false };
          },
          immediate: true
      },
    },
  methods: {
      close() {
          this.$emit('close');
      },
      save() {
          this.$emit('save', this.editedTodo);
      },
  },
  template: htm,
};
