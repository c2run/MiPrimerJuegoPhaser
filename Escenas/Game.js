class Game extends Phaser.Scene{



  preload(){
    //console.log('Aquí va el juego1');

    this.load.image('cielo', 'fotitos/sky.jpg');
    this.load.image('tierra', 'fotitos/ground.png');
    this.load.image('star', 'fotitos/star.png');
    this.load.image('sol', 'fotitos/sol.png');
    this.load.image('diamante', 'fotitos/diamante2.png');
    this.load.image('ladrillo', 'fotitos/ladrillos.png');
    this.load.image('titulo', 'fotitos/menu.png');
    this.load.image('boton', 'fotitos/boton.png');

    //cargar los sprites del personaje
    this.load.spritesheet('humano','fotitos/humano.png',{ frameWidth: 32, frameHeight: 48 });

   //cargar los sprites del enemigo
   this.load.spritesheet('enemigo', 'fotitos/enemigo.png',{frameWidth: 32,frameHeight: 48,});

  }

  create(){

    this.add.image(400, 300, 'cielo');
    this.add.image(400, 50, 'sol');
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 630, 'tierra').setScale(3).refreshBody(); //base terreno 1
    platforms.create(200, 502, 'ladrillo'); //terreno 01 /izquierda
    platforms.create(200, 302, 'ladrillo'); //terreno 2 /izquierda
    platforms.create(650, 399, 'ladrillo'); //terreno 1 / derecha
    platforms.create(720, 220, 'ladrillo'); //terreno 2 /derecha
    platforms.create(200, 150, 'ladrillo'); //terreno 3 /izquierda

    player = this.physics.add.sprite(360, 350, 'humano');
    enemigo = this.physics.add.sprite(360, 150, 'enemigo'); //fisicas al sprite enemigo

    player.body.setGravityY(200); //gravedad del personaje
    enemigo.body.setGravityY(300);

    this.physics.add.collider(player, platforms);//colisionador del jugador con la plataforma
    this.physics.add.collider(enemigo, platforms); //colisionador del enemigo con la plataforma

    player.setBounce(0.2); //efecto rebote
    enemigo.setBounce(0.2);
    player.setCollideWorldBounds(true); //colisionador con las orillas del mundo
    enemigo.setCollideWorldBounds(true);

    scoreText = this.add.text(16, 16, 'Puntaje: 0', { fontSize: '32px', fill: '#000' });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'humano', frame: 0 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('humano', { start: 4, end: 7 }), //contiene las fotos de 4 a 7 para animar a la izquierda
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('humano', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'girar',
        frames: [ { key: 'enemigo', frame: 0 } ],
        frameRate: 20
    });
    this.anims.create({
        key: '4',
        frames: this.anims.generateFrameNumbers('enemigo', { start: 4, end: 7 }), //contiene las fotos de 4 a 7 para animar a la izquierda
        frameRate: 10,
        x: -150,
        duration: 200,
        loop: -1,

    });

    this.anims.create({
        key: '6',
        frames: this.anims.generateFrameNumbers('enemigo', { start: 8, end: 11 }), //contiene las fotos de 4 a 7 para animar a la izquierda
        frameRate: 10,
        repeat: -1
    });

    //se crean los diamantes que caeran del cielo
    diamante = this.physics.add.group({
        key: 'diamante',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    // se añade la física para que los diamantes colapsen con las superficies
    this.physics.add.collider(diamante, platforms); //colisión del jugador con las plataformas

    this.physics.add.collider(player, enemigo, atraparjugador, null, this);

    diamante.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    //  verificar si el jugador se superpone con algún diamante, si lo hace llamar a la función atraparDiamante
    this.physics.add.overlap(player, diamante, atraparDiamante, null, this);

    function atraparjugador (enemigo, player)
    {
        this.physics.pause();
        enemigo.setTint(0xff0000); //cambia de color
        enemigo.anims.play('turn'); //extrae la animación turn
        let gameOver = true;
        if(gameOver = true){
          // console.log('gameover');
          this.scene.start('Gameover');
        }
        //
    }

    // evento cursor para llamar a la introducción por teclado
    cursors = this.input.keyboard.createCursorKeys();
    function atraparDiamante (player, diamante)
    {
        diamante.disableBody(true, true);
        //  añadir puntaje como contador con 1000 puntos por diamante
        score += 1000;
        scoreText.setText('Puntaje: ' + score);

        if(score===12000){
          //console.log('Ganaste');
          //si la variable de puntaje es igual a 12000
          //setear la variable score a 0 para reiniciar el contador a cero y reiniciar la escena
          score=0;
          this.scene.start('Ganaste');
          //console.log(score);
        }
    }



  }

    update(){
      //si la tecla izquierda está presionada.
        if (cursors.left.isDown)
        {
          //establezca la velocidad a -160
            player.setVelocityX(-160);
            //cargue la animación izquierda como verdadero
            player.anims.play('left', true);
        }else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
        this.physics.moveToObject(enemigo, player, 100);
        var distancia = Phaser.Math.Distance.Between(player.x, player.y, enemigo.x, enemigo.y);
        if(player.body.speed > 0 && distancia < 4){
          player.body.reset(enemigo.x, enemigo.y);
        }



    }

}
