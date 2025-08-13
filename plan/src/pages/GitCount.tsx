import * as React from 'react';

console.log("env=", process.env.PUBLIC_API_URL)
//import CrudIndex from './GitCount/CrudIndex';


export default function Page(items: any, count: number) { 
//console.log(items);

  return (
  <html>
    <head>
      <title>welcome</title>
      {(process.env.NODE_ENV === "production") ? (
          <link href="/public/static/main.css" rel="stylesheet" /> 
      ): (
          <link href="/static/main.css" rel="stylesheet" /> 
      )} 
    </head>
    <body>
      <div>
        <a href="/" class="px-2">[ Home ] </a>
        <hr class="my-2" />
      </div>
      <div class="p-4">
        <h1 class="text-4xl font-bold">GitCount</h1>
        <p>count= {count} clone</p>
        <hr class="my-2" />
        <ul>
        {items.map(item => (
        <li class="px-2 py-1">
          <h3 class="text-3xl font-bold">{item.RepoName}</h3>
          <p class="text-primary fs-5">Count: {item.count} , Uniques: {item.uniques}</p>
          ID: {item.id}
          <hr class="my-2" />
        </li>
        ))}
        </ul>
      </div>
    </body>

  </html>
  );
}
{/*
      <div id="app"></div>
      {(process.env.NODE_ENV === "production") ? (
          <script type="module" src="/public/static/entry-client.js"></script>
      ): (
          <script type="module" src="/static/entry-client.js"></script>
      )}
*/}