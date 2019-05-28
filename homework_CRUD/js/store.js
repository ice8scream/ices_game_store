let dc = document.createElement('section');
dc.classList.add('card-wrapper');
document.body.insertBefore(dc, document.querySelector('.spiner'));
document.addEventListener('DOMContentLoaded', ready);

let message = '';

function ready() {
    let dataToUpdate = '';
    let lastModify = {date: ''};
    getListFromAPI(false, lastModify);
    setTimeout(setInterval(() => getListFromAPI(true, lastModify, dataToUpdate), 5000), 5000);
}

function getListFromAPI(isToUpdate, lastModify, updatedData) {
    console.log(lastModify);
    let req = new Promise((resolve, reject) => {
        let url = 'http://localhost/homework_CRUD/api/';
        let hand = 'database.json';
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url + hand, true);
        // xhr.setRequestHeader('Cache-Control', 'public');
        if (isToUpdate) {
            xhr.setRequestHeader("If-Modified-Since", lastModify.date);
        }
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                if (xhr.status === 200) {
                    resolve({list: xhr.responseText, modify: xhr.getResponseHeader('Last-Modified')});
                } else {
                    reject(xhr.status);
                }
            }
        };
    });
    req.then((answer) => {
        let message = JSON.parse(answer.list);
        lastModify.date = answer.modify;
        if (isToUpdate) {
            console.log('update');
            upDateCards(message);
            return message;
        }
        console.log('yeah');
        console.log(lastModify);
        upDateCards(message);
        return message;
    }).then((data) => {
        updatedData = data;
        console.log(updatedData);
    }).catch((status) => {
        //message = 'SomeThings Wrong :(';
        if (status === 304)
            console.log(status + ': alredy updated');
        //return message;
    }).finally(() => {});
}

function upDateCards(list) {
    dc.innerHTML = '';
    list.forEach((item) => {
        dc.innerHTML += createCard(item);
    });
}



function createCard(game) {
    let platforms = game.platform.reduce((res, platform, index) => {
        let mes = platform;
        if (index < game.platform.length - 1) {
            mes += ' ';
        }
        res += mes;
        return res;
    }, '');
    //console.log(platforms);
    let card = `<article class="card" data-gameId="${game.id}">
        <section class="card-line">
            <section class="title">
                <p>${game.title}</p>
            </section>    
            <section class="price">
                <p>${game.price}</p>
            </section>
        </section>
        <section class="card-line">
            <section class="raiting">
                <p>${game.rating}</p>
            </section>
            <section class="votes">
                <p>${game.votes}</p>
            </section>
        </section>
        <section class="card-line">
            <section class="platform">
                <p>${platforms}</p>
            </section>
        </section>
    </article>`;
    return card;
}
// SendReqToAPI() {

// }

/** id: 1
platform: (3) ["MacOs", "Windows", "SteamOS"]
price: 400
rating: 8.7
title: "Baldur's Gate"
votes: 100  */

/** 
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/homework_CRUD/api/add.php', true);

    let data = new FormData();
    data.append('title', 'Dark Souls Remastered');
*/