let images = [{
        path: 'img/01.jpeg',
        overlay: true,
        found: false
    }, {
        path: 'img/01.jpeg',
        overlay: true,
        found: false
    },
    {
        path: 'img/02.jpeg',
        overlay: true,
        found: false
    },
    {
        path: 'img/02.jpeg',
        overlay: true,
        found: false
    },
    {
        path: "img/03.jpeg",
        overlay: true,
        found: false
    },
    {
        path: "img/03.jpeg",
        overlay: true,
        found: false
    },
    {
        path: "img/04.jpeg",
        overlay: true
    },
    {
        path: "img/04.jpeg",
        overlay: true,
        found: false
    },
    {
        path: "img/05.jpeg",
        overlay: true,
        found: false
    },
    {
        path: "img/05.jpeg",
        overlay: true,
        found: false
    }, {
        path: "img/06.jpeg",
        overlay: true,
        found: false
    },
    {
        path: "img/06.jpeg",
        overlay: true,
        found: false
    },
    {
        path: "img/07.jpeg",
        overlay: true,
        found: false
    },
    {
        path: "img/07.jpeg",
        overlay: true,
        found: false
    },
    {
        path: "img/08.jpeg",
        overlay: true,
        found: false
    },
    {
        path: "img/08.jpeg",
        overlay: true,
        found: false
    },
    {
        path: "img/09.jpeg",
        overlay: true,
        found: false
    },
    {
        path: "img/09.jpeg",
        overlay: true,
        found: false
    },
    {
        path: "img/10.jpeg",
        overlay: true,
        found: false
    },
    {
        path: "img/10.jpeg",
        overlay: true,
        found: false
    }
];

let selectedCards = [];
let countPlayers = 0;
let players = [];

let currentPlayer = [];
let foundCardIndex = [];
let moves = 0;

function init() {
    openAddPlayersDialog();
}

function openAddPlayersDialog() {
    var dialog = document.querySelector('#dialog-1');
    dialog.showModal();
    dialog.querySelector('.close').addEventListener('click', function() {
        savePlayers();
        if (countPlayers > 0) {
            dialog.close();
            startGame();
        } else {
            alert('Add a player!');
        }
    });
}

function savePlayers() {
    for (let index = 1; index < countPlayers + 1; index++) {
        let playerName = document.getElementById(`new-player-${index}`).value;
        if (!playerName) {
            playerName = document.getElementById(`new-player-${index}`).placeholder;
        }
        playerJSON = {
            name: `${playerName}`,
            pairs: 0
        };
        players.push(playerJSON);
    }
}

function addPlayer() {
    ++countPlayers;
    document.getElementById('newPlayer').innerHTML += `
    <input id="new-player-${countPlayers}" placeholder="Player ${countPlayers}">
    `;
}

function newGame() {
    resetGame();
    startGame();
}

function startGame() {
    shuffleImages(images);
    showImages();
    showCounter();
    updatePlayers();
    selectFirstPlayer();
}

function showCounter() {
    document.getElementById('counter-container').classList.remove('d-none');
}

function resetGame() {
    selectedCards = [];
    currentPlayer = [];
    foundCardIndex = [];
    moves = 0;
    for (let index = 0; index < images.length; index++) {
        const image = images[index];
        image.found = false;
        image.overlay = true;
    }
    document.getElementById('images').innerHTML = '';
    document.getElementById('counter').innerHTML = '';
    for (let index = 0; index < players.length; index++) {
        const player = players[index];
        player.pairs = 0;
    }
}

function selectFirstPlayer() {
    currentPlayer = players[0];
    console.log('current player ', currentPlayer);
    highlightActivePlayer();
}

function highlightActivePlayer() {
    document.getElementById(currentPlayer.name).classList.add('active');
}

function showImages() {
    for (let index = 0; index < images.length; index++) {
        const image = images[index];
        document.getElementById('images').innerHTML += `
        <div id="picture-${index}"  class="picture"  onclick="hideOverlay(${index})">
        <img src="${image.path}" >
        <div id="overlay-${index}" class="overlay"></div>
        </div>
        `;
    }
}

function updatePlayers() {
    document.getElementById('players').innerHTML = '';
    for (let index = 0; index < players.length; index++) {
        const player = players[index];
        document.getElementById('players').innerHTML += `
        <div id="${player.name}" class="player">
        <span class="material-icons">
            person
            </span>
        <h3>${player.name}</h3>
        <h3>Pairs: ${player.pairs}</h3>
    </div>
        `;
    }
}

