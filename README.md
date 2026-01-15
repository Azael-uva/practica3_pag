# Notas sobre la ejecución y texturas

Para solucionar el problema de la carga de texturas, estan todas subidas a un github para poder cargarlas. Por lo tanto, no hace falta hacer ningún paso previo (más que tener conexión a Internet) para que la práctica funcione. No obstante, al cargar las texturas de la red puede ser que al principio tarde un poco en cargar el modelo.

Las texturas se encuentran aquí:
[https://github.com/Azael-uva/practica3_pag](https://github.com/Azael-uva/practica3_pag)

En este repositorio también se puede encontrar el código y el propio README.
## Bibliotecas utilizadas

* **OrbitControls** ([https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/js/controls/OrbitControls.js](https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/js/controls/OrbitControls.js))
    Esta biblioteca se utiliza para implementar todo lo relacionado con el movimiento de la cámara (movimiento cámara, zoom y movimiento modelo).

* **Three.js** ([https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js](https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js))
    Es la versión de three.js utilizada para crear la excavadora.

Ambas bibliotecas se cargan directamente de Internet, por eso no se incluyen en el zip.

## Controles para el movimiento de la excavadora

El movimiento de la excavadora trata de imitar el movimiento de una excavadora real, es decir, dos palancas, donde cada palanca controla un oruga de la excavadora. Así tenemos:

* **Flecha arriba:** controla la oruga derecha.
* **Flecha abajo:** controla la oruga izquierda.
* **Shift:** marcha atrás.

Así, de esta manera, pulsando solo una de las flechas, la excavadora girará. Pulsando ambas flechas a la vez la excavadora se moverá hacia delante. Pulsando la tecla Shift a la vez, los movimientos serán los mismos pero marcha atrás.

## Controles rotación 360º de la cabina

* **Flecha derecha:** la cabina gira a la derecha.
* **Flecha izquierda:** la cabina gira a la izquierda.

## Controles brazo articulado de la excavadora

* **W:** sube el brazo.
* **S:** baja el brazo.
* **D:** sube el antebrazo.
* **A:** baja el antebrazo.
* **C:** sube cuchara.
* **X:** baja cuchara.

## Controles de las luces

* **L:** enciende/apaga luces de la excavadora.

## Controles de la cámara

* **click izquierdo y arrastrar ratón:** se mueve la cámara por la escena.
* **ruleta del ratón:** zoom de la escena.
* **click derecho y arrastrar ratón:** se desplaza el modelo completo.
