import React, { Component } from 'react';
import AutoComplete from './autocomplete'
import CardLayout from './cardlayouts'
import { Col, Container, Row } from "react-bootstrap";

class Root extends Component {
    state = {
        favourates: [],
        show_id: 0,
        title: '',
        cards: []
    }

    onInputMatch = (show_id, title, description) => {
        if (this.state.cards.length < 5) {
            this.state.cards.push({ 'show_id': show_id, 'title': title, 'description': description });
            this.setState({ cards: this.state.cards });
        }
        else {
            alert("Maximum limit reached")
        }
        console.log(this.state.cards)
    }

    onDelete = (value) => {
        console.log(value)
        var newCards = this.state.cards.filter(obj => obj.show_id != value);
        this.setState({ cards: newCards });
    }
    render() {
        return (
            <div style={{ padding: 50 }}>
                <Container>
                    <Row>
                        <h1>
                            <span style={{ color: "#5e8e3e" }}>
                                The Shoppies: Movie awards for entrepreneurs
                            </span>
                        </h1>
                    </Row>
                    <Row style={{ marginLeft: "25px" }}>
                        Search Movie name:
                    </Row>
                    <Row style={{ height: '10rem' }}>
                        <Col>
                            <div >
                                <AutoComplete
                                    favourates={this.state.favourates}
                                    onInputMatch={this.onInputMatch}
                                    existingCards={this.state.cards} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                        </Col>
                        <Col>
                            <h2>Nominations <span style={{ color: "#5e8e3e" }} >{this.state.cards.length}</span>/5</h2>
                        </Col>
                        <Col>

                        </Col>
                    </Row>

                    <Row>

                        {this.state.cards.map(item =>
                            <Col key={item.show_id}>
                                <CardLayout
                                    title={item.title}
                                    show_id={item.show_id}
                                    description={item.description}
                                    onDelete={this.onDelete}
                                />
                            </Col>
                        )}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Root;