// Background: Wrote this on 04Oct2014 for Brett Campbell.
// Get readline interface for working with console input/output.
var rlIntf = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

var wins = {rock: 'scissors', paper: 'rock', scissors: 'paper'};
var weapons = ['rock', 'paper', 'scissors'];
var results = ['User wins!', 'Computer wins.', 'Tie'];

// Return one of the following: 0=user wins, 1=computer wins, 2=tie
function compare(choices) {
    return wins[choices[0]] === choices[1] ? 0 : wins[choices[1]] === choices[0] ? 1 : 2;
}

function round() {
    rlIntf.question('Choose your weapon: ', function(weapon) {
        if (weapons.indexOf(weapon) === -1) {
            rlIntf.write("Sorry! `" + weapon + "' is not a valid choice. Must be one of the following: " + weapons.join(", ") + "\n");
            round();
        } else {
            var choices = [weapon, weapons[Math.floor(Math.random() * weapons.length)]];
            var result = compare(choices);
            rlIntf.write(choices[0] + " vs " + choices[1] + ":\t" + results[result] + "\n");
            if (result === 2) {
                // Tie
                round();
            } else {
                // End of round
                rlIntf.question('Play again? (y/[n])', function(ans) {
                    if (ans[0] === 'y') {
                        round();
                    } else {
                        // Game over
                        process.stdin.end();
                    }
                });
            }
        }
    });
}

round();

// vim:ts=4:sw=4:et:tw=120
