namespace SpriteKind {
    export const zombieBoss = SpriteKind.create()
    export const coin = SpriteKind.create()
    export const FireBall = SpriteKind.create()
    export const enemypostcollide = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.setKind(SpriteKind.enemypostcollide)
    statusbar.value += -7
    otherSprite.follow(mySprite, 0)
    scene.cameraShake(2, 200)
    animation.runImageAnimation(
    otherSprite,
    [img`
        ........................
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .....fffc1111111f.......
        ...fc111cd1111111f......
        ...f1b1b1b1111dddf......
        ...fbfbffcf11fcddf......
        ......fcf111111bbf......
        .......ccbdb1b1fcf......
        .......fffbfbfdff.......
        ........ffffffff........
        ........fffffffffff.....
        .........fffffc111cf....
        .........fffff1b1b1f....
        ..........ffffbfbfbf....
        ...........ffff.........
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ....7.fd11111111df......
        ...7..fd11111111df......
        ...7..fd11111111df......
        ...7..fddd1111dddff.....
        ...77.fbdbfddfbdbfcf....
        ...777fcdcf11fcdcfbf....
        ....77fffbdb1bdffcf.....
        ....fcb1bcffffff........
        ....f1c1c1ffffff........
        ....fdfdfdfffff.........
        .....f.f.f..............
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd111111111f......
        ......fd11111111df......
        ......fd11111111df......
        ......fcdd1111ddcff.....
        .......fbcf11fcbfbbf....
        .......ffbdb1bdffff.....
        ........fcbfbfdf........
        ........ffffffff........
        ......ffffffffff........
        .....fcb1bcffff.........
        ......ffbff.............
        ........................
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fdd111111ddf......
        ......fbdd1111dddf......
        ......fcdbfddfbdbf......
        .......fbcf11fcbfff.....
        .......ffb1111bcfbcf....
        ........fcdb1bdfbbbf....
        .......ffffffffffcf.....
        .....fcb1bcfffff........
        .....f1b1b1ffff.........
        ......ffbff.............
        ........................
        ........................
        ........................
        ........................
        ........................
        `],
    otherSprite.vx,
    false
    )
    pause(500)
    sprites.destroy(otherSprite, effects.disintegrate, 200)
    Kills_per_round += -1
})
function LevelUp () {
    blockSettings.writeNumber("Played", 0)
    if (CharacterCustom == 1) {
        Xp_per_Level = Xp_per_Level + 50
        P1Level += 1
        ExpP1 = 0
    } else if (CharacterCustom == 2) {
        Xp_per_Level = Xp_per_Level + 50
        P2Level += 1
        ExpP2 = 0
    } else {
        Xp_per_Level = Xp_per_Level + 50
        P3Level += 1
        ExpP3 = 0
    }
}
controller.combos.attachCombo("lrlrududa", function () {
    Rounds = 101
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.FireBall, function (sprite, otherSprite) {
    statusbar.value += -15
    sprites.destroy(otherSprite, effects.disintegrate, 200)
    scene.cameraShake(4, 500)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (statusbar2.value < 25) {
    	
    } else {
        statusbar.value += 10
        statusbar2.value += -25
        scene.cameraShake(4, 500)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.zombieBoss, function (sprite, otherSprite) {
    statusbar3.value += -5
    sprites.destroy(katana)
    scene.cameraShake(2, 500)
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    for (let index = 0; index <= NumberOfHighScores - 1; index++) {
        if (Rounds >= HighScores[index]) {
            HighScores.insertAt(index, Rounds)
            HighScores.pop()
            HighScoreNames.insertAt(index, username)
            HighScoreNames.pop()
            break;
        }
    }
    for (let index = 0; index < 1000; index++) {
        music.play(music.stringPlayable("- - - - - - - - ", 210), music.PlaybackMode.InBackground)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    }
    for (let index3 = 0; index3 <= NumberOfHighScores - 1; index3++) {
        game.splash("" + HighScoreNames[index3] + "-- " + HighScores[index3])
    }
    sprites.destroy(mySprite)
    play_game()
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    Kills_per_round += -1
    mySprite4 = sprites.createProjectileFromSprite(img`
        . . b b b . . 
        . b 5 5 5 b . 
        b 5 d 3 d 5 b 
        b 5 3 5 1 5 b 
        c 5 3 5 1 d c 
        c 5 d 1 d d c 
        . f d d d f . 
        . . f f f . . 
        `, sprite, 0, 0)
    mySprite4.follow(mySprite, 100)
    mySprite4.setKind(SpriteKind.coin)
    animation.runImageAnimation(
    mySprite4,
    assets.animation`myAnim2`,
    100,
    true
    )
    if (CharacterCustom == 1) {
        ExpP1 += 1
    } else if (CharacterCustom == 2) {
        ExpP2 += 1
    } else {
        ExpP3 += 1
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(facing_right)) {
        mySprite.image.flipX()
        facing_right = true
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (facing_right) {
        mySprite.image.flipX()
        facing_right = false
    }
})
controller.combos.attachCombo("ablrup", function () {
    if (statusbar.value < 1000) {
        statusbar.max += 1000
        statusbar.value = 1000
        statusbar2.max += 1000
        statusbar2.value = 1000
    } else if (statusbar.value == 1000) {
        statusbar.value = 1000
        statusbar2.value = 1000
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (CharacterCustom == 1) {
        if (facing_right) {
            if (cooldown == 0) {
                if (statusbar2.value < 5) {
                	
                } else {
                    animation.runImageAnimation(
                    mySprite,
                    [img`
                        . . . . . . . . . . . . . . . . 
                        . . . . f f f f f f . . . . . . 
                        . . f f e e e e f 2 f . . . . . 
                        . f f e e e e f 2 2 2 f . . . . 
                        . f e e e f f e e e e f . . . c 
                        . f f f f e e 2 2 2 2 e f . c d 
                        . f e 2 2 2 f f f f e 2 f c d d 
                        f f f f f f f e e e f f c d d c 
                        f f e 4 4 e b f 4 4 e c d d c . 
                        f e e 4 d 4 1 f d d e c d c . . 
                        . f e e e 4 d d d e d c c c . . 
                        . . f f e e 4 4 e 4 d d e . . . 
                        . . . f 2 2 2 2 4 4 e e . . . . 
                        . . . f 2 2 2 2 e 2 f . . . . . 
                        . . . f 4 4 4 4 5 5 f . . . . . 
                        . . . . f f f f f f . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . f f f . . . . . . 
                        . . . . f f f f f 2 f . . . . . 
                        . . f f e e e e e 2 2 f f . . . 
                        . f f e e e e e e 2 2 2 f f . . 
                        . f e e e e f f f e e e e f . . 
                        . f f f f f e e e 2 2 2 2 e f . 
                        f f f e 2 2 2 f f f f f e 2 f . 
                        f f f f f f f f f e e e f f f . 
                        f e f e 4 4 e b b f 4 4 e e f . 
                        . f e e 4 d 4 b b f d d e f . . 
                        . . f e e e 4 d d d d d f e e c 
                        . . . f 2 2 2 2 2 2 2 e e d d c 
                        . . . f 4 4 4 4 4 5 e 4 4 d d c 
                        . . . f f f f f f f f e e e e . 
                        . . . f f f . . . f f . . . . . 
                        `,img`
                        . . . . . . . f f . . . . . . . 
                        . . . . f f f f 2 f f . . . . . 
                        . . f f e e e e f 2 f f . . . . 
                        . f f e e e e e f 2 2 f f . . . 
                        . f e e e e f f e e e e f . . . 
                        . f f f f f e e 2 2 2 2 e f . . 
                        f f f e 2 2 2 f f f f e 2 f . . 
                        f f f f f f f f e e e f f f . . 
                        f e f e 4 4 e b f 4 4 e e f . . 
                        . f e e 4 d 4 b f d d e f . . . 
                        . . f e e e 4 d d d e e . c . . 
                        . . . f 2 2 2 2 e e d d e c c c 
                        . . . f 4 4 4 e 4 4 d d e c d d 
                        . . . f f f f f e e e e . c c c 
                        . . f f f f f f f f . . . c . . 
                        . . f f f . . f f . . . . . . . 
                        `,img`
                        . . . . . . . f f . . . . . . . 
                        . . . . f f f f 2 f f . . . . . 
                        . . f f e e e e f 2 f f . . . . 
                        . f f e e e e e f 2 2 f f . . . 
                        . f e e e e f f e e e e f . . . 
                        . f f f f f e e 2 2 2 2 e f . . 
                        f f f e 2 2 2 f f f f e 2 f . . 
                        f f f f f f f f e e e f f f . . 
                        f e f e 4 4 e b f 4 4 e e f . . 
                        . f e e 4 d 4 b f d d e f . . . 
                        . . f e e e 4 d d d e e . . . . 
                        . . . f 2 2 2 2 e e d d e . . . 
                        . . . f 4 4 4 e 4 4 d d e . . . 
                        . . . f f f f f e e e e . . . . 
                        . . f f f f f f f f . . . . . . 
                        . . f f f . . f f . . . . . . . 
                        `],
                    100,
                    false
                    )
                    katana = sprites.createProjectileFromSprite(img`
                        . . c . . . . . . . 
                        . . c c c c c c c c 
                        c c c d d d d d d . 
                        . . c c c c c c . . 
                        . . c . . . . . . . 
                        `, mySprite, 100, 0)
                    scene.cameraShake(1, 100)
                    statusbar4 = statusbars.create(5, 1, StatusBarKind.Magic)
                    statusbar4.max = piercing
                    statusbar4.value = piercing
                    statusbar4.attachToSprite(katana, 2, 2)
                    cooldown = 1
                    pause(200)
                    katana.changeScale(0.5, ScaleAnchor.Middle)
                    katana.x += 5
                    katana.y += 5
                    pause(200)
                    cooldown = 0
                    statusbar2.value += -5
                }
            } else {
                pauseUntil(() => cooldown == 0)
            }
        } else {
            if (cooldown == 0) {
                if (statusbar2.value < 5) {
                	
                } else {
                    animation.runImageAnimation(
                    mySprite,
                    [img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . f f f f f f . . . . 
                        . . . . . f 2 f e e e e f f . . 
                        . . . . f 2 2 2 f e e e e f f . 
                        c . . . f e e e e f f e e e f . 
                        d c . f e 2 2 2 2 e e f f f f . 
                        d d c f 2 e f f f f 2 2 2 e f . 
                        c d d c f f e e e f f f f f f f 
                        . c d d c e 4 4 f b e 4 4 e f f 
                        . . c d c e d d f 1 4 d 4 e e f 
                        . . c c c d e d d d 4 e e e f . 
                        . . . e d d 4 e 4 4 e e f f . . 
                        . . . . e e 4 4 2 2 2 2 f . . . 
                        . . . . . f 2 e 2 2 2 2 f . . . 
                        . . . . . f 5 5 4 4 4 4 f . . . 
                        . . . . . . f f f f f f . . . . 
                        `,img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . f f f . . . . . . . 
                        . . . . . f 2 f f f f f . . . . 
                        . . . f f 2 2 e e e e e f f . . 
                        . . f f 2 2 2 e e e e e e f f . 
                        . . f e e e e f f f e e e e f . 
                        . f e 2 2 2 2 e e e f f f f f . 
                        . f 2 e f f f f f 2 2 2 e f f f 
                        . f f f e e e f f f f f f f f f 
                        . f e e 4 4 f b b e 4 4 e f e f 
                        . . f e d d f b b 4 d 4 e e f . 
                        c e e f d d d d d 4 e e e f . . 
                        c d d e e 2 2 2 2 2 2 2 f . . . 
                        c d d 4 4 e 5 4 4 4 4 4 f . . . 
                        . e e e e f f f f f f f f . . . 
                        . . . . . f f . . . f f f . . . 
                        `,img`
                        . . . . . . . f f . . . . . . . 
                        . . . . . f f 2 f f f f . . . . 
                        . . . . f f 2 f e e e e f f . . 
                        . . . f f 2 2 f e e e e e f f . 
                        . . . f e e e e f f e e e e f . 
                        . . f e 2 2 2 2 e e f f f f f . 
                        . . f 2 e f f f f 2 2 2 e f f f 
                        . . f f f e e e f f f f f f f f 
                        . . f e e 4 4 f b e 4 4 e f e f 
                        . . . f e d d f b 4 d 4 e e f . 
                        . . c . e e d d d 4 e e e f . . 
                        c c c e d d e e 2 2 2 2 f . . . 
                        d d c e d d 4 4 e 4 4 4 f . . . 
                        c c c . e e e e f f f f f . . . 
                        . . c . . . f f f f f f f f . . 
                        . . . . . . . f f . . f f f . . 
                        `,img`
                        . . . . . . . f f . . . . . . . 
                        . . . . . f f 2 f f f f . . . . 
                        . . . . f f 2 f e e e e f f . . 
                        . . . f f 2 2 f e e e e e f f . 
                        . . . f e e e e f f e e e e f . 
                        . . f e 2 2 2 2 e e f f f f f . 
                        . . f 2 e f f f f 2 2 2 e f f f 
                        . . f f f e e e f f f f f f f f 
                        . . f e e 4 4 f b e 4 4 e f e f 
                        . . . f e d d f b 4 d 4 e e f . 
                        . . . . e e d d d 4 e e e f . . 
                        . . . e d d e e 2 2 2 2 f . . . 
                        . . . e d d 4 4 e 4 4 4 f . . . 
                        . . . . e e e e f f f f f . . . 
                        . . . . . . f f f f f f f f . . 
                        . . . . . . . f f . . f f f . . 
                        `],
                    100,
                    false
                    )
                    pause(200)
                    cooldown = 1
                    katana = sprites.createProjectileFromSprite(img`
                        . . . . . . . c . . 
                        c c c c c c c c . . 
                        . d d d d d d c c c 
                        . . c c c c c c . . 
                        . . . . . . . c . . 
                        `, mySprite, -100, 0)
                    scene.cameraShake(1, 100)
                    statusbar4 = statusbars.create(5, 1, StatusBarKind.Magic)
                    statusbar4.max = piercing
                    statusbar4.value = piercing
                    statusbar4.attachToSprite(katana, 2, 2)
                    katana.changeScale(0.5, ScaleAnchor.Middle)
                    katana.x += -5
                    katana.y += 5
                    pause(200)
                    cooldown = 0
                    statusbar2.value += -5
                }
            } else {
                pauseUntil(() => cooldown == 0)
            }
        }
    }
    if (CharacterCustom == 2) {
        if (facing_right) {
            if (cooldown == 0) {
                if (statusbar2.value < 5) {
                	
                } else {
                    animation.runImageAnimation(
                    mySprite,
                    assets.animation`right shot0`,
                    100,
                    false
                    )
                    katana = sprites.createProjectileFromSprite(img`
                        . . c . . . . . . . 
                        . . c c c c c c c c 
                        c c c d d d d d d . 
                        . . c c c c c c . . 
                        . . c . . . . . . . 
                        `, mySprite, 100, 0)
                    scene.cameraShake(1, 100)
                    statusbar4 = statusbars.create(5, 1, StatusBarKind.Magic)
                    statusbar4.max = piercing
                    statusbar4.value = piercing
                    statusbar4.attachToSprite(katana, 2, 2)
                    cooldown = 1
                    pause(200)
                    katana.changeScale(0.5, ScaleAnchor.Middle)
                    katana.x += 5
                    katana.y += 5
                    pause(200)
                    cooldown = 0
                    statusbar2.value += -5
                }
            } else {
                pauseUntil(() => cooldown == 0)
            }
        } else {
            if (cooldown == 0) {
                if (statusbar2.value < 5) {
                	
                } else {
                    animation.runImageAnimation(
                    mySprite,
                    assets.animation`left shot`,
                    100,
                    false
                    )
                    pause(200)
                    cooldown = 1
                    katana = sprites.createProjectileFromSprite(img`
                        . . . . . . . c . . 
                        c c c c c c c c . . 
                        . d d d d d d c c c 
                        . . c c c c c c . . 
                        . . . . . . . c . . 
                        `, mySprite, -100, 0)
                    scene.cameraShake(1, 100)
                    statusbar4 = statusbars.create(5, 1, StatusBarKind.Magic)
                    statusbar4.max = piercing
                    statusbar4.value = piercing
                    statusbar4.attachToSprite(katana, 2, 2)
                    katana.changeScale(0.5, ScaleAnchor.Middle)
                    katana.x += -5
                    katana.y += 5
                    pause(200)
                    cooldown = 0
                    statusbar2.value += -5
                }
            } else {
                pauseUntil(() => cooldown == 0)
            }
        }
    }
    if (CharacterCustom == 3) {
        if (facing_right) {
            if (cooldown == 0) {
                if (statusbar2.value < 5) {
                	
                } else {
                    animation.runImageAnimation(
                    mySprite,
                    assets.animation`myAnim4`,
                    100,
                    false
                    )
                    katana = sprites.createProjectileFromSprite(img`
                        . . c . . . . . . . 
                        . . c c c c c c c c 
                        c c c d d d d d d . 
                        . . c c c c c c . . 
                        . . c . . . . . . . 
                        `, mySprite, 150, 0)
                    scene.cameraShake(1, 100)
                    statusbar4 = statusbars.create(10, 2, StatusBarKind.Magic)
                    statusbar4.max = piercing
                    statusbar4.value = piercing
                    statusbar4.attachToSprite(katana, 2, 2)
                    cooldown = 1
                    pause(200)
                    katana.changeScale(0.5, ScaleAnchor.Middle)
                    katana.x += 5
                    katana.y += 5
                    pause(200)
                    cooldown = 0
                    statusbar2.value += -5
                }
            } else {
                pauseUntil(() => cooldown == 0)
            }
        } else {
            if (cooldown == 0) {
                if (statusbar2.value < 5) {
                	
                } else {
                    animation.runImageAnimation(
                    mySprite,
                    assets.animation`myAnim5`,
                    100,
                    false
                    )
                    pause(200)
                    cooldown = 1
                    katana = sprites.createProjectileFromSprite(img`
                        . . . . . . . c . . 
                        c c c c c c c c . . 
                        . d d d d d d c c c 
                        . . c c c c c c . . 
                        . . . . . . . c . . 
                        `, mySprite, -150, 0)
                    scene.cameraShake(1, 100)
                    statusbar4 = statusbars.create(10, 2, StatusBarKind.Magic)
                    statusbar4.max = piercing
                    statusbar4.value = piercing
                    statusbar4.attachToSprite(katana, 2, 2)
                    katana.changeScale(0.5, ScaleAnchor.Middle)
                    katana.x += -5
                    katana.y += 5
                    pause(200)
                    cooldown = 0
                    statusbar2.value += -5
                }
            } else {
                pauseUntil(() => cooldown == 0)
            }
        }
    }
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(mySprite3, effects.disintegrate, 200)
})
info.onCountdownEnd(function () {
    Kills_per_round = 0
    if (boss_active == 0) {
        info.startCountdown(20)
    }
})
statusbars.onStatusReached(StatusBarKind.Magic, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Fixed, 0, function (status) {
    sprites.destroy(statusbar4.spriteAttachedTo(), effects.disintegrate, 50)
})
function play_game () {
    if (blockSettings.exists("Played")) {
        ExpP1 = blockSettings.readNumber("P1Exp")
        ExpP2 = blockSettings.readNumber("P2Exp")
        ExpP3 = blockSettings.readNumber("P3Exp")
        P1Level = blockSettings.readNumber("LevelP1")
        P2Level = blockSettings.readNumber("LevelP2")
        P3Level = blockSettings.readNumber("LevelP3")
    } else {
        P1Level = 1
        P2Level = 1
        P3Level = 1
    }
    piercing = 1
    pierce_upg_price = 10
    username = game.askForString("Username", 7)
    music.play(music.stringPlayable("F C G F E A F D ", 133), music.PlaybackMode.LoopingInBackground)
    story.printCharacterText("Pick character: 1 = Normal, 2 = -Hp +Energy, 3 = -Energy +Hp ")
    CharacterCustom = game.askForNumber("Character selection 1-3", 1)
    level = game.askForNumber("Difficulty select, 1-3", 1)
    map = level
    Rounds = 1
    story.printCharacterText("Charater 1 Level: " + ("" + P1Level + (" Charater 1 XP: " + ("" + ExpP1 + "/200"))))
    pause(2000)
    story.printCharacterText("Charater 2 level: " + ("" + P2Level + (" Charater 2 XP:" + ("" + ExpP2 + "/200"))))
    pause(2000)
    story.printCharacterText("Charater 3 level: " + ("" + P3Level + (" Charater 3 XP:" + ("" + ExpP3 + "/200"))))
    pause(2000)
    if (CharacterCustom == 1) {
        mySprite = sprites.create(img`
            . . . . . f f f f . . . . . 
            . . . f f f 2 2 f f f . . . 
            . . f f f 2 2 2 2 f f f . . 
            . f f f e e e e e e f f f . 
            . f f e 2 2 2 2 2 2 e e f . 
            . f e 2 f f f f f f 2 e f . 
            . f f f f e e e e f f f f . 
            f f e f b f 4 4 f b f e f f 
            f e e 4 1 f d d f 1 4 e e f 
            . f e e d d d d d d e e f . 
            . . f e e 4 4 4 4 e e f . . 
            . e 4 f 2 2 2 2 2 2 f 4 e . 
            . 4 d f 2 2 2 2 2 2 f d 4 . 
            . 4 4 f 4 4 5 5 4 4 f 4 4 . 
            . . . . f f f f f f . . . . 
            . . . . f f . . f f . . . . 
            `, SpriteKind.Player)
        controller.moveSprite(mySprite)
        statusbar = statusbars.create(20, 4, StatusBarKind.Health)
        statusbar2 = statusbars.create(20, 4, StatusBarKind.Energy)
        statusbar.attachToSprite(mySprite, 0, -15)
        statusbar2.attachToSprite(mySprite, 0, 15)
        statusbar.setBarBorder(1, 15)
        statusbar2.setBarBorder(1, 15)
        statusbar.positionDirection(CollisionDirection.Left)
        statusbar.setBarSize(5, 20)
        statusbar.setOffsetPadding(2, 3)
        statusbar2.setOffsetPadding(0, -23.5)
        statusbar.max = 100 + P1Level * 5
        statusbar2.max = 100 + P1Level * 5
        statusbar.value = 100 + P1Level * 5
        statusbar2.value = 100 + P1Level * 5
    }
    if (CharacterCustom == 2) {
        mySprite = sprites.create(img`
            . . . . . f f 4 4 f f . . . . . 
            . . . . f 5 4 5 5 4 5 f . . . . 
            . . . f e 4 5 5 5 5 4 e f . . . 
            . . f b 3 e 4 4 4 4 e 3 b f . . 
            . . f 3 3 3 3 3 3 3 3 3 3 f . . 
            . f 3 3 e b 3 e e 3 b e 3 3 f . 
            . f 3 3 f f e e e e f f 3 3 f . 
            . f b b f b f e e f b f b b f . 
            . f b b e 1 f 4 4 f 1 e b b f . 
            f f b b f 4 4 4 4 4 4 f b b f f 
            f b b f f f e e e e f f f b b f 
            . f e e f b d d d d b f e e f . 
            . . e 4 c d d d d d d c 4 e . . 
            . . e f b d b d b d b b f e . . 
            . . . f f 1 d 1 d 1 d f f . . . 
            . . . . . f f b b f f . . . . . 
            `, SpriteKind.Player)
        controller.moveSprite(mySprite, 120, 120)
        statusbar = statusbars.create(20, 4, StatusBarKind.Health)
        statusbar2 = statusbars.create(20, 4, StatusBarKind.Energy)
        statusbar.attachToSprite(mySprite, 0, -15)
        statusbar2.attachToSprite(mySprite, 0, 15)
        statusbar.setBarBorder(1, 15)
        statusbar2.setBarBorder(1, 15)
        statusbar.positionDirection(CollisionDirection.Left)
        statusbar.setBarSize(5, 20)
        statusbar.setOffsetPadding(2, 3)
        statusbar2.setOffsetPadding(0, -23.5)
        statusbar.max = 85 + P2Level * 5
        statusbar2.max = 125 + P2Level * 5
        statusbar.value = 85 + P2Level * 5
        statusbar2.value = 125 + P2Level * 5
    }
    if (CharacterCustom == 3) {
        mySprite = sprites.create(img`
            . . . . f f f f . . . . . 
            . . f f f f f f f f . . . 
            . f f f f f f c f f f . . 
            f f f f f f c c f f f c . 
            f f f c f f f f f f f c . 
            c c c f f f e e f f c c . 
            f f f f f e e f f c c f . 
            f f f b f e e f b f f f . 
            . f 4 1 f 4 4 f 1 4 f . . 
            . f e 4 4 4 4 4 4 e f . . 
            . f f f e e e e f f f . . 
            f e f b 7 7 7 7 b f e f . 
            e 4 f 7 7 7 7 7 7 f 4 e . 
            e e f 6 6 6 6 6 6 f e e . 
            . . . f f f f f f . . . . 
            . . . f f . . f f . . . . 
            `, SpriteKind.Player)
        controller.moveSprite(mySprite, 85, 85)
        statusbar = statusbars.create(20, 4, StatusBarKind.Health)
        statusbar2 = statusbars.create(20, 4, StatusBarKind.Energy)
        statusbar.attachToSprite(mySprite, 0, -15)
        statusbar2.attachToSprite(mySprite, 0, 15)
        statusbar.setBarBorder(1, 15)
        statusbar2.setBarBorder(1, 15)
        statusbar.positionDirection(CollisionDirection.Left)
        statusbar.setBarSize(5, 20)
        statusbar.setOffsetPadding(2, 3)
        statusbar2.setOffsetPadding(0, -23.5)
        statusbar.max = 125 + P3Level * 5
        statusbar2.max = 85 + P3Level * 5
        statusbar.value = 125 + P3Level * 5
        statusbar2.value = 85 + P3Level * 5
    }
    scene.cameraFollowSprite(mySprite)
    Kills_per_round = 1
    info.startCountdown(20)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 100)
    statusbar4.value += -1
    info.changeCountdownBy(1)
    scene.cameraShake(2, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.coin, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 100)
    coins += 1
    statusbar2.value += 1
})
let projectile: Sprite = null
let LevelupREQ = 0
let Levelscaling = 0
let multiplier_price = 0
let mySprite2: Sprite = null
let coins = 0
let boss_active = 0
let mySprite3: Sprite = null
let statusbar4: StatusBarSprite = null
let cooldown = 0
let facing_right = false
let mySprite4: Sprite = null
let katana: Sprite = null
let statusbar3: StatusBarSprite = null
let Kills_per_round = 0
let statusbar2: StatusBarSprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
let Rounds = 0
let map = 0
let level = 0
let CharacterCustom = 0
let username = ""
let pierce_upg_price = 0
let piercing = 0
let HighScoreNames: string[] = []
let HighScores: number[] = []
let NumberOfHighScores = 0
let P3Level = 0
let P2Level = 0
let P1Level = 0
let ExpP3 = 0
let ExpP2 = 0
let ExpP1 = 0
let Xp_per_Level = 0
Xp_per_Level = 200
if (blockSettings.exists("Played")) {
    ExpP1 = blockSettings.readNumber("P1Exp")
    ExpP2 = blockSettings.readNumber("P2Exp")
    ExpP3 = blockSettings.readNumber("P3Exp")
    P1Level = blockSettings.readNumber("LevelP1")
    P2Level = blockSettings.readNumber("LevelP2")
    P3Level = blockSettings.readNumber("LevelP3")
} else {
    P1Level = 1
    P2Level = 1
    P3Level = 1
}
NumberOfHighScores = 3
HighScores = [0, 0, 0]
HighScoreNames = ["a", "b", "c"]
piercing = 1
pierce_upg_price = 10
username = game.askForString("Username", 7)
music.play(music.stringPlayable("F C G F E A F D ", 133), music.PlaybackMode.LoopingInBackground)
story.printCharacterText("Pick character: 1 = Normal, 2 = -Hp +Energy, 3 = -Energy +Hp ")
CharacterCustom = game.askForNumber("Character selection 1-3", 1)
level = game.askForNumber("Difficulty select, 1-3", 1)
map = level
Rounds = 1
story.printCharacterText("Charater 1 Level: " + ("" + P1Level + (" Charater 1 XP: " + ("" + ExpP1 + "/" + Xp_per_Level))))
pause(2000)
story.printCharacterText("Charater 2 level: " + ("" + P2Level + (" Charater 2 XP:" + ("" + ExpP2 + "/200"))))
pause(2000)
story.printCharacterText("Charater 3 level: " + ("" + P3Level + (" Charater 3 XP:" + ("" + ExpP3 + "/200"))))
pause(2000)
if (CharacterCustom == 1) {
    mySprite = sprites.create(img`
        . . . . . f f f f . . . . . 
        . . . f f f 2 2 f f f . . . 
        . . f f f 2 2 2 2 f f f . . 
        . f f f e e e e e e f f f . 
        . f f e 2 2 2 2 2 2 e e f . 
        . f e 2 f f f f f f 2 e f . 
        . f f f f e e e e f f f f . 
        f f e f b f 4 4 f b f e f f 
        f e e 4 1 f d d f 1 4 e e f 
        . f e e d d d d d d e e f . 
        . . f e e 4 4 4 4 e e f . . 
        . e 4 f 2 2 2 2 2 2 f 4 e . 
        . 4 d f 2 2 2 2 2 2 f d 4 . 
        . 4 4 f 4 4 5 5 4 4 f 4 4 . 
        . . . . f f f f f f . . . . 
        . . . . f f . . f f . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(mySprite)
    statusbar = statusbars.create(20, 4, StatusBarKind.Health)
    statusbar2 = statusbars.create(20, 4, StatusBarKind.Energy)
    statusbar.attachToSprite(mySprite, 0, -15)
    statusbar2.attachToSprite(mySprite, 0, 15)
    statusbar.setBarBorder(1, 15)
    statusbar2.setBarBorder(1, 15)
    statusbar.positionDirection(CollisionDirection.Left)
    statusbar.setBarSize(5, 20)
    statusbar.setOffsetPadding(2, 3)
    statusbar2.setOffsetPadding(0, -23.5)
    statusbar.max = 100 + P1Level * 5
    statusbar2.max = 100 + P1Level * 5
    statusbar.value = 100 + P1Level * 5
    statusbar2.value = 100 + P1Level * 5
}
if (CharacterCustom == 2) {
    mySprite = sprites.create(img`
        . . . . . f f 4 4 f f . . . . . 
        . . . . f 5 4 5 5 4 5 f . . . . 
        . . . f e 4 5 5 5 5 4 e f . . . 
        . . f b 3 e 4 4 4 4 e 3 b f . . 
        . . f 3 3 3 3 3 3 3 3 3 3 f . . 
        . f 3 3 e b 3 e e 3 b e 3 3 f . 
        . f 3 3 f f e e e e f f 3 3 f . 
        . f b b f b f e e f b f b b f . 
        . f b b e 1 f 4 4 f 1 e b b f . 
        f f b b f 4 4 4 4 4 4 f b b f f 
        f b b f f f e e e e f f f b b f 
        . f e e f b d d d d b f e e f . 
        . . e 4 c d d d d d d c 4 e . . 
        . . e f b d b d b d b b f e . . 
        . . . f f 1 d 1 d 1 d f f . . . 
        . . . . . f f b b f f . . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(mySprite, 120, 120)
    statusbar = statusbars.create(20, 4, StatusBarKind.Health)
    statusbar2 = statusbars.create(20, 4, StatusBarKind.Energy)
    statusbar.attachToSprite(mySprite, 0, -15)
    statusbar2.attachToSprite(mySprite, 0, 15)
    statusbar.setBarBorder(1, 15)
    statusbar2.setBarBorder(1, 15)
    statusbar.positionDirection(CollisionDirection.Left)
    statusbar.setBarSize(5, 20)
    statusbar.setOffsetPadding(2, 3)
    statusbar2.setOffsetPadding(0, -23.5)
    statusbar.max = 85 + P2Level * 5
    statusbar2.max = 125 + P2Level * 5
    statusbar.value = 85 + P2Level * 5
    statusbar2.value = 125 + P2Level * 5
}
if (CharacterCustom == 3) {
    mySprite = sprites.create(img`
        . . . . f f f f . . . . . 
        . . f f f f f f f f . . . 
        . f f f f f f c f f f . . 
        f f f f f f c c f f f c . 
        f f f c f f f f f f f c . 
        c c c f f f e e f f c c . 
        f f f f f e e f f c c f . 
        f f f b f e e f b f f f . 
        . f 4 1 f 4 4 f 1 4 f . . 
        . f e 4 4 4 4 4 4 e f . . 
        . f f f e e e e f f f . . 
        f e f b 7 7 7 7 b f e f . 
        e 4 f 7 7 7 7 7 7 f 4 e . 
        e e f 6 6 6 6 6 6 f e e . 
        . . . f f f f f f . . . . 
        . . . f f . . f f . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(mySprite, 85, 85)
    statusbar = statusbars.create(20, 4, StatusBarKind.Health)
    statusbar2 = statusbars.create(20, 4, StatusBarKind.Energy)
    statusbar.attachToSprite(mySprite, 0, -15)
    statusbar2.attachToSprite(mySprite, 0, 15)
    statusbar.setBarBorder(1, 15)
    statusbar2.setBarBorder(1, 15)
    statusbar.positionDirection(CollisionDirection.Left)
    statusbar.setBarSize(5, 20)
    statusbar.setOffsetPadding(2, 3)
    statusbar2.setOffsetPadding(0, -23.5)
    statusbar.max = 125 + P3Level * 5
    statusbar2.max = 85 + P3Level * 5
    statusbar.value = 125 + P3Level * 5
    statusbar2.value = 85 + P3Level * 5
}
scene.cameraFollowSprite(mySprite)
Kills_per_round = 1
info.startCountdown(20)
forever(function () {
    if (Rounds == 10) {
        game.splash("BOSS FIGHT!")
        boss_active = 1
        mySprite3 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . c c c c . . . . . . . . 
            . . c c 5 5 5 5 c c . . . . . . 
            . c 5 5 5 5 5 5 5 5 c . . . . . 
            c 5 5 5 5 5 1 f 5 5 5 c . . . . 
            c 5 5 5 5 5 f f 5 5 5 5 c . . . 
            c 5 5 5 5 5 5 5 5 5 5 5 c . . . 
            c c b b 1 b 5 5 5 5 5 5 d c . . 
            c 5 3 3 3 5 5 5 5 5 d d d c . . 
            . b 5 5 5 5 5 5 5 5 d d d c . . 
            . . c b b c 5 5 b d d d d c c . 
            . c b b c 5 5 b b d d d d c d c 
            . c c c c c c d d d d d d d d c 
            . . . c c c c d 5 5 b d d d c . 
            . . c c c c c b 5 5 b c c c . . 
            . . c b b b c d 5 5 b c . . . . 
            `, SpriteKind.zombieBoss)
        tiles.placeOnRandomTile(mySprite3, assets.tile`myTile5`)
        mySprite3.changeScale(2, ScaleAnchor.Middle)
        mySprite3.follow(mySprite, 20)
        statusbar3 = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
        statusbar3.attachToSprite(mySprite3, 0, 0)
        statusbar3.value = 100
        pauseUntil(() => statusbar3.value <= 0)
        boss_active = 0
        Rounds += 1
    } else if (Rounds == 20) {
        game.splash("BOSS FIGHT!")
        boss_active = 1
        mySprite3 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . c c c c . . . . . . . . 
            . . c c 5 5 5 5 c c . . . . . . 
            . c 5 5 5 5 5 5 5 5 c . . . . . 
            c 5 5 5 5 5 1 f 5 5 5 c . . . . 
            c 5 5 5 5 5 f f 5 5 5 5 c . . . 
            c 5 5 5 5 5 5 5 5 5 5 5 c . . . 
            c c b b 1 b 5 5 5 5 5 5 d c . . 
            c 5 3 3 3 5 5 5 5 5 d d d c . . 
            . b 5 5 5 5 5 5 5 5 d d d c . . 
            . . c b b c 5 5 b d d d d c c . 
            . c b b c 5 5 b b d d d d c d c 
            . c c c c c c d d d d d d d d c 
            . . . c c c c d 5 5 b d d d c . 
            . . c c c c c b 5 5 b c c c . . 
            . . c b b b c d 5 5 b c . . . . 
            `, SpriteKind.zombieBoss)
        tiles.placeOnRandomTile(mySprite3, assets.tile`myTile5`)
        mySprite3.changeScale(2, ScaleAnchor.Middle)
        mySprite3.follow(mySprite, 20)
        statusbar3 = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
        statusbar3.attachToSprite(mySprite3, 0, 0)
        statusbar3.value = 500
        pauseUntil(() => statusbar3.value <= 0)
        boss_active = 0
        Rounds += 1
    } else if (Rounds == 30) {
        game.splash("BOSS FIGHT!")
        boss_active = 1
        mySprite3 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . c c c c . . . . . . . . 
            . . c c 5 5 5 5 c c . . . . . . 
            . c 5 5 5 5 5 5 5 5 c . . . . . 
            c 5 5 5 5 5 1 f 5 5 5 c . . . . 
            c 5 5 5 5 5 f f 5 5 5 5 c . . . 
            c 5 5 5 5 5 5 5 5 5 5 5 c . . . 
            c c b b 1 b 5 5 5 5 5 5 d c . . 
            c 5 3 3 3 5 5 5 5 5 d d d c . . 
            . b 5 5 5 5 5 5 5 5 d d d c . . 
            . . c b b c 5 5 b d d d d c c . 
            . c b b c 5 5 b b d d d d c d c 
            . c c c c c c d d d d d d d d c 
            . . . c c c c d 5 5 b d d d c . 
            . . c c c c c b 5 5 b c c c . . 
            . . c b b b c d 5 5 b c . . . . 
            `, SpriteKind.zombieBoss)
        tiles.placeOnRandomTile(mySprite3, assets.tile`myTile5`)
        mySprite3.changeScale(2, ScaleAnchor.Middle)
        mySprite3.follow(mySprite, 20)
        statusbar3 = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
        statusbar3.attachToSprite(mySprite3, 0, 0)
        statusbar3.value = 1500
        pauseUntil(() => statusbar3.value <= 0)
        boss_active = 0
        Rounds += 1
    } else if (Rounds == 40) {
        game.splash("BOSS FIGHT!")
        boss_active = 1
        mySprite3 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . c c c c . . . . . . . . 
            . . c c 5 5 5 5 c c . . . . . . 
            . c 5 5 5 5 5 5 5 5 c . . . . . 
            c 5 5 5 5 5 1 f 5 5 5 c . . . . 
            c 5 5 5 5 5 f f 5 5 5 5 c . . . 
            c 5 5 5 5 5 5 5 5 5 5 5 c . . . 
            c c b b 1 b 5 5 5 5 5 5 d c . . 
            c 5 3 3 3 5 5 5 5 5 d d d c . . 
            . b 5 5 5 5 5 5 5 5 d d d c . . 
            . . c b b c 5 5 b d d d d c c . 
            . c b b c 5 5 b b d d d d c d c 
            . c c c c c c d d d d d d d d c 
            . . . c c c c d 5 5 b d d d c . 
            . . c c c c c b 5 5 b c c c . . 
            . . c b b b c d 5 5 b c . . . . 
            `, SpriteKind.zombieBoss)
        tiles.placeOnRandomTile(mySprite3, assets.tile`myTile5`)
        mySprite3.changeScale(2, ScaleAnchor.Middle)
        mySprite3.follow(mySprite, 20)
        statusbar3 = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
        statusbar3.attachToSprite(mySprite3, 0, 0)
        statusbar3.value = 3000
        pauseUntil(() => statusbar3.value <= 0)
        boss_active = 0
        Rounds += 1
    } else if (Rounds == 50) {
        game.splash("BOSS FIGHT!")
        boss_active = 1
        mySprite3 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . c c c c . . . . . . . . 
            . . c c 5 5 5 5 c c . . . . . . 
            . c 5 5 5 5 5 5 5 5 c . . . . . 
            c 5 5 5 5 5 1 f 5 5 5 c . . . . 
            c 5 5 5 5 5 f f 5 5 5 5 c . . . 
            c 5 5 5 5 5 5 5 5 5 5 5 c . . . 
            c c b b 1 b 5 5 5 5 5 5 d c . . 
            c 5 3 3 3 5 5 5 5 5 d d d c . . 
            . b 5 5 5 5 5 5 5 5 d d d c . . 
            . . c b b c 5 5 b d d d d c c . 
            . c b b c 5 5 b b d d d d c d c 
            . c c c c c c d d d d d d d d c 
            . . . c c c c d 5 5 b d d d c . 
            . . c c c c c b 5 5 b c c c . . 
            . . c b b b c d 5 5 b c . . . . 
            `, SpriteKind.zombieBoss)
        tiles.placeOnRandomTile(mySprite3, assets.tile`myTile5`)
        mySprite3.changeScale(2, ScaleAnchor.Middle)
        mySprite3.follow(mySprite, 20)
        statusbar3 = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
        statusbar3.attachToSprite(mySprite3, 0, 0)
        statusbar3.value = 7500
        pauseUntil(() => statusbar3.value <= 0)
        boss_active = 0
        Rounds += 1
    } else {
        if (level == 1) {
            for (let index = 0; index < Rounds + 0; index++) {
                mySprite2 = sprites.create(img`
                    ........................
                    ........................
                    ........................
                    ........................
                    ..........ffff..........
                    ........ff1111ff........
                    .......fb111111bf.......
                    .......f11111111f.......
                    ......fd11111111df......
                    ......fd11111111df......
                    ......fddd1111dddf......
                    ......fbdbfddfbdbf......
                    ......fcdcf11fcdcf......
                    .......fb111111bf.......
                    ......fffcdb1bdffff.....
                    ....fc111cbfbfc111cf....
                    ....f1b1b1ffff1b1b1f....
                    ....fbfbffffffbfbfbf....
                    .........ffffff.........
                    ...........fff..........
                    ........................
                    ........................
                    ........................
                    ........................
                    `, SpriteKind.Enemy)
                if (map == 1) {
                    tiles.placeOnRandomTile(mySprite2, assets.tile`myTile`)
                } else if (map == 2) {
                    tiles.placeOnRandomTile(mySprite2, assets.tile`myTile1`)
                } else if (map == 3) {
                    tiles.placeOnRandomTile(mySprite2, assets.tile`myTile3`)
                }
                mySprite2.follow(mySprite, randint(30, 65))
                pause(200)
            }
            pauseUntil(() => Kills_per_round == 0)
            Rounds += 1
            Kills_per_round = Rounds
        }
        if (level == 2) {
            for (let index = 0; index < Rounds + 1; index++) {
                mySprite2 = sprites.create(img`
                    ........................
                    ........................
                    ........................
                    ........................
                    ..........ffff..........
                    ........ff1111ff........
                    .......fb111111bf.......
                    .......f11111111f.......
                    ......fd11111111df......
                    ......fd11111111df......
                    ......fddd1111dddf......
                    ......fbdbfddfbdbf......
                    ......fcdcf11fcdcf......
                    .......fb111111bf.......
                    ......fffcdb1bdffff.....
                    ....fc111cbfbfc111cf....
                    ....f1b1b1ffff1b1b1f....
                    ....fbfbffffffbfbfbf....
                    .........ffffff.........
                    ...........fff..........
                    ........................
                    ........................
                    ........................
                    ........................
                    `, SpriteKind.Enemy)
                if (map == 1) {
                    tiles.placeOnRandomTile(mySprite2, assets.tile`myTile`)
                } else if (map == 2) {
                    tiles.placeOnRandomTile(mySprite2, assets.tile`myTile1`)
                } else if (map == 3) {
                    tiles.placeOnRandomTile(mySprite2, assets.tile`myTile3`)
                }
                mySprite2.follow(mySprite, randint(30, 65))
                pause(200)
            }
            pauseUntil(() => Kills_per_round == 0)
            Rounds += 1
            Kills_per_round = Rounds
        }
        if (level == 3) {
            for (let index = 0; index < Rounds + 2; index++) {
                mySprite2 = sprites.create(img`
                    ........................
                    ........................
                    ........................
                    ........................
                    ..........ffff..........
                    ........ff1111ff........
                    .......fb111111bf.......
                    .......f11111111f.......
                    ......fd11111111df......
                    ......fd11111111df......
                    ......fddd1111dddf......
                    ......fbdbfddfbdbf......
                    ......fcdcf11fcdcf......
                    .......fb111111bf.......
                    ......fffcdb1bdffff.....
                    ....fc111cbfbfc111cf....
                    ....f1b1b1ffff1b1b1f....
                    ....fbfbffffffbfbfbf....
                    .........ffffff.........
                    ...........fff..........
                    ........................
                    ........................
                    ........................
                    ........................
                    `, SpriteKind.Enemy)
                if (map == 1) {
                    tiles.placeOnRandomTile(mySprite2, assets.tile`myTile`)
                } else if (map == 2) {
                    tiles.placeOnRandomTile(mySprite2, assets.tile`myTile1`)
                } else if (map == 3) {
                    tiles.placeOnRandomTile(mySprite2, assets.tile`myTile3`)
                }
                mySprite2.follow(mySprite, randint(30, 65))
                pause(200)
            }
            pauseUntil(() => Kills_per_round == 0)
            Rounds += 1
            Kills_per_round = Rounds
        }
    }
})
game.onUpdateInterval(100, function () {
    mySprite.sayText("" + username + (" round" + Rounds))
    if (statusbar2.value < 100) {
        statusbar2.value += 1
    }
})
forever(function () {
    if (coins >= pierce_upg_price) {
        coins = 0
        pierce_upg_price += 3 * multiplier_price
        piercing += 1
        multiplier_price += 1
    }
})
forever(function () {
    characterAnimations.loopFrames(
    mySprite2,
    [img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f1111111df.......
        ......fd1111111ddf......
        ......fd111111dddf......
        ......fd111ddddddf......
        ......fd1dfbddddbf......
        ......fbddfcdbbbcf......
        .......f11111bbcf.......
        .......f1b1fffff........
        .......fbfc111bf........
        ........ff1b1bff........
        .........fbfbfff.f......
        ..........ffffffff......
        ............fffff.......
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        .........fffff..........
        ........f11111ff........
        .......fb111111bf.......
        .......f1111111dbf......
        ......fd111111dddf......
        ......fd11111ddddf......
        ......fd11dddddddf......
        ......f111dddddddf......
        ......f11fcddddddf......
        .....fb1111bdddbf.......
        .....f1b1bdfcfff........
        .....fbfbffffffff.......
        ......fffffffffff.ff....
        ...........ffffffff.....
        ........f1b1bffffff.....
        ........fbfbffffff......
        ........................
        ........................
        ........................
        ........................
        `],
    100,
    characterAnimations.rule(Predicate.MovingLeft)
    )
})
forever(function () {
    characterAnimations.loopFrames(
    mySprite2,
    [img`
        ........................
        ........................
        ........................
        ........................
        ..........fffff.........
        ........ff11111f........
        .......fb111111bf.......
        ......fbd1111111f.......
        ......fddd111111df......
        ......fdddd11111df......
        ......fddddddd11df......
        ......fddddddd111f......
        ......fddddddcf11f......
        .......fbdddb1111bf.....
        ........fffcfdb1b1f.....
        .......ffffffffbfbf.....
        ....ff.fffffffffff......
        .....ffffffff...........
        .....ffffffb1b1f........
        ......ffffffbfbf........
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......fd1111111f.......
        ......fdd1111111df......
        ......fddd111111df......
        ......fdddddd111df......
        ......fbddddbfd1df......
        ......fcbbbdcfddbf......
        .......fcbb11111f.......
        ........fffff1b1f.......
        ........fb111cfbf.......
        ........ffb1b1ff........
        ......f.fffbfbf.........
        ......ffffffff..........
        .......fffff............
        ........................
        ........................
        ........................
        ........................
        `],
    100,
    characterAnimations.rule(Predicate.MovingRight)
    )
})
forever(function () {
    if (ExpP1 == Xp_per_Level) {
        LevelUp()
    }
    if (ExpP2 == Xp_per_Level) {
        LevelUp()
    }
    if (ExpP3 == Xp_per_Level) {
        LevelUp()
    }
})
forever(function () {
    characterAnimations.loopFrames(
    mySprite3,
    assets.animation`myAnim1`,
    200,
    characterAnimations.rule(Predicate.MovingRight)
    )
})
forever(function () {
    characterAnimations.loopFrames(
    mySprite3,
    assets.animation`myAnim0`,
    200,
    characterAnimations.rule(Predicate.MovingLeft)
    )
})
forever(function () {
    if (CharacterCustom == 1) {
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . f f f f f f . . . . . . 
            . . . f 2 f e e e e f f . . . . 
            . . f 2 2 2 f e e e e f f . . . 
            . . f e e e e f f e e e f . . . 
            . f e 2 2 2 2 e e f f f f . . . 
            . f 2 e f f f f 2 2 2 e f . . . 
            . f f f e e e f f f f f f f . . 
            . f e e 4 4 f b e 4 4 e f f . . 
            . . f e d d f 1 4 d 4 e e f . . 
            . . . f d d d d 4 e e e f . . . 
            . . . f e 4 4 4 e e f f . . . . 
            . . . f 2 2 2 e d d 4 . . . . . 
            . . . f 2 2 2 e d d e . . . . . 
            . . . f 5 5 4 f e e f . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . . . f f f . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . f 2 f e e e e f f . . . . 
            . . f 2 2 2 f e e e e f f . . . 
            . . f e e e e f f e e e f . . . 
            . f e 2 2 2 2 e e f f f f . . . 
            . f 2 e f f f f 2 2 2 e f . . . 
            . f f f e e e f f f f f f f . . 
            . f e e 4 4 f b e 4 4 e f f . . 
            . . f e d d f 1 4 d 4 e e f . . 
            . . . f d d d e e e e e f . . . 
            . . . f e 4 e d d 4 f . . . . . 
            . . . f 2 2 e d d e f . . . . . 
            . . f f 5 5 f e e f f f . . . . 
            . . f f f f f f f f f f . . . . 
            . . . f f f . . . f f . . . . . 
            `,img`
            . . . . f f f f f f . . . . . . 
            . . . f 2 f e e e e f f . . . . 
            . . f 2 2 2 f e e e e f f . . . 
            . . f e e e e f f e e e f . . . 
            . f e 2 2 2 2 e e f f f f . . . 
            . f 2 e f f f f 2 2 2 e f . . . 
            . f f f e e e f f f f f f f . . 
            . f e e 4 4 f b e 4 4 e f f . . 
            . . f e d d f 1 4 d 4 e e f . . 
            . . . f d d d d 4 e e e f . . . 
            . . . f e 4 4 4 e e f f . . . . 
            . . . f 2 2 2 e d d 4 . . . . . 
            . . . f 2 2 2 e d d e . . . . . 
            . . . f 5 5 4 f e e f . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . . . f f f . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . f 2 f e e e e f f . . . . 
            . . f 2 2 2 f e e e e f f . . . 
            . . f e e e e f f e e e f . . . 
            . f e 2 2 2 2 e e f f f f . . . 
            . f 2 e f f f f 2 2 2 e f . . . 
            . f f f e e e f f f f f f f . . 
            . f e e 4 4 f b e 4 4 e f f . . 
            . . f e d d f 1 4 d 4 e e f . . 
            . . . f d d d d 4 e e e f . . . 
            . . . f e 4 4 4 e d d 4 . . . . 
            . . . f 2 2 2 2 e d d e . . . . 
            . . f f 5 5 4 4 f e e f . . . . 
            . . f f f f f f f f f f . . . . 
            . . . f f f . . . f f . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . f f f f f f . . . . 
            . . . . f f e e e e f 2 f . . . 
            . . . f f e e e e f 2 2 2 f . . 
            . . . f e e e f f e e e e f . . 
            . . . f f f f e e 2 2 2 2 e f . 
            . . . f e 2 2 2 f f f f e 2 f . 
            . . f f f f f f f e e e f f f . 
            . . f f e 4 4 e b f 4 4 e e f . 
            . . f e e 4 d 4 1 f d d e f . . 
            . . . f e e e 4 d d d d f . . . 
            . . . . f f e e 4 4 4 e f . . . 
            . . . . . 4 d d e 2 2 2 f . . . 
            . . . . . e d d e 2 2 2 f . . . 
            . . . . . f e e f 4 5 5 f . . . 
            . . . . . . f f f f f f . . . . 
            . . . . . . . f f f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f f f . . . . 
            . . . . f f e e e e f 2 f . . . 
            . . . f f e e e e f 2 2 2 f . . 
            . . . f e e e f f e e e e f . . 
            . . . f f f f e e 2 2 2 2 e f . 
            . . . f e 2 2 2 f f f f e 2 f . 
            . . f f f f f f f e e e f f f . 
            . . f f e 4 4 e b f 4 4 e e f . 
            . . f e e 4 d 4 1 f d d e f . . 
            . . . f e e e e e d d d f . . . 
            . . . . . f 4 d d e 4 e f . . . 
            . . . . . f e d d e 2 2 f . . . 
            . . . . f f f e e f 5 5 f f . . 
            . . . . f f f f f f f f f f . . 
            . . . . . f f . . . f f f . . . 
            `,img`
            . . . . . . f f f f f f . . . . 
            . . . . f f e e e e f 2 f . . . 
            . . . f f e e e e f 2 2 2 f . . 
            . . . f e e e f f e e e e f . . 
            . . . f f f f e e 2 2 2 2 e f . 
            . . . f e 2 2 2 f f f f e 2 f . 
            . . f f f f f f f e e e f f f . 
            . . f f e 4 4 e b f 4 4 e e f . 
            . . f e e 4 d 4 1 f d d e f . . 
            . . . f e e e 4 d d d d f . . . 
            . . . . f f e e 4 4 4 e f . . . 
            . . . . . 4 d d e 2 2 2 f . . . 
            . . . . . e d d e 2 2 2 f . . . 
            . . . . . f e e f 4 5 5 f . . . 
            . . . . . . f f f f f f . . . . 
            . . . . . . . f f f . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f f f . . . . 
            . . . . f f e e e e f 2 f . . . 
            . . . f f e e e e f 2 2 2 f . . 
            . . . f e e e f f e e e e f . . 
            . . . f f f f e e 2 2 2 2 e f . 
            . . . f e 2 2 2 f f f f e 2 f . 
            . . f f f f f f f e e e f f f . 
            . . f f e 4 4 e b f 4 4 e e f . 
            . . f e e 4 d 4 1 f d d e f . . 
            . . . f e e e 4 d d d d f . . . 
            . . . . 4 d d e 4 4 4 e f . . . 
            . . . . e d d e 2 2 2 2 f . . . 
            . . . . f e e f 4 4 5 5 f f . . 
            . . . . f f f f f f f f f f . . 
            . . . . . f f . . . f f f . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f e e d d d d d d e e f . . 
            . . . f e e 4 4 4 4 e e f . . . 
            . . e 4 f 2 2 2 2 2 2 f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . f f e 2 f f f f f f 2 e f f . 
            . f f f f f e e e e f f f f f . 
            . . f e f b f 4 4 f b f e f . . 
            . . f e 4 1 f d d f 1 4 e f . . 
            . . . f e 4 d d d d 4 e f e . . 
            . . f e f 2 2 2 2 e d d 4 e . . 
            . . e 4 f 2 2 2 2 e d d e . . . 
            . . . . f 4 4 5 5 f e e . . . . 
            . . . . f f f f f f f . . . . . 
            . . . . f f f . . . . . . . . . 
            `,img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f e e d d d d d d e e f . . 
            . . . f e e 4 4 4 4 e e f . . . 
            . . e 4 f 2 2 2 2 2 2 f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f e e 2 2 2 2 2 2 e f f . . 
            . f f e 2 f f f f f f 2 e f f . 
            . f f f f f e e e e f f f f f . 
            . . f e f b f 4 4 f b f e f . . 
            . . f e 4 1 f d d f 1 4 e f . . 
            . . e f e 4 d d d d 4 e f . . . 
            . . e 4 d d e 2 2 2 2 f e f . . 
            . . . e d d e 2 2 2 2 f 4 e . . 
            . . . . e e f 5 5 4 4 f . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . . . . . . f f f . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingDown)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . f f f f . . . . . . 
            . . . . f f e e e e f f . . . . 
            . . . f e e e f f e e e f . . . 
            . . f f f f f 2 2 f f f f f . . 
            . . f f e 2 e 2 2 e 2 e f f . . 
            . . f e 2 f 2 f f 2 f 2 e f . . 
            . . f f f 2 2 e e 2 2 f f f . . 
            . f f e f 2 f e e f 2 f e f f . 
            . f e e f f e e e e f e e e f . 
            . . f e e e e e e e e e e f . . 
            . . . f e e e e e e e e f . . . 
            . . e 4 f f f f f f f f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . f f e e e e f f . . . . 
            . . . f e e e f f e e e f . . . 
            . . . f f f f 2 2 f f f f . . . 
            . . f f e 2 e 2 2 e 2 e f f . . 
            . . f e 2 f 2 f f f 2 f e f . . 
            . . f f f 2 f e e 2 2 f f f . . 
            . . f e 2 f f e e 2 f e e f . . 
            . f f e f f e e e f e e e f f . 
            . f f e e e e e e e e e e f f . 
            . . . f e e e e e e e e f . . . 
            . . . e f f f f f f f f 4 e . . 
            . . . 4 f 2 2 2 2 2 e d d 4 . . 
            . . . e f f f f f f e e 4 . . . 
            . . . . f f f . . . . . . . . . 
            `,img`
            . . . . . . f f f f . . . . . . 
            . . . . f f e e e e f f . . . . 
            . . . f e e e f f e e e f . . . 
            . . f f f f f 2 2 f f f f f . . 
            . . f f e 2 e 2 2 e 2 e f f . . 
            . . f e 2 f 2 f f 2 f 2 e f . . 
            . . f f f 2 2 e e 2 2 f f f . . 
            . f f e f 2 f e e f 2 f e f f . 
            . f e e f f e e e e f e e e f . 
            . . f e e e e e e e e e e f . . 
            . . . f e e e e e e e e f . . . 
            . . e 4 f f f f f f f f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . f f e e e e f f . . . . 
            . . . f e e e f f e e e f . . . 
            . . . f f f f 2 2 f f f f . . . 
            . . f f e 2 e 2 2 e 2 e f f . . 
            . . f e f 2 f f f 2 f 2 e f . . 
            . . f f f 2 2 e e f 2 f f f . . 
            . . f e e f 2 e e f f 2 e f . . 
            . f f e e e f e e e f f e f f . 
            . f f e e e e e e e e e e f f . 
            . . . f e e e e e e e e f . . . 
            . . e 4 f f f f f f f f e . . . 
            . . 4 d d e 2 2 2 2 2 f 4 . . . 
            . . . 4 e e f f f f f f e . . . 
            . . . . . . . . . f f f . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingUp)
        )
    }
    if (CharacterCustom == 2) {
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . f 4 4 f f f f . . . . . . . 
            . f 4 5 5 4 5 f b f f . . . . . 
            . f 5 5 5 5 4 e 3 3 b f . . . . 
            . f e 4 4 4 e 3 3 3 3 b f . . . 
            . f 3 3 3 3 3 3 3 3 3 3 f . . . 
            f 3 3 e e 3 b e 3 3 3 3 f . . . 
            f 3 3 e e e f f 3 3 3 3 f . . . 
            f 3 e e e f b f b b b b f . . . 
            . f e 4 4 f 1 e b b b b f . . . 
            . . f 4 4 4 4 f b b b b f f . . 
            . . f e e e f f f b b b b f . . 
            . . f d d d e 4 4 f b b f . . . 
            . . f d d d e 4 4 e f f . . . . 
            . f b d b d b e e b f . . . . . 
            . f f 1 d 1 d 1 d f f . . . . . 
            . . . f f b b f f . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . f 4 4 f f f f . . . . . . . 
            . f 4 5 5 4 5 f b f f . . . . . 
            . f 5 5 5 5 4 e 3 3 b f . . . . 
            . f e 4 4 4 e 3 3 3 3 b f . . . 
            f 3 3 3 3 3 3 3 3 3 3 3 f . . . 
            f 3 3 e e 3 b e 3 3 3 3 f . . . 
            f 3 3 e e e f f 3 3 3 3 f . . . 
            . f e e e f b f b b b b f f . . 
            . . e 4 4 f 1 e b b b b b f . . 
            . . f 4 4 4 4 f b b b b b f . . 
            . . f d d d e 4 4 b b b f . . . 
            . . f d d d e 4 4 f f f . . . . 
            . f d d d b b e e b b f . . . . 
            . f b d 1 d 1 d d b f . . . . . 
            . . f f f b b f f f . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . f f f f 4 4 f . . . . 
            . . . f f b f 5 4 5 5 4 f . . . 
            . . f b 3 3 e 4 5 5 5 5 f . . . 
            . f b 3 3 3 3 e 4 4 4 e f . . . 
            . f 3 3 3 3 3 3 3 3 3 3 f . . . 
            . f 3 3 3 3 e b 3 e e 3 3 f . . 
            . f 3 3 3 3 f f e e e 3 3 f . . 
            . f b b b b f b f e e e 3 f . . 
            . f b b b b e 1 f 4 4 e f . . . 
            f f b b b b f 4 4 4 4 f . . . . 
            f b b b b f f f e e e f . . . . 
            . f b b f 4 4 e d d d f . . . . 
            . . f f e 4 4 e d d d f . . . . 
            . . . f b e e b d b d b f . . . 
            . . . f f d 1 d 1 d 1 f f . . . 
            . . . . . f f b b f f . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f 4 4 f . . . . 
            . . . f f b f 5 4 5 5 4 f . . . 
            . . f b 3 3 e 4 5 5 5 5 f . . . 
            . f b 3 3 3 3 e 4 4 4 e f . . . 
            . f 3 3 3 3 3 3 3 3 3 3 3 f . . 
            . f 3 3 3 3 e b 3 e e 3 3 f . . 
            . f 3 3 3 3 f f e e e 3 3 f . . 
            f f b b b b f b f e e e f . . . 
            f b b b b b e 1 f 4 4 e . . . . 
            f b b b b b f 4 4 4 4 f . . . . 
            . f b b b 4 4 e d d d f . . . . 
            . . f f f 4 4 e d d d f . . . . 
            . . f b b e e b b d d d f . . . 
            . . . f b d d 1 d 1 d b f . . . 
            . . . . f f f b b f f f . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . f f 4 4 f f . . . . . 
            . . . . f 5 4 5 5 4 5 f . . . . 
            . . . f e 4 5 5 5 5 4 e f . . . 
            . . f b 3 e 4 4 4 4 e 3 b f . . 
            . . f 3 3 3 3 3 3 3 3 3 3 f . . 
            . f 3 3 e b 3 e e 3 b e 3 3 f . 
            . f 3 3 f f e e e e f f 3 3 f . 
            . f b b f b f e e f b f b b f . 
            . f b b e 1 f 4 4 f 1 e b b f . 
            f f b b f 4 4 4 4 4 4 f b b f f 
            f b b f f f e e e e f f f b b f 
            . f e e f b d d d d b f e e f . 
            . . e 4 c d d d d d d c 4 e . . 
            . . e f b d b d b d b b f e . . 
            . . . f f 1 d 1 d 1 d f f . . . 
            . . . . . f f b b f f . . . . . 
            `,img`
            . . . . . . . f f . . . . . . . 
            . . . . . f f 4 4 f f . . . . . 
            . . . . f 5 4 5 5 4 5 f . . . . 
            . . . f e 4 5 5 5 5 4 e f . . . 
            . . f b 3 e 4 4 4 4 e 3 b f . . 
            . f e 3 3 3 3 3 3 3 3 3 3 e f . 
            . f 3 3 e b 3 e e 3 b e 3 3 f . 
            . f b 3 f f e e e e f f 3 b f . 
            f f b b f b f e e f b f b b f f 
            f b b b e 1 f 4 4 f 1 e b b b f 
            . f b b e e 4 4 4 4 4 f b b f . 
            . . f 4 4 4 e d d d b f e f . . 
            . . f e 4 4 e d d d d c 4 e . . 
            . . . f e e d d b d b b f e . . 
            . . . f f 1 d 1 d 1 1 f f . . . 
            . . . . . f f f b b f . . . . . 
            `,img`
            . . . . . f f 4 4 f f . . . . . 
            . . . . f 5 4 5 5 4 5 f . . . . 
            . . . f e 4 5 5 5 5 4 e f . . . 
            . . f b 3 e 4 4 4 4 e 3 b f . . 
            . . f 3 3 3 3 3 3 3 3 3 3 f . . 
            . f 3 3 e b 3 e e 3 b e 3 3 f . 
            . f 3 3 f f e e e e f f 3 3 f . 
            . f b b f b f e e f b f b b f . 
            . f b b e 1 f 4 4 f 1 e b b f . 
            f f b b f 4 4 4 4 4 4 f b b f f 
            f b b f f f e e e e f f f b b f 
            . f e e f b d d d d b f e e f . 
            . . e 4 c d d d d d d c 4 e . . 
            . . e f b d b d b d b b f e . . 
            . . . f f 1 d 1 d 1 d f f . . . 
            . . . . . f f b b f f . . . . . 
            `,img`
            . . . . . . . f f . . . . . . . 
            . . . . . f f 4 4 f f . . . . . 
            . . . . f 5 4 5 5 4 5 f . . . . 
            . . . f e 4 5 5 5 5 4 e f . . . 
            . . f b 3 e 4 4 4 4 e 3 b f . . 
            . f e 3 3 3 3 3 3 3 3 3 3 e f . 
            . f 3 3 e b 3 e e 3 b e 3 3 f . 
            . f b 3 f f e e e e f f 3 b f . 
            f f b b f b f e e f b f b b f f 
            f b b b e 1 f 4 4 f 1 e b b b f 
            . f b b f 4 4 4 4 4 e e b b f . 
            . . f e f b d d d e 4 4 4 f . . 
            . . e 4 c d d d d e 4 4 e f . . 
            . . e f b b d b d d e e f . . . 
            . . . f f 1 1 d 1 d 1 f f . . . 
            . . . . . f b b f f f . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingDown)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            .....ff44ff.........
            ....f545545f........
            ...fe333333ef.......
            ..fb33333333bf......
            ..f3333333333f......
            .f333333333333f.....
            .fb3333333333bf.....
            .fbb33333333bbf.....
            .fbbbbbbbbbbbbf.....
            fcbbbbbbbbbbbbcf....
            fbbbbbbbbbbbbbbf....
            .fccbbbbbbbbccf.....
            ..e4cffffffc4e......
            ..efbdbdbdbbfe......
            ...ff1d1d1dff.......
            .....ffbbff.........
            `,img`
            ....................
            .....ff44ff.........
            ....f545545f........
            ...fe333333ef.......
            ..fb33333333bf......
            ..f3333333333f......
            .fb3333333333bf.....
            .fbb33333333bbf.....
            .fbbbbbbbbbbbbf.....
            fcbbbbbbbbbbbbf.....
            fbbbbbbbbbbbbcf.....
            ffbbbbbbbbbbcf......
            .fcccfffffffec......
            ...fbbdbdde44e......
            ...ff11d1deef.......
            .....fbbfff.........
            `,img`
            .....ff44ff.........
            ....f545545f........
            ...fe333333ef.......
            ..fb33333333bf......
            ..f3333333333f......
            .f333333333333f.....
            .fb3333333333bf.....
            .fbb33333333bbf.....
            .fbbbbbbbbbbbbf.....
            fcbbbbbbbbbbbbcf....
            fbbbbbbbbbbbbbbf....
            .fccbbbbbbbbccf.....
            ..e4cffffffc4e......
            ..efbdbdbdbbfe......
            ...ff1d1d1dff.......
            .....ffbbff.........
            `,img`
            ....................
            ....ff44ff..........
            ...f545545f.........
            ..fe333333ef........
            .fb33333333bf.......
            .f3333333333f.......
            fb3333333333bf......
            fbb33333333bbf......
            fbbbbbbbbbbbbf......
            fbbbbbbbbbbbbcf.....
            fcbbbbbbbbbbbbf.....
            .fcbbbbbbbbbbff.....
            .cefffffffcccf......
            .e44eddbdbbf........
            ..feed1d11ff........
            ....fffbbf..........
            `],
        100,
        characterAnimations.rule(Predicate.MovingUp)
        )
    }
    if (CharacterCustom == 3) {
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . f f f f f . . . 
            . . . f f f f f f f f f . 
            . . f f f c f f f f f f . 
            . . f f c f f f c f f f f 
            f f c c f f f c c f f c f 
            f f f f f e f f f f c c f 
            . f f f e e f f f f f f f 
            . . f f e e f b f e e f f 
            . . . f 4 4 f 1 e 4 e f . 
            . . . f 4 4 4 4 e f f f . 
            . . . f f e e e e e f . . 
            . . . f 7 7 7 e 4 4 e . . 
            . . . f 7 7 7 e 4 4 e . . 
            . . . f 6 6 6 f e e f . . 
            . . . . f f f f f f . . . 
            . . . . . . f f f . . . . 
            `,img`
            . . . . . . . . . . . . . 
            . . . . f f f f f f . . . 
            . . . f f f f f f f f f . 
            . . f f f c f f f f f f . 
            . f f f c f f f c f f f f 
            f f c c f f f c c f f c f 
            f f f f f e f f f f c c f 
            . f f f e e f f f f f f f 
            . . f f e e f b f e e f f 
            . . f f 4 4 f 1 e 4 e f . 
            . . . f 4 4 4 e e f f f . 
            . . . f f e e 4 4 e f . . 
            . . . f 7 7 e 4 4 e f . . 
            . . f f 6 6 f e e f f f . 
            . . f f f f f f f f f f . 
            . . . f f f . . . f f . . 
            `,img`
            . . . . . . . . . . . . . 
            . . . . f f f f f f . . . 
            . . . f f f f f f f f f . 
            . . f f f c f f f f f f . 
            . f f f c f f f c f f f f 
            f f c c f f f c c f f c f 
            f f f f f e f f f f c c f 
            . f f f e e f f f f f f f 
            . f f f e e f b f e e f f 
            . . f f 4 4 f 1 e 4 e f f 
            . . . f 4 4 4 4 e f f f . 
            . . . f f e e e e 4 4 4 . 
            . . . f 7 7 7 7 e 4 4 e . 
            . . f f 6 6 6 6 f e e f . 
            . . f f f f f f f f f f . 
            . . . f f f . . . f f . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . . . . . . . . . . 
            . . . f f f f f f . . . . 
            . f f f f f f f f f . . . 
            . f f f f f f c f f f . . 
            f f f f c f f f c f f f . 
            f c f f c c f f f c c f f 
            f c c f f f f e f f f f f 
            f f f f f f f e e f f f . 
            f f e e f b f e e f f f . 
            f f e 4 e 1 f 4 4 f f . . 
            . f f f e 4 4 4 4 f . . . 
            . 4 4 4 e e e e f f . . . 
            . e 4 4 e 7 7 7 7 f . . . 
            . f e e f 6 6 6 6 f f . . 
            . f f f f f f f f f f . . 
            . . f f . . . f f f . . . 
            `,img`
            . . . . . . . . . . . . . 
            . . . f f f f f f . . . . 
            . f f f f f f f f f . . . 
            . f f f f f f c f f f . . 
            f f f f c f f f c f f f . 
            f c f f c c f f f c c f f 
            f c c f f f f e f f f f f 
            f f f f f f f e e f f f . 
            f f e e f b f e e f f . . 
            . f e 4 e 1 f 4 4 f f . . 
            . f f f e e 4 4 4 f . . . 
            . . f e 4 4 e e f f . . . 
            . . f e 4 4 e 7 7 f . . . 
            . f f f e e f 6 6 f f . . 
            . f f f f f f f f f f . . 
            . . f f . . . f f f . . . 
            `,img`
            . . . f f f f f . . . . . 
            . f f f f f f f f f . . . 
            . f f f f f f c f f f . . 
            f f f f c f f f c f f . . 
            f c f f c c f f f c c f f 
            f c c f f f f e f f f f f 
            f f f f f f f e e f f f . 
            f f e e f b f e e f f . . 
            . f e 4 e 1 f 4 4 f . . . 
            . f f f e 4 4 4 4 f . . . 
            . . f e e e e e f f . . . 
            . . e 4 4 e 7 7 7 f . . . 
            . . e 4 4 e 7 7 7 f . . . 
            . . f e e f 6 6 6 f . . . 
            . . . f f f f f f . . . . 
            . . . . f f f . . . . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . f f f f . . . . . 
            . . f f f f f f f f . . . 
            . f f f f f f c f f f . . 
            f f f f f f c c f f f c . 
            f f f c f f f f f f f c . 
            c c c f f f e e f f c c . 
            f f f f f e e f f c c f . 
            f f f b f e e f b f f f . 
            . f 4 1 f 4 4 f 1 4 f . . 
            . f e 4 4 4 4 4 4 e f . . 
            . f f f e e e e f f f . . 
            f e f b 7 7 7 7 b f e f . 
            e 4 f 7 7 7 7 7 7 f 4 e . 
            e e f 6 6 6 6 6 6 f e e . 
            . . . f f f f f f . . . . 
            . . . f f . . f f . . . . 
            `,img`
            . . . . . . . . . . . . . 
            . . . . . f f f f . . . . 
            . . . f f f f f f f f . . 
            . . f f f f f f c f f f . 
            f f f f f f f c c f f f c 
            f f f f c f f f f f f f c 
            . c c c f f f e e f f c c 
            . f f f f f e e f f c c f 
            . f f f b f e e f b f f f 
            . f f 4 1 f 4 4 f 1 4 f f 
            . . f e 4 4 4 4 4 e e f e 
            . f e f b 7 7 7 e 4 4 4 e 
            . e 4 f 7 7 7 7 e 4 4 e . 
            . . . f 6 6 6 6 6 e e . . 
            . . . f f f f f f f . . . 
            . . . f f f . . . . . . . 
            `,img`
            . . . . . . . . . . . . . 
            . . . . f f f f . . . . . 
            . . f f f f f f f f . . . 
            . f f f c f f f f f f . . 
            c f f f c c f f f f f f f 
            c f f f f f f f c f f f f 
            c c f f e e f f f c c c . 
            f c c f f e e f f f f f . 
            f f f b f e e f b f f f . 
            f f 4 1 f 4 4 f 1 4 f f . 
            e f e e 4 4 4 4 4 e f . . 
            e 4 4 4 e 7 7 7 b f e f . 
            . e 4 4 e 7 7 7 7 f 4 e . 
            . . e e 6 6 6 6 6 f . . . 
            . . . f f f f f f f . . . 
            . . . . . . . f f f . . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingDown)
        )
        characterAnimations.loopFrames(
        mySprite,
        [img`
            . . . . f f f f . . . . . 
            . . f f c c c c f f . . . 
            . f f c c c c c c f f . . 
            f f c c c c c c c c f f . 
            f f c c f c c c c c c f . 
            f f f f f c c c f c c f . 
            f f f f c c c f c c f f . 
            f f f f f f f f f f f f . 
            f f f f f f f f f f f f . 
            . f f f f f f f f f f . . 
            . f f f f f f f f f f . . 
            f e f f f f f f f f e f . 
            e 4 f 7 7 7 7 7 7 c 4 e . 
            e e f 6 6 6 6 6 6 f e e . 
            . . . f f f f f f . . . . 
            . . . f f . . f f . . . . 
            `,img`
            . . . . . . . . . . . . . 
            . . . . . f f f f . . . . 
            . . . f f c c c c f f . . 
            . f f f c c c c c c f f . 
            f f c c c c c c c c c f f 
            f c c c c f c c c c c c f 
            . f f f f c c c c f c c f 
            . f f f f c c f c c c f f 
            . f f f f f f f f f f f f 
            . f f f f f f f f f f f f 
            . . f f f f f f f f f f . 
            . . e f f f f f f f f f . 
            . . e f f f f f f f f e f 
            . . 4 c 7 7 7 7 7 e 4 4 e 
            . . e f f f f f f f e e . 
            . . . f f f . . . . . . . 
            `,img`
            . . . . . . . . . . . . . 
            . . . . . f f f f . . . . 
            . . . f f c c c c f f . . 
            . . f f c c c c c c f f . 
            . f f f c c c c c c c f f 
            f f f c c c c c c c c c f 
            f f c c c f c c c c c c f 
            . f f f f f c c c f c f f 
            . f f f f c c f f c f f f 
            . . f f f f f f f f f f f 
            . . f f f f f f f f f f . 
            . . f f f f f f f f f e . 
            . f e f f f f f f f f e . 
            . e 4 4 e 7 7 7 7 7 c 4 . 
            . . e e f f f f f f f e . 
            . . . . . . . . f f f . . 
            `],
        100,
        characterAnimations.rule(Predicate.MovingUp)
        )
    }
})
forever(function () {
    blockSettings.writeNumber("P1Exp", ExpP1)
    blockSettings.writeNumber("P2Exp", ExpP2)
    blockSettings.writeNumber("P3Exp", ExpP3)
    blockSettings.writeNumber("LevelP1", P1Level)
    blockSettings.writeNumber("LevelP2", P2Level)
    blockSettings.writeNumber("LevelP3", P3Level)
    if (CharacterCustom == 1) {
        Levelscaling = P1Level * 2
        LevelupREQ = Levelscaling * 100
        if (ExpP1 >= LevelupREQ) {
            LevelUp()
        }
    } else if (CharacterCustom == 2) {
        Levelscaling = P2Level * 2
        LevelupREQ = Levelscaling * 100
        if (ExpP2 >= LevelupREQ) {
            LevelUp()
        }
    } else {
        Levelscaling = P3Level * 2
        LevelupREQ = Levelscaling * 100
        if (ExpP3 >= LevelupREQ) {
            LevelUp()
        }
    }
})
forever(function () {
    if (map == 1) {
        tiles.setCurrentTilemap(tilemap`level2`)
    } else if (map == 2) {
        tiles.setCurrentTilemap(tilemap`level3`)
    } else if (map == 3) {
        tiles.setCurrentTilemap(tilemap`level4`)
    } else {
        map = game.askForNumber("Pick map 1-3", 1)
    }
})
forever(function () {
    characterAnimations.loopFrames(
    mySprite4,
    assets.animation`myAnim2`,
    100,
    characterAnimations.rule(Predicate.NotMoving)
    )
})
forever(function () {
    multiplier_price = map + 1
})
forever(function () {
    if (boss_active == 1) {
        info.changeCountdownBy(1)
        pause(1000)
    }
})
forever(function () {
    if (boss_active == 1) {
        projectile = sprites.createProjectileFromSprite(img`
            . 3 . . . . . . . . . . . 4 . . 
            . 3 3 . . . . . . . . . 4 4 . . 
            . 3 d 3 . . 4 4 . . 4 4 d 4 . . 
            . . 3 5 3 4 5 5 4 4 d d 4 4 . . 
            . . 3 d 5 d 1 1 d 5 5 d 4 4 . . 
            . . 4 5 5 1 1 1 1 5 1 1 5 4 . . 
            . 4 5 5 5 5 1 1 5 1 1 1 d 4 4 . 
            . 4 d 5 1 1 5 5 5 1 1 1 5 5 4 . 
            . 4 4 5 1 1 5 5 5 5 5 d 5 5 4 . 
            . . 4 3 d 5 5 5 d 5 5 d d d 4 . 
            . 4 5 5 d 5 5 5 d d d 5 5 4 . . 
            . 4 5 5 d 3 5 d d 3 d 5 5 4 . . 
            . 4 4 d d 4 d d d 4 3 d d 4 . . 
            . . 4 5 4 4 4 4 4 4 4 4 4 . . . 
            . 4 5 4 . . 4 4 4 . . . 4 4 . . 
            . 4 4 . . . . . . . . . . 4 4 . 
            `, mySprite3, 0, 0)
        projectile.setKind(SpriteKind.FireBall)
        projectile.follow(mySprite, 50)
        pause(2000)
        sprites.destroy(projectile, effects.disintegrate, 200)
    }
})
