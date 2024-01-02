// Fields
var datasheetURL = "./mods datasheet.json";
var datasheets;
var datasheet;
var modpackNameElement = document.getElementById("ModpackName");
var modpackCategoriesElement = document.getElementById("ModpackCategories");
const excludedModCountPrefix = "##";


// Methods

async function fetchDatasheet(url) {

    console.log("loading data from \"" + url + "\" .");

    await fetch(url)
        .then((data) => // Load file.
            data.json()
            )
        .then((json) => //
            datasheets = json
            )
        .finally(() =>
            console.log("Data from \"" + url + "\" has loaded.")
            );
}

function printDatasheetToConsole() {
    console.log(datasheets["BurryPack 1.6"]);
    datasheet = datasheets["BurryPack 1.6"];
}

function printDatasheetToDocument() {
    //Set modpack name
    modpackNameElement.innerHTML = Object.keys(datasheets)[0];
    //Create Category lists
    Object.entries(datasheet.Category).forEach(category => {
        console.log(category[0] + " [" + category[1].length + "]"); // name
        // Create an unordered list per category
        let categoryListItem = document.getElementById("ModpackCategories").appendChild(document.createElement("li"))
        let listItemText = categoryListItem.appendChild(document.createElement("h3"));
        listItemText.appendChild(document.createTextNode(category[0]));
        categoryListItem.appendChild(document.createElement("h3")).appendChild(document.createTextNode("\xa0[" + category[1].length + "]"));
        var categoryModList = categoryListItem.appendChild(document.createElement("ul"));
        listItemText.onclick = ( () => {
            categoryListItem.classList.toggle("active");
        })
        categoryModList.onclick = ( () => { //
            categoryModList.classList.toggle("active");
        });
        //let categoryList = document.getElementById("ModpackCategories").appendChild(document.createElement("ul"))
        Object.entries(category[1]).forEach(modDataItem => {
            //
            let modListItem = categoryModList.appendChild(document.createElement("li"));
            //
            modListItem.append(
                CreateModItem(
                    Object.entries(modDataItem[1])[0][1],
                    Object.entries(modDataItem[1])[1][1],
                    Object.entries(modDataItem[1])[2][1],
                    Object.entries(modDataItem[1])[3][1]
                    )
            );
        });
    });
}

function CreateModItem(name, url, dependencies, notes) {
    let listItem = document.createElement("li");
    //Create name element
    let nameStyleElement = document.createElement("b");
    let nameElement = document.createElement("a");
    nameElement.setAttribute("href", url);
    nameElement.innerHTML = name;
    nameStyleElement.appendChild(nameElement);
    listItem.appendChild(nameElement);
    //Create dependencies element
    if (dependencies.length != 0) {
        listItem.appendChild(document.createElement("br"));
        var dependencyList = document.createElement("ul");
        
        let dependencyListHeader = document.createElement("b")
        dependencyListHeader.appendChild(document.createTextNode("Dependencies:"));
        dependencyList.appendChild(dependencyListHeader);

        dependencies.forEach((dependency) => {
            let dependencyListItem = document.createElement("li");
            dependencyListItem.appendChild(document.createTextNode(dependency));
            dependencyList.appendChild(dependencyListItem);
        });
        listItem.appendChild(dependencyList);
    }
    //Create notes element
    if (notes != "") {
        let notesElement = document.createElement("i");
        notesElement.appendChild(document.createTextNode("Notes: " + notes));
        listItem.appendChild(notesElement);
    }
    return listItem;
}
function printDatasheet(target) {
    switch(target) {
        case "console": {
            printDatasheetToConsole();
        }
        case "document": {
            printDatasheetToDocument();
        }
        case "both": {
            printDatasheetToConsole();
            printDatasheetToDocument();
        }
    }
}

async function Initialize() {
    await fetchDatasheet(datasheetURL);
    printDatasheet("both");
}

Initialize();