# 🐾✨🐱 Technical Test for React Juniors and Trainees

Welcome to the Random Cats App, a project developed as a technical test for React Juniors and Trainees. This interactive app allows you to browse cat images, filter by breed, and enjoy these adorable felines.
Built from scratch using `Vite` as the bundler,with manual setup of the React development environment and defining your own entry point instead of using `create-react-app`.

## 🎯 Exercise Description

The application performs the following main functions:

1. Displays a gallery of random cat images using [The Cat API](https://api.thecatapi.com)
2. Allows filtering cats by breed using an autocomplete search engine
3. Implements pagination to navigate between images

![Application preview](/screenshots/vite-cats.png)
![Figma design](/screenshots/figma.png)

## 🛠️ Technologies Used

- React 18.2.0
- Vite as bundler
- Bootstrap 5.2.3
- React Bootstrap
- React Bootstrap Typeahead
- The Cat API (with API key authentication)

## 🔑 API Key Configuration

```jsx
const apiKey = import.meta.env.VITE_API_KEY;
```

Create a `.env` file in the project root:

```
VITE_API_KEY=your-api-key-here
```

## 📦 Vite Setup Process

1. **Project Creation**

```bash
npm create vite@latest
# Project name: vite-cats_technical-test
# Select: Vanilla + JavaScript
```

2. **Core Dependencies Installation**

```bash
cd vite-cats_technical-test
npm install @vitejs/plugin-react -E
npm install react react-dom -E
```

3. **Vite Configuration**

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

4. **Installing Additional Dependencies**

```bash
npm install bootstrap react-bootstrap react-bootstrap-typeahead
npm install standard -D
```

## 🚀 Installation and Usage

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

## 📝 Available Scripts

- `npm run dev`: Start the development environment
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production version

## ⚙️ Key Features

- Fetching data from external APIs
- React Hooks state management
- Asynchronous response processing
- Integration with multiple external services
- Responsive UI with Bootstrap

## 🔍 Project Structure

```
vite-cats_technical-test/
├── src/
│ ├── App_2.jsx
│ ├── App.css
│ ├── main.jsx
│ └── components/
│ ├── Navbar.jsx
│ ├── Footer.jsx
│ └── Pagination.jsx
├── public/
├── package.json
├── vite.config.js
└── index.html
```

## 📚 Development Notes

- `standard` is used to maintain a consistent code style
- The application implements state management with `useState` and `useEffect`
- API calls are handled asynchronously with `fetch`

## 🎯 Additional Features

1. **Breed Search**

- Typeahead implementation for breed search
- Dynamic image filtering by selected breed
- Asynchronous loading of breed data

2. **Pagination System**

- Custom pagination with 12 items per page
- Navigation between image pages
- Dynamic calculation of total number of pages

3. **State Management**

```jsx
const [cats, setCats] = useState(""); // Store all images
const [selects, setSelects] = useState([]); // Handle breed selection
const [breedsData, setBreedsData] = useState([]); // Breed data
const [paginaActual, setPaginaActual] = useState(1);
```

4. **Data Flow**

- Initial loading of images and breeds using `useEffect`
- Automatic update when selecting a breed
- Handling loading states with loading image

## 🔄 API Integration

1. **The Cat API**

```jsx
const url = `https://api.thecatapi.com/v1/images/search?limit=${100}`;
```

- Obtaining random images `getCatsFromApi()`
- Filtering by specific breeds `getBreedsFromApi()`
- Using API key for authentication

2. **Main Endpoints**

- `/v1/images/search`: Image search
- `/v1/breeds`: Obtaining available breeds

## 💡 Implementation Examples

**Loading Images by Breed:**

```jsx
async function getBreedImage(breed) { // Obtains data, returns JSON
  const res = await fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}&limit=100&page=3`
  );
  const razasAPIjson = await res.json();
  return razasAPIjson;
}

function getRazas(breed) { // Uses getBreedImage to update the state
  console.log("Llamando getRazas con: " + JSON.stringify(breed));
  getBreedImage(breed).then((return_desde_funcion) =>
    setBreeds(return_desde_funcion)
  );
}
```

**Pagination Implementation:**

```jsx
// User is currently on this page
const [paginaActual, setPaginaActual] = useState(1);
// Num of Records to be displayed on each page
const [itemsPorPagina] = useState(12);

// pagination calculations
const ultimoItem = paginaActual * itemsPorPagina;
const primerItem = ultimoItem - itemsPorPagina;
// Records to be displayed on the current page
const catsActuales = cats.slice(primerItem, ultimoItem);

const nPages = Math.ceil(cats.length / itemsPorPagina);
```

## 🎨 UI Components

1. **Custom Navbar and Footer**
2. **Typeahead for Search**

- Breed Autocomplete
- Interactive Selection

3. **Card System**

- Grid Image Display
- Responsive Layout

4. **Loading State**

- Animated GIF on Load

## 🔄 Conditional Rendering

The App manages three display states:

1. Images filtered by breed (`breeds.length > 0`)
2. General Gallery with Pagination (`cats.length > 0`)
3. Loading State (loading gif)

```jsx
{
  breeds.length > 0 ? (
    // 1. Images filtered by breed
    <ListGroup>
      {breeds.map((each_breed) => (
        <ListGroup.Item className="razas" key={each_breed.id}>
          <Image src={each_breed.url} alt="" />
        </ListGroup.Item>
      ))}
    </ListGroup>
  ) : cats.length > 0 ? (
    // 2. General gallery with pagination
    <div>
      <ListGroup>
        {catsActuales.map((each_cat) => (
          <ListGroup.Item key={each_cat.id}>
            <Image src={each_cat.url} alt="" />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className="pagination-container">
      <Pagination
        nPages={nPages}
          currentPage={paginaActual}
          setCurrentPage={setPaginaActual}
        />
      </div>
    </div>
  ) : (
    // 3. Loading status
    <div className="loadinggif">
      <Image src="https://media.tenor.com/G98e-mpzOiMAAAAd/cat-paw.gif" />
    </div>
  );
}
```
