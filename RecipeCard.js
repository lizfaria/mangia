class RecipeCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const recipeCard = this.props.recipes.map((recipe) => <li key={recipe.id}>
            <h4>{recipe.recipeName}</h4>
            <a href="https://www.yummly.com/recipe/ + {recipe.id} + ">{recipe.sourceDisplayName}</a>
            <img src=" + {recipe.imageUrlsBySize['90']}.split('=')[0] + " className="meal" />
        </li>);
        return (<ul>{recipeCard}</ul>);
    }
}
