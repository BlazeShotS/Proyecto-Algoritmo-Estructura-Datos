class Node {
    constructor(trackUrl, trackName) {//inicializar un objeto con la url y el nombre
        this.trackUrl = trackUrl;
        this.trackName = trackName; 
        this.anterior = null;   /*Referencia al Nodo anterior*/  
        this.siguiente = null;   /*Referencia al Nodo siguiente*/  
    }
}

// Clase para representar la lista enlazada doblemente circular
class ListaDobleCircular {
    constructor() { /*El constructor se llama cuando creamos una nueva lista*/
        this.primer = null;/*Apunta al primer nodo de la lista, inicialmente nulo*/
        this.ultimo = null;/*Apunta al ultimo nodo de la lista, inicialmente nulo*/
        this.size = 0; /*Guarda el tamaño actual de la lista , lo cual inicialmente esta vacia*/
        //preparandolo para agregar nodos y manipular correctamente
    }

    //ESTABLECEMOS LA PARTE LOGICA
    // Método para agregar un nuevo nodo al final de la lista
    add(trackUrl, trackName) {//maneja la logica de agregar un nuevo nodo al final de la lista , ya sea si la lista esta vacia o no
        const nuevoNodo = new Node(trackUrl, trackName);/*Creacion de un nuevo nodo con la url y nombre*/
        if (!this.primer) {// comprobamos Si la lista está vacía, el nuevo nodo se convierte en el único nodo de la lista.
            this.primer = nuevoNodo;// El nuevo nodo se convierte en el primer nodo
            this.ultimo = nuevoNodo;// El nuevo nodo también se convierte en el último nodo
            nuevoNodo.siguiente = nuevoNodo; // El nuevo nodo apunta a sí mismo como el siguiente nodo
            nuevoNodo.anterior = nuevoNodo;// El nuevo nodo apunta a sí mismo como el nodo anterior
        } else {
            // Si la lista ya tiene nodos, se agrega el nuevo nodo al final de la lista y se actualiza la referencia.
            nuevoNodo.anterior = this.ultimo;// El nuevo nodo apunta al nodo que actualmente era último nodo
            nuevoNodo.siguiente = this.primer;// El nuevo nodo apunta al primer nodo
            this.ultimo.siguiente = nuevoNodo;// El nodo que actualmente es el último nodo apunta al nuevo nodo
            this.primer.anterior = nuevoNodo;// El primer nodo apunta al nuevo nodo como el anterior
            this.ultimo = nuevoNodo;// El nuevo nodo se convierte en el último nodo
        }
        this.size++; /*Cada que se agrega un nuevo nodo ,  se incrementa 1 para reflejar el nuevo tamaño de la lista*/
    }


    //ESTABLECEMOS LA FUNCIONALIDAD
    // Método para avanzar al siguiente nodo en la lista
    SiguienteNodo() {    
        if (this.primer) {/*Si la lista no esta vacia */
            this.primer = this.primer.siguiente;//Mueve el puntero 'primer' al siguiente
            this.ultimo = this.ultimo.siguiente;//Mueve el puntero 'ultimo' al siguiente
        }
    }

    // Método para retroceder al nodo anterior en la lista
    AnteriorNodo() { 
        if (this.primer) {
            this.primer = this.primer.anterior;//Mueve el puntero 'primer' al nodo anterior
            this.ultimo = this.ultimo.anterior;//Mueve el puntero 'ultimo' al nodo anterior
        }
    }

    // este metodo devuelve la pista de musica actual,devuelve la url con el nombre de la pista si esta vacio devuelve null
    getCurrentTrack() {
        return this.primer ? { url: this.primer.trackUrl, name: this.primer.trackName } : null;
    }
}

// Crear una lista enlazada doblemente circular en la cual almacenaremos la musica
const playlista = new ListaDobleCircular();
// Agregar pistas de música a la lista
playlista.add("mp3/Avicii - Wake Me Up (Official Video).mp3", "Avicii - Wake Me Up ");
playlista.add("mp3/Martin Garrix feat. Bonn - High On Life (Official Video).mp3", "Martin Garrix - High On Life");
playlista.add("mp3/Avicii - Hey Brother (Lyric).mp3", "Avicii - Hey Brother");
playlista.add("mp3/Calvin Harris - Outside (Official Video) ft. Ellie Goulding.mp3", "Calvin Harris - Outside");
playlista.add("mp3/Experience - Ludovico Einaudi - violin cover by Daniel Jang.mp3", "Experience - Ludovico Einaudi");
playlista.add("mp3/The Black Eyed Peas — I Gotta Feeling [Letra en Español].mp3", "The Black Eyed Peas - I Gotta Feeling");
playlista.add("mp3/Coldplay - Fix You (Official Video).mp3", "Coldplay - Fix You");
playlista.add("mp3/Avicii - Levels.mp3", "Avicii - Levels");
playlista.add("mp3/Coldplay - Yellow (Official Video).mp3", "Coldplay - Yellow");
playlista.add("mp3/The Chainsmokers .mp3", "The Chainsmokers");



// Obtener referencia al reproductor de audio 
const AudioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const NombreActualPista = document.getElementById('NamePistaActual');

// Función para actualizar el nombre de la pista de actual de la musica
function updateCurrentTrack() { 
    const pistaActual = playlista.getCurrentTrack();//El punto indica que accederemos a ese metodo
    if (pistaActual) {
        AudioPlayer.src = pistaActual.url; //se va insertando en el src de audioPlayer
        NombreActualPista.textContent = pistaActual.name;
    }
}

// Función para reproducir o pausar la música
function playPause() {
    if (AudioPlayer.paused) {
        AudioPlayer.play();
        playPauseBtn.textContent = 'Pausa';
    } else {
        AudioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    }
}




// Función para avanzar a la siguiente pista de música
function AdelanteBtn() {
    playlista.SiguienteNodo();
    updateCurrentTrack();/*Nombre actual de la musica*/
    AudioPlayer.play();/*se inserta la cancion*/
    playPauseBtn.textContent = 'Pausa';
}

// Función para retroceder a la pista de música anterior
function AtrasBtn() {
    playlista.AnteriorNodo();
    updateCurrentTrack();
    AudioPlayer.play();
    playPauseBtn.textContent = 'Pausa';
}

audioPlayer.addEventListener('ended', AdelanteBtn);//para cuando termine la cancion automaticamente pase a la siguiente


// Establecer la primera pista como la pista actual del reproductor de audio
updateCurrentTrack();



function ImprimirPagina() {
    var ventanaImpresion = window.open('', '_blank');
    ventanaImpresion.document.write('<html><head><title>Reproductor de Música - Impresión</title></head><body>');
    ventanaImpresion.document.write(document.body.innerHTML);
    ventanaImpresion.document.write('</body></html>');
    ventanaImpresion.print();
    ventanaImpresion.close();
}
