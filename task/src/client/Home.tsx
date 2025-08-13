import ReactDOM from 'react-dom/client'
import React from 'react'
import Head from '../components/Head';

const Page: React.FC = () => {
  return (
  <>
    <div ><h1 className="text-3xl">Home</h1> 
    </div>
  </>
  );
};
ReactDOM.createRoot(document.getElementById('app')).render(
  <div>
    <Head />
    <Page />
  </div>
);

