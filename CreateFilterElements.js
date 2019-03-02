class CreateFilterElements extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }
    ;
    handleFilterChange(e) {
        this.props.handleFilterChange(e.target.checked);
    }
    render() {
        const id = `${this.props.name}_${this.props.filter}`;
        const name = this.props.name;
        const value = this.props.filter;
        return (<li key={id}>
            <input id={id} type="checkbox" name={name} value={value} checked={this.props.filterSelected} onChange={this.props.handleFilterChange} />
            <label htmlFor={id}>{value}</label>
        </li>);
    }
}
