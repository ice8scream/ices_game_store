import {createElement} from '../onlyJS/createElement.js';

class FilterMenu {
    constructor(id, filterList = null, form) {
        this.menu = document.querySelector('#' + id);
        this.form = form;
        this.createOrderParam();
        this.createTemplate(filterList);
    }
    createOrderParam(){
        let template = {
            tag: 'li',
            elemClass: ['filter-param', 'filter-param_order-of-add'],
            content: [{
                    tag: 'div',
                    elemClass: ['filter-param__header'],
                    content: [
                            {
                                tag: 'div',
                                elemClass: ['filter-param__title'],
                                content: ['Order of add']
                            },
                            {
                                tag: 'label',
                                elemClass: ['filter-param__mode'],
                                content: [{
                                        tag: 'input',
                                        elemClass: ['filter-param__order'],
                                        attrs: {
                                            type: 'checkbox',
                                            name: 'add-order',
                                            form: this.form
                                        }
                                    },
                                    {
                                        tag: 'span'
                                    },
                                    {
                                        tag: 'div',
                                        elemClass: ['filter-param__icon'],
                                        content: [{
                                            tag: 'i',
                                            elemClass: ['fas', 'fa-arrow-circle-up']
                                        }]
                                    }]
                            }
                    ]
                }]
        };
        this.menu.appendChild(createElement(template));
    }
    createTemplate(filterList) {
        let form = this.form;
        let menuWrapper = document.createDocumentFragment();
        let template = {};
        const createIcon = this.optionToIcon;
        filterList.forEach(element => {
            template = {
                tag: 'li',
                elemClass: ['filter-param', 'filter-param_' + element.type],
                content: [{
                        tag: 'div',
                        elemClass: ['filter-param__header'],
                        content: [{
                                tag: 'div',
                                elemClass: ['filter-param__icon'],
                                content: [{
                                        tag: 'i',
                                        elemClass: ['fas', 'fa-angle-right']
                                    }]
                                },
                                {
                                    tag: 'div',
                                    elemClass: ['filter-param__title'],
                                    content: [element.name]
                                }, element.type !== 'select' ?
                                {
                                    tag: 'label',
                                    elemClass: ['filter-param__mode'],
                                    content: [{
                                            tag: 'input',
                                            elemClass: ['filter-param__order'],
                                            attrs: {
                                                type: 'checkbox',
                                                name: element.formProperty + '-order',
                                                form: form
                                            }
                                        },
                                        {
                                            tag: 'span'
                                        },
                                        {
                                            tag: 'div',
                                            elemClass: ['filter-param__icon'],
                                            content: [{
                                                tag: 'i',
                                                elemClass: ['fas', 'fa-arrow-circle-up']
                                            }]
                                        }]
                                } : ''
                        ]
                    },
                    {
                        tag: 'div',
                        elemClass: ['filter-param__body'],
                        content: function (element) {
                            let headOfPart, inputType;
                            if (element.type === 'range') {
                                inputType = 'radio';
                                headOfPart = [{
                                    tag: 'div',
                                    elemClass: ['filter-custom'],
                                    content: [{
                                            tag: 'input',
                                            elemClass: ['filter-custom__from'],
                                            attrs: {
                                                type: 'text',
                                                name: element.formProperty + '-from',
                                                placeholder: 'от',
                                                form: form,
                                                value: element.options[0]
                                            }
                                        },
                                        {
                                            tag: 'input',
                                            elemClass: ['filter-custom__to'],
                                            attrs: {
                                                type: 'text',
                                                name: element.formProperty + '-to',
                                                placeholder: 'до',
                                                form: form,
                                                value: element.options[element.options.length -1]
                                            }
                                        }
                                    ]
                                }];
                            } else {
                                inputType = 'checkbox';
                                headOfPart = [{
                                    tag: 'div',
                                    elemClass: ['filter-custom'],
                                    content: [{
                                        tag: 'select',
                                        elemClass: ['filter-custom__select'],
                                        attrs: {
                                            name: element.formProperty,
                                            multiple: true,
                                            form: form,
                                            style: 'display: none'
                                        },
                                        content: element.options.slice(1).map(item => {
                                            return {
                                                tag: 'option',
                                                attrs: {
                                                    value: item
                                                },
                                                content: [item]
                                            };
                                        })
                                    }]
                                }];
                            }
                            //=============================
                            if (inputType === 'checkbox') {
                                headOfPart.push({
                                    tag: 'ul',
                                    elemClass: ['filter-change'],
                                    content: element.options.map((item, index, arr) => {
                                        return {
                                            tag: 'li',
                                            elemClass: ['filter-change__part'],
                                            content: [{
                                                tag: 'label',
                                                elemClass: ['filter-change__handler'],
                                                content: [{
                                                        tag: 'input',
                                                        elemClass: ['filter-change__' + inputType],
                                                        attrs: {
                                                            type: inputType,
                                                            name: element.formProperty,
                                                            value: item
                                                        }
                                                    },
                                                    createIcon(item),
                                                    {
                                                        tag: 'p',
                                                        elemClass: ['filter-change__' + element.type],
                                                        content: [item]
                                                    }
                                                ]
                                            }]
                                        };
                                    })
                                });
                            } else {
                                headOfPart.push({
                                    tag: 'div',
                                    elemClass: ['filter-radio'],
                                    content: [{
                                        tag: 'ul',
                                        elemClass: ['filter-change', 'filter-radio_from'],
                                        content: element.options.slice(0,element.options.length - 1).map((item, index, arr) => {
                                            return {
                                                tag: 'li',
                                                elemClass: ['filter-change__part'],
                                                content: [{
                                                    tag: 'label',
                                                    elemClass: ['filter-change__handler'],
                                                    content: [{
                                                            tag: 'input',
                                                            elemClass: ['filter-change__' + inputType],
                                                            attrs: {
                                                                type: inputType,
                                                                name: element.formProperty + '-radio-from',
                                                                value: item,
                                                                checked: index === 0 ? true : false
                                                            }
                                                        },
                                                        {
                                                            tag: 'p',
                                                            elemClass: ['filter-change__' + element.type],
                                                            content: [item]
                                                        }
                                                    ]
                                                }]
                                            };
                                        })
                                    },
                                    {
                                        tag: 'ul',
                                        elemClass: ['filter-change', 'filter-radio_to'],
                                        content: element.options.slice(1).map((item, index, arr) => {
                                            return {
                                                tag: 'li',
                                                elemClass: ['filter-change__part'],
                                                content: [{
                                                    tag: 'label',
                                                    elemClass: ['filter-change__handler'],
                                                    content: [{
                                                            tag: 'input',
                                                            elemClass: ['filter-change__' + inputType],
                                                            attrs: {
                                                                type: inputType,
                                                                name: element.formProperty + '-radio-to',
                                                                value: item,
                                                                checked: index === arr.length - 1 ? true : false
                                                            }
                                                        },
                                                        {
                                                            tag: 'p',
                                                            elemClass: ['filter-change__' + element.type],
                                                            content: [item]
                                                        }
                                                    ]
                                                }]
                                            };
                                        })
                                    }]
                                });
                            }
                            //============================
                            /*
                            headOfPart.push({
                                tag: 'ul',
                                elemClass: ['filter-change'],
                                content: element.options.map((item, index, arr) => {
                                    return {
                                        tag: 'li',
                                        elemClass: ['filter-change__part'],
                                        content: [{
                                            tag: 'label',
                                            elemClass: ['filter-change__handler'],
                                            content: [{
                                                    tag: 'input',
                                                    elemClass: ['filter-change__' + inputType],
                                                    attrs: inputType === 'radio' ? {
                                                        type: inputType,
                                                        name: element.formProperty,
                                                        'data-from': index === 0 || index === 1 ? '0' : parseFloat(arr[index - 1]) + 1,
                                                        'data-to': index === 0 ? Infinity : item,
                                                        checked: index === 0 ? true : false
                                                    } : {
                                                        type: inputType,
                                                        name: element.formProperty,
                                                        value: item
                                                    }
                                                },
                                                {
                                                    tag: 'p',
                                                    elemClass: ['filter-change__' + element.type],
                                                    content: [inputType === 'radio' ? (
                                                            index === 0 ? 'all' : (
                                                                index === 1 ? 'before ' + item : (
                                                                    parseFloat(arr[index - 1]) + 1 + (item === 'Infinity' ? ' and more' : ' - ' + item)
                                                                )
                                                            )
                                                        ) :
                                                        item
                                                    ]
                                                }
                                            ]
                                        }]
                                    };
                                })
                            });*/
                            return headOfPart;
                        }(element)
                    }
                ]
            };
            menuWrapper.appendChild(createElement(template));
        });
        //console.log(menuWrapper);

        this.menu.appendChild(menuWrapper);
        let menuItems = this.menu.querySelectorAll('.filter-param:not(.filter-param_order-of-add)');
        //console.log(menuItems);

        menuItems.forEach(menuItem => {
             let itemHeader = menuItem.querySelector('.filter-param__header'),
                 itemBody = menuItem.querySelector('.filter-param__body');
             let headerArrow = itemHeader.querySelector('.filter-param__icon');
             let bodyHeight = itemBody.clientHeight,
                 isBodyhidden = false;
             itemBody.setAttribute('style', "height: 0px;");

             itemHeader.addEventListener('click', (event) => {
                 if (isBodyhidden) {
                     itemBody.setAttribute('style', 'height: 0px;');
                 } else {
                     itemBody.setAttribute('style', 'height:' + bodyHeight + 'px;');
                 }
                 headerArrow.classList.toggle('filter-param__icon_active');
                 isBodyhidden = !isBodyhidden;
             });
             if (menuItem.classList.contains('filter-param_range')) {

                 let fromInput = itemBody.querySelector('.filter-custom__from'),
                     toInput = itemBody.querySelector('.filter-custom__to'),
                     radiosFrom = itemBody.querySelector('.filter-radio_from').querySelectorAll('.filter-change__radio'),
                     radiosTo = itemBody.querySelector('.filter-radio_to').querySelectorAll('.filter-change__radio');
                     let leftIndex = 0,
                         rightIndex = radiosTo.length;

                        
                 radiosFrom.forEach(item => {
                     item.addEventListener('change', () => {
                         //console.log(item.getAttribute('data-from'), item.getAttribute('data-to'));
                         fromInput.setAttribute('value', item.getAttribute('value'));
                         leftIndex = Array.from(radiosFrom).indexOf(item);
                         
                         if(leftIndex > rightIndex) {
                            radiosTo[leftIndex].dispatchEvent(new Event('change'));
                            radiosTo[leftIndex].checked = true;
                         }
                     });
                 });
                 radiosTo.forEach(item => {
                    item.addEventListener('change', () => {
                        //console.log(item.getAttribute('data-from'), item.getAttribute('data-to'));
                        
                        toInput.setAttribute('value', item.getAttribute('value'));
                        rightIndex = Array.from(radiosTo).indexOf(item);
                        if(leftIndex > rightIndex) {
                            radiosFrom[rightIndex].dispatchEvent(new Event('change'));
                            radiosFrom[rightIndex].checked = true;
                         }
                    });
                });
             } else {
                 let select = itemBody.querySelector('.filter-custom__select'),
                     checkerAll = itemBody.querySelector('.filter-change__checkbox[value=all]'),
                     checkers = itemBody.querySelectorAll('.filter-change__checkbox:not([value=all])');
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
                 // checkers.forEach(item => {
                 //         item.addEventListener('change', () => {
                 //             let state = false; 
                 //             if(item.checked){
                 //                 state = true;
                 //             } 
                 //             console.log(state);
                 //             if(item.value === 'all'){

                 //                 checkers.forEach(checker => {
                 //                     if(checker.value === 'all') return;
                 //                     checker.checked = state;

                 //                 });
                 //             }
                 //             console.log(item.value);
                 //         });

                 // });
             }
         });

    }
    optionToIcon(option) {
        return {
            tag: 'i',
            elemClass: option === 'all' ? ['fas', 'fa-check-circle'] : ['fab', 'fa-' + option]
        };
    }
}

export {FilterMenu};