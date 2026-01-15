/**
Azael Bastardo Rodriguez
**/


//Variables globales
/*
Estas variables nos van a permitir realizar el movimiento de la excavadora, asi como 
otras animaciones como el encendido y apagado de luces.
Ademas dentro de las variables globales cargamos algunas de las texturas que vamos a 
emplear en la excavadora.
Por ultimo, se definen los materiales que se van a emplear en la excavadora.
*/
var step;
var scene, camera,renderer,controls;
var cabinaExcavadora,baseExcavadora,reflectorSirena;
var giroIzquierda = false;
var giroDerecha = false;
var moverOrugaDerecha = false;  
var moverOrugaIzquierda = false;
var haciaAtras=false;
var texOrugaDer;
var texOrugaIzq;
var brazoSubir = false;
var brazoBajar = false;
var antebrazoSubir = false;
var antebrazoBajar = false;
var cazoSubir = false;
var cazoBajar = false;
var grupoBrazo, grupoAntebrazo, grupoCazo;
var lucesEncendidas = true; 
var listaLuces = [];        
var listaMatFocos = [];     
var listaMatFrenos = [];
const textureLoader = new THREE.TextureLoader();

//Texturas para las orugas de la excavadora
//Se cargan dos veces para poder tratar de forma independiente la oruga derecha y la oruga izquierda
texOrugaDer = textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/textura_orugas_excavadora.jpg');
texOrugaDer.wrapS = THREE.RepeatWrapping;
texOrugaDer.wrapT = THREE.RepeatWrapping;
texOrugaDer.repeat.set(2, 2);

texOrugaIzq = textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/textura_orugas_excavadora.jpg');
texOrugaIzq.wrapS = THREE.RepeatWrapping;
texOrugaIzq.wrapT = THREE.RepeatWrapping;
texOrugaIzq.repeat.set(2, 2);

//material para la parte de cristal de la cabina
const materialCristalCabina=new THREE.MeshPhysicalMaterial({
    color: 0x88ccee,
    metalness: 0.1,
    roughness: 0.2,
    transmission: 0.6,
    thickness: 1.5,
    ior: 1.5,
    transparent: true,
    opacity: 1.0,
    side: THREE.DoubleSide 
});
//material para el marco de la cabina
const matMarcoCabina = new THREE.MeshStandardMaterial({ 
        color: 0x111111, 
        roughness: 0.9, 
        metalness: 0.1 
});

//texturas aplicadas a los escalones de la parte de atras de la cabina y con ellas creamos el correspondiente material
const texturaEscalon=textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/DiamondPlate008C_2K-JPG_Color.jpg');
const texturaEscalonAO=textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/DiamondPlate008C_2K-JPG_AmbientOcclusion.jpg');
const texturaEscalonMetal=textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/DiamondPlate008C_2K-JPG_Metalness.jpg');
const texturaEscalonNormal=textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/DiamondPlate008C_2K-JPG_NormalGL.jpg');
const texturaEscalonRough=textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/DiamondPlate008C_2K-JPG_Roughness.jpg');
[texturaEscalon, texturaEscalonAO,texturaEscalonMetal,texturaEscalonNormal,texturaEscalonRough].forEach(t => {
    t.wrapS=THREE.RepeatWrapping;
    t.wrapT=THREE.RepeatWrapping;
    t.repeat.set(1,1);
});
const materialEscalon=new THREE.MeshStandardMaterial({
    map: texturaEscalon,
    aoMap: texturaEscalonAO,
    normalMap: texturaEscalonNormal,
    normalScale: new THREE.Vector2(1,1),
    roughnessMap: texturaEscalonRough,
    metalnessMap: texturaEscalonMetal
});

//textura para simular las rejillas de ventilacion del motor y creamos el material correspondiente
const texturaRejilla=textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/SheetMetal001_2K-JPG_Color.jpg');
const texturaRejillaNormal=textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/SheetMetal001_2K-JPG_NormalGL.jpg');
const texturaRejillaRough=textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/SheetMetal001_2K-JPG_Roughness.jpg');
const texturaRejillaMetal=textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/SheetMetal001_2K-JPG_Metalness.jpg');
const texturaRejillaOpacity=textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/SheetMetal001_2K-JPG_Opacity.jpg');
[texturaRejilla, texturaRejillaMetal, texturaRejillaNormal, texturaRejillaOpacity, texturaRejillaRough].forEach(t => {
    t.wrapS=THREE.RepeatWrapping;
    t.wrapT=THREE.RepeatWrapping;
    t.repeat.set(1,1);
});

const materialRejilla = new THREE.MeshStandardMaterial({
    map: texturaRejilla,
    normalMap: texturaRejillaNormal,
    normalScale: new THREE.Vector2(1,1),
    roughnessMap: texturaRejillaRough,
    metalnessMap: texturaRejillaMetal,
    alphaMap: texturaRejillaOpacity,
    transparent: true,
    alphaTest: 0.5,
    side: THREE.DoubleSide
});
//definimos un material para la parte interior de la rejilla (para que esta parte se vea mas ocura como si fuese el interior)
const materialInteriorRejilla = new THREE.MeshStandardMaterial({
    color: 0x7D5301,
    roughness: 1.0,
    metalness: 0.0,
    side: THREE.DoubleSide
});

//textura lineas amarillas y negras de la parte posterior de la excavadora
const texturaHazardLines=textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/hazard_lines.png');
texturaHazardLines.wrapS=THREE.RepeatWrapping;
texturaHazardLines.wrapT=THREE.RepeatWrapping;
texturaHazardLines.repeat.set(1,1);
//Material para algunas partes de la excavadora
const matNegro = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8 });
const matNegroDoble = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8, side: THREE.DoubleSide });
const matMetal = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.2 });
/*
materialTexturaAmarilloCabina(repX,repY):
*repX: numero de veces que se repite la textura en X,
*repY: numero de veces que se repite la textura en Y,

La razon para crear esta funcion es que la excavadora en general va a tener una textura que simula metal rozado, con un color llamado amarillo caterpilar.
Como las piezas de la excavadora pueden ser de dimensiones muy diversas no siempre interesa el mismo numero de repeticiones de la textura.
Gracias a esta funcion se crea ese material con el numero de repeticiones deseadas
*/
function materialTexturaAmarilloCabina(repX,repY){
    const texturaCabinaAmarilloAO=textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/ScratchedPaintedMetal01_2K_AO.png');
const texturaCabinaAmarilloNormal=textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/ScratchedPaintedMetal01_2K_Normal.png');
const texturaCabinaAmarilloRough=textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/ScratchedPaintedMetal01_2K_Roughness.png');
const texturaCabinaAmarilloMetal=textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/ScratchedPaintedMetal01_2K_Metallic.png');

    [texturaCabinaAmarilloAO, texturaCabinaAmarilloNormal, texturaCabinaAmarilloRough, texturaCabinaAmarilloMetal].forEach(t => {
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repX,repY);
    });


    const material = new THREE.MeshStandardMaterial({
        color: 0xF9A602,
        map: texturaCabinaAmarilloAO,              
        normalMap: texturaCabinaAmarilloNormal,       
        normalScale: new THREE.Vector2(1, 1), 
        roughnessMap: texturaCabinaAmarilloRough,
        roughness: 1.0,
        metalnessMap: texturaCabinaAmarilloMetal,     
        metalness: 1.0,              
    });

    return material;
}

