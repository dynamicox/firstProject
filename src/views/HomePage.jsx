import React, { useEffect, useState, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { PageNavbar } from "../components/Navbar";
import { ItemCard } from "../components/ItemCard";
import { Footer } from "../components/Footer";
import { useStorage } from "../contexts/StorageContext";


export const HomePage = () => {
    const { getAllRecipes } = useStorage();
    const [recipes,  setRecipes] = useState([])
    const userWarning = useRef()
 
    useEffect(() => {
       getAllRecipes().then((query)=>{
           let arr = []
            query.forEach((doc)=>{
                const recipe = {
                    recipeId: doc.id,
                    recipeData: doc.data()
                }
                arr.push(recipe)
            })
            setRecipes(arr)
       })
    }, [getAllRecipes])

    return (
        <>
        <div style={{backgroundColor: "#F3F3F3", minHeight: '100vh'}}>
            <PageNavbar  />
                <Container ref={userWarning} fluid className="d-flex homeShowImg  text-light align-items-center justify-content-center">
                    <div>
                        <div className="text-light h1 welcomeText welcomeGradient">
                                Welcome
                        </div>
                        <div className="text-center">Browse for your favorite recipes...</div>
                    </div>
                    
                </Container>
                <Container onClick={()=>{console.log(recipes)}} style={{minHeight: "100vh"}} >
                    <Row>

                        {recipes.map((doc)=>{
                            return  <Col lg="6" xl="4" md='6' xs="12" key={doc.recipeId} >
                                    <ItemCard  
                                    itemName={doc.recipeData.recipeName} 
                                    itemImg={doc.recipeData.recipeImg}  
                                    itemIngridients={doc.recipeData.recipeIngridients}
                                    itemDescription={doc.recipeData.recipeDescription}
                                    itemId={doc.recipeId}
                                    />
                                    </Col>
                        })}
                
                    </Row>
                </Container>
        </div>
            <Footer  />
        </>
    )
}


