import React, {Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddCatModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'category', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                CategoryName: event.target.CategoryName.value,
                Active: event.target.Active.value,
                CategoryDescription: event.target.CategoryDescription.value
            })
        })
        .then(res => res.json())
        .then((result) => {
            alert(result);
        },
        (error) =>{
            alert('Failed');
        })
    }

    render() {
        return (
            <div className="container">
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-model-title-vcenter"
                centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Category
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="CategoryName">
                                        <Form.Label>CategoryName</Form.Label>
                                        <Form.Control type="text" name="CategoryName" required
                                        placeholder="CategoryName" />
                                    </Form.Group>
                                    <Form.Group controlId="Active">
                                        <Form.Label>Active</Form.Label>
                                        {/*<Form.Control type="text" name="Active" required
                                        placeholder="Active" />*/}
                                        <Form.Control name="Active" required as="select">
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="CategoryDescription">
                                        <Form.Label>CategoryDescription</Form.Label>
                                        <Form.Control type="text" name="CategoryDescription" required
                                        placeholder="CategoryDescription" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Category
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>


            </div>
        )
    }
}