/*
funcion crearOruga(texturaEspecifica)
*texturaEspecifica: la textura que se aplica a la oruga, la razon de incluirlo es que como habiamos visto hay que tratar de forma independiente la textura de la oruga izquierda y la derecha

Esta funcion permite crear cada una de las orugas de la excavadora, de este modo se crea facilmente la izquierda y la derecha.
Aclarar que esta funcion solo crea lo que seria la parte exterior de la oruga, los detalles interiores se crean dentro del propio init()
*/
function crearOruga(texturaEspecifica) {
    //definimos las dimensiones de la oruga
    const radio = 0.57;
    const largo = 3.65;  
    const ancho = 0.79;
    
    //empezamos el dibujo
    const orugaShape = new THREE.Shape();
    orugaShape.moveTo(0, radio); 
    orugaShape.lineTo(largo, radio); 
    //parte curva (semicirculo)
    orugaShape.absarc(largo, 0, radio, Math.PI / 2, -Math.PI / 2, true); 
    orugaShape.lineTo(0, -radio); 
    orugaShape.absarc(0, 0, radio, -Math.PI / 2, Math.PI / 2, true);
    //definimos la misma forma pero ahora la parte interna
    const radioInterno = radio - 0.1;
    const huecoPath = new THREE.Path();
    huecoPath.moveTo(0, radioInterno);
    huecoPath.lineTo(largo, radioInterno);
    huecoPath.absarc(largo, 0, radioInterno, Math.PI / 2, -Math.PI / 2, true);
    huecoPath.lineTo(0, -radioInterno);
    huecoPath.absarc(0, 0, radioInterno, -Math.PI / 2, Math.PI / 2, true);
    orugaShape.holes.push(huecoPath);
    const extrudeSettings = { 
        depth: ancho,
        bevelEnabled: false, 
        curveSegments: 32    
    };

    const geometry = new THREE.ExtrudeGeometry(orugaShape, extrudeSettings);
    const material = new THREE.MeshStandardMaterial({ color: 0x333333,side: THREE.DoubleSide }); 
    const matRodadura = new THREE.MeshStandardMaterial({ 
    map: texturaEspecifica, //aplico la textura
    side: THREE.DoubleSide
});
    const mallaOruga = new THREE.Mesh(geometry, [material,matRodadura]);
    return mallaOruga;
}

