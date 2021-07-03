let images = [{
        path: 'img/01.jpeg',
        overlay: true
    }, {
        path: 'img/01.jpeg',
        overlay: true
    },
    {
        path: 'img/02.jpeg',
        overlay: true
    },
    {
        path: 'img/02.jpeg',
        overlay: true
    },
    {
        path: "img/03.jpeg",
        overlay: true
    },
    {
        path: "img/03.jpeg",
        overlay: true
    },
    {
        path: "img/04.jpeg",
        overlay: true
    },
    {
        path: "img/04.jpeg",
        overlay: true
    },
    {
        path: "img/05.jpeg",
        overlay: true
    },
    {
        path: "img/05.jpeg",
        overlay: true
    }, {
        path: "img/06.jpeg",
        overlay: true
    },
    {
        path: "img/06.jpeg",
        overlay: true
    },
    {
        path: "img/07.jpeg",
        overlay: true
    },
    {
        path: "img/07.jpeg",
        overlay: true
    },
    {
        path: "img/08.jpeg",
        overlay: true
    },
    {
        path: "img/08.jpeg",
        overlay: true
    },
    {
        path: "img/09.jpeg",
        overlay: true
    },
    {
        path: "img/09.jpeg",
        overlay: true
    },
    {
        path: "img/10.jpeg",
        overlay: true
    },
    {
        path: "img/10.jpeg",
        overlay: true
    }
];

let selectedCards = [];

let players = [{
    name: 'player-1',
    pairs: 0
}, {
    name: 'player-2',
    pairs: 0
}, {
    name: 'player-3',
    pairs: 0
}];

let currentPlayer = [];

function init() {
    shuffleImages(images);
    showImages();
    showPlayers();
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

function showPlayers() {
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
        checkForSelectedCards();
    }
}

function checkForSelectedCards() {
    if (selectedCards.length == 2) {
        console.log('2 cards selected!');
        checkForPairs();
        setTimeout(() => {
            for (let index = 0; index < images.length; index++) {
                const image = images[index];
                document.getElementById(`overlay-${index}`).classList.remove("hideOverlay");
                image.overlay = true;
            }
            selectedCards.splice(0, selectedCards.length);
            console.log('selected cards ', selectedCards);
            selectNextPlayer();
        }, 1000);
    }
}

function checkForPairs() {
    if (selectedCards[0].path == selectedCards[1].path) {
        console.log('Pair detected!');
        let foundCardIndex = [];
        for (let index = 0; index < images.length; index++) {
            if (images[index].path == selectedCards[0].path) {
                foundCardIndex.push(index);
            }
        }
        console.log('found card index ', foundCardIndex);
        ++currentPlayer.pairs;
        showPlayers();
        document.getElementById(`overlay-${foundCardIndex[0]}`).classList.add('found');
        document.getElementById(`overlay-${foundCardIndex[1]}`).classList.add('found');
    }
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