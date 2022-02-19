import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AddGame from './addGame';
import EditGame from './editGame';
import GameData from './gameData';
import StarSharks from './starSharks';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/addgame" element={<AddGame />} />
        <Route path="/editgame" element={<EditGame />} />
        <Route path="/gamedata" element={<GameData />} />
        <Route path="/starsharks" element={<StarSharks />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
