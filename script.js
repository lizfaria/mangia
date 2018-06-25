const app = {};

app.recipeKeys = function () {
  const searchTerm = $('#search-form').children('input[type=search]').val();

  const allergies = [];
  checkedAll = $('.allergies input[type = checkbox]').filter($('input:checked'));
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

app.updateSearchTitle = function (searchTerm) {
  $('#recipes').empty();
  $('#searchTitle').remove();
  const $searchResultTitle = $('<h2 id="searchTitle" class="search-title">').text(`Search results for ${searchTerm}`);
  $('#recipes').before($searchResultTitle);
}

app.updateSearchForm = function () {
  document.getElementById("search-form").reset(); 
}

app.smoothScroll = function () {
  $('html, body').animate({
    scrollTop: $('#results').offset().top
  }, 800, function () {
  });
}

app.hideFilters = function () {
  $('h3').next().addClass('hide');
  $('h3').click(function () {
    $(this).next().toggleClass('hide');
  });
}

app.events = function () {

  $('#search-form').on('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    app.recipeKeys();
    app.updateSearchForm();
    if ($(window).width() < 480) {
      $('h3').next().addClass('hide');
    }
    
  })
  
  $('label').click(function () {
    $(this).toggleClass('active');
  });

  if ($(window).width() < 480) {
    app.hideFilters();
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
// infinite sroll, 
// animation on buttons
