# 🐾✨🐱 Technical Test for React Juniors and Trainees

Welcome to the Random Cat App, a project developed as a technical test for React Juniors and Trainees. This interactive application allows you to explore cat images and enjoy these adorable felines.

## APIs and Exercise:

## 💡 Exercise Description

+ This project starts from scratch using `Vite` as a bundler, manually setting up the React development environment and defining your own entry point instead of using `create-react-app`.

The exercise consists of:

- Retrieving a random fact about cats using the [Cat Fact](https://catfact.ninja/fact) API.
- Extracting the first word of this fact.
- Displaying an image of a cat that includes this first word using the [Cat as a Service](https://cataas.com/cat/says/hello) API.

[Screenshot 1](./screenshots/vite-cats.png)

## 🚀 Features

- **Random Cat Images:** Uses the Cat Images API to display random images.
- **Breed Filtering:** Users can filter images by cat breed using a selector.
- **Pagination:** Navigate between different pages of cat images with an efficient pagination implementation.

## 🛠️ Technologies Used

- **React:** JavaScript library for building user interfaces.
- **Vite:** Rapid development tool that allows you to compile code for production.
- **react-bootstrap:** Bootstrap components adapted for React.
- **react-bootstrap-typeahead:** Type-aware input components for React.
- **Custom CSS:** Custom styles to enhance the aesthetics of the app.

## 🤔 Main Technical Challenges:

1. **Integration with External APIs**
```js
async function getCatsFromApi() {
const res = await fetch(url, {
headers: { "x-api-key": apiKey }
});
// ...
}
```
- Handling asynchronous requests with async/await
- Managing headers and authentication with API key
- Handling JSON responses

2. **State and Effects Management**
```js
useEffect(() => {
if (selects.length > 0) {
getRazas(selects[0]); // Update images when changing the breed
}
}, [selects]);
```
- Control of multiple interdependent states
- Data synchronization between components
- Lifecycle management with useEffect

3. **Custom Pagination System**
```js
const lastItem = currentPage * itemsPerPage;
const firstItem = lastItem - itemsPerPage;
const currentCats = cats. slice(firstItem, lastItem);
```
- Implementing pagination logic from scratch
- Dynamic calculation of pages
- State management for navigation

4. **Conditional Rendering and Filtering**
```js
{breeds.length > 0 ? (
 <ListGroup>
 {breeds.map((each_breed) => (
 <ListGroup.Item className="breeds" key={each_breed.id}>
 <Image src={each_breed.url} alt="" />
 </ListGroup.Item>
 ))}
 </ListGroup>
) : cats.length > 0 ? (
```
- Rendering logic based on multiple conditions
- Integration with filtering system
- Handling of loading states

### Notes:

✨ Vite is a package that allows you to create a development server and compile (build) the code for production, and plugin-react allows you to integrate React components into your Vite application. With this plugin installed, you can quickly and easily add React components to your project and use them as part of your application. ( The -E is the exact version)

✨ I then use the command `@vitejs/plugin-react -E `

## 🚧 Installation Instructions

**I. Creating a New Project with Vite**
In the terminal, run:
```bash
npm create vite@latest
```

I name the project, in this case Project name: PRUEBA_TECNICA_CATS
**and I choose: Vanilla and Javascript** as language and finally I move to the project directory with `cd vite-cats`.

**II. Installing Dependencies:**
```bash
npm install @vitejs/plugin-react -E
npm install react react-dom -E
```

**III. Installing Additional Libraries:**
```bash
npm i react-bootstrap-typeahead
npm i react-bootstrap
```

Import the Typeahead component in App.jsx:
```js
import { Typeahead } from 'react-bootstrap-typeahead';
```

**IV. Configuring Vite**
Open Visual Studio Code and create a file named `vite.config.js`:
```js
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()]
})
```

**V. Configure the entry point**
In `main.js`, import `createRoot` and set up the root element:
```js
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('app'))
root.render(<h1>Hello World</h1>)
```

**VI** **I change the .js to .jsx** in main and its script link in html
(because the syntax is not ready)

**VII In the terminal, I navigate to `cd vite-cats` and run with `npm run dev`.**

**VIII Maintenance and Style**
In the terminal, I install the `standard` tool using the command
`npm install standard -D`
to make corrections and maintain a consistent code style. Then, the following configuration is added to the `package.json` file:

```js
"eslintConfig": {
"extends": "./node_modules/standard/eslintrc.json" }
```

## ⌨️ Development

**IX Create the application structure**
I create the **src folder and inside App.jsx** and start building my App.

```js
export function App() {
return (
<h1>Kitten App </h1>
)
}
```

And in main.jsx, initially :

`import { App } from './src/App.jsx';`

**Implement the basic functionality to get random facts and images:**
Use `useState` and `useEffect` to manage state and API calls.

**X Retrieve a random cat fact from the first API:**

```js
import { useState } from "react" in App.jsx
and paint

const [fact, setFact] = useState(' ') and render
<p>{fact}</p>

return (
<main>
<h1>Kitten app </h1>
<p>{fact}</p>
</main>
)
```

Continued:

```js

export function App() {

const [fact, setFact] = useState(' ')

//useState(() => {}, []) with dependencies [] otherwise it will create an infinite loop.

useEffect(() => {
 fetch(CAT_ENDPOINT_RANDOM_FACT)
 .then(res => res.json())
 .then(data => setFact(data.fact))
 },[])

 return (
 <main>
 <h1>Kitten app </h1>
 {fact && <p>{fact}</p>}
 </main>
 )
}
```

**XI Extracting the First Word from the Fact.**

```js
import { useEffect, useState } from "react";

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_ENDPOINT_IMAGE_URL = 'https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'


export function App() {

const [fact, setFact] = useState()
const [imageUrl, setImageUrl] = useState()

//useState(() => {}, []) Don't forget dependencies [] otherwise it will create an infinite loop when rendering.
 useEffect(() => {
 fetch(CAT_ENDPOINT_RANDOM_FACT)
 .then(res => res.json())
 //.then(data => setFact(data.fact)) retrieve random fact
 .then(data => {
 const { fact } = data
 setFact(fact)

 const threeFirstWords = fact.split(' ', 3).join(' ')
 //console.log(threeFirstWords)

 fetch(CAT_ENDPOINT_IMAGE_URL)
 .then(res => res.json)
 .then(response => {
//console.log(response) and I retrieve url and save it in state imageUrl and setIamageUrl
 const { url } = response
 setImageUrl(url)
 })

 })
 },[])
 //const firstWord = fact.split(' ')[0]
 //split returns array, first word is [0]
 //so the first 3 words fact.split(' ', 3).join(' ')
 //console.log(threeFirstWords)


 return (
 <main>
 <h1>Kitten app </h1>
 {fact && <p>{fact}</p>}
 {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt=
 {`cat image using three words for ${fact}`} />}

 </main>
 )
}

```
**XII Cat Breeds Management**
```js

async function getBreedImage(breed) {
 const res = await fetch(
`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}&limit=100&page=3`
);
const razasAPIjson = await res.json();
return razasAPIjson;
}
```
And I continue building the Cat App until completion :)