/*
funcion crearFocoExcavadora()

Esta funcion permite crear la forma de los focos que se encoentran en la parte superior delantera de la excavadora
*/
function crearFocoExcavadora() {
    const grupoFoco = new THREE.Group();
    //Creamos lo que seria la carcasa del foco (forma cilindrica/conica)
    const geoCarcasa = new THREE.CylinderGeometry(0.12, 0.08, 0.25, 16);
    geoCarcasa.rotateZ(-Math.PI / 2); 
    const matCarcasa = new THREE.MeshStandardMaterial({ 
        color: 0x111111, 
        roughness: 0.5 
    });
    const carcasa = new THREE.Mesh(geoCarcasa, matCarcasa);
    grupoFoco.add(carcasa);
    //creamos la parte del crsital por donde va a salir la luz
    const geoCristal = new THREE.CylinderGeometry(0.10, 0.10, 0.02, 16);
    geoCristal.rotateZ(-Math.PI / 2);
    const matCristal = new THREE.MeshBasicMaterial({ color: 0xffffff }); 
    const cristal = new THREE.Mesh(geoCristal, matCristal);
    listaMatFocos.push(matCristal);
    cristal.position.x = 0.13; 
    grupoFoco.add(cristal);
    // Introducimos la porpia luz del foco, esta logicamente es direccional
    const luz = new THREE.SpotLight(0xffffee, 5, 20, 0.6, 0.5, 1);
    luz.position.set(0, 0, 0);
    listaLuces.push(luz);
    //creo un objeto invisible para hacer que la luz siempre apunte a el
    const objetivo = new THREE.Object3D();
    objetivo.position.set(5, 0, 0); 
    grupoFoco.add(objetivo); 
    luz.target = objetivo;   
    //  la luz produce sombras
    luz.castShadow = true; 
    luz.shadow.mapSize.width = 1024;
    luz.shadow.mapSize.height = 1024;

    grupoFoco.add(luz);

    return grupoFoco;
}
//funcion init() crea la mayor parte de la excavadora, crea luces de la escena y fija la posicion de la camara
function init() {
    //Lo primero que hacemos es gestionar los eventos de las teclas, esto nos permitira mover la excavadora
    document.addEventListener("keydown", onDocumentKeyDown, false);
    document.addEventListener("keyup", onDocumentKeyUp, false);
    //presionar la tecla
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if (keyCode == 37) { 
            giroIzquierda = true;
        } else if (keyCode == 39) { 
            giroDerecha = true;
        }if (keyCode == 38) { 
        moverOrugaDerecha = true;
        }else if (keyCode == 40) { 
        moverOrugaIzquierda = true;
        }
        if(keyCode==16){
            haciaAtras=true;
        }
        if (keyCode == 87) { brazoSubir = true; }       
        else if (keyCode == 83) { brazoBajar = true; }  
        if (keyCode == 68) { antebrazoSubir = true; }   
        else if (keyCode == 65) { antebrazoBajar = true; } 
        if (keyCode == 88) { cazoSubir = true; }   
        else if (keyCode == 67) { cazoBajar = true; } 
    }
    //dejar de presionar la tecla
    function onDocumentKeyUp(event) {
        var keyCode = event.which;
        if (keyCode == 37) {
            giroIzquierda = false;
        } else if (keyCode == 39) {
            giroDerecha = false;
        }if (keyCode == 38) { 
        moverOrugaDerecha = false;
        }else if (keyCode == 40) { 
        moverOrugaIzquierda = false;
        }
        if(keyCode==16){
            haciaAtras=false;
        }
        if (keyCode == 87) { brazoSubir = false; }       
        else if (keyCode == 83) { brazoBajar = false; }  
        if (keyCode == 68) { antebrazoSubir = false; }   
        else if (keyCode == 65) { antebrazoBajar = false; } 
        if (keyCode == 88) { cazoSubir = false; }   
        else if (keyCode == 67) { cazoBajar = false; } 
        if (keyCode == 76) { 
            lucesEncendidas = !lucesEncendidas; //esto esta solo en esta funcion porque va alternando a diferencia del resto que se hacen mientras se pulsa la tecla

            if (lucesEncendidas) {
                //encendemos las luces
                listaLuces.forEach(luz => luz.intensity = 5); 
                
                //avivamos los colores de los material que estan entorno a los focos para contribuir a ese efecto de luz encendida
                listaMatFocos.forEach(mat => mat.color.setHex(0xffffff)); 
                listaMatFrenos.forEach(mat => mat.color.setHex(0xff0000)); 
            } else {
                // se apagan las luces
                listaLuces.forEach(luz => luz.intensity = 0);
                
                //se oscurecen los materiales que las envuelven para dar ese efecto de luz apagada
                listaMatFocos.forEach(mat => mat.color.setHex(0x333333));
                listaMatFrenos.forEach(mat => mat.color.setHex(0x330000)); 
            }
        }
    }
     scene = new THREE.Scene();
     camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
     renderer = new THREE.WebGLRenderer();
     //empleamos OrbitControls, esto permite:
     //mover escena con click izquierdo del raton
     //mover modelo con click derecho
     //hacer zoom con la rueda del raton
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    const colorFondo = 0xa0a0a0; 
    scene.background = new THREE.Color(colorFondo);
    
    //efecto niebla
    /*
    Dado que el plano del suelo no es infinito he decidido recurrir a un truco que utilizaban los videojuegos anteriormente
    que es la niebla, de esta manera no se ven los bordes del plano
    */
    scene.fog = new THREE.Fog(colorFondo, 10, 60);

    //Se carga la textura del suelo (cesped)
    const texturaSuelo = textureLoader.load('https://raw.githubusercontent.com/Azael-uva/practica3_pag/main/grasslight-big.jpg');
    texturaSuelo.wrapS = THREE.RepeatWrapping;
    texturaSuelo.wrapT = THREE.RepeatWrapping;
    texturaSuelo.repeat.set(20, 20); // como el plano suelo es grande hay que repetirla muchas veces
    const matSuelo = new THREE.MeshStandardMaterial({ 
        map: texturaSuelo,
        roughness: 1, 
        metalness: 0
    });

    // se crea el plano del suelo
    const geoSuelo = new THREE.PlaneGeometry(100, 100);
    const suelo = new THREE.Mesh(geoSuelo, matSuelo);
    suelo.rotation.x = -Math.PI / 2; 
    suelo.receiveShadow = true; //para que se vean las sombras de la excavadora
    scene.add(suelo);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    //Creacion de la excavadora
    /**
     * Para que la excavadora se mueva correctamente es importante definir bien una jerarquia de los componentes
     * En mi caso:
     * baseExcavadora->cabinaExcavadora->grupoBrazo->grupoAntebrazo->grupoCazo
     * 
     */
    //BASE DE LA EXCAVADORA (orugas+soporte de la cabina)
    baseExcavadora = new THREE.Group();
    baseExcavadora.position.set(0,0.55,0);//la elevo un poco para que este por encima del suelo
    var rectanguloBase=new THREE.BoxGeometry(3.5,0.3,2.2);
    var rectanguloBaseMaterial = matNegro;
    rectanguloBaseExcavadora=new THREE.Mesh(rectanguloBase,rectanguloBaseMaterial);
    baseExcavadora.add(rectanguloBaseExcavadora);
    var cilindroBase=new THREE.CylinderGeometry(0.9,0.6,0.7,32);
    var cilindroBaseMaterial= matNegro;
    cilindroBaseExcavadora=new THREE.Mesh(cilindroBase,cilindroBaseMaterial);
    cilindroBaseExcavadora.position.y=0.15+0.35;
    baseExcavadora.add(cilindroBaseExcavadora);
    //detalles de las orugas (ruedas y rectangulos que las unen)
    var rectanguloOrugaDerecha=new THREE.BoxGeometry(3.65,0.470,0.1);
    var rectanguloOrugaDerechaMaterial=matNegro;
    rectanguloOrugaDerechaExcavadora=new THREE.Mesh(rectanguloOrugaDerecha,rectanguloOrugaDerechaMaterial);
    rectanguloOrugaDerechaExcavadora.position.z=1.585;
    baseExcavadora.add(rectanguloOrugaDerechaExcavadora);
    rectanguloOrugaIzquierdaExcavadora=new THREE.Mesh(rectanguloOrugaDerecha,rectanguloOrugaDerechaMaterial);
    rectanguloOrugaIzquierdaExcavadora.position.z=-1.585;
    baseExcavadora.add(rectanguloOrugaIzquierdaExcavadora);
    rectanguloOrugaIzquierdaExcavadoraInterno=new THREE.Mesh(rectanguloOrugaDerecha,rectanguloOrugaDerechaMaterial);
    rectanguloOrugaIzquierdaExcavadoraInterno.position.z=-1.19;
    baseExcavadora.add(rectanguloOrugaIzquierdaExcavadoraInterno);
    rectanguloOrugaDerechaExcavadoraInterno=new THREE.Mesh(rectanguloOrugaDerecha,rectanguloOrugaDerechaMaterial);
    rectanguloOrugaDerechaExcavadoraInterno.position.z=1.19;
    baseExcavadora.add(rectanguloOrugaDerechaExcavadoraInterno);
    var ruedaOruga=new THREE.CylinderGeometry(0.470,0.470,0.4,32);
    var ruedaOrugaMaterial=matMetal;
    ruedaOrugaDerechaDelantera=new THREE.Mesh(ruedaOruga,ruedaOrugaMaterial);
    ruedaOrugaDerechaDelantera.rotation.x=Math.PI/2;
    ruedaOrugaDerechaDelantera.position.x=1.825;
    ruedaOrugaDerechaDelantera.position.z=1.385;
    baseExcavadora.add(ruedaOrugaDerechaDelantera);
    ruedaOrugaIzquierdaDelantera=new THREE.Mesh(ruedaOruga,ruedaOrugaMaterial);
    ruedaOrugaIzquierdaDelantera.rotation.x=Math.PI/2;
    ruedaOrugaIzquierdaDelantera.position.x=1.825;
    ruedaOrugaIzquierdaDelantera.position.z=-1.385;
    baseExcavadora.add(ruedaOrugaIzquierdaDelantera);
    ruedaOrugaIzquierdaTrasera=new THREE.Mesh(ruedaOruga,ruedaOrugaMaterial);
    ruedaOrugaIzquierdaTrasera.rotation.x=Math.PI/2;
    ruedaOrugaIzquierdaTrasera.position.x=-1.825;
    ruedaOrugaIzquierdaTrasera.position.z=-1.385;
    baseExcavadora.add(ruedaOrugaIzquierdaTrasera);
    ruedaOrugaDerechaTrasera=new THREE.Mesh(ruedaOruga,ruedaOrugaMaterial);
    ruedaOrugaDerechaTrasera.rotation.x=Math.PI/2;
    ruedaOrugaDerechaTrasera.position.x=-1.825;
    ruedaOrugaDerechaTrasera.position.z=1.385;
    baseExcavadora.add(ruedaOrugaDerechaTrasera);
    orugaDerecha=crearOruga(texOrugaDer);
    orugaDerecha.position.x=-1.825;
    orugaDerecha.position.z=0.99;
    baseExcavadora.add(orugaDerecha);
    orugaIzquierda=crearOruga(texOrugaIzq);
    orugaIzquierda.position.x=-1.825;
    orugaIzquierda.position.z=-1.78;
    baseExcavadora.add(orugaIzquierda);

    //CABINA DE LA EXCABADORA (cabina de cristal+contrapeso de la excavadora)
    cabinaExcavadora=new THREE.Group();
    //Empezamos creando una base formada por varios cubos
    var baseCabinaRectangulo=new THREE.BoxGeometry(3.85,0.05,2.78);
    var baseCabinaRectanguloMaterial=materialTexturaAmarilloCabina(5,5);
    baseCabina=new THREE.Mesh(baseCabinaRectangulo,baseCabinaRectanguloMaterial);
    baseCabina.position.x=0.2
    cabinaExcavadora.add(baseCabina);
    //3 rectangulos forman la base, ya que el del medio tiene que dejar sitio para el brazo
    rectanguloCabina=new THREE.BoxGeometry(3.85,0.2,0.89);
    rectanguloCabina1=new THREE.Mesh(rectanguloCabina,materialTexturaAmarilloCabina(3,1));
    rectanguloCabina1.position.y=0.025+0.1;
    rectanguloCabina1.position.z=0.945;
    rectanguloCabina1.position.x=0.2;
    cabinaExcavadora.add(rectanguloCabina1);
    rectanguloCabina2=new THREE.Mesh(rectanguloCabina,materialTexturaAmarilloCabina(3,1));
    rectanguloCabina2.position.y=0.025+0.1;
    rectanguloCabina2.position.z=-0.945;
    rectanguloCabina2.position.x=0.2;
    cabinaExcavadora.add(rectanguloCabina2);
    rectanguloCabinaCentro=new THREE.BoxGeometry(3.85,0.2,1);
    rectanguloCabinaCentroExcavadora=new THREE.Mesh(rectanguloCabinaCentro,materialTexturaAmarilloCabina(3,1));
    rectanguloCabinaCentroExcavadora.position.y=0.025+0.1;
    rectanguloCabinaCentroExcavadora.position.x=0.2;
    cabinaExcavadora.add(rectanguloCabinaCentroExcavadora);
    //Caja en la que van las rejillas del motor
    rectanguloParteAtrasCabina=new THREE.Mesh(new THREE.BoxGeometry(0.7,1.40,2.78),materialTexturaAmarilloCabina(2,2));
    rectanguloParteAtrasCabina.position.y=0.925;
    rectanguloParteAtrasCabina.position.x=-1.375;
    cabinaExcavadora.add(rectanguloParteAtrasCabina);
    //parte de atras es medio cilindro
    cilindroParteAtrasCabina=new THREE.Mesh(new THREE.CylinderGeometry(1.39,1.39,1.65,32,1,false,Math.PI,Math.PI),materialTexturaAmarilloCabina(3,3));
    cilindroParteAtrasCabina.position.y=0.8;
    cilindroParteAtrasCabina.position.x=-1.725;
    cabinaExcavadora.add(cilindroParteAtrasCabina);
    //Creamos un cilindro con un radio ligeramente mayor para que sobresalga un poco (en el van las bandas de peligro)
    matHazard=new THREE.MeshStandardMaterial({ 
    map: texturaHazardLines,
    });
    cilindroParteAtrasCabinaInferior=new THREE.Mesh(new THREE.CylinderGeometry(1.41,1.41,0.16,32,1,false,Math.PI,Math.PI),matHazard);
    cilindroParteAtrasCabinaInferior.position.y=0.06;
    cilindroParteAtrasCabinaInferior.position.x=-1.725;
    cabinaExcavadora.add(cilindroParteAtrasCabinaInferior);
    //caja para rellenar parte del contrapeso
    rectanguloCabinaIzquierda=new THREE.Mesh(new THREE.BoxGeometry(1,1.40,0.89),materialTexturaAmarilloCabina(1,1));
    rectanguloCabinaIzquierda.position.y=0.925;
    rectanguloCabinaIzquierda.position.x=-0.525;
    rectanguloCabinaIzquierda.position.z=-0.945;
    cabinaExcavadora.add(rectanguloCabinaIzquierda);
    //Creamos la forma que se encuentra justo detras de la cabina (usamos ExtrudeGeometry para poder crear la forma que queremos (rampa))
    const rampaIzquierda=new THREE.Shape();
    rampaIzquierda.moveTo(-0.5,-0.7);
    rampaIzquierda.lineTo(0.5,-0.7);
    rampaIzquierda.lineTo(0.0,0.7);
    rampaIzquierda.lineTo(-0.5,0.7);
    rampaIzquierda.lineTo(-0.5,-0.7);
    const extrudeSettingsRampa={
        depth: 0.89,
        bevelEnabled: false
    };
    rampaIquierdaCabina=new THREE.Mesh(new THREE.ExtrudeGeometry(rampaIzquierda,extrudeSettingsRampa),materialTexturaAmarilloCabina(1,1));
    rampaIquierdaCabina.position.y=0.925;
    rampaIquierdaCabina.position.x=0.475;
    rampaIquierdaCabina.position.z=-1.39;
    cabinaExcavadora.add(rampaIquierdaCabina);
    //implementamos los detalles de la rejilla de ventilacion del motor
    const rejillaMotor=new THREE.Mesh(new THREE.PlaneGeometry(0.5,1.0),materialRejilla);
    rejillaMotor.position.set(-1.375,0.925,-1.3905);
    cabinaExcavadora.add(rejillaMotor);
    //justo por debajo ponemos un material mas oscuro para dar efecto de que es el interior (de no ponerlo se veria el amarillo de la excavadora)
    const rejillaMotorInterior=new THREE.Mesh(new THREE.PlaneGeometry(0.5,1.0),materialInteriorRejilla);
    rejillaMotorInterior.position.set(-1.375,0.925,-1.3904);
    cabinaExcavadora.add(rejillaMotorInterior);
    const rejillaMotorDerecha=new THREE.Mesh(new THREE.PlaneGeometry(0.5,1.0),materialRejilla);
    rejillaMotorDerecha.position.set(-1.375,0.925,1.3905);
    cabinaExcavadora.add(rejillaMotorDerecha);
    const rejillaMotorInteriorDerecha=new THREE.Mesh(new THREE.PlaneGeometry(0.5,1.0),materialInteriorRejilla);
    rejillaMotorInteriorDerecha.position.set(-1.375,0.925,1.3904);
    cabinaExcavadora.add(rejillaMotorInteriorDerecha);
    //Creamos lo que es la porpia cabina, uso ExtrudeGeometry para poder darle formas curvas
    const cabinaCristal= new THREE.Shape();
    cabinaCristal.moveTo(-0.575,-0.9);
    cabinaCristal.lineTo(0.575,-0.9);
    cabinaCristal.lineTo(0.575,0.9);
    cabinaCristal.lineTo(-0.575,0.9);
    cabinaCristal.quadraticCurveTo(-1,1,-1,0.7);
    cabinaCristal.lineTo(-0.575,-0.9);
    const extrudeSettingsCabina={
        depth: 0.89,
        bevelEnabled: false
    };
    cabinaCristalFinal=new THREE.Mesh(new THREE.ExtrudeGeometry(cabinaCristal,extrudeSettingsCabina),materialCristalCabina);
    cabinaCristalFinal.position.set(1.55,1.125,-1.39);
    cabinaExcavadora.add(cabinaCristalFinal);
    //Creamos los marcos de color negro que estan alrededor de la cabina 
    marcoCabinaVertical=new THREE.BoxGeometry(0.1,1.9,0.1);
    marcoCabinaHorizontal=new THREE.BoxGeometry(1.16,0.1,0.1);
    marcoCabinaProfundidad= new THREE.BoxGeometry(0.1,0.1,0.99);
    marcoCabinavertical1=new THREE.Mesh(marcoCabinaVertical, matMarcoCabina);
    marcoCabinavertical1.position.set(2.125,1.125,-0.5)
    cabinaExcavadora.add(marcoCabinavertical1);
    marcoCabinavertical2=new THREE.Mesh(marcoCabinaVertical, matMarcoCabina);
    marcoCabinavertical2.position.set(0.975,1.125,-0.5)
    cabinaExcavadora.add(marcoCabinavertical2);
    marcoCabinavertical3=new THREE.Mesh(marcoCabinaVertical, matMarcoCabina);
    marcoCabinavertical3.position.set(0.975,1.125,-1.39)
    cabinaExcavadora.add(marcoCabinavertical3);
    marcoCabinavertical4=new THREE.Mesh(marcoCabinaVertical, matMarcoCabina);
    marcoCabinavertical4.position.set(2.125,1.125,-1.39)
    cabinaExcavadora.add(marcoCabinavertical4);
    marcoCabinaHorizontal1=new THREE.Mesh(marcoCabinaHorizontal,matMarcoCabina);
    marcoCabinaHorizontal1.position.set(1.55,0.225,-0.5);
    cabinaExcavadora.add(marcoCabinaHorizontal1);
    marcoCabinaHorizontal2=new THREE.Mesh(marcoCabinaHorizontal,matMarcoCabina);
    marcoCabinaHorizontal2.position.set(1.55,2.025,-0.5);
    cabinaExcavadora.add(marcoCabinaHorizontal2);
    marcoCabinaHorizontal3=new THREE.Mesh(marcoCabinaHorizontal,matMarcoCabina);
    marcoCabinaHorizontal3.position.set(1.55,2.025,-1.39);
    cabinaExcavadora.add(marcoCabinaHorizontal3);
    marcoCabinaHorizontal4=new THREE.Mesh(marcoCabinaHorizontal,matMarcoCabina);
    marcoCabinaHorizontal4.position.set(1.55,0.225,-1.39);
    cabinaExcavadora.add(marcoCabinaHorizontal4);
    marcoCabinaProfundidad1= new THREE.Mesh(marcoCabinaProfundidad,matMarcoCabina);
    marcoCabinaProfundidad1.position.set(2.125, 0.225, -0.945);
    cabinaExcavadora.add(marcoCabinaProfundidad1);
    marcoCabinaProfundidad2= new THREE.Mesh(marcoCabinaProfundidad,matMarcoCabina);
    marcoCabinaProfundidad2.position.set(2.125, 2.025, -0.945);
    cabinaExcavadora.add(marcoCabinaProfundidad2);
    marcoCabinaProfundidad3= new THREE.Mesh(marcoCabinaProfundidad,matMarcoCabina);
    marcoCabinaProfundidad3.position.set(0.975, 2.025, -0.945);
    cabinaExcavadora.add(marcoCabinaProfundidad3);
    marcoCabinaProfundidad4= new THREE.Mesh(marcoCabinaProfundidad,matMarcoCabina);
    marcoCabinaProfundidad4.position.set(0.975, 0.225, -0.945);
    cabinaExcavadora.add(marcoCabinaProfundidad4);
    //de nuevo para el marco de la parte curva uso ExtrudeGeometry
    formaMarcoArco=new THREE.Shape();
    formaMarcoArco.moveTo(-0.625,-0.95);
    formaMarcoArco.lineTo(-1.05,0.7);
    formaMarcoArco.quadraticCurveTo(-1.05,1,-0.625,0.95);
    formaMarcoArco.lineTo(-0.625,0.85);
    formaMarcoArco.quadraticCurveTo(-0.95,1,-0.95,0.7);
    formaMarcoArco.lineTo(-0.625,-0.75);
    formaMarcoArco.lineTo(-0.625,-0.95);
    const extrudeSettingsMarcoCabina={
        depth: 0.1,
        bevelEnabled: false
    };
    marcoArco=new THREE.Mesh(new THREE.ExtrudeGeometry(formaMarcoArco,extrudeSettingsMarcoCabina),matMarcoCabina);
    marcoArco.position.set(1.55,1.125,-1.44);
    cabinaExcavadora.add(marcoArco);
    formaMarcoArco2=new THREE.Shape();
    formaMarcoArco2.moveTo(-0.625,-0.95);
    formaMarcoArco2.lineTo(-1.05,0.7);
    formaMarcoArco2.quadraticCurveTo(-1.05,1,-0.625,0.95);
    formaMarcoArco2.lineTo(-0.625,0.85);
    formaMarcoArco2.quadraticCurveTo(-0.95,1,-0.95,0.7);
    formaMarcoArco2.lineTo(-0.625,-0.75);
    formaMarcoArco2.lineTo(-0.625,-0.95);
    const extrudeSettingsMarcoCabina2={
        depth: 0.1,
        bevelEnabled: false
    };
    marcoArco2=new THREE.Mesh(new THREE.ExtrudeGeometry(formaMarcoArco2,extrudeSettingsMarcoCabina2),matMarcoCabina);
    marcoArco2.position.set(1.55,1.125,-0.55);
    cabinaExcavadora.add(marcoArco2);
    //Implementamos algunos detalles
    //Cubo de la parte delantera
    cuboDelanteDerechaCabina=new THREE.Mesh(new THREE.BoxGeometry(0.82,0.6,0.79),materialTexturaAmarilloCabina(1,1));
    cuboDelanteDerechaCabina.position.set(1.55,0.425,0.945);
    cabinaExcavadora.add(cuboDelanteDerechaCabina);
    //Creamos los escalones del contrapeso
    escalonCabina1=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.47,1),materialTexturaAmarilloCabina(1,1));
    escalonCabina1.position.set(0.375,0.46,0);
    cabinaExcavadora.add(escalonCabina1);
    escalonCabina2=new THREE.Mesh(new THREE.BoxGeometry(1,0.94,1),materialTexturaAmarilloCabina(1,1));
    escalonCabina2.position.set(-0.525,0.695,0);
    cabinaExcavadora.add(escalonCabina2);
    escalonCabina3=new THREE.Mesh(new THREE.BoxGeometry(1,1.17,0.89),materialTexturaAmarilloCabina(1,1));
    escalonCabina3.position.set(-0.525,0.81,0.945);
    cabinaExcavadora.add(escalonCabina3);
    //Ahora creamos unos planos que ponemos justo encima de estos escalones para poder poner la textura de suelo antiresbaladizo
    escalonCabina0Relieve=new THREE.Mesh(new THREE.PlaneGeometry(0.8,0.8),materialEscalon);
    escalonCabina0Relieve.rotation.x=-Math.PI/2;
    escalonCabina0Relieve.position.set(0.375,0.226,0.945);
    cabinaExcavadora.add(escalonCabina0Relieve);
    escalonCabina1Relieve=new THREE.Mesh(new THREE.PlaneGeometry(0.8,0.8),materialEscalon);
    escalonCabina1Relieve.rotation.x=-Math.PI/2;
    escalonCabina1Relieve.position.set(0.375,0.696,0);
    cabinaExcavadora.add(escalonCabina1Relieve);
    escalonCabina2Relieve=new THREE.Mesh(new THREE.PlaneGeometry(1,0.8),materialEscalon);
    escalonCabina2Relieve.rotation.x=-Math.PI/2;
    escalonCabina2Relieve.position.set(-0.525,1.166,0);
    cabinaExcavadora.add(escalonCabina2Relieve);
    //detalle parte superior del contrapeso
    rectanguloParteArribaCabina=new THREE.Mesh(new THREE.BoxGeometry(1,0.1,2),matNegro);
    rectanguloParteArribaCabina.position.set(-1.9,1.675,0);
    //Creo el tubo de escape de la excavadora
    //Para ello uso CatmullRomCurve3 que te define el recorrido curvo que quieres seguir y TubeGeometry que crea un tubo a lo largo de ese recorrido
    const recorridoTubo= new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0,0.3,0),
        new THREE.Vector3(-0.15,0.35,0),

    ]);
    tubo=new THREE.Mesh(new THREE.TubeGeometry(recorridoTubo,20,0.05,16,false),matNegroDoble);
    tubo.position.set(-2.15,1.725,0.75);
    cabinaExcavadora.add(tubo);
    cabinaExcavadora.add(rectanguloParteArribaCabina);
    
    //BRAZO ARTICULADO EXCAVADORA
    //tiene tres partes diferenciadas: brazo, antebrazo y cazo
    grupoBrazo=new THREE.Group();
    //empezamos por el brazo
    //de nuevo ExtrudeGeometry para poder crear la forma deseada y no estar limitado a cubos
    const brazo=new THREE.Shape();
    brazo.moveTo(0,0);
    brazo.lineTo(0.2,0);
    brazo.quadraticCurveTo(1,3,2.5,3);
    brazo.lineTo(2.75,3.25);
    brazo.lineTo(2.5,3.5);
    brazo.quadraticCurveTo(0,3,-0.2,0);
    brazo.lineTo(0,0);
    const brazoGeo=new THREE.ExtrudeGeometry(brazo,{depth:0.6,bevelEnabled:false});
    brazoGeo.translate(0.35,-0.5,-0.3);
    const brazoExcavadora=new THREE.Mesh(brazoGeo,materialTexturaAmarilloCabina(2,2));
    grupoBrazo.add(brazoExcavadora);
    //creamos la parte del antebrazo con la forma deseada
    grupoAntebrazo=new THREE.Group();
    const antebrazo = new THREE.Shape();
    antebrazo.moveTo(2.5+0.35,3.25-0.5);         
    antebrazo.lineTo(2.75+0.35, 3.75-0.5); 
    antebrazo.lineTo(3+0.35, 3.25-0.5);   
    antebrazo.lineTo(2.9+0.35, 1-0.5);
    antebrazo.absarc(2.75+0.35,1-0.5,0.15,0,Math.PI,true);   
    antebrazo.lineTo(2.5+0.35, 3.25-0.5);      
    const antebrazoGeo=new THREE.ExtrudeGeometry(antebrazo,{depth:0.4,bevelEnabled: false });
    antebrazoGeo.translate(-2.85,-2.75,-0.2);
    const antebrazoExcavadora=new THREE.Mesh(antebrazoGeo,materialTexturaAmarilloCabina(2,2));
    grupoAntebrazo.add(antebrazoExcavadora);
    grupoAntebrazo.position.set(2.85,2.75,0);
    //Creamos el bulon (union entre antebrazo y cazo)
    const anchoCazoReal = 0.5775;
    const largoPasador = anchoCazoReal + 0.12; 
    const geoBulon = new THREE.CylinderGeometry(0.05, 0.05, largoPasador, 16);
    geoBulon.rotateX(Math.PI / 2); 
    const matBulon = new THREE.MeshStandardMaterial({ 
        color: 0xDDDDDD, 
        roughness: 0.2, 
        metalness: 0.9 
    });

    const bulon = new THREE.Mesh(geoBulon, matBulon);
    bulon.position.set(0.25, -2.25, 0.01);
    //implementamos detalles en los extremos (dos cilindros con un radio un poco mayor)
    const geoTope = new THREE.CylinderGeometry(0.07, 0.07, 0.05, 16);
    geoTope.rotateX(Math.PI / 2);
    
    const topeIzq = new THREE.Mesh(geoTope, matBulon);
    topeIzq.position.z = largoPasador / 2;
    bulon.add(topeIzq);

    const topeDer = new THREE.Mesh(geoTope, matBulon);
    topeDer.position.z = -largoPasador / 2;
    bulon.add(topeDer);

    grupoAntebrazo.add(bulon);
    //Creamos el cazo de la excavadora
    //Para intentar conseguir un forma realista he usado ExtrudeGeometry, los valores concretos se han ido ajustando
    //poco a poco hasta que se ha conseguido la forma deseada
    grupoCazo = new THREE.Group();
    grupoCazo.position.set(0.25, -2.25, 0); 
    grupoCazo.rotation.z = -Math.PI / 4; 
    const formaPared = new THREE.Shape();
    formaPared.moveTo(0, 0);
    formaPared.lineTo(0.275, 0.11);       
    formaPared.bezierCurveTo(0.44, -0.55, 0.275, -0.99, 0, -0.99); 
    formaPared.lineTo(-0.55, -0.88);     
    formaPared.lineTo(-0.44, -0.55);     
    formaPared.quadraticCurveTo(-0.275, -0.11, 0, 0); 
    const extrudePared = { depth: 0.0275, bevelEnabled: false };
    const geoPared = new THREE.ExtrudeGeometry(formaPared, extrudePared);
    const paredIzq = new THREE.Mesh(geoPared, matNegro);
    paredIzq.position.z = 0.385; 
    grupoCazo.add(paredIzq);
    
    const paredDer = new THREE.Mesh(geoPared, matNegro);
    paredDer.position.z = -0.385; 
    grupoCazo.add(paredDer);
    const formaLamina = new THREE.Shape();
    formaLamina.moveTo(0.275, 0.11); 
    formaLamina.bezierCurveTo(0.44, -0.55, 0.275, -0.99, 0, -0.99); 
    formaLamina.lineTo(-0.55, -0.88); 
    const grosor = 0.055;
    formaLamina.lineTo(-0.55 + grosor, -0.88 + grosor); 
    formaLamina.bezierCurveTo(0.275, -0.99 + grosor, 0.44 - grosor, -0.55, 0.22, 0.11);
    formaLamina.lineTo(0.275, 0.11); 
    const extrudeLamina = { depth: 0.77, bevelEnabled: false,curveSegments: 32 }; 
    const geoLamina = new THREE.ExtrudeGeometry(formaLamina, extrudeLamina);
    geoLamina.translate(0, 0, -0.385); 
    const lamina = new THREE.Mesh(geoLamina, matNegro);
    grupoCazo.add(lamina);

    //Por ultimo creamos los tipicos dientes que tienen las excavadoras en el cazo
    //Como todos son iguales nos ayudamos de un bucle
    const geoDiente = new THREE.ConeGeometry(0.044, 0.22, 4);
    const matDiente = new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.5, metalness: 0.8 });
    
    for(let i=0; i<4; i++) {
        const diente = new THREE.Mesh(geoDiente, matDiente);
        diente.rotation.z = Math.PI / 1.3; 
        const zPos = -0.1925 + (i * 0.385 / 3);
        diente.position.set(-0.55, -0.88, zPos); 
        grupoCazo.add(diente);
    }
    
    grupoAntebrazo.add(grupoCazo);
    grupoBrazo.add(grupoAntebrazo);
    grupoBrazo.position.set(1.25,0.6,0);
    cabinaExcavadora.add(grupoBrazo);
    //Creamos un cilindro y una esfera que serviran de union entre el brazo y la cabina
    cilindroBrazoCabina=new THREE.Mesh(new THREE.CylinderGeometry(0.46,0.46,0.3,32),materialTexturaAmarilloCabina(1,1));
    cilindroBrazoCabina.position.set(1.67,0.15,0);
    cabinaExcavadora.add(cilindroBrazoCabina);
    esferaCabina=new THREE.Mesh(new THREE.SphereGeometry(0.46,32,32,0,2*Math.PI,0,Math.PI*0.5),materialTexturaAmarilloCabina(1,1));
    esferaCabina.position.set(1.67,0.3,0);
    cabinaExcavadora.add(esferaCabina);
    //Implementamos los focos de la parte delantera de la excavadora
    const focoDerecho = crearFocoExcavadora();
    focoDerecho.position.set(2.17, 2.17, -0.65); 
    cabinaExcavadora.add(focoDerecho);
    const focoIzquierdo = crearFocoExcavadora();
    focoIzquierdo.position.set(2.17, 2.17, -1.25); 
    cabinaExcavadora.add(focoIzquierdo);
    //Ahora creamos la sirena que se encuentra en el contrapeso de la excavadora
    const grupoSirena = new THREE.Group();
    grupoSirena.position.set(-1.75, 1.75, -0.75); 
    
    const geoBaseSirena = new THREE.CylinderGeometry(0.1, 0.12, 0.05, 16);
    const matBaseSirena = new THREE.MeshStandardMaterial({ color: 0x111111 });
    const baseSirena = new THREE.Mesh(geoBaseSirena, matBaseSirena);
    grupoSirena.add(baseSirena);

  //Creo un "reflector" que gira dentro de la sirena para que sea mas realista
    const geoReflector = new THREE.BoxGeometry(0.08, 0.12, 0.02);
    const matReflector = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
    reflectorSirena = new THREE.Mesh(geoReflector, matReflector);
    reflectorSirena.position.y = 0.1; 
    grupoSirena.add(reflectorSirena); 
    const geoCristalSirena = new THREE.CylinderGeometry(0.09, 0.09, 0.16, 16);
    const matCristalSirena = new THREE.MeshBasicMaterial({ 
        color: 0xff6600,
        transparent: true, 
        opacity: 0.6,
        side: THREE.DoubleSide
    });
    const cristalSirena = new THREE.Mesh(geoCristalSirena, matCristalSirena);
    cristalSirena.position.y = 0.1;
    grupoSirena.add(cristalSirena);

    //Creamos la luz de la sirena, es importante que sea Spotlight para conseguir ese efecto faro
    const luzGiro = new THREE.SpotLight(0xff6600, 5, 10, 0.5, 0.5, 1);
    luzGiro.position.set(0, 0, 0); // En el centro del reflector
    
    // Al igual que hice con los focos creo un objeto invisible para apuntar la luz hacia el
    const objetivoLuzGiro = new THREE.Object3D();
    objetivoLuzGiro.position.set(5, 0, 0); 
    luzGiro.target = objetivoLuzGiro;

    reflectorSirena.add(luzGiro);
    reflectorSirena.add(objetivoLuzGiro);
    //copio esta luz para que la sirena refleje tambien hacia atras (en teoria el reflector de una sirena reflaja en las dos direcciones)
    const luzGiro2 = luzGiro.clone();
    const objetivoLuzGiro2 = new THREE.Object3D();
    objetivoLuzGiro2.position.set(-5, 0, 0); 
    luzGiro2.target = objetivoLuzGiro2;
    reflectorSirena.add(luzGiro2);
    reflectorSirena.add(objetivoLuzGiro2);
    cabinaExcavadora.add(grupoSirena);

    //A continuacion creamos las luces de freno de la excavadora
    //Definimos las dimensiones que van a tener
    const centroCilindroX = -1.725;
    const radioCilindro = 1.39; 
    const alturaLuces = 0.5;
    const geoLuzFreno = new THREE.BoxGeometry(0.15, 0.15, 0.05); 
    const matLuzFreno = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    listaMatFrenos.push(matLuzFreno);
    //La parte difil de estas luces es que se encuentran en una superficie curva
    //con ayuda de esta funcion se crea para que se ajuste a esta forma (usando coordenadas polares para que sea mas facil)
    //el parametro angulo permite controlar la dimesnion de la luz a lo largo de la curva
    function crearLuzEnCurva(angulo) {
        const luzMesh = new THREE.Mesh(geoLuzFreno, matLuzFreno);
        const posX = centroCilindroX + (radioCilindro * Math.cos(angulo));
        const posZ = (radioCilindro * Math.sin(angulo));
        luzMesh.position.set(posX, alturaLuces, posZ);
        luzMesh.lookAt(centroCilindroX, alturaLuces, 0);
        luzMesh.rotateY(Math.PI);
        const luzRoja = new THREE.PointLight(0xff0000, 5, 2);
        listaLuces.push(luzRoja);
        luzRoja.position.set(0, 0, 0.1);
        luzMesh.add(luzRoja);
        return luzMesh;
    }


    const anguloApertura = 0.65; 
    const frenoIzq = crearLuzEnCurva(Math.PI + anguloApertura); 
    cabinaExcavadora.add(frenoIzq);
    const frenoDer = crearLuzEnCurva(Math.PI - anguloApertura); 
    cabinaExcavadora.add(frenoDer);
    cabinaExcavadora.position.y=0.85;
    baseExcavadora.add(cabinaExcavadora); 
    //Finalmente tenemos que activar que los objetos reciban y den sombras
    //Para evitar tener que ir objeto a objeto activando esto, se puede hacer de la
    //siguiente manera, gracias a la jerarquia que tenemos y traverse que hace que se aplique a todos los hijos
    //se puede ver que la condicion para activarlo es que el objeto no sea transparente, ya que de serlo tiene que atravesar la luz
    baseExcavadora.traverse(function(object){
        if(object.isMesh && !object.material.transparent){
            object.castShadow=true;
            object.receiveShadow=true;
        }
    });
    scene.add(baseExcavadora);

    //Fijo la posicion inicial de la camara
    camera.position.x = -14;
    camera.position.y = 10;
    camera.position.z = 0;
    camera.lookAt(scene.position);

    //Finalmente implementamos algunas luces generales para la escena
    //Luz ambiente (realmente al usar HemisphereLight no seria necesaria pero la pongo para cumplir requisitos minimos)
    const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(luzAmbiente);
    //HemisphereLight es como la luz ambiente, pero permite dar toques mas realistas al poder marcar una luz que viene del "cielo" y otra del "suelo"
    const hemiLight = new THREE.HemisphereLight(0xB1E1FF, 0x222222, 0.6);
    scene.add(hemiLight);
    //Por ultimo spotlight para crear una especia de sol
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 20, -10);
    spotLight.castShadow = true;
    spotLight.shadow.normalBias = 0.05; //para evitar problemas con objetos que estan muy juntos
    spotLight.shadow.mapSize.width = 2048; 
    spotLight.shadow.mapSize.height = 2048;
    scene.add(spotLight);
    

    document.getElementById("contenedor").appendChild(renderer.domElement);

    step = 0;
    renderScene();
}
/**
funcion DesplazamientoExcavadora(velocidad,velocidadGiro)
Esta funcion permite hacer el movimiento de la excavadora (adelante, atras y giros)
Ademas actualiza la posicion de las texturas de las orugas para este efecto de movimiento
velocidad controla la velocidad alante/atras
velocidadGiro la velocidad de giro
Intenta replicar el movimiento real de una excavadora de la siguiente manera:
-si se mueven las dos orugas el movimiento es hacia delante o hacia atras
-si se mueve solo una es un movimiento de giro
 */
