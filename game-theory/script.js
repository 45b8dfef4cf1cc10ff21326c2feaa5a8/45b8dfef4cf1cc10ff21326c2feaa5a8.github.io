function generateMatrix() {
    document.querySelector(".instructions").style.display = "none";
    var rows = parseInt(document.getElementById('rows').value);
    var cols = parseInt(document.getElementById('cols').value);
    var container = document.getElementById('matrix-container');
    container.innerHTML = '';

    var gameContainer = document.createElement('div');
    gameContainer.className = 'game-container';

    var topHeader = document.createElement('div');
    topHeader.className = 'top-header';
    topHeader.innerHTML = '<div></div><div class="player2-header">Player 2</div>';
    gameContainer.appendChild(topHeader);

    var bottomRow = document.createElement('div');
    bottomRow.className = 'bottom-row';

    var player1Header = document.createElement('div');
    player1Header.className = 'player1-header';
    player1Header.innerText = 'Player 1';
    bottomRow.appendChild(player1Header);

    for (var j = 0; j < cols; j++) {
        var rowDiv = document.createElement('div');
        rowDiv.className = 'row';

        for (var i = 0; i < rows; i++) {
            var playerStrategyDiv = document.createElement('div');
            playerStrategyDiv.className = 'player-strategy';

            var input1 = document.createElement('input');
            input1.type = 'number';
            input1.id = 'player1_' + rows  + 'x' + cols + '_' + (j * rows + i + 1);
            input1.placeholder = 'x' + (j * rows + i + 1);
            input1.required = true;

            var span1 = document.createElement('span');
            span1.id = 'player1_' + rows  + 'x' + cols + '_' + (j * rows + i + 1) + '_star';

            var input2 = document.createElement('input');
            input2.type = 'number';
            input2.id = 'player2_' + rows  + 'x' + cols + '_' + (i * cols + j + 1);
            input2.placeholder = 'y' + (j * rows + i + 1);
            input2.required = true;

            var span2 = document.createElement('span');
            span2.id = 'player2_' + rows  + 'x' + cols + '_' + (i * cols + j + 1) + '_star';

            playerStrategyDiv.appendChild(document.createTextNode('('));
            playerStrategyDiv.appendChild(input1);
            playerStrategyDiv.appendChild(span1);
            playerStrategyDiv.appendChild(document.createTextNode(','));
            playerStrategyDiv.appendChild(input2);
            playerStrategyDiv.appendChild(span2);
            playerStrategyDiv.appendChild(document.createTextNode(')'));

            rowDiv.appendChild(playerStrategyDiv);
        }
        bottomRow.appendChild(rowDiv);
    }
    gameContainer.appendChild(bottomRow);

    var errorIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    errorIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    errorIcon.setAttribute('width', '1em');
    errorIcon.setAttribute('height', '1em');
    errorIcon.setAttribute('viewBox', '0 0 24 24');
    errorIcon.setAttribute('fill', '#f87171');
    var errorPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    errorPath.setAttribute('d', 'M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1zm-4.17-7.14L12 10.59L9.17 7.76L7.76 9.17L10.59 12l-2.83 2.83l1.41 1.41L12 13.41l2.83 2.83l1.41-1.41L13.41 12l2.83-2.83z');
    errorIcon.appendChild(errorPath);

    var errorMessageText = document.createTextNode('Please fill all input fields with valid numbers.');
    var errorSpan = document.createElement('span');
    errorSpan.className = 'error-message';

    errorSpan.appendChild(errorIcon);
    errorSpan.appendChild(errorMessageText);

    gameContainer.insertBefore(errorSpan, gameContainer.children[2]);

    container.appendChild(gameContainer);

    var solverDiv = document.createElement('div');
    solverDiv.className = 'game-solver';

    var editButton = document.createElement('button');
    editButton.className = 'edit';
    editButton.innerText = 'Edit';

    editButton.onclick = function() {
        editGame();
    };

    var editIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    editIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    editIcon.setAttribute('width', '1em');
    editIcon.setAttribute('height', '1em');
    editIcon.setAttribute('viewBox', '0 0 24 24');
    editIcon.setAttribute('fill', 'currentColor');
    var editPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    editPath.setAttribute('fill-rule', 'evenodd');
    editPath.setAttribute('clip-rule', 'evenodd');
    editPath.setAttribute('d', 'M3 21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2-2.92l9.06-9.06l.92.92L5.92 19H5zM18.37 3.29a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41z');
    editIcon.appendChild(editPath);
    editButton.appendChild(editIcon);
    solverDiv.appendChild(editButton);

    var solveButton = document.createElement('button');
    solveButton.className = 'solve';
    solveButton.innerText = 'Solve';

    solveButton.onclick = function() {
        var solveFunction = 'solveGame';
        var getStrategiesFunction = 'getStrategies';
        var solveGame = window[solveFunction];
        var getStrategies = window[getStrategiesFunction];
        var strategies = getStrategies(cols, rows); 
        solveGame(cols, rows, strategies.player1Sets, strategies.player2Sets);
    };

    var solveIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    solveIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    solveIcon.setAttribute('width', '1em');
    solveIcon.setAttribute('height', '1em');
    solveIcon.setAttribute('viewBox', '0 0 24 24');
    solveIcon.setAttribute('fill', '#fff');
    var solvePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    solvePath.setAttribute('d', 'M12 2a9.98 9.98 0 0 1 7.743 3.671L13.414 12l6.329 6.329A9.98 9.98 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2m0 3a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3');
    solveIcon.appendChild(solvePath);
    solveButton.appendChild(solveIcon);
    solverDiv.appendChild(solveButton);

    container.appendChild(solverDiv);

    var solutionDiv = document.createElement('div');
    solutionDiv.className = 'game-solution';
    solutionDiv.id = 'solution';
    container.appendChild(solutionDiv);
}



