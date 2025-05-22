import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import {persistStore} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ChatProvider } from "./context/ChatContext.jsx";

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
     <ChatProvider>
      <App />
     </ChatProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
