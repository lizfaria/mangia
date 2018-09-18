const app = {};

app.recipeKeys = function () {
    const searchTerm = document.querySelector('input[type = search]').value;
    
    const allAllergies = document.querySelectorAll('.allergies input[type = checkbox]');
    const selectedAllergy = [...allAllergies].filter(input => input.checked == true);

    const allDiets = document.querySelectorAll('.dietary input[type = checkbox]');
    const selectedDiet = [...allDiets].filter(input => input.checked == true);

    app.getRecipes(searchTerm, selectedAllergy, selectedDiet);
    app.updateSearchTitle(searchTerm);
}


// app.getRecipes = function (searchTerm, selectedAllergy, selectedDiet) {
//     axios
//         .get('http://api.yummly.com/v1/api/recipes', {
//             dataResponse: 'json',
//             params: {
//                 _app_id: '0a0c3a8c',
//                 _app_key: '3d2d8d9336ff2dd0a5bbd759f25b8a3c',
//                 maxResult: 12,
//                 q: searchTerm,
//                 allowedAllergy: selectedAllergy,
//                 allowedDiet: selectedDiet
//             }
//         })
//         .then(res => {
//         let apiResults = res;
//         app.displayRecipes(apiResults);
//         });
// }

app.getRecipes = function (searchTerm, selectedAllergy, selectedDiet) {
    $.ajax({
        url: 'http://api.yummly.com/v1/api/recipes',
        dataType: 'json',
        data: {
            _app_id: '0a0c3a8c',
            _app_key: '3d2d8d9336ff2dd0a5bbd759f25b8a3c',
            maxResult: 12,
            q: searchTerm,
            allowedAllergy: selectedAllergy,
            allowedDiet: selectedDiet
        }
    }).then((res) => {
        const apiResults = res;
        app.displayRecipes(apiResults);


    });
}

app.displayRecipes = function (apiResults) {
    const recipes = document.getElementById('recipes');
    console.log(recipes)
    const recipeArray = apiResults.matches;
    recipeArray.forEach(item => {
        const title = (`<h4>${item.recipeName}</h4>`);

        const source = item.sourceDisplayName
        const recipeUrl = `https://www.yummly.com/recipe/${item.id} `;
        const linkUrl = (`<h5><a href='${recipeUrl}' target='_blank'>${source}</a>`);


        const ingredients = `<ul class="ingredients"></ul>`;
        item.ingredients.forEach( ingredient => {
            return `<li>${ingredient}</li>`;
        });

        const imageUrl = item.imageUrlsBySize['90'].split('=')[0];
        const image = `<img class="meal" src="${imageUrl}"></img>`;

        const recipeItem = `<li class="${item}">${title} ${linkUrl} ${image} ${ingredients}</li>`;

        recipes.appendChild(recipeItem);
        recipes.style.display = 'flex';
    });
    app.smoothScroll();
};

app.updateSearchTitle = function (searchTerm) {
    const recipes = document.getElementById('recipes');
    recipes.innerHTML = '';

    const results = document.getElementById('results');
    const searchTitle = document.getElementById('searchTitle');
    // remove search title if already exists 
    if (searchTitle == !null) {
        searchTitle.remove();
    } 
    const searchResultTitle = recipes.insertAdjacentHTML('beforebegin', `<h2 class="search-title" id="searchTitle">${`Search results for ${searchTerm}`}</h2>`);
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
        h3.addEventListener('click', function () {
            this.nextElementSibling.classList.toggle('hide');
        });
    });
}

app.events = function () {
    if (window.innerWidth < 480) {
        app.hideFilters();
    };

    let labelActive = false;
    const label = document.querySelectorAll('label');
    label.forEach(label => {
        label.addEventListener('click', function () {
            if (labelActive == false) {
                this.classList.add('active');
                let labelActive = true;
            } else {
                this.classList.remove('active');
                let labelActive = false;
            }
        });
    });

    document.getElementById('submit').onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        app.recipeKeys();
        app.updateSearchForm();
    };
};

app.init = function () {
    app.events();
}

(function () {
    app.init();
});

// future:
// make a title that says no results for searchterm is it is invalid
// make entire recipe li clickable to link of reicpe site 
// animation on buttons (directions stretch select)

