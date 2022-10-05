const canvas=document.querySelector('#game');
const game=canvas.getContext('2d');
let canvasSize;
let elementSize;

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
    elementSize= canvasSize/10;

    startGame()
}


function startGame(){
    

    

    console.log({canvasSize,elementSize})
    
    game.font=(elementSize-10)+'px Verdana';//estamos haciendo el emoji del tamaño de cada espacio en el canvas que quedamos era 10x10
    game.textAlign='end';

    let map=maps[2];//[]la posicion de map va a ser el mapa, hay solo 3 mapas
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

    //vamos a escribir el anterior for de una manera mas legible y mas "profesional"
    mapRowCols.forEach((row, rowI)=>{ // el forEach puede devolver el indice, tradicionalmente siempre he usado un parametro, pero si le ponemos dos, el segundo representa el indice
        row.forEach((col,colI)=>{
            const emoji=emojis[col];
            const posX = elementSize*(colI+1);
            const posY = elementSize*(rowI+1);
            game.fillText(emoji,posX,posY);
            console.log({row, rowI, col, colI})
        })
    })




    
    
}

