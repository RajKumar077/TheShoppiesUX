import React, { Component } from 'react';
import '../autocomplete.css'
import axios from 'axios';
import { Col, Container, Row } from "react-bootstrap";

class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySuggestions: [],
            inputVal: '',
            showSuggestionsList: true,
            currentSuggestionIndex: 0,
            moviesList: []
        }
    }
    //input value from text box
    onInput1 = (e) => {
        console.log(e.target.value);
        const { value } = e.target;
        const suggestions = this.props.suggestions;
        const filteredSuggestions = suggestions.filter(item => item.toLowerCase().indexOf(value.toLowerCase()) > -1);
        console.log(filteredSuggestions);

        const flag = value.length > 0 && filteredSuggestions.length ? true : false;

        this.setState({ displaySuggestions: filteredSuggestions, inputVal: value, showSuggestionsList: flag });
        if (flag) {
            this.props.onInputMatch(null, value);
        }
        else {
            this.props.onInputMatch(null, "");
        }

    }

    onInput = async (e) => {
        console.log(e.target.value);
        const { value } = e.target;
        console.log(value);
        this.setState({ inputVal: value })
        await axios.get(`https://api-tutorial4.herokuapp.com/movies?title_like=` + value)
            .then(res => {
                const moviesList = res.data;
                this.setState({ moviesList });
            });
        console.log(this.state.moviesList);
        let movieTitles = []
        if (this.state.moviesList.length > 0) {

            this.state.moviesList.map(item => movieTitles.push({
                "show_id": item['show_id'],
                "title": item['title'],
                "release_year": item['release_year'],
                "description": item['description']
            }));

            const flag = value.length > 0 && movieTitles.length ? true : false;

            this.setState({ displaySuggestions: movieTitles, inputVal: value, showSuggestionsList: flag });

        }



    }

    onClickFromSuggestions = (show_id, title, description) => {

        console.log(show_id);
        var flag = false;
        this.props.existingCards.forEach(element => {
            if (element.show_id == show_id) {
                alert(title + " already exists");
                flag = true;
            }
        });
        this.setState({ inputVal: "", showSuggestionsList: flag });
        if (!flag) {
            this.props.onInputMatch(show_id, title, description);
        }

    }

    onKeyDown = (e) => {
        const { currentSuggestionIndex, displaySuggestions } = this.state;
        //on press of enter
        if (e.keyCode === 13) {
            this.setState({
                displaySuggestions: [],
                inputVal: displaySuggestions[currentSuggestionIndex - 1],
                showSuggestionsList: true,
                currentSuggestionIndex: 0

            })
            const obj = displaySuggestions[currentSuggestionIndex - 1];
            this.props.onInputMatch(obj['show_id'], obj['title']);
        }
        // on press of down arrow
        else if (e.keyCode === 40) {
            if (displaySuggestions.length >= currentSuggestionIndex + 1) {
                const cc = displaySuggestions[currentSuggestionIndex];
                this.setState({
                    currentSuggestionIndex: currentSuggestionIndex + 1
                })
            }
        }
        //on press of key up
        else if (e.keyCode === 38) {
            if (currentSuggestionIndex - 1 > 0) {
                //const cc = displaySuggestions[currentSuggestionIndex-1];

                this.setState({
                    currentSuggestionIndex: currentSuggestionIndex - 1
                })
            }
        }
    }

    getClass = (currentSuggestionIndex, index) => {
        if (currentSuggestionIndex === index) {
            return "suggestion-active"
        }

    }

    renderItemsInSuggestion = (item, index) => {
        const { currentSuggestionIndex } = this.state;
        var style = { cursor: "pointer" };
        var titleStyle = {
            fontStyle: "italic",
            background: "cadetblue",
            borderRadius: "10px",
            paddingLeft: "10px",
            paddingRight: "10px"
        };
        this.props.existingCards.forEach(element => {
            if (element.show_id == item['show_id']) {
                style = { cursor: "no-drop", background: "yellow" }
            }
        });
        return (
            <li
                key={item['show_id']}
                className={this.getClass(currentSuggestionIndex - 1, index)}
                onClick={() => this.onClickFromSuggestions(item['show_id'], item['title'], item['description'])}
                style={style}
            >
                <Container>
                    <Row>
                        <span style={titleStyle}>Title: </span> {item['title']}
                    </Row>
                    <Row>
                        <span style={{ ...titleStyle, background: "burlywood" }}>Year: </span> <span>{item['release_year']}</span>
                    </Row>
                    <hr />

                </Container>

            </li>)
    }

    renderSuggestions = () => {

        const { displaySuggestions, showSuggestionsList } = this.state;
        if (showSuggestionsList && displaySuggestions.length > 0) {
            return (<ul className="suggestions">
                {displaySuggestions.map((item, index) =>
                    this.renderItemsInSuggestion(item, index)
                )}
            </ul>)
        }
        else if (!showSuggestionsList && displaySuggestions.length == 0) {
            return (<div className="suggestions">
                No items to display
            </div>)
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <input type="text"
                                onChange={this.onInput}
                                onKeyDown={this.onKeyDown}
                                value={this.state.inputVal} />
                        </Col>
                    </Row>
                </Container>


                {this.renderSuggestions()}
            </div>
        );
    }
}

export default AutoComplete;