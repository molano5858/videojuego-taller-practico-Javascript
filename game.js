const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
let canvasSize;
let elementSize;

let up = document.querySelector("#up");
let left = document.querySelector("#left");
let right = document.querySelector("#right");
let down = document.querySelector("#down");
let livesLeft = document.querySelector("#lives");
let time = document.querySelector("#time");
let recordActual = document.querySelector("#record");

let playerPosition = {
  x: undefined,
  y: undefined,
};

let giftPosition = {
  x: undefined,
  y: undefined,
};

let enemiesPositions = [];

let nivelActual = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

window.addEventListener("load", setCanvasSize); // le estamos diciendo que cuanto la ventana cargue, ejecute la funcion startGame
window.addEventListener("resize", setCanvasSize); // evento resize de window nos permite ejecutar la funcion cada vez que se hace cambio dinamico de la pagina, esto soluciona el hecho de que el canva no cambiaba de tamaño si no solo cuando recargabamos

//game.fillRect(0,0,100,100);//necesita 4 (inicio X, inicio Y, width, height )
//game.clearRect(0,0,50,50)//borra en forma de cuadrado lo que le digamos, recibe los mismos parametros que fillRect
//game.font='16px Verdana'// (tamaño fuente y fuente)
//game.fillStyle='#000' // (color puede ser con nombre o con # escribir como si fuera un css)
//game.textAlign='center' // alineacion, center, left, right,
//game.fillText('Platzi', 25,25)// (texto a insertar,inicio X,inicio Y)

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    // este if lo hacemos para que el canvas sea cuadrado y que ocupe el 80% del lado mas grande, es decir si el width de la pantalla es mayor al height entonces tomar el 80% del height y viceversa
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);
  elementSize = canvasSize / 10;

  playerPosition.x = undefined;
  playerPosition.y = undefined; //esto lo hacemos porque la calavera al hacerle resize a la pantalla se queda quieta, entonces tenemos que redefinir la posicion de la calavera antes de cada vez que mandamos a llamar a starGame()

  startGame();
}

function startGame() {
  showLivesLeft();
  showRecord();
  //console.log({ canvasSize, elementSize });
  game.font = elementSize - 10 + "px Verdana"; //estamos haciendo el emoji del tamaño de cada espacio en el canvas que quedamos era 10x10
  game.textAlign = "end";
  let map = maps[nivelActual]; //[]la posicion de map va a ser el mapa, hay solo 3 mapas

  if (!map) {
    //estamos preguntando si no hay mapa, es decir si estamos en el ultimo nivel o mapa que tenga el arreglo, esto para que ejecute algo que termine el juego.

    gameWin();
    return; // para terminar con la ejecucion del codigo de startgame y que no renderice mas
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
  }

  let mapRows = map.trim().split("\n"); // .trim() elimina los espacios en blanco al inicio y al final de un string, .split() convierte a un array un string y cada posicion o elemento del array vendra dado por el parametro que le pasemos,
  //console.log(mapRows);

  let mapRowCols = mapRows.map((row) => {
    return row.trim().split(""); // estamos creando un array de arrays donde cada elemento tenga los elementos que venian de cada fila
  });

  //   console.log(mapRowCols);

  // for(let i=0;i<10;i++){
  //     // game.fillText(emojis['X'],(elementSize)*i,elementSize);
  //     for(let a=0;a<=10;a++){
  //         game.fillText(emojis[mapRowCols[i][a-1]],(elementSize*a),(elementSize*i)+30);

  //     }
  // }

  enemiesPositions = []; //como cada vez que nos movemos estamos haciendole push a todas las ubicaciones enemigas, si nos movemos se van a duplicar en el arreglo, entonces para que con cada movimiento que hagamos se reinicie el arreglo entonces colocamos esto asi
  clearMap(); // las calaveras cada que las movemos se duplican, para ello digamos que borramos todo el mapa y luego lo renderizamos de nuevo

  //vamos a escribir el anterior for de una manera mas legible y mas "profesional"
  mapRowCols.forEach((row, rowI) => {
    // el forEach puede devolver el indice, tradicionalmente siempre he usado un parametro, pero si le ponemos dos, el segundo representa el indice
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * (colI + 1 - 0.04);
      const posY = elementSize * (rowI + 1 - 0.28);

      //vamos a renderizar la calaberita, osea el jugador en la misma posicion de la puerta

      if (col == "O") {
        //O es el key que representa la puerta
        if (!playerPosition.x && !playerPosition.y) {
          //como estamos borrando el mapa cada vez aqui estamos cubriendo al render diciendo que solo renderice la calabera en la posicion inicial la primera vez, porque en la segunda o demas ya positionPlayer.x y y no seran undefined
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
      } else if (col == "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col == "X") {
        enemiesPositions.push({ x: posX.toFixed(1), y: posY.toFixed(1) });
      }
      game.fillText(emoji, posX, posY);
      // console.log({row, rowI, col, colI})
    });
  });

  // console.log(giftPosition)
  movePlayer();
}

function clearMap() {
  game.clearRect(0, 0, canvasSize, canvasSize);
}

