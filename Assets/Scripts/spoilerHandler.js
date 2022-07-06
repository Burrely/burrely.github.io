
class SpoilerHandler {
    spoilers;
    constructor() {}

    getSpoilers() {
        this.spoilers = document.getElementsByClassName("spoiler");
        return this.spoilers;
    }

    static toggleSpoiler(element) {

        var contentHeight = ArticleHander.calculateArticleSize(element.children[0]);

        if (!element.classList.contains("active")) {
            // Not active
            anime({
                targets: element,
                height: ["0", contentHeight],
                easing: 'easeInOutQuad',
                duration: 500,
                complete: () => {
                    element.classList.add("active");
                    element.style.height = "100%";
                }
            });
        } else {
            // Active
            anime({
                targets: element,
                height: [contentHeight, "0"],
                easing: 'easeInOutQuad',
                duration: 500,
                complete: () => {
                    element.classList.remove("active");
                }
            });
        }
    }
}

const spoilerHandler = new SpoilerHandler();

window.addEventListener('load', () => {

    Array.from(spoilerHandler.getSpoilers()).forEach( (spoiler) => {

        spoiler.addEventListener('click', (event) => {
            if(event.target == spoiler) {
                SpoilerHandler.toggleSpoiler(spoiler);
            }
        });

    });
    
});