function getStrategies(rows, cols) {
    var inputs = document.querySelectorAll('.player-strategy input[type="number"]');
    var allInputsFilled = true;
    var errorSpan = document.querySelector('.error-message');
    var player1Sets = [];
    var player2Sets = [];

    inputs.forEach(function(input) {
        if (isNaN(input.value) || input.value === '') {
            allInputsFilled = false;
            return;
        }
    });

    if (allInputsFilled) {
        if (rows === cols) {
            for (var i = 0; i < rows; i++) {
                var player1Set = [];
                var player2Set = [];
                for (var j = 0; j < cols; j++) {
                    var player1Input = document.getElementById("player1_" + rows + "x" + cols + "_" + (i * cols + j + 1));
                    var player2Input = document.getElementById("player2_" + rows + "x" + cols + "_" + (i * cols + j + 1));
                    var player1Value = parseInt(player1Input.value);
                    var player2Value = parseInt(player2Input.value);

                    if (!isNaN(player1Value) && !isNaN(player2Value)) {
                        player1Set.push(player1Value);
                        player2Set.push(player2Value);
                    } else {
                        allInputsFilled = false;
                        break; 
                    }
                }
                if (player1Set.length > 0) {
                    player1Sets.push(player1Set);
                }
                if (player2Set.length > 0) {
                    player2Sets.push(player2Set);
                }
            }
        } else {
            for (var i = 0; i < rows; i++) {
                var player1Set = [];
                for (var j = 0; j < cols; j++) {
                    var player1Input = document.getElementById("player1_" + cols + "x" + rows + "_" + (i * cols + j + 1));
                    var player1Value = parseInt(player1Input.value);
                    if (!isNaN(player1Value)) {
                        player1Set.push(player1Value);
                    } else {
                        allInputsFilled = false;
                        break; 
                    }
                }
                if (player1Set.length > 0) {
                    player1Sets.push(player1Set);
                }
            }

            for (var j = 0; j < cols; j++) {
                var player2Set = [];
                for (var i = 0; i < rows; i++) {
                    var player2Input = document.getElementById("player2_" + cols + "x" + rows + "_" + (j * rows + i + 1));
                    var player2Value = parseInt(player2Input.value);
                    if (!isNaN(player2Value)) {
                        player2Set.push(player2Value);
                    } else {
                        allInputsFilled = false;
                        break;
                    }
                }
                if (player2Set.length > 0) {
                    player2Sets.push(player2Set);
                }
            }
        }
        
        if (allInputsFilled) {
            errorSpan.style.display = 'none'; 
            return { player1Sets: player1Sets, player2Sets: player2Sets };
        }
    }

    errorSpan.style.display = 'flex';
    return null;
}



document.addEventListener("DOMContentLoaded", function() {
    var inputs = document.querySelectorAll('.player-strategy input[type="number"]');
    inputs.forEach(function(input) {
        input.addEventListener("change", function() {
            var rowsCols = input.id.match(/\d+x\d+/)[0].split("x");
            var rows = parseInt(rowsCols[0]);
            var cols = parseInt(rowsCols[1]);
            getStrategies(rows, cols);
        });
    });
});

function editGame() {
    var strategyDivs = document.querySelectorAll('.player-strategy');
    strategyDivs.forEach(function(div) {
      var inputs = div.querySelectorAll('input[type="number"]');
      inputs.forEach(function(input) {
        input.disabled = false;
      });
      var spans = div.querySelectorAll('.has-star');
      spans.forEach(function(span) {
        span.classList.remove('has-star');
      });
    });
  }

  
