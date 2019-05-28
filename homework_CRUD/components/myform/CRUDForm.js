// document.addEventListener('DOMContentLoaded', ()=> {
    
// });

let crudForm = document.querySelector('form.CRUD-form');

// let reqWrap = function(){
//     let wrapData = new FormData();
//     this.setData = function(data){
//         Object.keys(data).forEach( item => {
//             wrapData.append(item, data[item]);
//         });
//         for(let prop of wrapData){
//             console.log(wrapData.getAll(prop));
//         }
//     };
//     //data.append('title', 'Dark Souls Remastered');
// };


let chooseForm = document.querySelectorAll('input[name="choose-radio"]');
chooseForm.forEach((item) => item.addEventListener('change', (event) => {
   // console.log(event.target.value);
    setChoosenForm(event.target.value);
}));
let formState ='add';
function setChoosenForm(choose) {
    let queryForms = [];
    formState = choose.toLowerCase();
    switch (choose) {
        case 'Add':
            queryForms.push('title', 'platform', 'price');
            break;
        case 'Vote':
            queryForms.push('id','rating');
            break;
        case 'Delete':
            queryForms.push('id');
            break;
        case 'Edit':
            queryForms.push('id', 'title', 'platform', 'price');
            break;
    }
    // console.log(queryForms);
    // console.log(crudForm.querySelectorAll('input:not([type="submit"]'));
    let topProp = false;
    let botPropindex = null;
    crudForm.querySelectorAll('input:not([type="submit"]').forEach((item, index) => {
        //console.log(item.name);
        item.classList.remove('form-property-top');
        item.classList.remove('form-property-bottom');
        if(queryForms.includes(item.name)){
            item.classList.remove('none-display');
            item.disabled = false;
            if(!topProp){
                topProp = true;
                item.classList.add('form-property-top');
            }
            botPropindex = index;
        } else {
            item.classList.add('none-display');
            item.disabled = true;
        }
    });
    crudForm[botPropindex].classList.add('form-property-bottom');
}

//let formParams = ['title', 'platform', 'price'];
crudForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let wrapData = new FormData(crudForm);
        
        if(wrapData.get('platform')){
            wrapData.set('platform', JSON.stringify(wrapData.get('platform').split(/, /)));
        }
        let req = new Promise((resolve, reject) => {
            let url = 'http://localhost/homework_CRUD/api/';
            let hand = formState + '.php';
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url + hand, true);
            // xhr.setRequestHeader('Cache-Control', 'public');
            
            xhr.send(wrapData);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    console.log(xhr.status);
                    if (xhr.status === 200) {
                        resolve('Success');
                    } else {
                        reject('fail');
                    }
                }
            };
        });
        req.then((mes)=> {
            console.log(mes);
            crudForm.querySelectorAll('input:not([type="submit"]').forEach((item) => {
                item.value = '';
            });
        }).catch((mes)=> console.log(mes));
        /*for (let prop of wrapData) {
            console.log(prop);
            console.log(wrapData.get(prop[0]));
        }/*
        formParams.forEach((item) => {
            console.log(wrapData.getAll(item));
            //wrapData.append(item, data[item]);
        });*/

    // console.log(event.target);
    // console.log(Object.keys(formProps));
    // let reqData = new reqWrap();
    // reqData.setData();
});