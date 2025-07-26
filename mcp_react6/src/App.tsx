import { Link, Route, Routes } from 'react-router-dom'

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob('./client/*.tsx', { eager: true })

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/client\/(.*)\.tsx$/)[1]
  return {
    name,
    path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
    component: pages[path].default,
  }
})
//console.log(routes);
//
export function App() {
  return (
    <>
      <div>
        {routes.map(({ name, path }) => {
          return (
            <span key={path}>
              <Link to={path} className="ms-2">{name}</Link>
            </span>
          )
        })}
      </div>
      <hr />
      <Routes>
        {routes.map(({ path, component: RouteComp }) => {
          return (
          <Route key={path} path={path} element={<RouteComp />} 
          ></Route>
          )
        })}
      </Routes>
    </>
  )
}
/*
*/