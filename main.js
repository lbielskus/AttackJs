// create a game where player fights against monster
// player and monster should both have health bars representing health left
// 100 health points each
// game goes like this: player clicks button "hit" and hits enemy
// then enemy automatically hits player back with random damage from 0 to max damage it makes
// when enemy is killed, second random enemy appear with full health bar


// player should be able to change weapon he is equipped with
// each weapon will have it's own effect on player
// (player should have 3 weapons to choose, but can hold only one while fighting)
// on every hit player gets random amount of coins - from 0 to 10
// coins are needed to buy health potions, one potion costs 50 points
// health potions fully restores player health when bought


/*

let enemies = [
    {
        name: "Goblin",
        img: "https://i.imgur.com/yBh7Fn4.png",
        maxDamage: 12
    },
    {
        name: "Troll",
        img: "https://i.pinimg.com/originals/8d/7f/d8/8d7fd8ae9fcd6060497c628e1c7944b4.jpg",
        maxDamage: 8
    },
    {
        name: "Witch",
        img: "https://i.pinimg.com/originals/c0/da/c0/c0dac0da46b4c59534cf898b1967d523.png",
        maxDamage: 15
    }
]

let weapons = {
    sword: {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjeRzenAFh9nuqc0sexfw63azpjKmulkubHg&usqp=CAU",
        damage: 10,
        effect: 'gives player 25% chance to doge enemy attacks'
    },
    magicWand: {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYLtdkk7fwbEwdjNpuL0Oo1ka5A7z0PhL34Q&usqp=CAU",
        damage: 12,
        effect: 'heals player on every enemy hit from 0 to 5 hit points'
    },
    bow: {
        img: "https://preview.pixlr.com/images/800wm/100/1/1001468630.jpg",
        damage: 7,
        effect: 'has a 50% chance to hit enemy two times in a row'
    },
    potion: {
        img: "https://preview.pixlr.com/images/450nwm/100/1/1001468594.jpg",
        info: "can be bought from shop for 50 coins, recovers player health when bought",
    }
}
*/

// each player chooses a move
// defense goes first (player then comp)
// attacks go second (player then comp)
// health gets minused as attacks land



//Global variables >>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var yourMove;
var compMove;
var savedCompMove;
var yourHealth = 100;
var compHealth = 100;

//Turn counters >>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var totRounds = 0;

//Doument rewrites >>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var res;
var playByPlay = document.getElementById('announcements');
var yourHealthBar = document.getElementById('yourHealthBar');
var compHealthBar = document.getElementById('compHealthBar');
var attackButton = document.getElementById('attack');
var counterButton = document.getElementById('counter');
var playAgain = document.getElementById('playAgain');

//Run on load >>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function enableButtons() {
    attackButton.disabled = false;
    counterButton.disabled = false;
}

//Moves >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//Shared Functions >>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// triggers the fight in the HTML
function fight(id) {
    addRound();
    compMove(id);
    healthChange();
    gameOver();
}
// adds a round to the round counters
function addRound() {
    totRounds += 1;
}

//adds the counter action to attack
function counter(y, c) {
    var move = Math.floor((Math.random()*5));
    if (move >= 3 && y === 'attack') {
        res = 'Computers counter was successful! You took 10 damage';
        yourHealth -= 10;
    } else if (move >= 3 && y === 'counter') {
        res = 'Your counter was successful! Comp took 10 damage';
        compHealth -= 10;
    } else if (move < 3 && y === 'attack') {
        res = 'Computer counter failed! You dealt 15 damage!';
        compHealth -= 15;
    } else if (move < 3 && y === 'counter') {
        res = 'Your counter was not successful! You were delalt 15 damage!';
        yourHealth -= 15;
    }

}

// Dislpays results of the round
function roundResults(res) {
    playByPlay.innerHTML += res + "<br>";
}

function healthChange() {
    yourHealthBar.style.width = yourHealth + "%";
    compHealthBar.style.width =  compHealth + "%";
}

function gameOver() {
    if (yourHealth === 0 || compHealth === 0) {
        res = 'gameOver!';
        roundResults(res);
        attackButton.disabled = true;
        counterButton.disabled = true;
        playAgain.disabled = true;
    }
}

//The Game >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Takes the moves of the player and generates one for the comp and then runs the damage step
function compMove(id) {
    var move = Math.floor((Math.random()*4)+1);
    if (move <= 3) {
        savedCompMove =  'attack';
    } else {
        savedCompMove = 'counter';
    };
    res = ('your move is <span>'+ id + '</span> and the computers move is <span>' + savedCompMove + '</span> on round ' + totRounds);
    damageStep(id, savedCompMove);
    roundResults(res);

}

//proccesses the moves to a result
function damageStep(y, c) {
    if ( y === 'attack' && c === 'attack') {
        res = 'Both players took damage';
        if (compHealth >= 10 && yourHealth >= 10) {
            compHealth -= 10;
            yourHealth -= 10;
        } else {
            compHealth = 0;
            yourHealth = 0;
        }
    } else if ( y === 'counter' && c === 'counter') {
        res = 'Defensive stances taken in vain';
    } else if ( y === 'attack' && c === 'counter') {
        res = 'Comp took a defensive stance and prepares to counter';
        counter(y, c);
    } else if ( y === 'counter' && c === 'attack') {
        res = 'You took a defensive stance and prepare to counter';
        counter(y, c);
    }
}


window.onload=enableButtons();