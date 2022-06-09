'use strict'
const game = new Phaser.Game(1000, 700, Phaser.AUTO, 'game-canvas', { preload, create, update })

let player1
let A
let D
let space
let platforms
let coins
let ground
let num


function preload() {
    game.load.spritesheet('p1','pictures/backgrounds/dude1.png',285 / 9 , 42)
    game.load.image('platform','pictures/backgrounds/platform-removebg-preview.png')
    game.load.spritesheet('coin','pictures/backgrounds/coin.png',1198 / 5, 704 / 2)
}
    
function create() {
    createWorld()
    createButtons()
}

function createWorld(){
    
    game.stage.backgroundColor = '#3E4E62';
    game.world.setBounds(0, 0, 1000, 20000)
    createPlayer()
    game.camera.follow(player1, Phaser.Camera.FOLLOW_PLATFORMER, 0.1, 0.1)
    
    platforms = game.add.group()
    platforms.enableBody = true

    coins = game.add.group()
    coins.enableBody = true

    for(let y = 0; y < game.world.height; y += game.rnd.integerInRange(100, 250)){
        let x = game.rnd.integerInRange(100, 350)
        platforms.create(x,y,'platform')
        coins.create(x + 70,y - 80,'coin')
    }

    
    
    platforms.forEach(function(p){
        p.scale.setTo(0.2);
        p.body.immovable = true
    })

    coins.forEach(function(coin){
        coin.scale.setTo(0.2)
        coin.animations.add('coin-animations' , [0,1,2,3,4,5,6,7,8,9] , 13 ,true)
        coin.animations.play('coin-animations')
    })
}

function update(){ 
    movePlayer();
    num = console.log(coins.length)
    movePlayer();

}

function createButtons(){
    A = game.input.keyboard.addKey(Phaser.Keyboard.A)
    D = game.input.keyboard.addKey(Phaser.Keyboard.D)
    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
}

function createPlayer(){
    player1 = game.add.sprite(0,20000  ,'p1')
    player1.frame = 4
    player1.scale.setTo(1.5)
    player1.animations.add('left-move',[0,1,2,3],8,true)
    player1.animations.add('right-move',[5,6,7,8],8,true)
    game.physics.arcade.enable(player1)
    player1.body.collideWorldBounds = true
    player1.body.gravity.y = 200
    player1.body.bounce.y = 0.0
}

function movePlayer(){
    if(A.isDown){
        player1.animations.play('left-move')
        player1.body.velocity.x = -300
   }else if(D.isDown){   
        player1.body.velocity.x = 300
        player1.animations.play('right-move')
   }else{
        player1.body.velocity.x = 0
        player1.animations.stop()
   }

   let flag = game.physics.arcade.collide(player1,platforms)

   if(space.isDown && flag){
        player1.body.velocity.y = -300
        player1.frame = 4
   }

   game.physics.arcade.collide(player1, coins, function(player1,currentCoin){
        currentCoin.destroy()
   })
}
