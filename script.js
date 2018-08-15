const app = {};

app.recipeKeys = function () {
  const searchTerm = document.querySelector('input[type=search]').value;
  const allergies = [];
  const checkedAll = $('.allergies input[type = checkbox]').filter($('input:checked'));
  allergies.push(...checkedAll);
  const selectedAllergy = [];
  for (i = 0; i < allergies.length; i++) {
    selectedAllergy.push(allergies[i].value);
  }

  const dietary = [];
  checkedDiet = $('.dietary input[type = checkbox]').filter($('input:checked'));
  dietary.push(...checkedDiet);
  const selectedDiet = [];
  for (i = 0; i < dietary.length; i++) {
    selectedDiet.push(dietary[i].value);
  }

  app.getRecipes(searchTerm, selectedAllergy, selectedDiet);
  app.updateSearchTitle(searchTerm);
}


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
  }).then((res) =>  {
    const apiResults = res;
    app.displayRecipes(apiResults);
  });
}

app.displayRecipes = function (apiResults) {
  const recipes = document.querySelector('#recipes');

    const recipeArray = apiResults.matches;
    recipeArray.forEach(function(item) {
      const title = $('<h4>').text(item.recipeName);

      const source = item.sourceDisplayName
      const recipeUrl = `https://www.yummly.com/recipe/${item.id} `;
      const linkUrl = $('<h5>').html(`<a href='${recipeUrl}' target='_blank'>${source} </a>`);


      const ingredients = $('<ul>').addClass('ingredients');
      const ingredient = item.ingredients.forEach(function (ingredient) {
          const $li = $('<li>').text(ingredient).addClass('ingredient');
          ingredients.append($li);
      })
      
      const imageUrl = item.imageUrlsBySize['90'].split('=')[0];
      const image = $('<img class="meal">').attr('src', imageUrl)

      const recipeItem = $(`<li>`).addClass('item').append(title, linkUrl, image, ingredients);
      
      $('#recipes').append(recipeItem);
      $('#recipes').css('display', 'flex');  
    });
  app.smoothScroll();
};

let title = false;
// app.updateSearchTitle = function (searchTerm) {
//   const recipes = document.querySelector('#recipes');
//   recipes.innerHTML = '';

//   const searchTitle = document.querySelector('#searchTitle')
//   if (title === true) {
//     searchTitle.remove();
//   } 

//   const results = document.querySelector('#results');
//   console.log(results);
//   results.append('<h2>').textContent = ('Search results for')

  // in results, create an h2 w. id of searchTitle and class or search-title and text content search reults 
  // results.insertBefore('h2', recipes).textContent = `Search results for ${searchTerm}`
  // .classList.add('search-title').setAttribute('id', 'searchTitle').textContent = `Search results for ${searchTerm}`

  // const searchResultTitle `<h2 id="searchTitle" class=`search-title"`.textContent = `Search results for ${searchTerm}`;
  
  // recipes.before(searchResultTitle);
// }

app.updateSearchTitle = function (searchTerm) {
  $('#recipes').empty();
  $('#searchTitle').remove();
  const $searchResultTitle = $('<h2 id="searchTitle" class="search-title">').text(`Search results for ${searchTerm}`);
  $('#recipes').before($searchResultTitle);
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
    h3.addEventListener('click', function() {
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
    label.addEventListener('click', function() {
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

$(function () {
  app.init();
});

// future:
// make a title that says no results for searchterm is it is invalid
// make entire recipe li clickable to link of reicpe site 
// animation on buttons (directions stretch select)

