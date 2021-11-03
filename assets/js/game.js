var playerName = window.prompt("what is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;


var enemyNames = ["Roborto","Amy Android","Robo Trumble"]
var enemyHealth = 50;
var enemyAttack = 12;



var fight = function(enemyName) {
    while(playerHealth > 0 && enemyHealth > 0) {

        // Alert players that they are starting the round
        // window.alert("Welcome to Robot Gladiators!");

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // if player picks skip then confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {

            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes, leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight.  Goodbye!")
                // subtract money from player for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        // remove enemy's helth by subtracting the amount set in the playerAttack var
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + ' attacked ' + enemyName +  '. ' + enemyName + ' now has '+enemyHealth+ ' health remaining.'
        );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");

            // award player money for winning
            playerMoney = playerMoney + 20;

            // leave while loop since enemy is dead
            break;
        } else {
            window.alert(enemyName+ " still has " +enemyHealth+" health left.");
        }
        // remove players health
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName+"attacked" +playerName+"."+playerHealth+" health remaining."
        );
                        
        // check players health
        if (playerHealth <=0 ) {
            window.alert(playerName + " has died!");
            // Leave while loop if player is dead
            break;
        } else {
            window.alert(playerName + "still has "+ playerHealth + "health left.");
        }
    }
};

// fight each enemy-robot looping over them and fighting them one at a time
var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i = 0; i <enemyNames.length; i++) {
        // if player still alive keep fighting
        if (playerHealth > 0) {
            // indicate which round the player is in if still alive
            window.alert("Welcome to Robot Gladiators! Round " + (i+1));
            
            // Pick new enemy to fight
            var pickedEnemyName = enemyNames[i];
            
            // reset enemy health before starting new round
            enemyHealth = 50;
            fight(enemyNames[i]);
    
            // pass picked enemy name var's value into fight function, assuming the value of enemyname
           fight (pickedEnemyName);
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
    // if player is still alive player wins
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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
    // start game when page loads
    startGame();      


