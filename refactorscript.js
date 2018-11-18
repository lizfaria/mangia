const app = {};

app.recipeKeys = function () {
    const searchTerm = document.querySelector('input[type = search]').value; 
    const allAllergies = document.querySelectorAll('.allergies input[type = checkbox]');
    const selectedAllergy = [...allAllergies].filter(input => input.checked == true);
    const allDiets = document.querySelectorAll('.dietary input[type = checkbox]');
    const selectedDiet = [...allDiets].filter(input => input.checked == true);

    app.getRecipes(searchTerm, selectedAllergy, selectedDiet);
}

app.getRecipes = function (searchTerm, selectedAllergy, selectedDiet) {
    axios
        .get('http://api.yummly.com/v1/api/recipes', {
            dataResponse: 'json',
            params: {
                _app_id: '0a0c3a8c',
                _app_key: '3d2d8d9336ff2dd0a5bbd759f25b8a3c',
                maxResult: 16,
                q: searchTerm,
                allowedAllergy: selectedAllergy,
                allowedDiet: selectedDiet
            }
        })
        .then(res => {
        let apiResults = res;
        const recipeArray = apiResults.data.matches;
        
        app.updateSearchTitle(searchTerm, recipeArray);
        app.displayRecipes(recipeArray);
        });
};

app.appendElemToUl = function(parent, child) {
    return parent.appendChild(child);
}

app.appendHtmlToElem = function(elem, html, recipeItem, className) {
    const a = document.createElement(elem);
    const b = document.createTextNode(html);
    a.appendChild(b);
    a.classList.add(className);
    app.appendElemToUl(recipeItem, a);
    return a;
}

app.appendHtmlToElemOnly = function(elem, html, className) {
    const a = document.createElement(elem);
    const b = document.createTextNode(html);
    a.appendChild(b);
    a.classList.add(className);
    return a;
}

app.setAttr = function(elem, attr_prop, attr_val) {
    return elem.setAttribute(attr_prop, attr_val);
}

app.showRecipeTitle = function (item, recipeItem) {
    const elem = 'h4';
    const html = item.recipeName;
    app.appendHtmlToElem(elem, html, recipeItem);
}

app.showRecipeSource = function (item, recipeItem) {
    const source = item.sourceDisplayName
    const recipeUrl = `https://www.yummly.com/recipe/${item.id}`;
    const linkElem = "a"
    const link = app.appendHtmlToElem(linkElem, source, recipeItem, 'recipe_link');
    app.setAttr(link, 'href', recipeUrl);
    app.setAttr(link, 'target', '_blank');
}

app.showRecipeImage = function (item, recipeItem) {
    const imageUrl = item.imageUrlsBySize['90'].split('=')[0];
    const imageElement = app.appendHtmlToElem('img', 'X', recipeItem, 'meal');
    app.appendElemToUl(recipeItem, imageElement);
    app.setAttr(imageElement, 'src', imageUrl)
}

app.createIngredientsUl = function (item, recipeItem) {
    const ingredientUl = app.appendHtmlToElem('ul', 'X', recipeItem, 'ingredients'); 
    app.addIngredientsLiToUl(item, ingredientUl, recipeItem);
}

app.addIngredientsLiToUl = function (item, ingredientUl, recipeItem) {
    item.ingredients.forEach(ingredient => app.addIngredientToUl(ingredientUl, ingredient, recipeItem));
}

app.addIngredientToUl = function (ingredientUl, ingredient, recipeItem) {
    const ingredientLi = app.createIngredientLi(ingredient);
    app.appendElemToUl(ingredientUl, ingredientLi);
    app.appendElemToUl(recipeItem, ingredientUl)
}

app.createIngredientLi = function (ingredient) {
    const li = app.appendHtmlToElemOnly('li', ingredient, 'ingredient');
    return li;
}

