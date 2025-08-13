
import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const htm = `
<div>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">TODO App</h1>

    <div class="mb-4 flex">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search Todos..."
        class="border border-gray-300 rounded px-2 py-1 flex-1 mr-2"
      />
      <button @click="openDialog()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add TODO
      </button>
    </div>


    <ul class="divide-y divide-gray-200">
      <li v-for="todo in filteredTodos" :key="todo.id" class="py-2 flex items-center">
        <input type="checkbox" :checked="todo.completed" @change="toggleCompleted(todo)" class="mr-2" />
        <span :class="{'line-through': todo.completed, 'text-gray-700': !todo.completed}" class="flex-1">
          {{ todo.title }}
        </span>
          <button @click="openDialog(todo)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2">
            Edit
          </button>
          <button @click="deleteTodo(todo)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
            Delete
          </button>
      </li>
      <li v-if="filteredTodos.length === 0" class="text-gray-500 py-2">No Todos Found</li>
    </ul>

      <TodoDialog
        :isOpen="isDialogOpen"
        :todo="editingTodo"
        @close="closeDialog"
        @save="saveTodo"
      />

  </div>
</div>
`;
import { onMounted, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import TodoDialog from './TodoDialog.js';
let API_BASE = "http://localhost:8787/api/todo21";
async function getSysApiUrl(){
  try{
    let ret = "";
    const response = await fetch(`/api/common/get_sys_items`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }
    );
    if (!response.ok) throw new Error("error, getSystemParam");
    const data = await response.json();
    //console.log(data.data);
    ret = data.data.api_url;
    return ret;
  } catch (err) {
    console.error(err);
  }
}

export default {
  components: {
      TodoDialog,
    },
  data() {
    return {
      todos: [],
      isDialogOpen: false,
      editingTodo: null,
      searchQuery: '',
    };
  },
  computed: {
      filteredTodos() {
          if (!this.searchQuery) {
              return this.todos;
          }
          const searchTerm = this.searchQuery.toLowerCase();
          return this.todos.filter(todo => todo.title.toLowerCase().includes(searchTerm));
      },
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
          API_BASE = await getSysApiUrl() + "/api/todo21";
          console.log("API_BASE=" + API_BASE);
          const response = await fetch(API_BASE);
          
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          this.todos = result.results;
          console.log(result);
      } catch (error) {
          console.error('Failed to fetch todos:', error);
      }
    },
    openDialog(todo = null) {
      this.editingTodo = todo ? { ...todo } : null;
      this.isDialogOpen = true;
    },
    closeDialog() {
      this.isDialogOpen = false;
      this.editingTodo = null;
    },
    async saveTodo(todoData) {
      try {
          if (!todoData.title) {
              alert('Title is required');
              return;
          }
          let response;

          if (this.editingTodo) {
              response = await fetch(API_BASE, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...todoData, id: this.editingTodo.id }),
                  });
          } else {
              response = await fetch(API_BASE, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(todoData),
                  });
          }
         if (!response.ok) {
           const errorBody = await response.json();
           throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody.error}`);
         }
          await this.fetchTodos();
          this.closeDialog();
      } catch (error) {
        console.error('Failed to save todo:', error);
        alert(`Failed to save todo: ${error.message}`);
      }
    },
    async toggleCompleted(todo) {
        try {
            await fetch(API_BASE, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: todo.id, completed: !todo.completed }),
            });

            await this.fetchTodos(); // 変更を反映するため、リストを再取得
        } catch (error) {
            console.error('Failed to update todo status:', error);
            alert(`Failed to update todo status: ${error.message}`);
        }
    },
    async deleteTodo(todo) {
      if(!confirm('Are you sure you want to delete this todo?')){
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/${todo.id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
          const errorBody = await response.json();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorBody.error}`);
        }
          await this.fetchTodos(); // 変更を反映するため、リストを再取得
      } catch (error) {
        console.error('Failed to delete todo:', error);
        alert(`Failed to delete todo: ${error.message}`);
      }
    },
  },
  template: htm
};
