import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.scss";

// google fonts
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';

import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";
import { JWTProvider } from "./contexts/JWTContext.jsx";
import { SnackbarProvider } from "./utils/SnackbarProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
      <SnackbarProvider>
        <JWTProvider>
            <RouterProvider router={router}>
            <App />
            </RouterProvider>
        </JWTProvider>
      </SnackbarProvider>
  </>
);


