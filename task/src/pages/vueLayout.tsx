
let PATH__FAVICON = "/favicon.ico";
//
export default function Compo(props: any) {
  let STYLE_PATH = "/main.css";
  if(process.env.NODE_ENV === "production"){
    STYLE_PATH = "/public/main.css";
  }

  const html = `<!DOCTYPE html><html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${props.title}</title>
    <link rel="icon" href="${PATH__FAVICON}" type="image/x-icon"></link>
    <link href="${STYLE_PATH}" rel="stylesheet"/>
  </head>
  <body>
    <!-- head_wrap -->
    <div>
      <a href="/">[ home ]</a>
    </div>
    <hr />        
    ${props.children}
  </body></html>
  `
  return html;
}
