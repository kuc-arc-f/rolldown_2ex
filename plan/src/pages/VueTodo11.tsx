import vueLayout from './vueLayout';

export default function Page(props: any) { 
  let SCRIPT_PATH = "/js/VueTodo11.js";
  if(process.env.NODE_ENV === "production"){
    SCRIPT_PATH = "/public/js/VueTodo11.js";
  }
  const htm = `
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Todo20</h1>
    <hr class="my-2" />
    <div id="app">{{ message }}</div>
    <script type="module" src=${SCRIPT_PATH}></script>
  </div>
  `;
  return vueLayout({children: htm, title: "VueTodo11"});
}

