import * as React from 'react';

console.log("env=", process.env.NODE_ENV)

export default function Page() { 
  return (
  <html>
    <head>
      <title>welcome</title>
      <script src="https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js"></script>
      {(process.env.NODE_ENV === "production") ? (
          <link href="/public/static/main.css" rel="stylesheet" /> 
      ): (
          <link href="/static/main.css" rel="stylesheet" /> 
      )} 
    </head>
    <body>
      <div id="app"></div>
      {(process.env.NODE_ENV === "production") ? (
          <script type="module" src="/public/static/task_project_export.js"></script>
      ): (
          <script type="module" src="/static/task_project_export.js"></script>
      )}
    </body>

  </html>
  );
}
