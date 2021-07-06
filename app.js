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

let players = [{
    name: 'Player-1',
    pairs: 0
}, {
    name: 'Player-2',
    pairs: 0
}, {
    name: 'Player-3',
    pairs: 0
}];

let currentPlayer = [];
let foundCardIndex = [];
let moves = 0;

function init() {
    shuffleImages(images);
    showImages();
    updatePlayers();
    selectFirstPlayer();
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
        <h3>Player ${index + 1}</h3>
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
    var dialog = document.querySelector('dialog');
    for (let index = 0; index < winners.length; index++) {
        const winner = winners[index];
        document.getElementById('title').innerHTML += `${winner.name} won the game!`;
        document.getElementById('content').innerHTML += `${winner.name} collected ${winner.pairs} pairs.`;
    }
    dialog.showModal();
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });
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