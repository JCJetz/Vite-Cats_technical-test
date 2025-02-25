import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './src/App_2';

//Punto de entrada de mi app
const root = createRoot(document.getElementById('app'));
//root.render(<h1>HOLA mundo</h1>)
root.render(<App />)

