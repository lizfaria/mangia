class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }
    handleFilterChange(e) {
        this.props.handleFilterChange(e.target.checked);
    }
    render() {
        if (this.props.allergens) {
            const filter = this.props.allergens.map((allergen) => <CreateFilterElements filter={allergen} name="allergen" id={allergen} key={allergen} checked={this.props.filterSelected} onChange={this.props.handleFilterChange} />);
            return (<div>
                <h3>Filter Allergies</h3>
                <ul>{filter}</ul>
            </div>);
        }
        else {
            const filter = this.props.restrictions.map((restriction) => <CreateFilterElements filter={restriction} name="restriction" id={restriction} key={restriction} checked={this.props.filterSelected} onChange={this.props.handleFilterChange} />);
            return (<div>
                <h3>Filter Dietary Restrictions</h3>
                <ul>{filter}</ul>
            </div>);
        }
    }
}
