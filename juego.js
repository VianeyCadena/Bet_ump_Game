document.addEventListener("keydown", function(evento){
    if(evento.keyCode == 32){
        console.log("salta");

        if(nivel.muerto == false){
            saltar();
        }
        else {
            nivel.velocidad = 9;
            nube.velocidad = 1;
            obst.x = ancho + 100;
            nube.x = ancho + 100;
            nivel.marcador = 0;
            nivel.muerto = false;
        }
        
    }
});

// VAR IMAGENES  ------------------------------

var imgTipo, imgNube, imgObst, imgSuelo

// CARGA IMAGAGENES  ------------------------------

function cargaImagenes(){
    imgTipo = new Image();
    imgNube = new Image();
    imgObst = new Image();
    imgSuelo = new Image();


    imgTipo.src = "img/tipo.png";
    imgNube.src = "img/nube.png";
    imgObst.src = "img/obst.png";
    imgSuelo.src = "img/suelo.png";
}


// VAR CANVAS  ------------------------------

var ancho = 700;
var alto = 300;
var canvas, ctx;


//DIBUJA - LOGICA NUBE  ------------------------------

function inicializa(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    cargaImagenes();
}

// BORRA CANVAS  ------------------------------

function borraCanvas(){
    canvas.width = ancho;
    canvas.height = alto;
}

// VARIABLES OBJETOS  ------------------------------

var suelo = 200;
var tipo = {y: suelo, vy:0, gravedad:2, salto:28, vymax:9, saltando:false};
var nivel = {velocidad: 9, marcador: 0, muerto: false};
var obst = {x: ancho + 100, y: suelo};
var nube = {x: 400, y: 100, velocidad: 1};
var sueloG = {x:0, y: 253};

//DIBUJA TIPO  ------------------------------

function dibujaTipo(){
    ctx.drawImage(imgTipo,0,0,64,69,100,tipo.y,50,50);
}

//DIBUJA - LOGICA OBSTACULO  ------------------------------

function dibujaObs(){
    ctx.drawImage(imgObst,0,0,38,46,obst.x,obst.y, 38, 46);
}

function logicaObst(){
    if(obst.x < -100){
        obst.x = ancho + 100;
        nivel.marcador++;
        nivel.velocidad++;
    } 
    else {
        obst.x -= nivel.velocidad;
    }
}

//DIBUJA - LOGICA SUELO  ------------------------------

function dibujaSuelo(){
    ctx.drawImage(imgSuelo,sueloG.x,0,700,47,0,sueloG.y, 700, 47);
}

function logicaSuelo(){
    if(sueloG.x > 700){
        sueloG.x = 0;
    }
    else{
        sueloG.x += nivel.velocidad;
    }
}

//DIBUJA - LOGICA NUBE  ------------------------------

function dibujaNube(){
    ctx.drawImage(imgNube, 0, 0, 57, 31, nube.x, nube.y, 57, 31);
}

function logicaNube(){
    if(nube.x < -100){
        nube.x = ancho + 100;
    } 
    else {
        nube.x -= nube.velocidad;
    }
} 

// FUNCION SALTAR  ------------------------------

function saltar(){
    tipo.saltando = true;
    tipo.vy = tipo.salto;
}

// FUNCION GRAVEDAD  ------------------------------

function gravedad(){
 if(tipo.saltando == true){

    if(tipo.y - tipo.vy - tipo.gravedad > suelo){
        tipo.saltando=false;
        tipo.vy = 0;
        tipo.y = suelo;
    }
    else{
        tipo.vy -= tipo.gravedad;
        tipo.y -= tipo.vy;
    }
     
 }
}

// FUNCION COLISION  ------------------------------

function colision(){
    //obst.x
    //tipo.x
    if(obst.x >= 100 && obst.x <= 150){
        if(tipo.y >= suelo){
            nivel.muerto = true;
            nivel.velocidad = 0;
            nube.velocidad = 0;
        }
    }
}

// PUNTUACION - GAME OVER  ------------------------------

function puntuacion(){
    ctx.font = "20px impact";
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${"FREE BET: "+ nivel.marcador}`, 600, 50);

    if(nivel.muerto == true){
        ctx.font = "60px impact";
        ctx.fillText(`GAME OVER`, 240, 150);
    }
}


//BUCLE PRINCIPAL  ------------------------------

var FPS = 50;
setInterval(function(){
    principal();
}, 1000/FPS);

// FUNCION PRINCIPAL  ------------------------------

function principal(){
    borraCanvas();
    gravedad();
    colision();
    logicaSuelo();
    logicaObst();
    logicaNube();
    dibujaSuelo();
    dibujaObs();
    dibujaNube();
    dibujaTipo();
    puntuacion();
}


//https://www.youtube.com/watch?v=g60iaQXW70Q