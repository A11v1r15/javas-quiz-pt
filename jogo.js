//﻿Abra no Firefox, aperte "esc" algumas vezes e copie do console o ultimo json gerado


var s = new createjs.Stage("can");
var fundo = new createjs.Bitmap("sprites/bg.png")
fundo.sourceRect = new createjs.Rectangle(0, 0, 800, 600);
fundo.scaleX = s.canvas.width/fundo.sourceRect.width;
fundo.scaleY = s.canvas.height/fundo.sourceRect.height;
var Pergunta;
var RespostaA;
var RespostaB;
var RespostaC;
var RespostaD;
var RespostaE;
var R1;
var R2;
var R3;
var R4;
var R5;
var Pindex = 0;
var Corretas = 0;
var tp;
var tx;
var ty;
var tz;
var tt;
var ts;
var erro;
var zerousim;
var btvoltar;
var rect1, rect2, rect3, rect4, rect5;

var Perguntas = [];

//A cada nova página/tela, a função limpa tudo, tira os botões e re-põe o fundo.
function geraBG(){
    s.clear();
    s.removeAllChildren();
    s.addChild(fundo);
}

//Pega as perguntas.
window.onload = function() {
	if (localStorage.getItem('perguntas') === null) {
		Perguntas = [];
    } else {
		Perguntas = JSON.parse(localStorage.getItem('perguntas'));
    }
    Pergunta = new createjs.DOMElement($( "input" )[ 0 ]);
    RespostaA = new createjs.DOMElement($( "input" )[ 1 ]);
    RespostaB = new createjs.DOMElement($( "input" )[ 2 ]);
    RespostaC = new createjs.DOMElement($( "input" )[ 3 ]);
    RespostaD = new createjs.DOMElement($( "input" )[ 4 ]);
    RespostaE = new createjs.DOMElement($( "input" )[ 5 ]);
    R1 = new createjs.DOMElement($( "input[name=Certa]" )[ 0 ]);
    R2 = new createjs.DOMElement($( "input[name=Certa]" )[ 1 ]);
    R3 = new createjs.DOMElement($( "input[name=Certa]" )[ 2 ]);
    R4 = new createjs.DOMElement($( "input[name=Certa]" )[ 3 ]);
    R5 = new createjs.DOMElement($( "input[name=Certa]" )[ 4 ]);
    Pergunta.x = 250;
    RespostaA.x = 300;
    RespostaB.x = 300;
    RespostaC.x = 300;
    RespostaD.x = 300;
    RespostaE.x = 300;
    Pergunta.y = 200;
    RespostaA.y = 240;
    RespostaB.y = 270;
    RespostaC.y = 300;
    RespostaD.y = 330;
    RespostaE.y = 360;
    R1.x = 260;
    R2.x = 260;
    R3.x = 260;
    R4.x = 260;
    R5.x = 260;
    R1.y = 240;
    R2.y = 270;
    R3.y = 300;
    R4.y = 330;
    R5.y = 360;
	$('body').keydown(pkm);
}

  //Objeto da pergunta
  function Answer() {
  	this.P = $( "input" )[ 0 ].value;
  	this.RA = $( "input" )[ 1 ].value;
  	this.RB = $( "input" )[ 2 ].value;
  	this.RC = $( "input" )[ 3 ].value;
  	this.RD = $( "input" )[ 4 ].value;
  	this.RE = $( "input" )[ 5 ].value;
  	this.C = $( "input[name=Certa]:checked" ).val();
  }


  //Função de adicionar a pergunta
  function Save() {
  	if($( "input" )[ 0 ].value != "" && $( "input" )[ 1 ].value != "" && $( "input" )[ 2 ].value != "" && $( "input" )[ 3 ].value != "" && $( "input" )[ 4 ].value != "" && $( "input" )[ 5 ].value != "") {
	  	Perguntas.push(new Answer());
	  	//localStorage.setItem('perguntas', JSON.stringify(Perguntas) );
		console.log(JSON.stringify(Perguntas))
	  	$( "input" )[ 0 ].value = "";
	  	$( "input" )[ 1 ].value = "";
	  	$( "input" )[ 2 ].value = "";
	  	$( "input" )[ 3 ].value = "";
	  	$( "input" )[ 4 ].value = "";
	  	$( "input" )[ 5 ].value = "";
	}
  }
  
  //Apaga as perguntas
  function Wipe() {
	Perguntas = [];
  	localStorage.removeItem('perguntas');
    zerousim = new createjs.Text("I OBEY! (As perguntas foram zeradas.)", "20px Impact, Charcoal, sans-serif", "#000000");
    s.addChild(zerousim);
    zerousim.x=220;
    zerousim.y=450;
  }
  
  //Escreve as perguntas na tela
  function Write() {
  	if (Perguntas[Pindex] !== undefined) {
	  	// Pergunta
	  	tp = new createjs.Text(Perguntas[Pindex].P, "20px Impact, Charcoal, sans-serif", "#000000");
		s.addChild(tp);
        tp.x = 100;
		tp.y = 250;
		// Resposta A
        rect1 =  new createjs.Shape();
        rect1.graphics.beginStroke("red").beginFill("orange").drawRect(0, 0, 450, 30);
	    s.addChild(rect1);
        rect1.x = 190;
        rect1.y = 280;
	  	tx = new createjs.Text(Perguntas[Pindex].RA, "20px Impact, Charcoal, sans-serif", "#000000");
		s.addChild(tx);
		tx.x = 200;
		tx.y = 290;
		rect1.R = "RA";
		rect1.addEventListener("click", Check);
		// Resposta B
        rect2 =  new createjs.Shape();
        rect2.graphics.beginStroke("red").beginFill("orange").drawRect(0, 0, 450, 30);
	    s.addChild(rect2);
        rect2.x = 190;
        rect2.y = 310;
	  	ty = new createjs.Text(Perguntas[Pindex].RB, "20px Impact, Charcoal, sans-serif", "#000000");
		s.addChild(ty);
		ty.x = 200;
		ty.y = 320;
		rect2.R = "RB";
		rect2.addEventListener("click", Check);
		// Resposta C
        rect3 =  new createjs.Shape();
        rect3.graphics.beginStroke("red").beginFill("orange").drawRect(0, 0, 450, 30);
	    s.addChild(rect3);
        rect3.x = 190;
        rect3.y = 340;
	  	tz = new createjs.Text(Perguntas[Pindex].RC, "20px Impact, Charcoal, sans-serif", "#000000");
		s.addChild(tz);
		tz.x = 200;
		tz.y = 350;
		rect3.R = "RC";
		rect3.addEventListener("click", Check);
		// Resposta D
        rect4 =  new createjs.Shape();
        rect4.graphics.beginStroke("red").beginFill("orange").drawRect(0, 0, 450, 30);
	    s.addChild(rect4);
        rect4.x = 190;
        rect4.y = 370;
	  	tt = new createjs.Text(Perguntas[Pindex].RC, "20px Impact, Charcoal, sans-serif", "#000000");
		s.addChild(tt);
		tt.x = 200;
		tt.y = 380;
		rect4.R = "RD";
		rect4.addEventListener("click", Check);
		// Resposta E
        rect5 =  new createjs.Shape();
        rect5.graphics.beginStroke("red").beginFill("orange").drawRect(0, 0, 450, 30);
	    s.addChild(rect5);
        rect5.x = 190;
        rect5.y = 400;
	  	ts = new createjs.Text(Perguntas[Pindex].RC, "20px Impact, Charcoal, sans-serif", "#000000");
		s.addChild(ts);
		ts.x = 200;
		ts.y = 410;
		rect5.R = "RE";
		rect5.addEventListener("click", Check);
		s.update();
  	} else {
        erro = new createjs.Text("Opa! Não achei nenhuma pergunta aqui D:", "20px Impact, Charcoal, sans-serif", "#000000");  
        s.addChild(erro);
        erro.x=200;
        erro.y=220;
        btAdicionarAdd();
      }
  }

