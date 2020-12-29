import React from 'react'
import { Card, Alert } from "react-bootstrap";


export const ProductView = (props) => {
    
    
    return (
        <>
            <Card  className="mb-4 w-100">
                <Card.Body>
                    <div className="mt-4 ml-2 text-center">
                        {props.errMsg && <Alert className="errorBg text-danger">{props.errMsg}</Alert>}
                        {props.successMsg && <Alert className="successBg text-success">{props.successMsg}</Alert>}
                        <h2>
                           {props.foodName}
                        </h2>
                    </div>
                        <h5>Ingridients</h5>
                        <ul>
                            {props.ingridients.length > 0 && props.ingridients.map((e,index)=> {
                                
                               return <li key={index} >{e}</li>
                            })}
                        </ul>
                    
                    <p>
                        {props.description}
                    </p>
                </Card.Body>
                <Card.Img variant="bottom" className="scaleImg" src={props.recipeImg} />
            </Card>
        </>
    )
}
