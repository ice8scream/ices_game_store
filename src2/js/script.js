
import {TopToolBar} from '../components/top-tool-bar/top-tool-bar.js';
import {FilterMenu as FilterMenuEngine} from '../components/filter-menu/filter-menu.js';
import {GameCardsEngine} from '../components/cards/cards.js';
import {ModalsEngine} from '../components/modal/modal.js';
import {sendRequest} from '../components/onlyJS/request.js';


let topToolBar = new TopToolBar(document.querySelector('.cards-wrapper'));


//==========filter========
let filterList = [{
    name: 'Цена',
    formProperty: 'cost',
    type: 'range', // range/select
    options: ['0', '500', '1000', '1500', '2000', '3000', 'Infinity']
},
{
    name: 'Рейтинг',
    formProperty: 'raiting',
    type: 'range', // range/select/icons
    options: [ '0', '1', '2', '3', '4', '5']
},
{
    name: 'Платформы',
    formProperty: 'platforms',
    type: 'select', // range/select ///TODO add icons
    options: ['all', "windows","steam", "linux", "playstation", "xbox", "apple", "nintendo-switch"]
}
];
let filterMenu = new FilterMenuEngine('filter-menu', filterList ,'filter-menu-form');

let myForm = document.querySelector('#filter-menu-form');
myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let formFilterData = new FormData(myForm);
    for (const pair of formFilterData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    
    document.querySelector('#app__toggle-view').checked = false;
    //console.log(formFilterData.entries());
});
//===============Modal==========
let modalHeap = new ModalsEngine(document.querySelector('#modal-wrapper'));
console.log(modalHeap);
const addButton = document.querySelector('.app__add-button');
addButton.addEventListener('click', () => {
    modalHeap.showEditModal();
});
//================cards=========
let gameCards = new GameCardsEngine(document.querySelector('#cards-wrapper'),[],modalHeap);
let adminChecker = document.querySelector('#admin-tumblr');
gameCards.mode = adminChecker.checked;
if(adminChecker.checked) {
    addButton.classList.remove('stuff_hiden');
} else {
    addButton.classList.add('stuff_hiden');
}
adminChecker.addEventListener('change', () => {
    gameCards.changeMode(adminChecker.checked);
    if(adminChecker.checked) {
        addButton.classList.remove('stuff_hiden');
    } else {
        addButton.classList.add('stuff_hiden');
    }
    
});



const updateButton = document.querySelector('.app__update-button');
updateButton.addEventListener('click', () => {
    const apiUrl = 'http://localhost/homework_CRUD/api/'
    let getGameList = sendRequest('GET', apiUrl, 'database.json', [], null);


    getGameList.then((result) => {
        console.log(result);  
        gameCards.updateCards(JSON.parse(result.answer));
    }).catch((result) => {
        console.log(result);
    });
});

updateButton.dispatchEvent(new Event('click'));

// topToolBar.toolbar.querySelector('.menu-button').onclick = () => {
//     topToolBar.toolbar.querySelector('.toolbar-menu').classList.toggle('toolbar-menu_active');
// }
