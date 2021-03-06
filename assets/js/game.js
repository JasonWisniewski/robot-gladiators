// function to generate random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() *(max - min + 1) + min);
    
    return value;
};

var fightOrSkip = function () {
    // ask player if they would like to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this abttle?  Enter FIGHT or SKIP to choose");
    
    if (promptFight ==="" || promptFight === "null") {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    // convert prompt fight to lower case
    promptFight = promptFight.toLowerCase();

    if(promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wnats to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes leave fight
        if(confirmSkip) {
            window.alert(playerInfo.name +" has decided to skip this fight. Goodbye!");
            // subtract money from player for skipping
            playerInfo.playerMoney = Math.max(0, playerInfo.money - 10);
            
            // return true if player wants to leave
            return true;
        }
    }
    return false;
};

var fight = function(enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;

    if(Math.random() > 0.5) {
        isPlayerTurn = false;
    }
 
    while(playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            // ask player if they wan to skip or fight 
            if (fightOrSkip()) {
                //  if true leave fight by breaking loop
                break;
            }

            // generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack); 
        
            // remove enemy's helth by subtracting the amount set in the playerattack var
            enemy.health = Math.max(0,enemy.health - damage);
            console.log(
                playerInfo.name + ' attacked ' + enemy.name +  '. ' + enemy.name + ' now has '+enemy.health+ ' health remaining.'
            );

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                // award player money for winning
                playerInfo.money = playerInfo.money + 20;

                // leave while loop since enemy is dead
                break;
            } else {
            window.alert(enemy.name+ " still has " +enemy.health+" health left.");
            }
            // player attacked first
        } else {
            var damage= randomNumber(enemy.attack - 3, enemy.attack);
        
            // remove players health
            playerInfo.health = Math.max(0,playerInfo.health - damage);
            console.log(
                enemy.name+"attacked" +playerInfo.name+"."+playerInfo.health+" health remaining."
            );
                        
            // check players health
            if (playerInfo.health <=0 ) {
                window.alert(playerInfo.name + " has died!");
                // Leave while loop if player is dead
                break;
            } else {
                window.alert(playerInfo.name + "still has "+ playerInfo.health + "health left.");
            }
        }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
};

// fight each enemy-robot looping over them and fighting them one at a time
var startGame = function() {
    // reset player stats
    playerInfo.reset();

    for(var i = 0; i <enemyInfo.length; i++) {
        // if player still alive keep fighting
        if (playerInfo.health > 0) {
            // indicate which round the player is in if still alive
            window.alert("Welcome to Robot Gladiators! Round " + (i+1));
            
            // Pick new enemy to fight
            var pickedEnemyObj = enemyInfo[i];
            
            // reset enemy health before starting new round
            pickedEnemyObj.health = randomNumber(40, 60);
    
            // pass picked enemy name var's value into fight function, assuming the value of enemy.name
           fight (pickedEnemyObj);
            //    if not at last enemy in array
            if (playerInfo.health > 0 && i< enemyInfo.length -1){
                // ask if player wants to use the store before the next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to store
                if(storeConfirm) {
                    shop ();
                }
            }
        }
        //  if player isn't alive, stop the game
        else {
            window.alert ('You have lost your robot in battle! Game Over!');
            break;
        }
    }
    endGame();
};

// function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
    
    //Check local storager for highscore if not there 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    } 

    // if player has more money than hihg score, new high score
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of" + playerInfo.money + "!")
    }
    else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }
    
    // if player is still alive player wins
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    } else {
    window.alert("You've lost your robot in battle.");
    }

    // ask player if they want to play again
    var playerAgainConfirm = window.confirm("Would you like to play again?")
    
    if (playerAgainConfirm) {
        //  restart the game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators!  Come back soon!")
    }
};

// Shop between battles
var shop = function() {
    // ask player what they'd like to do 
    var shopOptionPrompt = window.prompt (
        "You have " + playerInfo.money + "$'s "+ playerInfo.attack + " attack points " + " and " + playerInfo.health + "health" +
        "Would you like to REFILL your health (20 health for 7$), UPGRADE your attack (6 attack for 7$), or LEAVE the store?  Please enter one: 1 for REFILL, 2 for UPDGRADE or 3 for LEAVE to make a choice."
    );

    // convert answer from promt to number rather than string
    shopOptionPrompt = parseInt(shopOptionPrompt);

    // use switch to carry out action
    
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
            
        case 2:
            playerInfo.upgradeAttack();
            break;
        
        case 3:
            window.alert("Leaving the store.");

            // do nothing, so functino will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

// fuction to set player name
var getPlayerName= function(){
    var name ="";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
};
// End Game functions

// GAME INFORMATION / VARIABLES

// Player Info
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function(){
        if(this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7$.");
        this.health += 20;
        this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!")
        }
    },
    upgradeAttack: function() {
        if(this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!")
        }
    }
};

// Enemey info
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        atack: randomNumber(10, 14)
    }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);

// RUN GAME
startGame();      


