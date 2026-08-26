A single-page application built with React, React-Router, Redux Toolkit and RTK Query, using DummyJSON as the data source.

Features

- Product catalog with category, brand and price filtering, pagination
- Shopping cart (add/remove items, update quantity, persisted in localStorage)
- Client-side routing between pages (React Router)
- Data fetching and caching using RTK Query


Tech Stack

- React 19, React Router DOM 7
- Redux Toolkit + RTK Query, React Redux
- Webpack 5, Babel
- CSS Modules


Start

- git clone https://github.com/sentinel1230/react-js-practice-project.git
- cd task-5---react-javascript-practice
- npm install
- npm start

App runs at http://localhost:3000.


Build for production:

- npm run build


Deployment

- Live demo: https://sentinel1230.github.io/react-js-practice-project/

Project Structure
src/
  app/store.js
  assets
  components/
    layout/
    navbar/
  features/
    products/productsApi.js
    cart/cartSlice.js
  pages/
    home/
    products/
    cart/
  App.jsx
  index.js