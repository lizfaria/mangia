import {RecipeCard} from "./RecipeCard"

class Results extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<RecipeCard recipes={this.props.recipes} />);
    }
}
