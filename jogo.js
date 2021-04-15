const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//Personagem Objeto
const flappyBird = 
    {
    spriteX: 0 ,
    spriteY: 0 ,
    largura: 33 ,
    altura: 24,
    x: 10 ,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    atualiza(){
      //Adiciona gravidade relacionada a velocidade de queda
      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
      //Aumenta a velocidae de acordo com propulsão da gravidade 
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
desenhar(){
contexto.drawImage
    (
    sprites, 
    flappyBird.spriteX, flappyBird.spriteY,     //source imag dimensão dX e  dy; Sprite: x e y
    flappyBird.largura,flappyBird.altura,      // source Width e Height tamanho DE RECORTE dos personagens e largura 
    flappyBird.x, flappyBird.y,               // x y Valor refencial em nossa folha de desenho caso Canvas OU SEJA DE ONDE NOSS PERSONAGEM VAI SURGIR 
    flappyBird.largura,flappyBird.altura   // Qual tamanho do personagem no canvas
    );
 }
}

//plano de fundo
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
desenhar() {
      contexto.fillStyle = '#B9DEED';
      contexto.fillRect(0,0, canvas.width, canvas.height)
      contexto.drawImage(
        sprites,
        planoDeFundo.spriteX, planoDeFundo.spriteY,
        planoDeFundo.largura, planoDeFundo.altura,
        planoDeFundo.x, planoDeFundo.y,
        planoDeFundo.largura, planoDeFundo.altura,
      );
      contexto.drawImage(
        sprites,
        planoDeFundo.spriteX, planoDeFundo.spriteY,
        planoDeFundo.largura, planoDeFundo.altura,
        (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
        planoDeFundo.largura, planoDeFundo.altura,
      );
    },
  };

// Gramado
const gramado = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenhar() {
      contexto.drawImage(
        sprites,
        gramado.spriteX, gramado.spriteY,
        gramado.largura, gramado.altura,
        gramado.x, gramado.y,
        gramado.largura, gramado.altura,
      );
      contexto.drawImage(
        sprites,
        gramado.spriteX, gramado.spriteY,
        gramado.largura, gramado.altura,
        (gramado.x + gramado.largura), gramado.y,
        gramado.largura, gramado.altura,
      );
    },
  };

  // [tela de inicio ]
  const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenhar() {
      contexto.drawImage(
        sprites,
        mensagemGetReady.sX,mensagemGetReady.sY,
        mensagemGetReady.w,mensagemGetReady.h,
        mensagemGetReady.x,mensagemGetReady.y,
        mensagemGetReady.w, mensagemGetReady.h
      );
    }
  }

  ///
  /// Telas Objeto guarda todos atributos da tela
  ///
  //saber em qual tela esta´
  let telaAtiva = {
  
  };
  function mudaTela(novaTela){
    telaAtiva = novaTela;
  }
  const Telas = {
    INICIO:{
      desenhar(){
        planoDeFundo.desenhar();
        gramado.desenhar();
        flappyBird.desenhar(); 
        mensagemGetReady.desenhar();
      },click(){
        mudaTela(Telas.JOGO);
      },
      atualiza(){
      } 
    }
  
  };

  Telas.JOGO = {
    desenhar(){
      planoDeFundo.desenhar();
      gramado.desenhar();
      flappyBird.desenhar(); 

    }, 
    atualiza(){
      flappyBird.atualiza();
    }
  };

function looping(){
    telaAtiva.desenhar();
    telaAtiva.atualiza();

    requestAnimationFrame(looping);
}
window.addEventListener('click', function() {
  if(telaAtiva.click){
    telaAtiva.click();
  }
});
mudaTela(Telas.INICIO);
looping();