function movePlayer() {
  let colisionX = playerPosition.x.toFixed(1) == giftPosition.x.toFixed(1);
  let colisionY = playerPosition.y.toFixed(1) == giftPosition.y.toFixed(1);
  let giftCollision = colisionX && colisionY;
  if (giftCollision) {
    console.log("REGALITO");
    levelWin();
  }

  let enemyColision = enemiesPositions.find((enemy) => {
    let colisionEnemyX = enemy.x;

    let colisionEnemyY = enemy.y;
    let trueOrFalseDeColisionEnemy =
      colisionEnemyX == playerPosition.x.toFixed(1) &&
      colisionEnemyY == playerPosition.y.toFixed(1);

    return trueOrFalseDeColisionEnemy;
  });

  if (enemyColision) {
    levelFail();
  }

  const emojiPlayer = emojis["PLAYER"];
  game.fillText(emojiPlayer, playerPosition.x, playerPosition.y);
  console.log(playerPosition.x, playerPosition.y);
}

function levelWin() {
  console.log("Ganaste, Subiste de nivel");
  nivelActual += 1;
  startGame();
}
console.log(`Vidas antes de la colision ${lives}`);
function levelFail() {
  lives--;

  if (lives > 0) {
    console.log("Colision con ENEMIGO");
    playerPosition.x = undefined;
    playerPosition.y = undefined; //cuando el jugador falla debemos reiniciar las posiciones para que despues de volver a ejecurar la funcion startGame vuelva a asignarle la ubicacion inicial
    console.log(`chocaste, te quedan ${lives} vidas `);
    startGame();
  } else {
    console.log("PERDISTE");
    nivelActual = 0;
    lives = 3;
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    clearInterval(timeInterval);
    timeStart = 0;
    startGame();
  }
}

function gameWin() {
  console.log("GANASTE Y TERMINASTE EL JUEGO");
  clearInterval(timeInterval);

  record = time.innerHTML;
  guardarRecord(record);
}

function guardarRecord(nuevoTiempo) {
  if (localStorage.length == 0) {
    localStorage.setItem("record", nuevoTiempo);
    console.log(`TU PRIMER RECORD ES ${localStorage.getItem("record")}`);
  } else if (localStorage.getItem("record") > nuevoTiempo) {
    localStorage.setItem("record", nuevoTiempo);
    console.log(`NUEVO RECORD ${localStorage.getItem("record")}`);
  } else {
    localStorage.getItem("record");
    console.log(`No se supero el record de ${localStorage.getItem("record")}`);
  }

  let prueba = localStorage.getItem("record");
  console.log({ nuevoTiempo, prueba });
}

function showLivesLeft() {
  //livesLeft.innerHTML = emojis["HEART"].repeat(lives); esta es la forma corta de hacerlo, a continuacion hare la forma larga que hizo el profesor

  let heartsLeft = Array(lives).fill(emojis["HEART"]);

  livesLeft.innerHTML = ""; // esto es para que cada vez que ingresemos al forEach los corazones empiecen en cero, si no hacemos esto cada vez que nos movamos va a sumar y sumar corazcones, por eso necesitamos colocarlo en cero.
  heartsLeft.forEach((elemento) => {
    livesLeft.append(elemento); //mejor append que innerHTML porque con innerHTML me estaria sobre escribiendo los corazones osea que solo apareceria 1, mientras que con append me va como adicionando sin reescribir lo que ya habia
  });
}

function showTime() {
  time.innerHTML = Date.now() - timeStart;
}

function showRecord() {
  recordActual.innerHTML = localStorage.getItem("record");
}

//EVENTOS DE LOS BOTONES DE DIRECCION

up.addEventListener("click", moverArriba);
left.addEventListener("click", moverIzquierda);
right.addEventListener("click", moverDerecha);
down.addEventListener("click", moverAbajo);

window.addEventListener("keydown", moveByKey);
window.addEventListener("keydown", moveByKey);
window.addEventListener("keydown", moveByKey);
window.addEventListener("keydown", moveByKey);

// function mostrarTecla(event){recibiendo el evento y mostrandolo me doy cuenta de tecla estoy presionando
//     console.log(event)
// }

function moverArriba() {
  if (playerPosition.y - elementSize < 0) {
    // para que no se salga del mapa hacia arriba
    console.log("Se salio");
  } else {
    playerPosition.y -= elementSize;
    startGame();
  }
}

function moverIzquierda() {
  if (playerPosition.x - elementSize < 0) {
    // para que no se salga del mapa hacia izquierda
    console.log("Se salio");
  } else {
    playerPosition.x -= elementSize;
    startGame();
  }
}

function moverDerecha() {
  if (playerPosition.x + elementSize > canvasSize) {
    // para que no se salga del mapa hacia derecha
    console.log("Se salio");
    // }else if(!prueba){
    //     console.log('EXPLOTO')
  } else {
    playerPosition.x += elementSize;
    startGame();
  }
}

function moverAbajo() {
  if (playerPosition.y + elementSize > canvasSize) {
    // para que no se salga del mapa hacia abajo
    console.log("Se salio");
  } else {
    playerPosition.y += elementSize;
    startGame();
  }
}

function moveByKey(event) {
  switch (event.key) {
    case "ArrowUp":
      moverArriba();
      break;

    case "ArrowDown":
      moverAbajo();
      break;

    case "ArrowRight":
      moverDerecha();
      break;

    case "ArrowLeft":
      moverIzquierda();
      break;

    default:
      break;
  }
}
