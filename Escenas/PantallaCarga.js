class PantallaCarga extends Phaser.Scene{

  preload(){
    this.load.image('fondo','./assets/menu.png');
    this.load.image('logo','./assets/logo.png');
  }
  create(){
          let camera = this.cameras.main,
          centerX = camera.centerX,
          centerY = camera.centerY;
          this.add.image(centerX, centerY, 'fondo');
          this.add.image(centerX ,centerY , 'logo');
          let enterText = this.add.text(centerX, camera.height -93, 'Presiona Enter para comenzar.').setOrigin(0.5, 1).setAlpha(0).setTint('#040100');


          camera.fadeIn(500, 0, 0, 0);


          camera.once('camerafadeincomplete', () => {
            this.time.delayedCall(500, () => {

              this.tweens.timeline({
                    targets: enterText,
                    repeat: -1,
                    tweens:[
                      {
                        duration: 1500,
                        alpha: 1,
                        ease: 'Linear',
                        yoyo: true
                      }
                    ]
              });
              let enter = this.input.keyboard.addKey('ENTER');

              enter.on('down', () => {
                camera.fadeOut(500, 0, 0, 0);
              });
          });
        });
            camera.once('camerafadeoutcomplete', () => {
              this.time.delayedCall(500, () => {
              this.scene.start('Game');
              });
            });
      }

}
