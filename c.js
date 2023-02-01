const tela = document.querySelector(".tela");
let cobra = [];
let direcao = "direita";
let jogo;

const criarComida = () => {
  let comida = document.createElement("div");
  comida.classList.add("comida");
  comida.style.left = `${Math.floor(Math.random() * 20) * 20}px`;
  comida.style.top = `${Math.floor(Math.random() * 20) * 20}px`;
  tela.appendChild(comida);
};

const moverCobra = () => {
  let x = cobra[0].offsetLeft;
  let y = cobra[0].offsetTop;

  switch (direcao) {
    case "direita":
      x += 20;
      break;
    case "esquerda":
      x -= 20;
      break;
    case "cima":
      y -= 20;
      break;
    case "baixo":
      y += 20;
      break;
  }

  cobra.pop();
  let novaParte = document.createElement("div");
  novaParte.classList.add("cobra");
  novaParte.style.left = `${x}px`;
  novaParte.style.top = `${y}px`;
  cobra.unshift(novaParte);
  tela.appendChild(novaParte);

  for (let i = 1; i < cobra.length; i++) {
    if (cobra[0].offsetLeft === cobra[i].offsetLeft && cobra[0].offsetTop === cobra[i].offsetTop) {
      alert("Você perdeu!");
      clearInterval(jogo);
    }
  }

  if (cobra[0].offsetLeft === comida.offsetLeft && cobra[0].offsetTop === comida.offsetTop) {
    tela.removeChild(comida);
    criarComida();
    let novaParte = cobra[cobra.length - 1].cloneNode(true);
    cobra.push(novaParte);
    tela.appendChild(novaParte);
  }
};

const iniciarJogo = () => {
  for (let i = 0; i < 3; i++) {
    let parte = document.createElement("div");
    parte.classList.add("cobra");
    parte.style.left = `${i * 20}px`;
    cobra.push(parte);
    tela.appendChild(parte);
  }

  criarComida();
  jogo = setInterval(moverCobra, 100);

  document.addEventListener("keydown", event => {
    switch (event.key) {
      case "ArrowLeft":
        if (direcao !== "direita") {
          direcao = "esquerda";
        }
        break;
      case "ArrowUp":
        if (direcao !== "baixo") {
          direcao = "cima";
        }
        break;
      case "ArrowRight":
        if (direcao !== "esquerda") {
          direcao = "direita";
        }
        break;
      case "ArrowDown":
        if (direcao !== "cima") {
          direcao = "baixo";
        }
        break;
    }
  });
};

iniciarJogo();