//Checa se errou ou acertou.
  function Check (e) {
  	 if (Perguntas[Pindex].C == e.target.R) {
  	 	Corretas++;
  	 	console.log('Acertou, miseravi');
  	 } else {
  	 	console.log('<Faustão> Errrou!');
  	 }

  	 if (Pindex + 1 == Perguntas.length){
  	 	s.removeChild(tp);
  	 	s.removeChild(tx);
  	 	s.removeChild(ty);
  	 	s.removeChild(tz);
  	 	s.removeChild(tt);
  	 	s.removeChild(ts);
        s.removeChild(rect1);
        s.removeChild(rect2);
        s.removeChild(rect3);
        s.removeChild(rect4);
        s.removeChild(rect5);
		s.update();
  	 	console.log(Corretas / Perguntas.length   * 100 + "%");
	  	var porcentagem = new createjs.Text("Você acertou " + Math.round(Corretas / Perguntas.length * 100) + "%!", "40px Impact, Charcoal, sans-serif", "#000000");
        s.addChild(porcentagem);
        porcentagem.x=250;
        porcentagem.y=300;
  	 	Pindex = 0;
  	 	Corretas = 0;
  	 } else {
  	 	Pindex++;
  	 	s.removeChild(tp);
  	 	s.removeChild(tx);
  	 	s.removeChild(ty);
  	 	s.removeChild(tz);
  	 	s.removeChild(tt);
  	 	s.removeChild(ts);
        s.removeChild(rect1);
        s.removeChild(rect2);
        s.removeChild(rect3);
        s.removeChild(rect4);
        s.removeChild(rect5);
  	 	Write();
  	 }
  }
  
