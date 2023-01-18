const canvas = document.getElementById("tron");
const context = canvas.getContext("2d");
const pixels = 10;


const box = 40;
canvas.height = 16 * box;
canvas.width = 16 * box;

class Player {
    constructor(x, y, color) {
    // "This." specifies the color and starting coordinates in class
    this.color = color;
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    // Need to track current state of player, whether it's alive or not, 
    // direction it's moving and the key being pressed
    this.alive = true;
    this.direction = '';
    this.key = '';
    // this.constructor function counts the current instance(s) of game being played
    // We can use this to identify each player
    // E.g. player 1 or first instance id = 1, player 2 or second instance id = 2
    // We must include or 0 to account for the first instance
    this.constructor.counter = (this.constructor.counter || 0) + 1;
    this.id = this.constructor.counter;

    Player.allInstances.push(this);
};
};
    // Store all instances of a class in an array so we can have unlimited players and track/identify
    // them easily
    Player.allInstances = [];

    // Create player instances
    let player1 = new Player (50, 50,'red');
    let player2 = new Player (440, 400, 'blue');

    function setDirection(player, up, down, left, right, currentKey) {
        switch (currentKey) {
            case up:
            if (player.direction != 'DOWN') {
                player.key = 'UP';
            }
        break
            case right: 
            if (player.direction != 'LEFT') {
                player.key = 'RIGHT';
            }
        break
            case down:
            if (player.direction != 'UP') {
                player.key = 'DOWN';
            }
        break
            case left:
            if (player.direction != 'RIGHT') {
                player.key = 'LEFT'
            }
        break;
        default:
        break;
        };
    };

    // Add event listener to capture what happens when you key press
    document.addEventListener = ('keydown', (event) => {
    let currentKey = event.keyCode;

    // This prevents the default key action
    if (key === 37 || key === 38 || key === 39 || key === 40) {
    event.preventDefault();
    };
    // This function then calls setDirection
    // line 79 is arrow keys
    // line 80 is WASD keyboard
    setDirection (player1, 38, 40, 37, 39, currentKey); 
    setDirection (player2, 87, 83, 65, 68, currentKey);
    });

    function getPlayableCells (canvas, pixels) {
        let PlayableCells = new Set ();
        for (let i = 0; i < canvas.width / pixels; i++) {
            for (let j = 0; j < canvas.height / pixels; j++) {
                PlayableCells.add (`${i * pixels} * ${j * pixels}`);

            };
        };
        return PlayableCells
    }

    let PlayableCells = getPlayableCells (canvas, pixels);
    function drawBackground () {
        context.strokeStyle = ''
    for (let i = 0; i <= canvas.width / pixels + 2; i += 2) {
        for (let j = 0; j <= canvas.height / pixels + 2; j += 2) {
          context.strokeRect(0, 0, pixels * i, pixels * j);
        };
      };

    context.strokeStyle = '';
    context.lineWidth = 2;
    for (let i = 1; i <= canvas.width / pixels; i += 2) {
    for (let j = 1; j <= canvas.height / pixels; j += 2) {
    context.strokeRect(0, 0, pixels * i, pixels * j);
    };
  };
    context.lineWidth = 1;
};

drawBackground();

function drawStartingPositions(players) {
    players.forEach(p => {
      context.fillStyle = p.color;
      context.fillRect(p.x, p.y, pixels, pixels);
      context.strokeStyle = 'black';
      context.strokeRect(p.x, p.y, pixels, pixels);
    });
  };

drawStartingPositions(Player.allInstances);  

let outcome, winnerColor, playerCount = Player.allInstances.length;

function draw() {
    if (Player.allInstances.filter(p => !p.key).length === 0) {
        if (playerCount === 1) {
            const alivePlayers = Player.allInstances.filter(p => p.dead === false);
            outcome = `Player ${alivePlayers[0]._id} wins!`;
            winnerColor = alivePlayers[0].color;
          } else if (playerCount === 0) {
            outcome = 'Draw!';
          }
          if (outcome) {
            createResultsScreen(winnerColor);
            clearInterval(game);
          };
    Player.allInstances.forEach(p => {

    if (p.key) {
        p.direction = p.key;

        context.fillStyle = p.color;
        context.fillRect(p.x, p.y, pixels, pixels);
        context.strokeStyle = 'black';
        context.strokeRect(p.x, p.y, pixels, pixels);

     if (!PlayableCells.has(`${p.x}x${p.y}y`) && p.dead === false) {
         p.dead = true;
         p.direction = '';
         playerCount -= 1;
       }
    
   PlayableCells.delete(`${p.x}x${p.y}y`);

   if (!p.dead) {
    if (p.direction === "LEFT") p.x -= unit;
    if (p.direction === "UP") p.y -= unit;
    if (p.direction === "RIGHT") p.x += unit;
    if (p.direction === "DOWN") p.y += unit;
  };

};

});

}

}

let game = setInterval(draw, 100);

function createResultsScreen(color) {
    const resultNode = document.createElement('div');
    resultNode.id = 'result';
    resultNode.style.color = color || '#fff';
    resultNode.style.position = 'fixed';
    resultNode.style.top = 0;
    resultNode.style.display = 'grid';
    resultNode.style.gridTemplateColumns = '1fr';
    resultNode.style.width = '100%';
    resultNode.style.height = '100vh';
    resultNode.style.justifyContent = 'center';
    resultNode.style.alignItems = 'center';
    resultNode.style.background = '#00000088'

    const resultText = document.createElement('h1');
    resultText.innerText = outcome;
    resultText.style.fontFamily = 'Bungee, cursive';
    resultText.style.textTransform = 'uppercase';

    const replayButton = document.createElement('button');
    replayButton.innerText = 'Replay (Enter)';
    replayButton.style.fontFamily = 'Bungee, cursive';
    replayButton.style.textTransform = 'uppercase';
    replayButton.style.padding = '10px 30px';
    replayButton.style.fontSize = '1.2rem';
    replayButton.style.margin = '0 auto';
    replayButton.style.cursor = 'pointer';
    replayButton.onclick = resetGame;

    resultNode.appendChild(resultText);
    resultNode.appendChild(replayButton);
    document.querySelector('body').appendChild(resultNode);

    document.addEventListener('keydown', (e) => {
        let key = event.keyCode;
        if (key == 13 || key == 32 || key == 27 || key == 82)
          resetGame();
      });
    };

    function resetGame() {
        // Remove the results node
        const result = document.getElementById('result');
        if (result) result.remove();
        // Removes backgorund then redraws it
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
    
      // Reset playableCells
      PlayableCells = getPlayableCells(canvas, pixels);

    // Reset players
    Player.allInstances.forEach(p => {
    p.x = p.startX;
    p.y = p.startY;
    p.dead = false;
    p.direction = '';
    p.key = '';
  });

  playerCount = Player.allInstances.length;
  drawStartingPositions(Player.allInstances);

   // Reset outcome
   outcome = '';
   winnerColor = '';

// Ensure draw() has stopped, then re-trigger it
  clearInterval(game);
  game = setInterval(draw, 100);
};

document.querySelector('#play-btn').addEventListener('click', () => {
    document.querySelector('#play-btn').style.display = 'none';
  }); 
    

  


