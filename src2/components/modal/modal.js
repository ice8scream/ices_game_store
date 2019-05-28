

import {createElement} from '../onlyJS/createElement.js';
import {sendRequest} from '../onlyJS/request.js';

class ModalsEngine {
    constructor(wrapper) {
        this.modalWraper = wrapper;

        const modals = ['editModal','voteModal','alertModal','questionModal','congratulationModal'];
        modals.forEach( modalName => {
            this.createModalForm(modalName);
        });
        this.createEditModal();
        this.createQuestionModal();
        this.createVoteModal();
        this.createCongratulationModal();
        this.createAlertModal();
    }
    createModalForm(modalName) {
        let modal;
        const modalTemplate = {
            tag: 'form',
            elemClass: ['modal']
        };
        modal = createElement(modalTemplate);

        this.setAcceptCancelEvents(modal);


        modal.addEventListener('close-modal', () => {
            event.preventDefault();
            console.log(modal);
            this.modalWraper.removeChild(modal);
            // this.hideWrapper();
        });
        //console.log(modal);
        this[modalName] = modal;
    }

    createModalsTeplate() {
        /*
        this.editModal selectors
                       
                        let select =  this.editModal.querySelector('.modal-platform-select'),
                            checkerAll =  this.editModal.querySelector('.platform-checker[value=all]'),
                            checkers =  this.editModal.querySelectorAll('.platform-checker:not([value=all])');
                            let checkCount = 0;

         */
    }

    removeAllModals() {
        this.modalWraper.childNodes.forEach(child => {
            this.modalWraper.removeChild(child);
        });
    }


