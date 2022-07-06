class ArticleHander {
    articles;
    constructor() {}

    //
    getDocumentArticles() {
        this.articles = document.getElementsByTagName("article");
        return this.articles;
    }

    getDocumentActiveArticles() {
        var returnArray = new Array();
        Array.from(this.articles).forEach((article) => {
            if (article.classList.contains("active")) { returnArray.push(article); }
        })
        return returnArray;
    }

    assignActivation() {
        Array.from(this.articles).forEach(article => {
            article.onclick = () => {
                this.animeAnimateArticle(article, true);
                document.onclick = (event) => { // NEEDS REVISION, OVERIDES ANY OTHER EVENTS.
                    if (!article.contains(event.target)) { this.animeAnimateArticle(article, false); }
                };
            }
        });
    }

    // ANIME.JS
    animeAnimateArticle(article, activate) {
        if (activate) {
            if (article.classList.contains("active")) { return; }
            console.log("Activating " + article);
            Array.from(this.getDocumentActiveArticles()).forEach((activeArticle) => {
                this.animeAnimateArticle(activeArticle, false);
            })
            article.classList.add("active");
            anime({
                targets: article,
                width: ["calc(50% - 20px)","100%"],
                easing: 'easeInOutQuad',
                duration: 600,
                complete: () => {
                    anime({
                        targets: article,
                        height: ["320px", this.constructor.calculateArticleSize(article)],
                        easing: 'easeInOutQuad',
                        complete: () => {
                            article.style.height = "100%";
                        }
                    });
                }
            });
        } else {
            if (!article.classList.contains("active")) { return; }
            console.log("Deactivating " + article);
            anime({
                targets: "article.active",
                height: [this.constructor.calculateArticleSize(article), "320px"],
                easing: 'easeInOutQuad',
                complete: () => {
                    article.classList.remove("active");
                    anime({
                        targets: article,
                        width: ["100%","calc(50% - 20px)"],
                        easing: 'easeInOutQuad',
                        duration: 600,
                        complete: () => {
                        }
                    });
                }
            });
        }
    }

    // UTIL
    static calculateArticleSize(article) {
        let articleSize = 0;
        articleSize += parseInt(window.getComputedStyle(article).paddingBottom.substr(0,window.getComputedStyle(article).paddingBottom.length-2));
        articleSize += parseInt(window.getComputedStyle(article).borderBottomWidth.substr(0,window.getComputedStyle(article).borderBottomWidth.length-2));
        Array.from(article.children).forEach((element) => {
            articleSize += parseInt(window.getComputedStyle(element).height.substr(0,window.getComputedStyle(element).height.length-2));
            articleSize += parseInt(window.getComputedStyle(element).marginBottom.substr(0,window.getComputedStyle(element).marginBottom.length-2));
        });
        return articleSize.toString() + "px";
    }

}

const articleHandler = new ArticleHander();

window.addEventListener('load', () => {
    articleHandler.getDocumentArticles();
    articleHandler.assignActivation();
})