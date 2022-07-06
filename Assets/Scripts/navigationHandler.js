const debounce = function (method) {
    
let frame;

    return (...params) => {
        
        if (frame) { 
            cancelAnimationFrame(frame);
        }
        
        frame = requestAnimationFrame(() => {
            method(...params);
        });

    } 
};
  
const storeScrollPos = function() {
    document.documentElement.dataset.scroll = window.scrollY;
}

document.addEventListener('scroll', debounce(storeScrollPos), { passive: true });

storeScrollPos();