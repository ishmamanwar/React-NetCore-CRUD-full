import React, {Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddProdModal extends Component{
    constructor(props){
        super(props);
        this.state={cats:[]};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        fetch(process.env.REACT_APP_API+'product/GetAllCategoryNames')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cats:data});
        });
    }
    
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'product', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                ProductName: event.target.ProductName.value,
                Category: event.target.Category.value,
                ProductDescription: event.target.ProductDescription.value,
                Active: event.target.Active.value
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
        const {cats} = this.state;
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
                            Add Product
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="ProductName">
                                        <Form.Label>ProductName</Form.Label>
                                        <Form.Control type="text" name="ProductName" required
                                        placeholder="ProductName" />
                                    </Form.Group>
                                    <Form.Group controlId="Category">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control as="select">
                                            {cats.map(cat=>
                                                <option key={cat.CategoryId}>{cat.CategoryName}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="ProductDescription">
                                        <Form.Label>ProductDescription</Form.Label>
                                        <Form.Control type="text" name="ProductDescription" required
                                        placeholder="ProductDescription" />
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
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Product
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