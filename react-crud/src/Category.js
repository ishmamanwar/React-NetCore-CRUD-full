import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddCatModal} from './AddCatModal';
import {EditCatModal} from './EditCatModal';

export class Category extends Component {


    constructor(props){
        super(props);
        this.state={cats:[], addModalShow:false, editModalShow: false}
        this.handleSearch = this.handleSearch.bind(this);
    }


    handleSearch(event)
    {

        if(this.searchbox.value !== "")
        {
            event.preventDefault();
            fetch(process.env.REACT_APP_API+'category/Search/'+this.searchbox.value)
            .then(response=>response.json())
            .then(data=>{
                this.setState({cats:data});
           });
        }

        else{
            this.refreshList();
        }
    }
    refreshList(){
        fetch(process.env.REACT_APP_API+'category')
        
        .then(response=>response.json())
        .then(data=>{
            this.setState({cats:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.cats === this.state.cats) {
            this.refreshList();
        }
    }
    deleteCat(catid)
    {
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'category/'+catid,{
                method:'Delete',
                headers:{'Accept':'application/json',
            'Content-Type':'application/json'}
            }
            )
            this.refreshList();
        }
    }
    render(){
        const {cats, catid, catname, active, catdesc} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false})
        return(
            <div>
                <input
                      className="mt-4"
                      name="SearchText"
                      ref={input => this.searchbox = input}
        type="text"
        placeholder="Category Name"
      />
                <button type="submit" onClick={this.handleSearch}>Search</button>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>CategoryId</th>
                            <th>CategoryName</th>
                            <th>Active/Inactive</th>
                            <th>CategoryDescription</th>
                            <th>Options</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {cats.map(cat =>
                            <tr key={cat.CategoryId}>
                                <td>{cat.CategoryId}</td>
                                <td>{cat.CategoryName}</td>
                                <td>{(() => {
                                    if (cat.Active === 1) {
                                        return (
                                        <Button disabled type="checkbox">Active</Button>
                                    )
                                    } else if (cat.Active === 0) {
                                        return (
                                            <Button disabled type="checkbox" variant="secondary" >Inactive</Button>
                                    )
                                }
                                })()}
                                </td>
                                <td>{cat.CategoryDescription}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true, catid:cat.CategoryId, catname:cat.CategoryName,
                                        active:cat.Active, catdesc: cat.CategoryDescription})}>
                                            Edit
                                        </Button>
                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteCat(cat.CategoryId)}>
                                            Delete
                                        </Button>
                                        <EditCatModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        catid={catid}
                                        catname={catname}
                                        active={active}
                                        catdesc={catdesc}
                                        />
                                    </ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Category
                    </Button>

                    <AddCatModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddCatModal>
                </ButtonToolbar>
            </div>
        )
    }
}