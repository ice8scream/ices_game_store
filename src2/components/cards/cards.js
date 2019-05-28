import {createElement} from '../onlyJS/createElement.js';
import {sendRequest} from '../onlyJS/request.js';


class GameCardsEngine {
    constructor(container, gamesPool, modal){
        this.modal = modal;
        this.mode = false;
        this.container = container;
        container.addEventListener('click', (event) => {
            let target = event.target;
            while(target !== container){
                if(target.classList.contains('action-button')) {
                    //
                    if(target.getAttribute('value') === 'Edit') {
                        let adminKey = new FormData();
                        let key = + new Date()
                        adminKey.set('id', this.currentCard.getAttribute('id'));
                        adminKey.set('key', key);
                        adminKey.set('time', key);
                        let  hand = 'canIEdit.php';
                        sendRequest('POST', 'http://localhost/homework_CRUD/api/', hand, [], adminKey).then((res) => {
                            console.log(res.answer);
                            let getId = '?id=' + this.currentCard.getAttribute('id');
                            sendRequest('GET', 'http://localhost/homework_CRUD/api/', 'get.php' + getId, [], null).then( (response) => {
                                this.showModal(target.getAttribute('value'), JSON.parse(response.answer), key);
                    }).catch((response) => {
                                this.modal.showAlertModal(response.answer);
    
                            });
                            
                        }).catch((response) => {
                            this.modal.showAlertModal(response.answer);

                        });
                    } else {
                    let getId = '?id=' + this.currentCard.getAttribute('id');
                    sendRequest('GET', 'http://localhost/homework_CRUD/api/', 'get.php' + getId, [], null).then(
                        (response) => {
                            console.log(response.answer);
                            this.showModal(target.getAttribute('value'), JSON.parse(response.answer));
                        }
                        // this.showModal(target.getAttribute('value'), this.currentCard.getAttribute('id'));
                        ).catch((response) => {
                            this.modal.showAlertModal('Game not found');
                            console.log(response.answer);
                        }
                        );
                    }
                    //
                    return;
                }
                if(target.classList.contains('card-close')){
                    this.closeCard(target);
                    return;
                }
                if(target.classList.contains('game-card')){
                    if(this.currentCard != target){
                    this.flipCard(target);
                    }
                    return;
                }
                target = target.parentNode;
            }
        });
        this.updateCards(gamesPool);
    }
    updateCards(gamesPool) {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        let gameCardsWrapper = document.createDocumentFragment();
        const gamesTamplatePool = gamesPool.map(game => {
            return this.createCardTemplate(game);
        });
        gamesTamplatePool.forEach(template => {
            const card = createElement(template);
            gameCardsWrapper.appendChild(card);
        });
        this.container.appendChild(gameCardsWrapper);
    }
    changeMode(value) {

        if(this.currentCard && this.mode != value){
            const buts = this.currentCard.querySelectorAll('.action-button');
            if(value) {
                buts[0].setAttribute('value', 'Edit');
                buts[1].setAttribute('value', 'Delete');
                buts[0].innerText = 'Edit';
                buts[1].innerText = 'Delete';
            } else {
                buts[0].setAttribute('value', 'Buy');
                buts[1].setAttribute('value', 'Vote');
                buts[0].innerText = 'Buy';
                buts[1].innerText = 'Vote';
            }
        }
        this.mode = value;
    }
    createCardTemplate(game) {
        return {
            tag: 'article',
            elemClass: ['game-card'],
            attrs: {id: game.id},
            content: [{
                tag: 'section',
                elemClass: ['game-card__cover'],
                content: [{
                    tag: 'section',
                    elemClass: ['game-card__main'],
                    content: [{
                        tag: 'section',
                        elemClass: ['game-card__primary'],
                        content: [{
                            tag: 'h2',
                            elemClass: ['game-card__title'],
                            content: [game.title]
                        },
                        {
                            tag: 'h3',
                            elemClass: ['game-card__subtitle'],
                            content: [{
                                tag: 'span',
                                elemClass: [/** class for stars */],
                                content: this.ratingToStars(game.rating)
                            },
                            {
                                tag: 'span',
                                elemClass: [/** class for price */],
                                content:  game.price === 0 ? ['FREE'] : [
                                    game.price + ' ',
                                    {
                                        tag: 'i',
                                        elemClass: ['fas', 'fa-ruble-sign']
                                    }
                                ]
                            }]
                        }]
                    },{
                        tag: 'section',
                        elemClass: ['game-card__secondary'],
                        attrs: {},
                        content: this.platformsToIcons(game.platform)
                    }]
                },{
                    tag: 'section',
                    elemClass: ['game-card__image'],
                    attrs: {/** gradient / bgimg / bgc */},
                    content: []
                }]
            },{
                tag: 'section',
                elemClass: ['game-card__inside'],
                content: [{
                        tag: 'section',
                        elemClass: ['game-card__main'],
                        content: [{
                            tag: 'section',
                            elemClass: ['game-card__primary'],
                            content: [{
                            tag: 'h2',
                            elemClass: ['game-card__title'],
                            content: [game.title]
                        },
                        {
                            tag: 'section',
                            elemClass: ['game-card__actions'],
                            content: [{
                                tag: 'button',
                                elemClass: ['action-button', 'action-button_left'],
                                content: []
                            },
                            {
                                tag: 'button',
                                elemClass: ['action-button', 'action-button_right'],
                                content: []
                            }]
                        }]
                    }]
                },{
                    tag: 'section',
                    elemClass: ['game-card__icons'],
                    content: [{
                        tag: 'div',
                        elemClass: ['game-card__action-icon', 'card-close'],
                        content: [{
                            tag: 'i',
                            elemClass: ['fas', 'fa-angle-up']
                        }]
                        //<i class="fas fa-angle-up"></i>
                    }]
                }]
            }]
        };
    }
    ratingToStars(rating) {
        if(!rating) rating = 0;
        let stars = Math.round(rating) / 2;
        let starArray = [];
         
        for(let i = 1; i <= stars; i++){
            let star = {
                tag: 'i',
                elemClass: ['fas', 'fa-star']
            };
            starArray.push(star);
        }
        if( stars !== Math.round(stars)) {
            starArray.push( {
                tag: 'i',
                elemClass: ['fas', 'fa-star-half-alt']
            });
        }
        for(let i =  Math.ceil(stars); i < 5; i++){
            let star = {
                tag: 'i',
                elemClass: ['far', 'fa-star']
            };
            starArray.push(star);
        }
        return starArray;
    }
    platformsToIcons(platforms) {
        let icons = [];
        platforms.forEach(platform => {
            icons.push({
                tag: 'i',
                elemClass: ['fab', 'fa-' + platform, 'game-card__platform-icon']
            });
        });
        return icons;
    }
    flipCard(card) {
        card.classList.add('game-card_flip');
        let buts = card.querySelectorAll('.action-button');
        console.log(card);
        if(this.mode) {
            buts[0].setAttribute('value', 'Edit');
            buts[1].setAttribute('value', 'Delete');
            buts[0].innerText = 'Edit';
            buts[1].innerText = 'Delete';
        } else {
            buts[0].setAttribute('value', 'Buy');
            buts[1].setAttribute('value', 'Vote');
            buts[0].innerText = 'Buy';
            buts[1].innerText = 'Vote';
        }
        
        if(this.currentCard && this.currentCard != card) {
            this.currentCard.classList.remove('game-card_flip');
        }
        this.currentCard = card;
    }
    closeCard(target) {
        while(target !== this.container){
            if(target.classList.contains('game-card')){
                    target.classList.remove('game-card_flip');
                    this.currentCard = undefined;
                return;
            }
            target = target.parentNode;
        }
    }
    showModal(mode, gameInfo, key = null){
        console.log(mode, gameInfo);

        switch (mode) {
            case 'Edit':
                this.modal.showEditModal(gameInfo, key);
                return;
            case 'Delete':
                this.modal.mode = 'delete';
                let deleteData = new FormData();
                deleteData.set('id', gameInfo.id);
                this.modal.showQuestionModal(gameInfo, deleteData, key);
                return; 
            case 'Vote':
                this.modal.showVoteModal(gameInfo);
                return;
            case 'Buy':
                this.modal.mode = 'buy';
                this.modal.showQuestionModal(gameInfo);
                return;
        }
        

    }
    createGameParams(id) {
        //TODO get server info and check it was edditeble?

        return {
            id: id,
            title: 'Dota 2',
            price: 2000,
            platform: [/*'windows',*/'steam','linux','playstation','xbox','apple','nintendo-switch']
        };
    }
}

export {GameCardsEngine};
