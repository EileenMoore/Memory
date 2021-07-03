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

let players = ['player-1', 'player-2', 'player-3'];

let currentPlayer = [];

function selectFirstPlayer() {
    currentPlayer = players[0];
    console.log('current player ', currentPlayer);
    highlightActivePlayer();
}

function highlightActivePlayer() {
    document.getElementById(currentPlayer).classList.add('active');
}

function showImages() {
    shuffleImages(images);
    for (let index = 0; index < images.length; index++) {
        const image = images[index];
        document.getElementById('image').innerHTML += `
        <div class="picture"  onclick="hideOverlay(${index})">
        <img src="${image.path}" >
        <div id="${index}" class="overlay"></div>
        </div>
        `;
    }
}

function hideOverlay(id) {
    let image = images[id];
    if (image.overlay) {
        document.getElementById(id).classList.add("hideOverlay");
        selectedCards.push(image);
        console.log('selected cards ', selectedCards);
        image.overlay = !image.overlay;
    }
    checkForSelectedCards();
}

function checkForSelectedCards() {
    if (selectedCards.length == 2) {
        console.log('2 cards selected!');
        for (let index = 0; index < images.length; index++) {
            const image = images[index];
            setTimeout(() => {
                document.getElementById(index).classList.remove("hideOverlay");
                image.overlay = true;
            }, 1000);
        }
        selectedCards.splice(0, selectedCards.length);
        console.log('selected cards ', selectedCards);
        selectNextPlayer();
    }
}

function selectNextPlayer() {
    document.getElementById(currentPlayer).classList.remove('active');
    let index = players.indexOf(currentPlayer);
    currentPlayer = players[index + 1];
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