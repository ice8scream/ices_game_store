function createElement(template = {}) {
    if (template === {}) return;
    if (typeof (template) === 'string') {
        return document.createTextNode(template);
    }

    let elem = document.createElement(template.tag);
    if (template.elemClass && template.elemClass.length) {
        template.elemClass.forEach(element => {
            elem.classList.add(element);
        });
    }

    if (template.attrs && template.attrs !== {}) {
        Object.keys(template.attrs).forEach(attr => {
            if (attr === 'checked') {
                if (template.attrs[attr]) {
                    elem.checked = 'checked';
                }
                return;
            }
            elem.setAttribute(attr, template.attrs[attr]);
        });
    }

    if (template.content && template.content.length) {
        template.content.forEach(element => {
            elem.appendChild(createElement(element));
        });
    }
    return elem;
}

export {createElement};