//Tela 1, com os dois botões.
function index(){
    geraBG();
    btJogarAdd();
    btEditarAdd();
}

//Botão de jogar
function btJogarAdd(){
    var btjogar = new createjs.Bitmap("sprites/jogar.png");
    btjogar.addEventListener("click",function(){
        shuffleArray();
        PaginaP();
    });
    btjogar.x = 300;
    btjogar.y = 250;
    s.addChild(btjogar);
}

//Botão de editar
function btEditarAdd(){
    var bteditar = new createjs.Bitmap("sprites/editar.png");
    bteditar.addEventListener("click", PaginaE);
    bteditar.x = 300;
    bteditar.y = 350;
    s.addChild(bteditar);
}

//Botão de voltar
function btVoltarAdd(){
    btvoltar = new createjs.Bitmap("sprites/back.png");
    btvoltar.x = 150;
    btvoltar.y = 400;
    s.addChild(btvoltar);
}

//Página de perguntas
function PaginaP(){
    geraBG();
    s.addChild(fundo);
    Write();
    btVoltarAdd();
    btvoltar.addEventListener("click", index);
}

//Página de edição
function PaginaE(){
    hideInputs();
    geraBG();
    s.addChild(fundo);
    btAdicionarAdd();
    btZerarAdd();
    btVoltarAdd();
    btvoltar.addEventListener("click", index);
}

//Botão de adicionar
function btAdicionarAdd(){
    var btadicionar = new createjs.Bitmap("sprites/adicionar.png");
    btadicionar.addEventListener("click", PaginaADD);
    btadicionar.x = 250;
    btadicionar.y = 300;
    s.addChild(btadicionar);
}
//Botão de zerar
function btZerarAdd(){
    var btzerar = new createjs.Bitmap("sprites/zerar.png");
    btzerar.addEventListener("click", Wipe);
    btzerar.x = 220;
    btzerar.y = 350;
    s.addChild(btzerar);
}

