import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import store from "./store";

import "react-toastify/dist/ReactToastify.css";

import "./style.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//     <React.StrictMode>
//         <StoreProvider store={store}>
//             <App />
//         </StoreProvider>
//     </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")).render(
    <StoreProvider store={store}>
        <App />
    </StoreProvider>
);
