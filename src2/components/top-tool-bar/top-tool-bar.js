// let appTopBar = document.querySelector('.top-tool-bar');
// let contentWrapper = window;
// let scrollPosY = contentWrapper.scrollY;
// let topBarHeight = parseFloat(appTopBar.clientHeight);
// console.log(scrollPosY);
// document.addEventListener('scroll', (event) => {
//     let deltaScrollY = scrollPosY - contentWrapper.scrollY;
//     scrollPosY = contentWrapper.scrollY;
//     setTopBarPosition(deltaScrollY);
    
//     //console.log(deltaScrollY);
// });

// function setTopBarPosition(deltaScrollY){
//     if(deltaScrollY > 11 ) {
//         deltaScrollY = 10;
//     } else if (deltaScrollY < -11){
//         deltaScrollY = -10;
//     }
//     let nextTopPos = (parseFloat(appTopBar.style.top) || 0) + deltaScrollY;
//     console.log(parseFloat(appTopBar.clientHeight));
//     if(nextTopPos < -topBarHeight) {
//         nextTopPos = -topBarHeight + 'px';
//     } else if (nextTopPos > 0){
//         nextTopPos = '0p';
//     }
        
//     appTopBar.style.top = nextTopPos + 'px';
//     //appTopBar.style.top;
// }

class TopToolBar {
    constructor(scrollNode) {
        this.toolbar = document.querySelector('.top-tool-bar');
        let contentWrapper = scrollNode;
        
        let scrollPosY = contentWrapper.scrollTop;
        
        this.toolbarHeight = parseFloat(this.toolbar.clientHeight);
        this.translatePos = 0;
        console.log(scrollPosY);
        scrollNode.addEventListener('scroll', (event) => {
            console.log(scrollPosY);
            let deltaScrollY = scrollPosY - contentWrapper.scrollTop;
            scrollPosY = contentWrapper.scrollTop;
            this.setTopBarPosition(deltaScrollY);
        });
        
    }
    setTopBarPosition(deltaScrollY) {
        let nextTopPos = this.translatePos + deltaScrollY;
    
        
        if(nextTopPos < -this.toolbarHeight) {
            nextTopPos = -this.toolbarHeight;
        } else if (nextTopPos > 0){
            nextTopPos = 0;
        }
        
        this.translatePos = nextTopPos;
        this.toolbar.style.transform = 'translateY(' + nextTopPos + 'px)';
        //appTopBar.style.top;
    }
    
}

export {TopToolBar};