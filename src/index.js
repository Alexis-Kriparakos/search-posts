import "./styles.css";
import {userInput} from "../config/config.js";
import {renderPage} from '../main.js';

userInput.addEventListener("keydown",event =>{
  renderPage();
})


