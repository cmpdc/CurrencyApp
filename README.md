# CurrencyApp

~~To run: `npm dev`
but make sure to install all the dependencies beforehand by executing `
npm install`.~~

~~To build the app: `npm build`.~~

~~This project is written in JavaScript/React and is using Vite as the development server.~~

## UPDATE

The app has now both frontend and backend.
Frontend handles all the UI, backend does _some_ data; it also handles the account system of the app. The majority of the data propagation of this app goes through `localStorage` (for now) - this will be changed/fixed soon.

In the meantime...

Write `.env` files both the frontend and backend folders.

Inside the frontend,

```
VITE_CURRENCY_API_KEY=
VITE_BACKEND_PORT=6970
VITE_FRONTEND_PORT=6969
```

`VITE_CURRENCY_API_KEY` is the API key for the exchange rate. Talk to me (uri) so you can get this key. This must not be shared in public.

In the backend:

```
JWT_SECRET=your_secret_key_here
BACKEND_PORT=6970
FRONTEND_PORT=6969
```

After creating these files in their designated folders,

-   `npm i` or `npm install` at the root folder to install the dependency at the root folder.
-   `npm install:children` at the root folder to install **all** the dependencies on both the backend _and_ frontend.

To run, `npm start` at the root of the folder. This script uses `concurrently` to allow running both the frontend and backend.

Note that the frontend uses `6969` port, while the backend uses `6970` port.

And to build the app: `npm build:children`
