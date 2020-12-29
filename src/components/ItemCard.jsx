import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const ItemCard = (props) => {
    return (
        <Card className='mt-2 mb-2' style={{maxHeight: '165px'}}>
        <div className="d-flex mt-2 mb-2">
            <div className="ml-2">
                <img src={props.itemImg || "http://placehold.jp/150x150.png"} alt="Product" style={{height: "150px", width: '150px'}} />
            </div>               
            <div className="ml-2 mt-1" >
                <div>
                    <Link to={`/recipe/${props.itemId}`}> <h4> {props.itemName.slice(0,15)}... </h4></Link> 
                <span className="text-muted">Ingridients: {props.itemIngridients.length}</span>
                </div>
                {/* ITEM DESCRIPTION */}
                <div className='mt-3'>
                    {props.itemDescription.slice(0,50)}
                    <span>
                        ...<Link to={`/recipe/${props.itemId}`}>View More</Link>
                    </span>
                </div>
            </div>
                <i className="fas fa-ellipsis-v fa-lg mt-2 mr-3"></i>
        </div>
    </Card>    
    )
}