function hideOverlay(id) {
    if (selectedCards.length < 2) {
        let image = images[id];
        if (image.overlay) {
            document.getElementById(`overlay-${id}`).classList.add("hideOverlay");
            selectedCards.push(image);
            console.log('selected cards ', selectedCards);
            image.overlay = !image.overlay;
        }
        checkSelectedCards();
    }
}

function checkSelectedCards() {
    if (selectedCards.length == 2) {
        console.log('2 cards selected!');
        checkForPair();
        setTimeout(() => {
            removeOverlay();
            selectedCards.splice(0, selectedCards.length);
            countMoves();
            selectNextPlayer();
        }, 1000);
    }
}

function removeOverlay() {
    for (let index = 0; index < images.length; index++) {
        const image = images[index];
        if (!image.found) {
            document.getElementById(`overlay-${index}`).classList.remove("hideOverlay");
            image.overlay = true;
        }
    }
}

function countMoves() {
    ++moves;
    document.getElementById('counter').innerHTML = +moves;
}

function checkForPair() {
    if (selectedCards[0].path == selectedCards[1].path) {
        console.log('Pair detected!');
        foundCardIndex = [];
        for (let index = 0; index < images.length; index++) {
            if (images[index].path == selectedCards[0].path) {
                images[index].found = true;
                foundCardIndex.push(index);
            }
        }
        animateCards();
        setTimeout(() => {
            ++currentPlayer.pairs;
            checkForGameEnd();
            updatePlayers();
        }, 750);
    }
}

function checkForGameEnd() {
    let foundImages = 0;
    for (let index = 0; index < images.length; index++) {
        const image = images[index];
        if (image.found) {
            ++foundImages;
        }
    }
    console.log('found images ', foundImages);
    if (foundImages == images.length) {
        getWinners();
    }

}

function getWinners() {
    let allPairs = [];
    for (let index = 0; index < players.length; index++) {
        const player = players[index];
        allPairs.push(player.pairs);
    }
    console.log('pairs ', allPairs);
    let maxPair = Math.max(...allPairs);
    console.log('max pairs ', maxPair);
    let winners = [];
    for (let index = 0; index < players.length; index++) {
        const player = players[index];
        if (player.pairs == maxPair) {
            winners.push(player);
        }
    }
    showWinners(winners);
}

function showWinners(winners) {
    console.log('winners ', winners);
    document.getElementById('title-2').innerHTML = '';
    document.getElementById('content-2').innerHTML = '';
    displayWinners(winners);
    var dialog = document.querySelector('#dialog-2');
    dialog.showModal();
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
        location.reload();
    });
    dialog.querySelector('.newGame').addEventListener('click', function() {
        dialog.close();
        newGame();
    });
}

function displayWinners(winners) {
    if (winners.length == 1) {
        document.getElementById('title-2').innerHTML += `${winners[0].name} won the game!`;
    } else {
        for (let index = 0; index < winners.length; index++) {
            const winner = winners[index];
            if (index == winners.length - 1) {
                document.getElementById('title-2').innerHTML += ` and ${winner.name}`;
            } else {
                document.getElementById('title-2').innerHTML += ` ${winner.name},`;
            }
        }
        document.getElementById('title-2').innerHTML += ` won the game!`;
    }
    for (let index = 0; index < players.length; index++) {
        const player = players[index];
        if (player.pairs == 1) {
            document.getElementById('content-2').innerHTML += `${player.name} collected ${player.pairs} pair<br>`;
        } else {
            document.getElementById('content-2').innerHTML += `${player.name} collected ${player.pairs} pairs<br>`;
        }
    }
    document.getElementById('content-2').innerHTML += `<br>${moves + 1} moves were played`;
}

function animateCards() {
    document.getElementById(`picture-${foundCardIndex[0]}`).classList.add('animation');
    document.getElementById(`picture-${foundCardIndex[1]}`).classList.add('animation');
    setTimeout(() => {
        document.getElementById(`picture-${foundCardIndex[0]}`).classList.remove('animation');
        document.getElementById(`picture-${foundCardIndex[1]}`).classList.remove('animation');
        document.getElementById(`picture-${foundCardIndex[0]}`).classList.add('found');
        document.getElementById(`picture-${foundCardIndex[1]}`).classList.add('found');
    }, 750);
}

function selectNextPlayer() {
    document.getElementById(currentPlayer.name).classList.remove('active');
    let index = players.indexOf(currentPlayer);
    if (index < players.length - 1) {
        currentPlayer = players[index + 1];
    } else {
        currentPlayer = players[0];
    }
    console.log('current player ', currentPlayer);
    highlightActivePlayer();
}

function shuffleImages(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}