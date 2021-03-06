class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, value, position) {
        super(scene, position.x, position.y, 'card');
        this.scene = scene;
        this.value = value;
        this.setOrigin(0, 0);
        this.scene.add.existing(this);
        this.setInteractive();
        // this.on('pointerdown', this.open, this);
    }

    open() {
        this.setTexture('card' + this.value);
    }
}