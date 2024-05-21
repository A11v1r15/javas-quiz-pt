var stage;
var Pergunta;
var RespostaA;
var RespostaB;
var RespostaC;
var R1;
var R2;
var R3;
var Pindex = 0;
var Corretas = 0;
var tp;
var tx;
var ty;
var tz;

var Perguntas = [];

window.onload = function() {
	if (localStorage.getItem('perguntas') === null) {
		Perguntas = [];
    } else {
		Perguntas = JSON.parse(localStorage.getItem('perguntas'));
    }
    stage = new createjs.Stage("quiz");
    Pergunta = new createjs.DOMElement($( "input" )[ 0 ]);
    RespostaA = new createjs.DOMElement($( "input" )[ 1 ]);
    RespostaB = new createjs.DOMElement($( "input" )[ 2 ]);
    RespostaC = new createjs.DOMElement($( "input" )[ 3 ]);
    R1 = new createjs.DOMElement($( "input[name=Certa]" )[ 0 ]);
    R2 = new createjs.DOMElement($( "input[name=Certa]" )[ 1 ]);
    R3 = new createjs.DOMElement($( "input[name=Certa]" )[ 2 ]);
    RespostaA.x = 25;
    RespostaB.x = 25;
    RespostaC.x = 25;
    RespostaA.y = 25;
    RespostaB.y = 50;
    RespostaC.y = 75;
    R1.y = 25;
    R2.y = 50;
    R3.y = 75;
    stage.addChild(Pergunta);
    stage.addChild(RespostaA);
    stage.addChild(RespostaB);
    stage.addChild(RespostaC);
    stage.addChild(R1);
    stage.addChild(R2);
    stage.addChild(R3);
    var circle = new createjs.Shape();
	circle.graphics.beginFill("#00FF7F").drawCircle(0, 0, 10);
	circle.x = 640;
	circle.y = 400;
	circle.addEventListener("click", Save);
	stage.addChild(circle);
    var circle = new createjs.Shape();
	circle.graphics.beginFill("#FF007F").drawCircle(0, 0, 10);
	circle.x = 40;
	circle.y = 400;
	circle.addEventListener("click", Wipe);
	stage.addChild(circle);
    var circle = new createjs.Shape();
	circle.graphics.beginFill("#007FFF").drawCircle(0, 0, 10);
	circle.x = 340;
	circle.y = 400;
	circle.addEventListener("click", Write);
	stage.addChild(circle);
    stage.update();
  }

  //Objeto da pergunta
  function Answer() {
  	this.P = $( "input" )[ 0 ].value;
  	this.RA = $( "input" )[ 1 ].value;
  	this.RB = $( "input" )[ 2 ].value;
  	this.RC = $( "input" )[ 3 ].value;
  	this.C = $( "input[name=Certa]:checked" ).val();
  }

  //Função de adicionar a pergunta
  function Save() {
  	if($( "input" )[ 0 ].value != "" && $( "input" )[ 1 ].value != "" && $( "input" )[ 2 ].value != "" && $( "input" )[ 3 ].value != "") {
	  	Perguntas.push(new Answer());
	  	localStorage.setItem('perguntas', JSON.stringify(Perguntas) );
	  	$( "input" )[ 0 ].value = "";
	  	$( "input" )[ 1 ].value = "";
	  	$( "input" )[ 2 ].value = "";
	  	$( "input" )[ 3 ].value = "";
	}
  }

  //Apaga as perguntas
  function Wipe() {
	Perguntas = [];
  	localStorage.removeItem('perguntas');
  }

  function Write() {
  	if (Perguntas[Pindex] !== undefined) {
	  	// Pergunta
	  	tp = new createjs.Text(Perguntas[Pindex].P, "20px Arial", "#000000");
		stage.addChild(tp);
		tp.y = 100;
		// Resposta A
	  	tx = new createjs.Text(Perguntas[Pindex].RA, "20px Arial", "#000000");
		stage.addChild(tx);
		tx.x = 25;
		tx.y = 125;
		tx.R = "RA";
		tx.addEventListener("click", Check);
		// Resposta B
	  	ty = new createjs.Text(Perguntas[Pindex].RB, "20px Arial", "#000000");
		stage.addChild(ty);
		ty.x = 25;
		ty.y = 150;
		ty.R = "RB";
		ty.addEventListener("click", Check);
		// Resposta C
	  	tz = new createjs.Text(Perguntas[Pindex].RC, "20px Arial", "#000000");
		stage.addChild(tz);
		tz.x = 25;
		tz.y = 175;
		tz.R = "RC";
		tz.addEventListener("click", Check);
		stage.update();
		//Esconde os input, deve ficar depois do stage.update()
	  	$( "input" )[ 0 ].style.visibility = 'hidden';
	  	$( "input" )[ 1 ].style.visibility = 'hidden';
	  	$( "input" )[ 2 ].style.visibility = 'hidden';
	  	$( "input" )[ 3 ].style.visibility = 'hidden';
	  	$( "input" )[ 4 ].style.visibility = 'hidden';
	  	$( "input" )[ 5 ].style.visibility = 'hidden';
	  	$( "input" )[ 6 ].style.visibility = 'hidden';
  	} else {
  		console.log('Error 404')
  	}
  }

  function Check (e) {
  	 if (Perguntas[Pindex].C == e.target.R) {
  	 	Corretas++;
  	 	console.log('Acertou, miseravi');
  	 } else {
  	 	console.log('<Faustão> Errrou!');
  	 }

  	 if (Pindex + 1 == Perguntas.length){
  	 	stage.removeChild(tp);
  	 	stage.removeChild(tx);
  	 	stage.removeChild(ty);
  	 	stage.removeChild(tz);
		stage.update();
  	 	console.log(Corretas / Perguntas.length   * 100 + "%");
  	 	Pindex = 0;
  	 	Corretas = 0;
  	 } else {
  	 	Pindex++;
  	 	stage.removeChild(tp);
  	 	stage.removeChild(tx);
  	 	stage.removeChild(ty);
  	 	stage.removeChild(tz);
  	 	Write();
  	 }

  }