function DesplazamientoExcavadora(velocidad,velocidadGiro){
    if(!haciaAtras){
    if (moverOrugaDerecha && moverOrugaIzquierda) {
        baseExcavadora.translateX(velocidad);
        
        texOrugaDer.offset.x -= velocidad; 
        texOrugaIzq.offset.x -= velocidad;
    }
    else if (moverOrugaDerecha) {
        baseExcavadora.rotation.y += velocidadGiro;
        baseExcavadora.translateX(velocidad * 0.5);
        texOrugaDer.offset.x -= velocidad;
    }
    else if (moverOrugaIzquierda) {
        baseExcavadora.rotation.y -= velocidadGiro;
        baseExcavadora.translateX(velocidad * 0.5);
        texOrugaIzq.offset.x -= velocidad;
    }
    }else{
        velocidad*=-1;
        velocidadGiro*=-1;
        if (moverOrugaDerecha && moverOrugaIzquierda) {
        baseExcavadora.translateX(velocidad);
        
        texOrugaDer.offset.x -= velocidad; 
        texOrugaIzq.offset.x -= velocidad;
    }
    else if (moverOrugaDerecha) {
        baseExcavadora.rotation.y += velocidadGiro;
        baseExcavadora.translateX(velocidad * 0.5);
        texOrugaDer.offset.x -= velocidad;
    }
    else if (moverOrugaIzquierda) {
        baseExcavadora.rotation.y -= velocidadGiro;
        baseExcavadora.translateX(velocidad * 0.5);
        texOrugaIzq.offset.x -= velocidad;
    }
    }
}

    function renderScene() {

        controls.update(); //actualizar posicion de la camara
        //Aqui es donde realmente se consigue que se mueva la excavadora
        //Giro de la cabina
        if (cabinaExcavadora) {
        if (giroIzquierda) {
            cabinaExcavadora.rotation.y += 0.02; 
        }
        if (giroDerecha) {
            cabinaExcavadora.rotation.y -= 0.02;
        }
        }
        //Movimiento excavadora
        const velocidad = 0.05; 
        const velocidadGiro = 0.02;
        DesplazamientoExcavadora(velocidad,velocidadGiro);
        //Movimiento del brazo
        //Definos limites 0.5 y -0.3 para que tenga un rango de movimiento realista
        if (grupoBrazo) {
            if (brazoSubir) {
                if (grupoBrazo.rotation.z < 0.5) grupoBrazo.rotation.z += 0.02;
            }
            if (brazoBajar) {
                if (grupoBrazo.rotation.z > -0.3) grupoBrazo.rotation.z -= 0.02;
            }
        }

        //Movimiento del antebrazo
        //en este caso fijo los limites entre 1.5 y 0.2
        if (grupoAntebrazo) {
            if (antebrazoSubir) { 
                if (grupoAntebrazo.rotation.z < 1.5) grupoAntebrazo.rotation.z += 0.02;
            }
            if (antebrazoBajar) {
                if (grupoAntebrazo.rotation.z > 0.2) grupoAntebrazo.rotation.z -= 0.02;
            }
        }

        //Movimineto del cazo
        //En este caso limites entre 0.4 y -1.0
        if (grupoCazo) {
            if (cazoSubir) { 
                if (grupoCazo.rotation.z < 0.4) grupoCazo.rotation.z += 0.02;
            }
            if (cazoBajar) { 
                if (grupoCazo.rotation.z > -1.0) grupoCazo.rotation.z -= 0.02;
            }
        }
        //El movimiento de la sirena de la excavadora
        if (reflectorSirena) {
            reflectorSirena.rotation.y += 0.05; 
        }
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }
    
