
import { Layout } from "./cls.js";



new Layout(23,16, 700, document.querySelector("#gameWrap"))
Layout.bindGlobalEvents(
  document.getElementById("startGame"),
  document.getElementById("pauseGame"),
  document.getElementById("addMoreGame"),
  document.getElementById("score")
)
