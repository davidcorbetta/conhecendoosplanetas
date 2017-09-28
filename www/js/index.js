var player, cursors, txtScore, score,thePlanet;


var game = new Phaser.Game(
  '100%',
  '100%',
  Phaser.CANVAS,
  'Conhecendo os planetas',
  { preload: preload, create: create, update: update}
)

function preload(){
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

  game.world.resize(1280,800);
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
	  	var thePlanet = planet.create(randomX,randomY,'planet',i);
	  	var styleName = {font: '16px Arial', fill: '#FFF'};
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
  var style = {font: '16px Arial', fill: '#fff'};
  txtScore = game.add.text(10,10, 'Planetas descobertos: '+score.toString()+'/8', style);
  txtScore.fixedToCamera = true;

  cursors = game.input.keyboard.createCursorKeys();

}

function update(){
  if (cursors.left.isDown){
  	player.animations.play('walkLeft',5,true);
  	player.x -= 2;
  }
  if (cursors.right.isDown){
  	player.animations.play('walkRight',5,true);
  	player.x += 2;
  }
  if (cursors.up.isDown){
  	player.animations.play('walkUp',5,true);
  	player.y -= 2;
  }
  if (cursors.down.isDown){
  	player.animations.play('walkDown',5,true);
  	player.y += 2;
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

	score ++;
	txtScore.setText('Planetas descobertos: '+score.toString()+'/8');
	game.sound.play('ping');
	planetObject.theName.destroy();
	planet.remove(planetObject);
}

