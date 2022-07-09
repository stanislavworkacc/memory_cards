class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
    }
    preload() {
        this.load.image('bg', 'assets/sprites/background.png');
        this.load.image('card', 'assets/sprites/card.png');
        this.load.image('card1', 'assets/sprites/card1.png');
        this.load.image('card2', 'assets/sprites/card2.png');
        this.load.image('card3', 'assets/sprites/card3.png');
        this.load.image('card4', 'assets/sprites/card4.png');
        this.load.image('card5', 'assets/sprites/card5.png');
    }
    create() {
        this.createBackground();
        this.createText();
        this.createCards();
        this.start();
    }

    createText() {
        this.timeoutText = this.add.text(10, 330, 'Time: 30', {
            font: '36px CurseCasual',
            fill: '#ffffff'
        })

        console.log('timeoutText', this.timeoutText)
    }

    start() {
        this.openedCard = null;
        this.openedCardsCount = 0;
        this.initCards();
    }
    initCards() {
        let positions = this.getCardsPositions();

        this.cards.forEach(card => {
            let position = positions.pop();
            card.close();
            card.setPosition(position.x, position.y);
        });
    }
    createBackground() {
        this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
    }
    createCards() {
        this.cards = [];

        for (let value of config.cards) {
            for (let i = 0; i < 2; i++) {
                this.cards.push(new Card(this, value));
            }
        }

        this.input.on("gameobjectdown", this.onCardClicked, this);
    }
    onCardClicked(pointer, card) {
        if (card.opened) {
            return false;
        }

        if (this.openedCard) {
            // уже есть открытая карта
            if (this.openedCard.value === card.value) {
                // картинки равны - запомнить
                this.openedCard = null;
                ++this.openedCardsCount;
            } else {
                // картинки разные - скрыть прошлую
                this.openedCard.close();
                this.openedCard = card;
            }
        } else {
            // еще нет открытой карта
            this.openedCard = card;
        }

        card.open();

        if (this.openedCardsCount === this.cards.length / 2) {
            this.start();
        }
    }
    getCardsPositions() {
        let positions = [];
        let cardTexture = this.textures.get('card').getSourceImage();
        let cardWidth = cardTexture.width + 4;
        let cardHeight = cardTexture.height + 4;
        let offsetX = (this.sys.game.config.width - cardWidth * config.cols) / 2 + (cardWidth / 2);
        let offsetY = (this.sys.game.config.height - cardHeight * config.rows) / 2 + (cardHeight / 2);
    
        for (let row = 0; row < config.rows; row++) {
            for (let col = 0; col < config.cols; col++) {
                positions.push({
                    x: offsetX + col * cardWidth,
                    y: offsetY + row * cardHeight,
                });
            }
        }

        return Phaser.Utils.Array.Shuffle(positions);
    }
}
