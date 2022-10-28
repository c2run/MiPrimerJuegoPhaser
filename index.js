const configuracion = {

	type: Phaser.AUTO,
	        pixelArt: true,
	        width: 800,
	        height: 600,
	        roundPixels: true,
	        physics: {
	            default: 'arcade',
	            arcade: {
	                gravity: { y: 200 },
	                debug: false
	            }
	        },
		scale: {
				mode: Phaser.Scale.FIT,
				autoCenter: Phaser.Scale.CENTER_BOTH
		}
	    }
var player;
var enemigo;
var platforms;
var diamante;
var cursors;
var score = 0; //variable puntaje inicializada en cero
var scoreText;
const game = new Phaser.Game(configuracion);
//añadir la escena al Juego
	game.scene.add('PantallaCarga', PantallaCarga);
	game.scene.add('Game', Game);
	game.scene.add('Gameover', Gameover);
	game.scene.add('Ganaste', Ganaste);
	//this.scene.add('PantallaCarga', PantallaCarga);

//iNICIAMOS EL Juego
	game.scene.start('PantallaCarga');
//this.scene.start(PantallaCarga);
