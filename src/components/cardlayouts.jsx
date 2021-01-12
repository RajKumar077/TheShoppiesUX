import React, { Component } from 'react';
import { Card } from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap";
import { RiDeleteBin2Line } from 'react-icons/ri'

class CardLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            moviesDetails: '',
            isClicked: false,
            show_id: 0
        }
    }



    onCardClick = async () => {
        console.log(this.props.title, this.props.show_id)

        this.setState({ isClicked: true });
    }


    render() {
        let myStyle = {
            width: '18rem',
            height: '18rem'
        }

        return (

            <div>
                <Card style={myStyle}
                    bg='info'
                >
                    <Card.Header>
                        <Container>
                            <Row>
                                <Col xs={8}>
                                    Movie Title:
                                </Col>
                                <Col>
                                    <RiDeleteBin2Line
                                        onClick={() => this.props.onDelete(this.props.show_id)}
                                        style={{ cursor: "pointer", color: "brown" }}
                                    />
                                </Col>
                            </Row>

                        </Container>

                    </Card.Header>
                    <Card.Body>
                        <Card.Title> {this.props.title} </Card.Title>
                        <Card.Text>
                            {this.props.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br />
            </div>
        );
    }
}

export default CardLayout;