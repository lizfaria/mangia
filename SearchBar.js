

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.searchRecipes = this.searchRecipes.bind(this);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }
    ;
    handleSearchTextChange(e) {
        this.props.handleSearchTextChange(e.target.value);
    }
    ;
    handleFilterChange(e) {
        this.props.handleFilterChange(e.target.checked);
    }
    ;
    searchRecipes(e) {
        e.preventDefault();
        this.props.searchRecipes();
        // this.props.history.push("/RecipeResults");
    }
    render() {
        return (<form action="" onSubmit={this.searchRecipes}>
            <div>
                <label>Search By Ingredient</label>
                <input type="text" placeholder="Search By Ingredient" onChange={this.handleSearchTextChange} value={this.props.searchText} />
            </div>
            <Filters allergens={allergens} checked={this.props.filterSelected} onChange={this.props.handleFilterChange} />
            <Filters restrictions={restrictions} checked={this.props.filterSelected} onChange={this.props.handleFilterChange} />

            <input type="submit" name="submit" value="Find a Recipe" />

        </form>);
    }
}
