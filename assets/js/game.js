var playerName = window.prompt("what is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function() {
    // Alert players that they are starting the round
    window.alert("Welcome to Robot Gladiators!");

    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // if player choses to fight , then fight
    if (promptFight === "fight" || promptFight==="FIGHT") {
        // remove enemy's health by subtracting the amount set in the playerAttack var
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName+" attacked "+enemyName+"."+enemyName+" now has "+ enemyHealth +" health remaining."
        );
        
        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
        } else {
            window.alert(enemyName+ " still has " +enemyHealth+" health left.");
        }

        // remove players health
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName+"attacked" +playerName+"."+playerHealth+" health remaining."
        )
            
        // check players health
        if (playerHealth <=0 ) {
            window.alert(playerName + "has died!");
        } else {
            window.alert(playerName + "still has "+ playerHealth + "health left.");
        }
        // if player chooses to skip
        } else if (promptFight === "skip" || promptFight ==="SKIP") {
            // Confirm that player wnats to skip
            var confirmSkip =window.confirm("are you sure you'd like to quit?")

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // subtract money form playerMoney for skip
                playerMoney = playerMoney - 2;
            }

            // if no  (false), ask quesiton again by running fight() again
            else {
                fight();
            }
            // play did not choose to fight or skip, invalid entry
        } else {
            window.alert("You need to choose a valid option. Try again!");
        }
    };
fight();