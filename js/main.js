//Con query selector se selcciona un elemento del html sin necesidad de class o id, se coje por la etiqueta del elemento
const canvas = document.querySelector("canvas");

//Generamos un contexto, pudiendo ser de 2d y 3d, en este casi sera 2d
const ctx = canvas.getContext("2d");

//creamos constante width y height, ancho y largo, lo igualamos al que tiene el canvas en el html
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomRGB = () => {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
};

//Implementacion de una clase (En el examen se pone en otra clase seguro)
class Ball {
  //La bola consta de una posicion en el eje x, una en el eje y, una velocidad en x y una velocidad en y, un metodo para generar el color y un tamaño
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    //Metodo que inicia una nueva ruta para iniciar una figura. Metodo propio de canvas, de contexto 2d
    ctx.beginPath();
    //Añadimos el color al estilo
    ctx.fillStyle = this.color;
    //Metodo propio de canvas que define cada bola
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    //Metodo que rellenara la bola con el color seleccionado
    ctx.fill();
  }

  update() {
    //Este metodo tendra 4 condiciones, 4 ifs, hay que tener en cuenta lo que sucedera vertical y horizontalmente
    //Si hay colision en el borde derecho
    if (this.x + this.size >= width) {
      //En el caso de una colision horizontal en la ue hay que tener en cuenta tanto el tamaño de la bola como de la posicion horizontal hay que generar un choque. Para ello cambiamos el signo del sentido de la velocidad.
      this.velX = -Math.abs(this.velX); //this.velX = -this.velX
    }

    //Verifica si la posicion x de la pelota menos su tamaño es menor o igual a 0
    if (this.x - this.size <= 0) {
      //Si hay colision con el borde izquierdo se invierte la direccion horizontal
      this.velX = Math.abs(this.velX);
    }

    //Estos controlaran la posicion Y y la velocidad en el campo vertical
    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    //A medida que se va moviendo la bola hay que actualizar su valor con su nuevo valor debido al movimiento. Actualizaremos las coordenadas de la bola en funcion de las velocidades actuales
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    //Metodo que recorre el array de balls y detectará cuando chocan unas bolas con otras
    //for of que se parece al foreach, tratando cada elemento ball dentro de balls
    for (const ball of balls) {
      //Verificamos si la pelota actual no es la misma que la pelota de la iteracion
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
      }

      //Metodo posiblemente cambiado en el examen
      //Metodo de colision detectada
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.size + ball.size) {
        ball.color = this.color = randomRGB();
      }
    }
  }
}

const balls = [];

while (balls.length < 25) {
    const size = random(10,20);
    const ball = new Ball(
        //Generar la posicion en x de forma aleatoria para esta bola en nuestro lienzo, toda esta linea es el valor x del objeto
        random(0 + size, width - size),
        //Posicion y
        random(0 + size, height - size),
        //Velocidad x (Se establece aleatoriamente entre -7 y 7)
        random(-7,7),
        //Velociad y (Se establece aleatoriamente entre -7 y 7)
        random(-7,7),
        //color
        randomRGB(),
        //size
        size
    );

    balls.push(ball);

    /*
    const x = random(0 + size, width - size);
    const y = random(0 + size, height - size);
    const velx = random(-7,7);
    const vely = random(-7,7);
    const color = randomRGB;
    const size = random(10,20);

    const ball = new Ball(x,y,velx,vely,color,size);*/
}

//QUiza va en otro archivo
//Funcion que define el bucle principal del programacion
const loop = () => {
    //Asi añadimos el color al contexto, un fondo negro semitransparente
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    //Definimos el tamaño del contexto
    ctx.fillRect(0, 0, width, height);

    //bucle que dibuja las bolas en el contexto
    for(const ball of balls){
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }

    //Metodo propio parecido al addeventlistener pero aplicado a un contexto de canvas en 2d
    requestAnimationFrame(loop);
};

loop();

