import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddProdModal} from './AddProdModal';
import {EditProdModal} from './EditProdModal';

export class Product extends Component {


    constructor(props){
        super(props);
        this.state={prods:[], addModalShow:false, editModalShow: false}
        this.handleSearch = this.handleSearch.bind(this);
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'product')
        .then(response=>response.json())
        .then(data=>{
            this.setState({prods:data});
        });
    }
    handleSearch(event)
    {

        if(this.searchbox.value !== "")
        {
            event.preventDefault();
            fetch(process.env.REACT_APP_API+'product/Search/'+this.searchbox.value)
            .then(response=>response.json())
            .then(data=>{
                this.setState({prods:data});
           });
        }

        else{
            this.refreshList();
        }
    }
    componentDidMount(){
        
        this.refreshList();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.prods === this.state.prods) {
            this.refreshList();
        }
    }
    deleteProd(prodid)
    {
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'product/'+prodid,{
                method:'DELETE',
                headers:{'Accept':'application/json',
            'Content-Type':'application/json'}
            }
            )
            this.refreshList();
        }
    }
    render(){
        const {prods, prodid, prodname, category, proddesc, active} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false})
        return(
            <div>
                      <input
                      className="mt-4"
                      name="SearchText"
                      ref={input => this.searchbox = input}
        type="text"
        placeholder="Product Name"
      />
                <button type="submit" onClick={this.handleSearch}>Search</button>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ProductId</th>
                            <th>ProductName</th>
                            <th>Category</th>
                            <th>ProductDescription</th>
                            <th>Active/Inactive</th>
                            <th>Options</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {prods.map(prod =>
                            <tr key={prod.ProductId}>
                                <td>{prod.ProductId}</td>
                                <td>{prod.ProductName}</td>
                                <td>{prod.Category}</td>
                                <td>{prod.ProductDescription}</td>
                                <td>{(() => {
                                    if (prod.Active === 1) {
                                        return (
                                        <Button disabled type="checkbox">Active</Button>
                                    )
                                    } else if (prod.Active === 0) {
                                        return (
                                            <Button disabled type="checkbox" variant="secondary" >Inactive</Button>
                                    )
                                }
                                })()}
                                </td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true, prodid:prod.ProductId, prodname:prod.ProductName,
                                        category:prod.Category, proddesc: prod.ProductDescription, active:prod.Active})}>
                                            Edit
                                        </Button>
                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteProd(prod.ProductId)}>
                                            Delete
                                        </Button>
                                        <EditProdModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        prodid={prodid}
                                        prodname={prodname}
                                        category={category}
                                        proddesc={proddesc}
                                        active={active}
                                        />
                                    </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Product
                    </Button>

                    <AddProdModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddProdModal>
                </ButtonToolbar>
            </div>
        )
    }
}