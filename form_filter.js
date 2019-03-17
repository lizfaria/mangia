class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.searchRecipes = this.searchRecipes.bind(this);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.handleAllergenChange = this.handleAllergenChange.bind(this);
        this.handleDietChange = this.handleDietChange.bind(this);
    };
    handleSearchTextChange(e) {
        this.props.handleSearchTextChange(e.target.value);
    };
    handleAllergenChange(e) {
        this.props.handleAllergenChange(e.target.value, e.target.checked);
    };
    handleDietChange(e) {
        this.props.handleDietChange(e.target.value, e.target.checked);
    };
    searchRecipes(e) {
        e.preventDefault()
        this.props.searchRecipes()
    }
    render () {
        return (
            <header>
                <form action="" onSubmit={this.searchRecipes} id="search-form" name="search" required>
                    <div>
                        <label className="visually-hidden" htmlFor="search">Search By Ingredient</label>
                        <input 
                            id="search"
                            type="text" 
                            placeholder="Search By Ingredient" 
                            onChange={this.handleSearchTextChange} 
                            value={this.props.searchText}
                        />
                    </div>

                    <h3><i className="fas fa-chevron-circle-down"></i>Filter Allergies</h3>
                    <ul className="allergies">
                        {this.props.allergens.map((allergen) => 
                            <li key={allergen.value} >
                                <label  htmlFor={allergen.value}>{allergen.name}</label>
                                <input id={allergen.value} type="checkbox" name="allergy" value={allergen.value} checked={this.props.allergenSelected} onChange={this.handleAllergenChange} />
                            </li>
                        )}
                    </ul>
                    <h3><i className="fas fa-chevron-circle-down"></i>Filter Dietary Restrictions</h3>
                    <ul className="dietary">
                        {this.props.diets.map((diet) => 
                            <li key={diet.value} >
                                <label  htmlFor={diet.value}>{diet.name}</label>
                                <input id={diet.value} type="checkbox" name="allergy" value={diet.value} checked={this.props.dietSelected} onChange={this.handleDietChange} />
                            </li>
                        )}
                    </ul>
                    <input 
                        type="submit" 
                        name="submit" 
                        id="submit"
                        value="Find a Recipe" 
                        onSubmit={this.searchRecipes}
                    />
                </form>
            </header>
        )
    }
}

class RecipeCard extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const recipeCard = this.props.recipes.map((recipe) => 
           <li className="item" key={recipe.id}>
                <h4>{recipe.recipeName}</h4>
                <a href={`"https://www.yummly.com/recipe/${recipe.id}"`}>{recipe.sourceDisplayName}</a>
                <img src={recipe.imageUrlsBySize['90'].split('=')[0]} className="meal"/>
            </li>
        )
        return (
            <ul id="recipes">{recipeCard}</ul> 
        )
    }
}

class Results extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div id="results">
                <h1 id="searchTitle">{this.props.searchText}</h1>
                <RecipeCard recipes={this.props.recipes} searchText={this.props.searchText}/>
            </div>
        )
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            checked: false,
            recipes: [],
            selectedAllergy: "",
            allAllergies: [],
            selectedDiet: "",
            allDiets: []
            }
            this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
            this.handleAllergenChange = this.handleAllergenChange.bind(this);
            this.handleDietChange = this.handleDietChange.bind(this);
            this.searchRecipes = this.searchRecipes.bind(this);
    };
    handleSearchTextChange (searchText) {
        this.setState({
            searchText: searchText
        });
    }
    handleAllergenChange(selectedAllergy, checked) {
        if (checked == true) {
            this.setState({
                checked: checked,
                selectedAllergy: selectedAllergy,
                allAllergies: [...this.state.allAllergies, selectedAllergy]
            });
        } else {
           const newArray = this.state.allAllergies.filter((allergy) => allergy !== selectedAllergy )
            this.setState({
                checked: checked,
                selectedAllergy: selectedAllergy,
                allAllergies: newArray
            });
        }
    }
    handleDietChange(selectedDiet, checked) {
        if (checked == true) {
            this.setState({
                checked: checked,
                selectedDiet: selectedDiet,
                allDiets: [...this.state.allDiets, selectedDiet]
            });
        } else {
           const newArray = this.state.allDiets.filter((diet) => diet !== selectedDiet )
            this.setState({
                checked: checked,
                selectedDiet: selectedDiet,
                allDiets: newArray
            });
        }
    }
    searchRecipes() {
        axios
        .get('http://api.yummly.com/v1/api/recipes', {
            dataResponse: 'json',
            params: {
                _app_id: '0a0c3a8c',
                _app_key: '3d2d8d9336ff2dd0a5bbd759f25b8a3c',
                q: this.state.searchText,
                maxResult: 16,
                allowedAllergy: this.state.allAllergies,
                allowedDiet: this.state.allDiets
            }
        })
        .then(res => {
            console.log(res)
            this.setState({
                recipes: res.data.matches
            })        
        });
    }
    render() {
        return (
          <div>
              <SearchBar 
                searchText = {this.state.searchText}
                filterSelected = {this.state.filterSelected}
                handleSearchTextChange = {this.handleSearchTextChange}
                handleAllergenChange = {this.handleAllergenChange}
                handleDietChange = {this.handleDietChange}
                searchRecipes = {this.searchRecipes}
                checked = {this.state.checked}
                allergens = {allergens}
                diets = {diets}
            />
             <Results 
                recipes = {this.state.recipes}
                searchText = {this.state.searchText}
                allergies = {this.state.allAllergies}
                diet = {this.state.allDiets}
             />
          </div>
        );
    }
}

const allergens = [
    {value:'396^Dairy-Free', name:"dairy-Free"},
    {value:'394^Peanut-Free', name:"peanut-free"},
    {value:'395^Tree Nut-Free', name:'Tree Nut-Free'},
    {value:'398^Seafood-Free', name:'Seafood-Free'},
    {value:'393^Gluten-Free', name:'Gluten-Free'},
    {value:'392^Wheat-Free', name:'Wheat-Free'},
]
const diets = [
    {value:'387^Lacto-ovo vegetarian', name:"Lacto-Ovo Vegetarian"},
    {value:'389^Ovo vegetarian', name:'Ovo Vegetarian'},
    {value:'388^Lacto Vegetarian', name:'Lacto-Vegetarian'},
    {value:'390^Pescetarian', name:'Pescetarian'},
    {value:'386^Vegan', name:'Vegan'},
]

ReactDOM.render(
    <Form />,
    document.getElementById('form-filter')
);

// to do:
// show ingredients
// ingredients animation - click show ingredients
// search results only show after submitting form(not live reload)
// styling