function sendRequest(method = 'GET', url = 'http://localhost/', hand = '', headers = [], body = null) {
    return new Promise((resolve,reject) => {
        const fullurl = url + hand;
        let xhr = new XMLHttpRequest();
        xhr.open(method, fullurl, true);
        console.log('full url: ' + fullurl);
        headers.forEach(header => {
            xhr.setRequestHeader(header.name, header.value);
        });
        if(method === 'GET') {
            console.log('GET');
            xhr.send();
        }else {
            console.log(method);
            xhr.send(body);
        }

        xhr.addEventListener('readystatechange', (event) => {
            
            console.log(xhr.readyState);
            if (xhr.readyState === 4) {
                
                if (xhr.status === 200) {
                    resolve(
                        {
                            status: xhr.status,
                            res: 'Success',
                            answer: xhr.responseText
                        });
                } else {
                    reject(
                        {
                            status: xhr.status,
                            res: 'Fail',
                            answer: xhr.responseText
                        });
                }
            }
        });
    });
}

    


export {sendRequest};
