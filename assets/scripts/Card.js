class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, value) {
        super(scene, 0, 0, 'card');
        this.scene = scene;
        this.value = value;
        this.setOrigin(0.5, 0.5);
        this.scene.add.existing(this);
        this.setInteractive();
        this.opened = false;

    }

    init(position) {
        this.position = position;
        this.close();
        this.setPosition(-this.width, -this.height);
    }

    move(params) {
        this.scene.tweens.add({
            targets: this,
            x: params.x,
            y: params.y,
            delay: params.delay,
            ease: 'Linear',
            duration: 250,
            onComplete: () => {
                if(params.callback) {
                    params.callback();
                }
                // this.show();
            }
        })
        // this.setPosition(params.x, params.y);
    }

    flip(cb) {
        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            ease: 'Linear',
            duration: 150,
            onComplete: () => {
                this.show(cb);
            }
        })
    }

    show(cb) {
        let texture = this.opened ? 'card' + this.value : 'card'
        this.setTexture(texture);
        this.scene.tweens.add({
            targets: this,
            scaleX: 1,
            ease: 'Linear',
            duration: 150,
            onComplete: () => {
                if(cb) {
                    console.log('onComplete')
                    cb();
                }
            }
        })
    }

    open(cb) {
        this.opened = true;
        this.flip(cb);
        // this.setTexture('card' + this.value);
    }

    close() {
        if(this.opened) {
            this.opened = false;
            this.flip();
            // this.setTexture('card');
        }
    }
}