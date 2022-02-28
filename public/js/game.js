var puntos_jugador1 = 0;
var puntos_jugador2 = 0;
var ganadores = new Array();
var Jugador1 = new Array();
var Jugador2 = new Array();
var timer;
var numberOfPlayers = 2;
var jugador_actual = 0;
var move = 0;
var points1 = 0;
var points2 = 0;
var empates = 0;
var tamaño = 3;
var ronda = 0;
var perdidas1 = 0;
var perdidas2 = 0;


function tablero() {
    var div = document.getElementById("game");
    var turno = document.getElementById('Turno');
    var usuario = document.getElementById("jugador1").innerHTML;
    var oponente = localStorage.getItem("Oponente");
    var jugador_oponente = document.getElementById("jugador2");
    jugador_oponente.innerHTML = oponente;
    var tabla = 1;
    numero_jugadas = [];

    while (div.hasChildNodes()) {
        div.removeChild(div.firstChild);
    }

    for (s = 0; s < 3; s++) {
        var row = document.createElement("tr");

        for (r = 0; r < 3; r++) {
            var col = document.createElement("td");
            col.id = tabla;

            var operacion = function (e) {
                if (jugador_actual == 0) {
                    this.innerHTML = "X";
                    Jugador1.push(parseInt(this.id));
                    Jugador1.sort(function (a, b) { return a - b });
                    d('Jugador1').classList.remove('selected');
                    d('Jugador2').classList.add('selected');


                    turno.innerHTML = `<i class="fas fa-fire"></i>` + " Tu Turno: " + usuario;


                }

                else {
                    this.innerHTML = "O";
                    Jugador2.push(parseInt(this.id));
                    Jugador2.sort(function (a, b) { return a - b });
                    d('Jugador1').classList.add('selected');
                    d('Jugador2').classList.remove('selected');
                    turno.innerHTML = `<i class="fas fa-fire"></i>` + "Oponente: " + oponente;



                }

                if (comprobar_ganador()) {
                    if (jugador_actual == 0)
                        perdidas2++,
                            points1++;
                    else
                        perdidas1++;
                    points2++;
                    ronda++;

                    document.getElementById("Jugador1").innerHTML = points1;
                    document.getElementById("Jugador2").innerHTML = points2;
                    document.getElementById("ganada1").innerHTML = points1;
                    document.getElementById("perdidas2").innerHTML = perdidas2;
                    document.getElementById("ganada2").innerHTML = points2;
                    document.getElementById("perdidas1").innerHTML = perdidas1;
                    document.getElementById("ronda1").innerHTML = ronda;
                    document.getElementById("ronda2").innerHTML = ronda;

                    agregar_puntos(oponente, points1, points2)
                    reiniciar();
                    tablero();

                }

                else if (Jugador2.length + Jugador1.length == 9) {
                    empates++;
                    document.getElementById("empates1").innerHTML = empates;

                    document.getElementById("empates2").innerHTML = empates;
                    agregar_puntos(oponente, points1, points2)
                    reiniciar();
                    tablero();
                }
                else {
                    if (jugador_actual == 0)

                        jugador_actual = 1;
                    else
                        jugador_actual = 0;

                    this.removeEventListener('click', arguments.callee);
                }


            };

            col.addEventListener('click', operacion);

            row.appendChild(col);
            tabla++;
        }

        div.appendChild(row);
    }

    respuesta_ganador();
}

function d(id) {
    var el = document.getElementById(id);
    return el;
}


function reiniciar() {
    jugador_actual = 0;
    Jugador1 = new Array();
    Jugador2 = new Array();
    d('Jugador1').classList.add('selected');
    d('Jugador2').classList.remove('selected');

}

function rendirce() {
    points1 = 0;
    points2 = 0;
    document.getElementById("Jugador1").innerHTML = points1;
    document.getElementById("Jugador2").innerHTML = points2;
    tablero();
    reiniciar();
}

function respuesta_ganador() {
    ganadores.push([1, 2, 3]);
    ganadores.push([4, 5, 6]);
    ganadores.push([7, 8, 9]);
    ganadores.push([1, 4, 7]);
    ganadores.push([2, 5, 8]);
    ganadores.push([3, 6, 9]);
    ganadores.push([1, 5, 9]);
    ganadores.push([3, 5, 7]);
}

function comprobar_ganador() {
    // check if current player has a winning hand
    // only stsrt checking when player x has tamaño number of selections
    var victoria = false;
    var jugardor_seleccionado = new Array();

    if (jugador_actual == 0)
        jugardor_seleccionado = Jugador1;
    else
        jugardor_seleccionado = Jugador2;

    if (jugardor_seleccionado.length >= tamaño) {
        // check if any 'ganadores' are also in your selections

        for (i = 0; i < ganadores.length; i++) {
            var veces_gano = ganadores[i];  // winning hand
            var conjunto_encontrado = true;

            for (r = 0; r < veces_gano.length; r++) {

                var encontro_jugada = false;

                // jugadas 
                for (s = 0; s < jugardor_seleccionado.length; s++) {
                    if (veces_gano[r] == jugardor_seleccionado[s]) {
                        encontro_jugada = true;
                        break;
                    }
                }
                // valor no encontrado en la mano del jugador
                // no es un conjunto válido, sigue adelante
                if (encontro_jugada == false) {
                    conjunto_encontrado = false;
                    break;
                }
            }

            if (conjunto_encontrado == true) {
                victoria = true;
                break;
            }
        }
    }

    return victoria;
}

window.addEventListener('load', tablero);

function get_carreras() {
    var lista = [];
    var lista_string = localStorage.getItem("Carrera");
    if (lista_string) {
        lista = JSON.parse(lista_string);
    }

    return lista;
}


function agregar_puntos(jugador, puntos_jugador, puntos_oponente) {
    var arreglo_registros = get_carreras();

    var carrera = {
        jugador: jugador,
        puntos1: puntos_jugador,
        puntos2: puntos_oponente
    }

    arreglo_registros.push(carrera);
    localStorage.setItem("Carrera", JSON.stringify(arreglo_registros))
}


function carreras() {
  
    var cuerpo = document.getElementById("carreras_jugadas");
    cuerpo.innerHTML = "";
    var lista_carreras = get_carreras();
    lista_carreras.forEach(carrera => {
        var fila = document.createElement("tr");
        var celda_nombre = document.createElement("td");
        var celda_jugador1 = document.createElement("td");
        var celda_jugador2 = document.createElement("td");

        celda_nombre.innerHTML = carrera.jugador;
        celda_jugador1.innerHTML = carrera.puntos1;
        celda_jugador2.innerHTML = carrera.puntos2;

        fila.appendChild(celda_nombre);
        fila.appendChild(celda_jugador1);
        fila.appendChild(celda_jugador2);


        cuerpo.appendChild(fila);


    })

}
carreras();