import PlayerSprite from "../object/Player"

export default class tileMapScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'tileMapScene'
        })
        this.score = 0
    }

    preload() {
        this.load.image('sky', 'resource/image/sky.png')

        // link sprite
        this.load.spritesheet("link", 'resource/image/link.png', {frameWidth: 32, frameHeight: 32})

        //  Mario 地图
        this.load.tilemapTiledJSON('map1', 'resource/tilemap/super-mario.json');
        this.load.image('tiles1', 'resource/image/super-mario.png');

        this.load.tilemapTiledJSON('map3', 'resource/tilemap/super-mario-3.json');
        this.load.image('tiles3', 'resource/image/super-mario-3.png');

        // 带 object 的 mario 地图
        this.load.tilemapTiledJSON({key: 'level1', url: 'resource/tilemap/level1.json'});
        this.load.spritesheet('brick', 'resource/img/Levels/brick.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('brick2', 'resource/img/Levels/brick2.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('brickCoin', 'resource/img/Levels/questionMarkBlock.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('brickCoin2', 'resource/img/Levels/questionMarkBlock_2.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('brickCoins', 'resource/img/Levels/brickCoins.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('brickCoins2', 'resource/img/Levels/brickCoins_2.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('tileset_levels', 'resource/tilemap/tileset_levels.png');

        //  自己制作的tilemap
        this.load.tilemapTiledJSON({key: 'test_tilemap', url: 'resource/tilemap/test_tilemap.json'});
        this.load.tilemapTiledJSON({key: 'test_tilemap2', url: 'resource/tilemap/test_tilemap_2.json'});
        this.load.image("sheet_tileset", "resource/image/sheet_tileset.png")
        this.load.image("super-mario_tileset", "resource/image/super-mario.png")
        // this.load.tilemapCSV('map', 'resource/tilemap/test_tilemap_groundLayer.csv');


    }

    create() {
        // this.add.image(0, 0, 'sky').setOrigin(0, 0)

        // 带 object 的 mario 地图
        // this.map = this.add.tilemap('level1');
        // let tileset_level1 = this.map.addTilesetImage('tileset_levels');
        // this.graphicLayer = this.map.createDynamicLayer('Graphic_Layer',tileset_level1,0,0);

        // this.backgroundColor = this.map.createDynamicLayer('Background_Color',tileset_level1,0,0);
        // this.pipesAccessLevelLayer =this.map.createDynamicLayer('PipesAccessLevel',tileset_level1,0,0);
        // this.pipesAccessLayer = this.map.createDynamicLayer('PipesAccess',tileset_level1,0,0);
        // this.exitPipesLayer = this.map.createDynamicLayer('ExitPipes',tileset_level1,0,0);
        // this.finishLevelLayer =this.map.createDynamicLayer('FinishLevel',tileset_level1,0,0);

        // let tileset_brickCoin =  this.map.addTilesetImage('brickCoin');
        // this.BricksCoinLayer =this.map.createDynamicLayer('brickCoin',tileset_brickCoin,0,0);
        // this.brickCoinsGroup = this.physics.add.group()

        //  自己制作的tilemap
        // this.map = this.add.tilemap('test_tilemap');
        // let sheet_tileset = this.map.addTilesetImage('sheet_tileset');
        // this.groundLayer = this.map.createDynamicLayer('groundLayer', sheet_tileset, 20, 20);
        // this.gunLayer = this.map.createStaticLayer('gunLayer', sheet_tileset, 0, 0);
        // this.groundLayer.resizeWorld();
        // log(this.map)

        // When loading a CSV map, make sure to specify the tileWidth and tileHeight
        let map = this.add.tilemap('test_tilemap2');
        // let map = this.make.tilemap({key: 'map', tileWidth: 16, tileHeight: 16});
        var sheet_tileset = map.addTilesetImage('super-mario_tileset');
        this.groundLayer = map.createStaticLayer(0, sheet_tileset, 0, 0);

        // this.groundLayer.setCollision([14,16,])
        this.groundLayer.setCollisionByProperty({collides: true})

        log(map)

        // 旧 Mario 地图
        var map1 = this.make.tilemap({key: 'map1'});
        var tileset1 = map1.addTilesetImage('SuperMarioBros-World1-1', 'tiles1');
        // this.layer1 = map1.createStaticLayer('World1', tileset1, 0, 0);
        this.layer1 = map1.createDynamicLayer('World1', tileset1, 0, 600);

        let map2 = this.add.tilemap('map3');
        var tileset2 = map2.addTilesetImage('SuperMarioBrosMap1-3_bank.png', 'tiles3');
        var layer2 = map2.createStaticLayer('ShoeBox Tile Grab', tileset2, 0, 300);


        this.layer1.setCollisionByExclusion([1, 2, 3, 12, 11])

        // 12 = 蘑菇🍄
        this.layer1.setTileIndexCallback(12, (sprite, tile) => {
            this.score += 10
            this.layer1.removeTileAt(tile.x, tile.y);
            return false
        });
        // 11 =  金币
        this.layer1.setTileIndexCallback(11, (sprite, tile) => {
            this.score += 10
            this.layer1.removeTileAt(tile.x, tile.y);
            return false
        });
        // 在(5,0),宽高为1的位置将tile 半透明(可用于设置暗门)
        this.layer1.setTileLocationCallback(5, 0, 1, 1, (sprite, tile) => {
            tile.alpha = 0.25;
        });


        // 调试内容
        this.showDebug = true
        this.debugGraphics = this.add.graphics()
        // new Phaser.GameObjects.Graphics(this,{x:0, y:600}); //   无法使用???
        this.debugGraphics.y = 600

        this.drawDebug()
        this.input.keyboard.on('keydown_U', (event) => {
            this.showDebug = !this.showDebug;
            this.drawDebug();
        });


        // new player
        this.player = new PlayerSprite({
            scene: this,
            x: 0,
            y: 0,
        });
        this.physics.add.collider(this.player, this.layer1)  // player 与 layer 碰撞
        this.physics.add.collider(this.player, this.graphicLayer)
        this.physics.add.collider(this.player, this.groundLayer)    // 自己建的地图ground
        this.player.setCollideWorldBounds(true) // 世界碰撞

        // 镜头跟随,开启后镜头控制会被覆盖
        // this.cameras.main.startFollow(this.player);
        //  camera 镜头控制
        let cursors = this.input.keyboard.createCursorKeys();
        let SmoothedKeyControlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            acceleration: 0.06,
            drag: 0.0005,
            maxSpeed: 1.0
        };
        let FixedKeyControlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        }
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(FixedKeyControlConfig);
        this.cameras.main.setBackgroundColor(0x6888ff)
        // this.cameras.main.setBounds(0, 0, this.layer1.x + this.layer1.width + 600, 0);

        /**
         * 滚动因子控制相机移动对此游戏对象的影响。
         当相机滚动时，它将改变在屏幕上呈现此游戏对象的位置。
         它不会更改游戏对象的实际位置值。
         *  值为1表示它将与摄像机完全同步移动。
         值为0表示即使相机移动也不会移动。
         但实际测试为0会随着镜头移动而移动,不论设置为0还是1 or 其他 文本的x,y都不改变
         */
        this.scoreText = this.add.text(0, 0, "score : 0").setScrollFactor(0);


        // 事件的监听
        this.events.on('drawDebugEvent', function () {
            log("this.events.on('drawDebugEvent'")
        }, this)

    }

    update(time, delta) {

        this.controls.update(delta);

        this.player.update(time, delta)

        this.updateText()
    }

    drawDebug() {
        this.debugGraphics.clear()
        if (this.showDebug) {
            this.groundLayer.renderDebug(this.debugGraphics, {
                tileColor: null, // Non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(0, 0, 0, 50), // Colliding tiles
                // faceColor:  new Phaser.Display.Color(0, 0, 255, 50), // Colliding face edges
            });
        }
        this.events.emit('drawDebugEvent');
    }

    updateText() {
        this.scoreText.setText("score :" + this.score)
    }

}