//Página de adição
function PaginaADD(){
    geraBG();
    s.addChild(fundo);
    s.addChild(Pergunta);
    s.addChild(RespostaA);
    s.addChild(RespostaB);
    s.addChild(RespostaC);
    s.addChild(RespostaD);
    s.addChild(RespostaE);
    s.addChild(R1);
    s.addChild(R2);
    s.addChild(R3);
    s.addChild(R4);
    s.addChild(R5);
    var btADD = new createjs.Bitmap("sprites/ADD.png");
    btADD.addEventListener("click", Save);
    btADD.x = 300;
    btADD.y = 350;
    s.addChild(btADD);
    btVoltarAdd();
    btvoltar.addEventListener("click", PaginaE);
}

//Aqui eu chamo a função.
index();

//Uso um ticker pro update.
createjs.Ticker.on("tick",tk);
function tk() {
    s.update();
}

hideInputs();
//Esconde os input
function hideInputs(){
	  	$( "input" )[ 0 ].style.visibility = 'hidden';
	  	$( "input" )[ 1 ].style.visibility = 'hidden';
	  	$( "input" )[ 2 ].style.visibility = 'hidden';
	  	$( "input" )[ 3 ].style.visibility = 'hidden';
	  	$( "input" )[ 4 ].style.visibility = 'hidden';
	  	$( "input" )[ 5 ].style.visibility = 'hidden';
	  	$( "input" )[ 6 ].style.visibility = 'hidden';
	  	$( "input" )[ 7 ].style.visibility = 'hidden';
	  	$( "input" )[ 8 ].style.visibility = 'hidden';
	  	$( "input" )[ 9 ].style.visibility = 'hidden';
	  	$( "input" )[10 ].style.visibility = 'hidden';
}

//Embaralha a ordem das perguntas
function shuffleArray(){
    var aleat;
    var aux;
    for(var i = 0; i<Perguntas.length; i++)
        {
            aleat = Math.floor(Math.random() * Perguntas.length);
            aux = Perguntas[i];
            Perguntas[i] = Perguntas[aleat];
            Perguntas[aleat] = aux;
        }
}

//Easter Egg
function pkm(e) {
	if(e.keyCode == 27){
		$('#content').load("Pokemon.html");
		var c = Math.floor(Math.random() * 720 + 3);
		$( "input" )[ 0 ].value = $( "#content" ).children()[c].childNodes[1].innerHTML;
		switch (Math.floor(Math.random() * 3)){
			case 0:
				$( "input" )[ 6 ].checked = true;
				$( "input" )[ 1 ].value = $( "#content" ).children()[c].nodeName + " ←";
				$( "input" )[ 2 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
				$( "input" )[ 3 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
				$( "input" )[ 4 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
				$( "input" )[ 5 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
			break;
			case 1:
				$( "input" )[ 7 ].checked = true;
				$( "input" )[ 1 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
				$( "input" )[ 2 ].value = $( "#content" ).children()[c].nodeName + " ←";
				$( "input" )[ 3 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
				$( "input" )[ 4 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
				$( "input" )[ 5 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
			break;
			case 2:
				$( "input" )[ 8 ].checked = true;
				$( "input" )[ 1 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
				$( "input" )[ 2 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
				$( "input" )[ 3 ].value = $( "#content" ).children()[c].nodeName + " ←";
				$( "input" )[ 4 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
				$( "input" )[ 5 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
			break;
			case 3:
				$( "input" )[ 9 ].checked = true;
				$( "input" )[ 1 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
				$( "input" )[ 2 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
				$( "input" )[ 3 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
				$( "input" )[ 4 ].value = $( "#content" ).children()[c].nodeName + " ←";
				$( "input" )[ 5 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
			break;
			case 4:
				$( "input" )[10 ].checked = true;
				$( "input" )[ 1 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
				$( "input" )[ 2 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
				$( "input" )[ 3 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
				$( "input" )[ 4 ].value = $( "#content" ).children()[Math.floor(Math.random() * 720 + 3)].nodeName;
				$( "input" )[ 5 ].value = $( "#content" ).children()[c].nodeName + " ←";
			break;
		}
		Save()
	}
}
