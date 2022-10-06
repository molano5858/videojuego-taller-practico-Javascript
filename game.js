const canvas=document.querySelector('#game');
const game=canvas.getContext('2d');
let canvasSize;
let elementSize;


let up=document.querySelector('#up') ;
let left=document.querySelector('#left') ;
let right=document.querySelector('#right') ;
let down=document.querySelector('#down') ;

let playerPosition={
    x:undefined,
    y:undefined,
}

window.addEventListener('load',setCanvasSize);// le estamos diciendo que cuanto la ventana cargue, ejecute la funcion startGame
window.addEventListener('resize',setCanvasSize)// evento resize de window nos permite ejecutar la funcion cada vez que se hace cambio dinamico de la pagina, esto soluciona el hecho de que el canva no cambiaba de tamaño si no solo cuando recargabamos

//game.fillRect(0,0,100,100);//necesita 4 (inicio X, inicio Y, width, height )
//game.clearRect(0,0,50,50)//borra en forma de cuadrado lo que le digamos, recibe los mismos parametros que fillRect
//game.font='16px Verdana'// (tamaño fuente y fuente)
//game.fillStyle='#000' // (color puede ser con nombre o con # escribir como si fuera un css)
//game.textAlign='center' // alineacion, center, left, right, 
//game.fillText('Platzi', 25,25)// (texto a insertar,inicio X,inicio Y)

function setCanvasSize(){
    if(window.innerHeight>window.innerWidth){// este if lo hacemos para que el canvas sea cuadrado y que ocupe el 80% del lado mas grande, es decir si el width de la pantalla es mayor al height entonces tomar el 80% del height y viceversa
        canvasSize=window.innerWidth*0.8;
    }else{
        canvasSize=window.innerHeight*0.8;
    }
    canvas.setAttribute('width',canvasSize);
    canvas.setAttribute('height',canvasSize);
    elementSize= (canvasSize/10);

    startGame()
}


function startGame(){
    

    

    console.log({canvasSize,elementSize})
    
    game.font=(elementSize-10)+'px Verdana';//estamos haciendo el emoji del tamaño de cada espacio en el canvas que quedamos era 10x10
    game.textAlign='end';

    let map=maps[0];//[]la posicion de map va a ser el mapa, hay solo 3 mapas
    let mapRows=map.trim().split('\n');// .trim() elimina los espacios en blanco al inicio y al final de un string, .split() convierte a un array un string y cada posicion o elemento del array vendra dado por el parametro que le pasemos,
    console.log(mapRows);
    
    let mapRowCols= mapRows.map(row=>{
        return row.trim().split('')// estamos creando un array de arrays donde cada elemento tenga los elementos que venian de cada fila
    });

    console.log(mapRowCols)
    
    
    // for(let i=0;i<10;i++){
    //     // game.fillText(emojis['X'],(elementSize)*i,elementSize);
    //     for(let a=0;a<=10;a++){
    //         game.fillText(emojis[mapRowCols[i][a-1]],(elementSize*a),(elementSize*i)+30);
            
    //     }
    // } 


    clearMap()// las calaveras cada que las movemos se duplican, para ello digamos que borramos todo el mapa y luego lo renderizamos de nuevo

    //vamos a escribir el anterior for de una manera mas legible y mas "profesional"
    mapRowCols.forEach((row, rowI)=>{ // el forEach puede devolver el indice, tradicionalmente siempre he usado un parametro, pero si le ponemos dos, el segundo representa el indice
        row.forEach((col,colI)=>{
            const emoji=emojis[col];
            const posX = elementSize*(colI+1-0.04);
            const posY = elementSize*(rowI+1-0.28);

            //vamos a renderizar la calaberita, osea el jugador en la misma posicion de la puerta

            if(col=='O'){//O es el key que representa la puerta
                if(!playerPosition.x && !playerPosition.y){//como estamos borrando el mapa cada vez aqui estamos cubriendo al render diciendo que solo renderice la calabera en la posicion inicial la primera vez, porque en la segunda o demas ya positionPlayer.x y y no seran undefined
                playerPosition.x=posX;
                playerPosition.y=posY;
                }
            }
            game.fillText(emoji,posX,posY);
            
            
            // console.log({row, rowI, col, colI})
        })
    })
    

    movePlayer()
    
    
}

function clearMap(){
    game.clearRect(0,0,canvasSize,canvasSize)
}

function movePlayer(){
    
    const emojiPlayer=emojis['PLAYER'];
    game.fillText(emojiPlayer,playerPosition.x,playerPosition.y);
    console.log(playerPosition.x,playerPosition.y)

}

//EVENTOS DE LOS BOTONES DE DIRECCION



up.addEventListener('click',moverArriba);
left.addEventListener('click',moverIzquierda);
right.addEventListener('click',moverDerecha);
down.addEventListener('click',moverAbajo);

window.addEventListener('keydown',moveByKey);
window.addEventListener('keydown',moveByKey);
window.addEventListener('keydown',moveByKey);
window.addEventListener('keydown',moveByKey);



// function mostrarTecla(event){recibiendo el evento y mostrandolo me doy cuenta de tecla estoy presionando
//     console.log(event)
// }




function moverArriba(){
    if(playerPosition.y-elementSize<0 ){// para que no se salga del mapa hacia arriba
        console.log('Se salio')
    }else{
        playerPosition.y-=elementSize;
        startGame()
    }
};

function moverIzquierda(){

    if(playerPosition.x-elementSize<0 ){// para que no se salga del mapa hacia izquierda
        console.log('Se salio')
    }else{
        playerPosition.x-=elementSize;
        startGame()
    }
}

function moverDerecha(){
    if(playerPosition.x+elementSize>canvasSize ){// para que no se salga del mapa hacia derecha
        console.log('Se salio')
    }else{
        playerPosition.x+=elementSize;
        startGame()
    }   
};

function moverAbajo(){
    if(playerPosition.y+elementSize>canvasSize ){// para que no se salga del mapa hacia abajo
        console.log('Se salio')
    }else{
        playerPosition.y+=elementSize;
        startGame()
    }
}

function moveByKey(event){

    switch (event.key) {
        case "ArrowUp":
            moverArriba()
        break;

        case "ArrowDown":
            moverAbajo()
        break;

        case "ArrowRight":
            moverDerecha()
        break;

        case "ArrowLeft":
            moverIzquierda()
        break;
    
        default:
        break;
    }

}
