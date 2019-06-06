import './preset.js';
import {isMobileBrower} from "./utils.js";
import { Layout } from "./cls.js";


if ( !isMobileBrower() ) {
  document.querySelector(".handleArea").style.display = 'none'
}
new Layout(22,12, 700, {
  wrap: document.querySelector("#gameWrap"),
  upBtn: document.getElementById("upBtn"),
  ritBtn: document.getElementById("ritBtn"),
  btmBtn: document.getElementById("btmBtn"),
  lftBtn: document.getElementById("lftBtn"),
  fallBtn: document.getElementById("fallBtn"),
})
Layout.bindGlobalEvents({
  startBtn: document.getElementById("startGame"),
  pauseBtn: document.getElementById("pauseGame"),
  addGame: document.getElementById("addMoreGame"),
  finaScroe: document.getElementById("score"), 
})