app.createIngredientsButton = function (recipeItem) {
    ingredientsButton = app.appendHtmlToElem('button', 'ingredients', recipeItem, 'ingredientsButton');
    app.toggleIngredients(recipeItem, ingredientsButton);
}

app.displayRecipes = function (recipeArray) {
    const recipes = document.getElementById('recipes');
    recipeArray.forEach(item => {
        const recipeItem = app.appendHtmlToElemOnly('li', "", 'item');

        app.showRecipeTitle(item, recipeItem);
        app.showRecipeSource(item, recipeItem);
        app.showRecipeImage(item, recipeItem);
        app.createIngredientsUl(item, recipeItem);
        app.createIngredientsButton(recipeItem);
        app.appendElemToUl(recipes, recipeItem);

        recipes.style.display = 'flex';
    });
    app.smoothScroll();
};

app.toggleIngredients = function (ingredientsButton, recipeItem) {
        ingredientsButton.addEventListener('click', () => {
            app.showOrHideIngredients(ingredientsButton, recipeItem);
        });
};

app.showOrHideIngredients = function (recipeItem) {
    const ingredients = recipeItem.children[3];
    if (ingredients.classList.contains('show')) {
        app.hideIngredients(ingredients)
    } else {
        app.showIngredients(ingredients);
    }
};

app.showIngredients = function (ingredients) {
    // ingredients.classList.remove("hide");
    ingredients.classList.add("show");
}
app.hideIngredients = function (ingredients) {
    ingredients.classList.remove("show");
    // ingredients.classList.add("hide");  
}

app.emptyPreviousSearchResults = function () {
    const recipes = document.getElementById('recipes');
    recipes.innerHTML = '';
}

app.updateSearchTitle = function(searchTerm, recipeArray) {
    const recipes = document.getElementById('recipes');
    const searchTitle = document.getElementById('searchTitle');
    if (searchTitle) {
        const results = document.getElementById('results');
        results.removeChild(searchTitle);
    } 
    if (recipeArray.length > 0 ) {
        recipes.insertAdjacentHTML('beforebegin', `<h2 class="search-title" id="searchTitle">${`Search results for ${searchTerm}`}</h2>`)
    } else {
        recipes.insertAdjacentHTML('beforebegin', `<h2 class="search-title" id="searchTitle">${`No results for ${searchTerm}`}</h2>`)
    } 
}

app.updateSearchForm = function () {
    document.getElementById('search-form').reset();
}

app.smoothScroll = function () {
    $('html, body').animate({
        scrollTop: $('#results').offset().top
    }, 800, function () {
    });
}

app.hideFilters = function () {
    const h3 = document.querySelectorAll('h3');
    h3.forEach(h3 => {
        h3.nextElementSibling.classList.add('hide');
        h3.addEventListener('click', () => {
            this.nextElementSibling.classList.toggle('hide');
        });
    });
}

app.events = function () {
    if (Window.innerWidth < 480) {
        app.hideFilters();
    };

    const label = document.querySelectorAll('label');
    label.forEach(label => {
        label.addEventListener('click', function () {
            if (labelActive.classList.contains('active')) {
                this.classList.remove('active');
            } else {
                this.classList.add('active');
            }
        });
    });

    document.getElementById('submit').onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        app.recipeKeys();
        app.emptyPreviousSearchResults();
        app.updateSearchForm();
    };
};

app.init = function () {
    app.events();
}

(function () {
    app.init();
});



// toDo:

// make more PURE -  each function should only do one thing and see where functions can be reused! 

// make a title that says no results for searchterm is it is invalid

// add directions

// animation on buttons (directions stretch select)

// ES6: 
// Map
// filter 
// axios 
// for each 
// back ticks 
// reusuable functions 

// addclasslist
// document.queryselector - unlike jquerry selector only targets 1 element, so to target all, have to use for each loop
// .css - .style
// creating elements and innerhtml - more rigorous w.out js but with reusable elements, can be clean 
// dont need to use push because new arrays are created with map and filter