function solveGame(rows, cols, player1Sets, player2Sets) {
    var strategyDivs = document.querySelectorAll('.player-strategy');
    strategyDivs.forEach(function(div) {
        var inputs = div.querySelectorAll('input[type="number"]');
        inputs.forEach(function(input) {
            input.disabled = true;
        });
    });

    function addStarToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('has-star');
        }
    }

    function areAllEqual(arr) {
        return arr.every((val, i, arr) => val === arr[0]);
    }

    function indexOfMax(arr) {
        var max = Math.max(...arr);
        var indices = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === max) {
                indices.push(i);
            }
        }
        return indices;
    }

    strategyDivs.forEach(function(div, index) {
        var player1Set = player1Sets[index];
        var player2Set = player2Sets[index];
        if (rows === cols) {
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    var currentIndex = i * cols + j;
                    var player1Set = player1Sets[currentIndex];
                    var player2Set = player2Sets[currentIndex];
                    if (player1Set === undefined) {
                        continue;
                    }
                    if (player2Set === undefined) {
                        continue;
                    }
                    if (areAllEqual(player1Set)) {
                        player1Set.forEach((element, index) => {
                            addStarToElement("player1_" + rows + "x" + cols + "_" + (index + j * rows + 1) + "_star");
                        });
                    } else {
                        var maxIndices = indexOfMax(player1Set);
                        maxIndices.forEach(index => {
                            addStarToElement("player1_" + rows + "x" + cols + "_" + (index + j * rows + 1) + "_star");
                        });
                    }
                    if (areAllEqual(player2Set)) {
                        player2Set.forEach((element, index) => {
                            addStarToElement("player2_" + rows + "x" + cols + "_" + (index + j * cols + 1) + "_star");
                        });
                    } else {
                        var maxIndices = indexOfMax(player2Set);
                        maxIndices.forEach(index => {
                            addStarToElement("player2_" + rows + "x" + cols + "_" + (index + j * cols + 1) + "_star");
                        });
                    }
                }
            }
        } if (rows < cols) {
            for (var j = 0; j < cols; j++) { 
                for (var i = 0; i < rows; i++) {
                    var currentIndex = i * cols + j;
                    var player2Set = player2Sets[currentIndex];
                    if (player2Set === undefined) {
                        continue;
                    }
                    if (areAllEqual(player2Set)) {
                        player2Set.forEach((element, index) => {
                            addStarToElement("player2_" + cols + "x" + rows + "_" + (index + j * rows + 1) + "_star");
                        });
                    } else {
                        var maxIndices = indexOfMax(player2Set);
                        maxIndices.forEach(index => {
                            addStarToElement("player2_" + cols + "x" + rows + "_" + (index + j * rows + 1) + "_star");
                        });
                    }
        
                    var player1Set = player1Sets[currentIndex];
                    if (player1Set === undefined) {
                        continue;
                    }
                    if (areAllEqual(player1Set)) {
                        player1Set.forEach((element, index) => {
                            addStarToElement("player1_" + cols + "x" + rows + "_" + (index + j * cols + 1) + "_star");
                        });
                    } else {
                        var maxIndices = indexOfMax(player1Set);
                        maxIndices.forEach(index => {
                            addStarToElement("player1_" + cols + "x" + rows + "_" + (index + j * cols + 1) + "_star");
                        });
                    }
                }
            }
        } else {        
            for (var i = 0; i < rows; i++) { 
                for (var j = 0; j < cols; j++) {
                    var currentIndex = j * rows + i;
                    var player1Set = player1Sets[currentIndex];
                    if (player1Set === undefined) {
                        continue;
                    }
                    if (areAllEqual(player1Set)) {
                        player1Set.forEach((element, index) => {
                            addStarToElement("player1_" + cols + "x" + rows + "_" + (index + i * cols + 1) + "_star");
                        });
                    } else {
                        var maxIndices = indexOfMax(player1Set);
                        maxIndices.forEach(index => {
                            addStarToElement("player1_" + cols + "x" + rows + "_" + (index + i * cols + 1) + "_star");
                        });
                    }

                    var player2Set = player2Sets[currentIndex];
                    if (player2Set === undefined) {
                        continue;
                    }
                    if (areAllEqual(player2Set)) {
                        player2Set.forEach((element, index) => {
                            addStarToElement("player2_" + cols + "x" + rows + "_" + (index + i * rows + 1) + "_star");
                        });
                    } else {
                        var maxIndices = indexOfMax(player2Set);
                        maxIndices.forEach(index => {
                            addStarToElement("player2_" + cols + "x" + rows + "_" + (index + i * rows + 1) + "_star");
                        });
                    }
                }
            }
        }
        
    });
}


