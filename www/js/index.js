var player, cursors, txtScore, score,thePlanet;
var bgLargura = 300;
var bgAltura = 300;
var play;

var game = new Phaser.Game(
  '100%',
  '100%',
  Phaser.CANVAS,
  'Conhecendo os planetas',
  { preload: preload, create: create, update: update, render: render}
)

function preload(){
  game.load.image('play','img/play.png');
  game.load.spritesheet('player','img/player.png',35,45);
  game.load.spritesheet('planet','img/planets.png',128,128);

  game.load.image('background','img/bg.jpg');
  game.load.audio('music','music/music1.mp3');
  game.load.audio('ping','sound/ping.mp3');
}


function create(){



  var music = game.sound.play('music');
  music.volume = 0.5;
  music.loopFull();

  game.world.resize(bgLargura,bgAltura);
  game.add.sprite(0,0,'background');


  player = game.add.sprite(game.world.centerX,game.world.centerY,'player');
  game.camera.follow(player);
  game.physics.enable(player, Phaser.Physics.ARCADE);

  player.animations.add('walkDown',[0,1,2,3]);
  player.animations.add('walkLeft',[4,5,6,7]);
  player.animations.add('walkRight',[8,9,10,11]);
  player.animations.add('walkUp',[12,13,14,15]);

  planet = game.add.physicsGroup(Phaser.Physics.ARCADE);

    for (var i = 0; i < 8; i++)
    {
    	var randomX = game.world.randomX;
	  	var randomY = game.world.randomY;

      //Não deixa os planetas passarem do tamanho do mapa.
      if (randomX < 128) {
    	  randomX = 0;
      }
      if (randomY < 150) {
    	  randomY = 0;
      }
      if (randomX > bgLargura-128) {
        randomX = bgLargura-128;
      }
      if (randomY > bgAltura-150) {
        randomY = bgAltura-150;
      }

	  	var thePlanet = planet.create(randomX,randomY,'planet',i);
	  	var styleName = {font: '16px Arial', fill: '#FFF',align: 'center'};
	  	switch(i){
	  		case 0:
	  			var planetName = 'Mercúrio';
	  			break;
	  		case 1:
	  			var planetName = 'Vênus';
	  			break;
	  		case 2:
	  			var planetName = 'Terra';
	  			break;
	  		case 3:
	  			var planetName = 'Marte';
	  			break;
	  		case 4:
	  			var planetName = 'Júpiter';
	  			break;
	  		case 5:
	  			var planetName = 'Saturno';
	  			break;
	  		case 6:
	  			var planetName = 'Urano';
	  			break;
	  		case 7:
	  			var planetName = 'Netuno';
	  			break;
	  	}


	  	var text = game.add.text(randomX+30,randomY+125, planetName, styleName);
	  	thePlanet.theName = text;
    }

  game.physics.enable(planet, Phaser.Physics.ARCADE);
  game.physics.enable(player, Phaser.Physics.ARCADE);

  score = 0;
  var style = {font: '16px Arial', fill: '#fff',align: 'center'};

  txtScore = game.add.text(10,10, 'Planetas descobertos: '+score.toString()+'/8', style);
  txtScore.fixedToCamera = true;

  cursors = game.input.keyboard.createCursorKeys();
  play = game.add.button(game.world.centerX-128, game.world.centerY-128, 'play', actionOnClick, this, 2, 1, 0);
}

function update(){
  if (cursors.left.isDown){
  	player.animations.play('walkLeft',5,true);

    if (player.x >= 1) {
  	  player.x -= 2;
    }
  }
  if (cursors.right.isDown){
  	player.animations.play('walkRight',5,true);
    //Não deixa o player passar do tamanho do mapa.
    if (player.x < bgLargura-35) {
  	  player.x += 2;
    }
  }
  if (cursors.up.isDown){
  	player.animations.play('walkUp',5,true);
    if (player.y > 0) {
  	  player.y -= 2;
    }
  }
  if (cursors.down.isDown){
  	player.animations.play('walkDown',5,true);
    //Não deixa o player passar do tamanho do mapa.
    if (player.y < bgAltura-45) {
  	  player.y += 2;
    }
  }

  game.physics.arcade.overlap(player,planet,planetHitHander);

  if (!cursors.down.isDown &&
  	  !cursors.up.isDown &&
  	  !cursors.left.isDown &&
  	  !cursors.right.isDown) {
  	player.animations.stop();
  }

}


function planetHitHander(playerObject,planetObject){
   if (play.visible == false) {
  	score ++;
  	txtScore.setText('Planetas descobertos: '+score.toString()+'/8');
  	game.sound.play('ping');
  	planetObject.theName.destroy();
  	planet.remove(planetObject);
  }
}

function render() {
   var styleTimeText = {font: '16px Courier', fill: '#FFF',stroke: '#FFF'};
   if (play.visible == false) {
    if (score < 8) {
      txtTime = this.game.time.totalElapsedSeconds().toFixed(2);
      game.debug.text('Tempo: ' + this.game.time.totalElapsedSeconds().toFixed(2), game.width-130, game.height-20);
    } else {


      game.add.text(game.width-130, game.height-33, 'Tempo: ' + txtTime,styleTimeText);
      game.paused = true;
    }
  }
}

function actionOnClick () {
    play.visible = false;

}
