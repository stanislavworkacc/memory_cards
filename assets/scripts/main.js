let scene = new Phaser.Scene('Game');

scene.preload = function() {
    console.log('PRELOAD', this)
    this.load.image('bg', 'assets/sprites/background.png');
    this.load.image('card', 'assets/sprites/card.png');
};

scene.create = function() {
    console.log('create');

    this.add.sprite(0, 0, 'bg').setOrigin(0, 0);

    this.getCardPosition().forEach((position) => {
        console.log('position', position.x, position.y)
        this.add.sprite(position.x, position.y, 'card').setOrigin(0, 0);
    })
    // this.add.sprite(0, 0, 'card').setOrigin(0, 0);
}

scene.getCardPosition = function() {
    let positions = [];

    let cardTexture = this.textures.get('card').getSourceImage();
    console.log('cardTexture', cardTexture);

    let cardWidth = cardTexture.width + 4;
    let cardHeight = cardTexture.height + 4;


    let offsetX = (this.sys.game.config.width - (config.cols * cardWidth)) / 2;
    let offsetY = (this.sys.game.config.height - (config.rows * cardHeight)) / 2;

    console.log('THIS', this);

    for(let row = 0; row < config.rows; row++) {
        for(let col = 0; col < config.cols; col++) {
            positions.push({
                x: offsetX + col * cardWidth,
                y: offsetY + row * cardHeight
            })
        }
    }

    return positions;
}

let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene,
    rows: 2,
    cols: 5
};


let game = new Phaser.Game(config)

console.log('Phaser', Phaser.Game)