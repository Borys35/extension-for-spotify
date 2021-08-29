import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import AuthProvider from "./providers/AuthProvider";
import PlayerProvider from "./providers/PlayerProvider";
import SearchProvider from "./providers/SearchProvider";
import SpotifyProvider from "./providers/SpotifyProvider";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <SearchProvider>
          <SpotifyProvider>
            <PlayerProvider>
              <App />
            </PlayerProvider>
          </SpotifyProvider>
        </SearchProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
