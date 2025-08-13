import * as React from 'react';

console.log("env=", process.env.PUBLIC_API_URL)

export default function Page(item: any) { 
console.log(item);

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
        <a href="/erchart" 
        className="border border-blue-500 text-blue-500 bg-white font-bold py-1 px-2 rounded mx-2"
        >Back</a>
        <hr class="my-2" />
      </div>
      <div className="p-4">
        <h1 className="text-4xl font-bold">ChartShow</h1>
        <hr className="my-2" />
        <h1>{item.title}</h1>
        <p>Id:{item.id}</p>
        <p>{item.createdAt}</p>
        <pre className="mermaid">{item.content}</pre>
      </div>
      {(process.env.NODE_ENV === "production") ? (
          <script type="module" src="/public/js/mermaid.js" /> 
      ): (
          <script type="module" src="/js/mermaid.js" /> 
      )} 
    </body>

  </html>
  );
}