    showWrapper() {
        this.modalWraper.classList.remove('modal_hidden');
    }
    hideWrapper() {
        this.modalWraper.classList.add('modal_hidden');
    }
    setAcceptCancelEvents(modal) {
        modal.addEventListener('click', (event) => {
            //event.preventDefault();
            let target = event.target;
            
            while(target !== modal){
                if(target.classList.contains('modal__action-icon_close') ){
                    console.log('close');
                    modal.dispatchEvent(new CustomEvent('close-modal'));
                    return;
                }
                if(target.classList.contains('modal__action-icon_accept') ){
                    console.log('submit');
                    modal.dispatchEvent(new CustomEvent('modal__submit'));
                    return;
                }
                target = target.parentNode;
            }

        });
    }

//===================EditModal==================
    createEditModal() {
        this.editModal.innerHTML  = 
            `<section class="modal__main">
            <section class="modal__primary ">
                <div class="modal__title">
                    <span calss="modal__name">Name: </span>
                    <input class="modal__input" name="title" placeholder="no empty title" value="gamTitle">
                </div>
                <div class="modal__subtitle modal__title_subtitle">
                    <span><b>Price:</b></span> <input class="modal__input modal__input_sub" name="price" placeholder="num" value="gamePrice"> <span> <i
                            class="fas fa-ruble-sign"></i></span>
                </div>
            </section>
            <section class="modal__secondary">
                <select class="modal-platform-select" style="display: none" multiple value="">
                    <option value="windows"></option>
                    <option value="steam"></option>
                    <option value="xbox"></option>
                    <option value="linux"></option>
                    <option value="apple"></option>
                    <option value="playstation"></option>
                    <option value="nintendo-switch"></option>
                </select>
                <label>
                        <input class="platform-checker" type="checkbox" value="all">
                        <i class="far fa-check-circle"></i>
                </label>
                <label>
                    <input class="platform-checker" type="checkbox" value="windows">
                    <i class="fab fa-windows"></i>
                </label>
                <label>
                    <input class="platform-checker" type="checkbox" value="steam">
                    <i class="fab fa-steam"></i>
                </label>
                <label>
                    <input class="platform-checker" type="checkbox" value="xbox">
                    <i class="fab fa-xbox"></i>
                </label>
                <label>
                    <input class="platform-checker" type="checkbox" value="linux">
                    <i class="fab fa-linux"></i>
                </label>
                <label>
                    <input class="platform-checker" type="checkbox" value="apple">
                    <i class="fab fa-apple"></i>
                </label>
                <label>
                    <input class="platform-checker" type="checkbox" value="playstation">
                    <i class="fab fa-playstation"></i>
                </label>
                <label>
                    <input class="platform-checker" type="checkbox" value="nintendo-switch">
                    <i class="fab fa-nintendo-switch"></i>
                </label>




            </section>
        </section>

        <section class="modal__icons">
            <div class="modal__action-icon modal__action-icon_close">
                    <i class="fas fa-ban"></i>
            </div>
            <div class="modal__action-icon modal__action-icon_accept">
                    <i class="fas fa-arrow-circle-right"></i>
            </div> 
        </section>`;

        let select =  this.editModal.querySelector('.modal-platform-select'),
                            checkerAll =  this.editModal.querySelector('.platform-checker[value=all]'),
                            checkers =  this.editModal.querySelectorAll('.platform-checker:not([value=all])');
                            let checkCount = 0;

       
        checkerAll.addEventListener('change', (event) => {
            
            let state = checkerAll.checked;
            if (state) {
                checkCount = checkers.length;
            } else {
                checkCount = 0;
            }
            checkers.forEach(checker => {
                checker.checked = state;
                select.querySelector('[value="' + checker.value + '"]').selected = state;
            });
        });

        checkers.forEach(checker => {
            checker.addEventListener('change', () => {
                let state = checker.checked;
                select.querySelector('[value="' + checker.value + '"]').selected = state;
                if (state) {
                    checkCount++;
                    if (checkCount === checkers.length) {
                        checkerAll.checked = true;
                    }
                } else {
                    checkCount--;
                    checkerAll.checked = false;
                }
            });
        });

        this.editModal.addEventListener('close-modal', () => {
                event.preventDefault();
                this.game = undefined;
                this.mode = undefined;
                this.hideWrapper();
        });

        this.editModal.addEventListener('modal__submit', (event) => {
            event.preventDefault();
            
            let addForm = new FormData(this.editModal);
            let platforms = Array.from(select.querySelectorAll('option')).reduce( (res, platform) => {
                if(platform.selected) {
                    res.push(platform.value);  
                }
                return res;
            },[]);
            //console.log(!addForm.get('title'), !addForm.get('price'),  !platforms.length);
            if(!addForm.get('title') || !Number(addForm.get('price')) && addForm.get('price') !== '0' || !platforms.length) {
                this.showAlertModal('Enter valid data please');
                if(!addForm.get('title')) {
                    this.editModal.querySelector('.modal__input[name=title]').style.backgroundColor = 'rgb(255, 124, 124)';
                } else {
                    this.editModal.querySelector('.modal__input[name=title]').style.backgroundColor = 'transparent';
                }

                if( !Number(addForm.get('price')) && addForm.get('price') !== '0' ) {
                    this.editModal.querySelector('.modal__input[name=price]').style.backgroundColor = 'rgb(255, 124, 124)';
                } else {
                    this.editModal.querySelector('.modal__input[name=price]').style.backgroundColor = 'transparent';
                }
                if(!platforms.length) {
                    this.editModal.querySelector('.modal__secondary').style.backgroundColor = 'rgb(255, 124, 124)';
                } else {
                    this.editModal.querySelector('.modal__secondary').style.backgroundColor = 'transparent';
                }
                return;
            } else {
                this.editModal.querySelector('.modal__input[name=title]').style.backgroundColor = 'transparent';
                this.editModal.querySelector('.modal__input[name=price]').style.backgroundColor = 'transparent';
                this.editModal.querySelector('.modal__secondary').style.backgroundColor = 'transparent';
            }
            
            addForm.set('platform', JSON.stringify(platforms));
            
            this.mode = 'add';
            if(this.game) {
                addForm.append('id', this.game.id);
                this.mode = 'edit';
                addForm.set('key', this.key);
                this.key = null;
            }

            for (const pair of addForm.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
            this.showQuestionModal(this.game, addForm);
        });
    }

    showEditModal(game = null, key = null){
        this.key = key;
        this.game = game;
        let checkers =  this.editModal.querySelectorAll('.platform-checker:not([value=all])');
        this.editModal.querySelector('input.modal__input[name=title]').value = game ? game.title : "";
        this.editModal.querySelector('input.modal__input[name=price]').value = game ? game.price : "";
        checkers.forEach(platform => {  
                platform.checked = false;
                platform.dispatchEvent(new Event('change'));
        });
        
        if(game && game.platform) {
            let platforms =  game.platform;
            checkers.forEach(platform => {
                if(platforms.includes(platform.value)) {
                    platform.checked = true;
                    platform.dispatchEvent(new Event('change'));
                }
            });
        }

        this.modalWraper.appendChild(this.editModal);
        this.showWrapper();
    }
//==================QuestionModal===================
    createQuestionModal() {
        /*
        modal__title
        modal__title_subtitle
        */
        this.questionModal.innerHTML = ` <section class="modal__main">
            <section class="modal__primary ">
                <div class="modal__title">
                    gameTitle
                </div>
                <div class="modal__subtitle modal__title_subtitle">
                    Are you shure to mode this game?
                </div>
            </section>
        </section>

        <section class="modal__icons">
            <div class="modal__action-icon modal__action-icon_close">
                    <i class="fas fa-ban"></i>
            </div>
            <div class="modal__action-icon modal__action-icon_accept">
                    <i class="fas fa-arrow-circle-right"></i>
            </div> 
        </section>`;

        this.questionModal.addEventListener('modal__submit', () => {
            event.preventDefault();
            //console.log('gotha');
            if(this.mode === 'buy') {
                this.showCongratulationModal();
            } else {
                sendRequest('POST', 'http://localhost/homework_CRUD/api/',
                     this.mode + '.php', [],
                     this.formData).then(answer =>{
                        this.showCongratulationModal(this.mode);
                        console.log(answer);
                     }).catch(answer => {
                        this.showAlertModal('Somethings wrong');
                        console.log(answer);
                     });
                     
                     //console.log(this);
            }
            
            
        });
        this.questionModal.addEventListener('close-modal', () => {
            if (this.mode === 'add') {
                this.game = null;
            }
            
            if(this.mode === 'buy' || this.mode === 'delete') {
                
                this.hideWrapper();
            }
        });
        this.questionModal.addEventListener('modal__submit', () => {
            this.modalWraper.removeChild(this.questionModal);
        });
        //this.questionModal.addEventListener
    }
    
    showQuestionModal( game, data = null) {
        if(data){
            for (const pair of data.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
        }
        console.log( this.mode);
        let gameTitle;
        if(game){
            gameTitle = game.title;
            if(this.mode === 'delete' || this.mode === 'buy') {
                this.game = game;
            }
        }else {
            gameTitle = data.get('title');
            this.game = {
                title:  data.get('title')
            };
        }
        this.formData = data;
        this.questionModal.querySelector('.modal__title').innerText = gameTitle;
        this.questionModal.querySelector('.modal__title_subtitle').innerText =  'Are you shure to ' + this.mode + ' this game?';

        this.modalWraper.appendChild(this.questionModal);
        this.showWrapper();
    }
//===============Congratulation==================
    createCongratulationModal() {
        this.congratulationModal.innerHTML = `<section class="modal__main">
            <section class="modal__primary ">
                <div class="modal__title">
                    Congratulations
                </div>
                <div class="modal__subtitle modal__title_subtitle congrat-title">
                    '-Game Title-' was successfully '-mode-' 
                </div>
            </section>
        </section>

        <section class="modal__icons">
            <div class="modal__action-icon modal__action-icon_close">
                    <i class="fas fa-arrow-circle-right"></i>
            </div> 
        </section>`;
        this.congratulationModal.addEventListener('close-modal', () => {
            event.preventDefault();
            this.game = undefined;
            this.mode = undefined;
            this.formData = undefined;
            this.removeAllModals();
            this.hideWrapper();
        });
        this.congratulationModal.addEventListener('modal__submit', () => {
            event.preventDefault();
            this.game = undefined;
            this.mode = undefined;
            this.formData = undefined;
            this.removeAllModals();
            this.hideWrapper();
        });
    }
    showCongratulationModal() {
        this.congratulationModal.querySelector('.congrat-title').innerText =
            this.game.title + ' was successfully ' + this.mode;

        this.modalWraper.appendChild(this.congratulationModal);
        this.showWrapper();
        //TODO congratulation Modal
    }
//===============Vote=============================
    createVoteModal() {
        this.voteModal.innerHTML = `<section class="modal__main">
            <section class="modal__primary ">
                <div class="modal__title">
                    Game title
                </div>
                <div class="modal__subtitle modal__title_subtitle">
                    Vote the game
                </div>
            </section>
            <section class="modal__secondary stars-wrap">
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
            </section>
        </section>

        <section class="modal__icons">
            <div class="modal__action-icon modal__action-icon_close">
                    <i class="fas fa-ban"></i>
            </div>
            <div class="modal__action-icon">
                    <i class="fas fa-arrow-circle-right modal__action-icon_accept"></i>
            </div> 
        </section>`;

        

        let starsCounter = 1;
        let voteStarsWrap = this.voteModal.querySelector('.stars-wrap');
        let stars = voteStarsWrap.querySelectorAll('i.fa-star');
        voteStarsWrap.addEventListener('click', (event) => {
            event.preventDefault();
            if(event.target.classList.contains('fa-star') ) {
                let currentStar = event.target;
                let fill = true;
                starsCounter = 0;
                console.log(starsCounter);
                stars.forEach(star => {
                    if(fill) {
                        starsCounter++;
                        star.classList.remove('far');
                        star.classList.add('fas');
                        if(star === currentStar){
                            fill = false;
                        }
                    }else {
                        star.classList.remove('fas');
                        star.classList.add('far');
                    }
                });
                console.log(starsCounter);
            }
        });
        this.voteModal.addEventListener('close-modal', () => {
            event.preventDefault();
            starsCounter = 1;
            this.hideWrapper();
        });

        this.voteModal.addEventListener('modal__submit', () => {  
            event.preventDefault();
            this.mode = 'vote';
            let formData = new FormData();
            formData.set('id', this.game.id);
            formData.set('rating', starsCounter);
            sendRequest('POST', 'http://localhost/homework_CRUD/api/',
                     this.mode + '.php', [],
                     formData).then(answer =>{
                        this.showCongratulationModal(this.mode);
                        console.log(answer);
                     }).catch(answer => {
                       
                        this.showAlertModal( JSON.parse(answer).answer.status);
                        console.log(answer);
                     });
            //this.showCongratulationModal();
            //console.log(starsCounter, this.game.id, this.mode);
            starsCounter = 1;
        });
    }

    showVoteModal(game) {
        this.voteModal.querySelector('.modal__title').innerText = game.title;
        this.voteModal.querySelectorAll('.fa-star').forEach(star => {
            star.classList.remove('fas');
            star.classList.add('far');
        });
        this.voteModal.querySelector('.fa-star').classList.add('fas');
        this.voteModal.querySelector('.fa-star').classList.remove('far');
        this.game = game;
        this.modalWraper.appendChild(this.voteModal);
        this.showWrapper();
    }
//============Alert============================

        //TODO lastModal
        createAlertModal() {
            this.alertModal.innerHTML = `<section class="modal__main">
                <section class="modal__primary ">
                    <div class="modal__title">
                        Alert
                    </div>
                    <div class="modal__subtitle modal__title_subtitle congrat-title">
                        Message 
                    </div>
                </section>
            </section>
    
            <section class="modal__icons">
                <div class="modal__action-icon modal__action-icon_close">
                        <i class="fas fa-ban"></i>
                </div> 
            </section>`;
            this.alertModal.addEventListener('close-modal', () => {
                this.game = null;
                if(this.modalWraper.childNodes.length === 0) {
                    this.hideWrapper();
                }
            });
        }
        showAlertModal(message) {
            this.alertModal.querySelector('.congrat-title').innerText =
                message;
    
            this.modalWraper.appendChild(this.alertModal);
            this.showWrapper();
            //TODO alert Modal
        }

}


export {ModalsEngine};

/*
{
    tag: 'article',
    elemClass: ['game-card'],
    attrs: {},
    content: []
}
*/

/*
add, edit, delete, vote
*/