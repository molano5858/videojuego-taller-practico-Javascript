const canvas=document.querySelector('#game');
const game=canvas.getContext('2d');
let canvasSize;
let elementSize;

window.addEventListener('load',setCanvasSize);// le estamos diciendo que cuanto la ventana cargue, ejecute la funcion startGame
window.addEventListener('resize',setCanvasSize)// evento resize de window nos permite ejecutar la funcion cada vez que se hace cambio dinamico de la pagina, esto soluciona el hecho de que el canva no cambiaba de tamaño si no solo cuando recargabamos


function setCanvasSize(){
    if(window.innerHeight>window.innerWidth){// este if lo hacemos para que el canvas sea cuadrado y que ocupe el 80% del lado mas grande, es decir si el width de la pantalla es mayor al height entonces tomar el 80% del height y viceversa
        canvasSize=window.innerWidth*0.8;
    }else{
        canvasSize=window.innerHeight*0.8;
    }
    canvas.setAttribute('width',canvasSize);
    canvas.setAttribute('height',canvasSize);
    elementSize= canvasSize/10;

    startGame()
}


function startGame(){
    

    

    console.log({canvasSize,elementSize})
    
    game.font=(elementSize-10)+'px Verdana';//estamos haciendo el emoji del tamaño de cada espacio en el canvas que quedamos era 10x10
    game.textAlign='end';

    for(let i=0;i<=10;i++){
        game.fillText(emojis['X'],(elementSize)*i,elementSize);
    } 
    //game.fillRect(0,0,100,100);//necesita 4 (inicio X, inicio Y, width, height )
    //game.clearRect(0,0,50,50)//borra en forma de cuadrado lo que le digamos, recibe los mismos parametros que fillRect
    //game.font='16px Verdana'// (tamaño fuente y fuente)
    //game.fillStyle='#000' // (color puede ser con nombre o con # escribir como si fuera un css)
    //game.textAlign='center' // alineacion, center, left, right, 
    //game.fillText('Platzi', 25,25)// (texto a insertar,inicio X,inicio Y)
    
}