import React, {useState, useEffect, useCallback} from 'react'
import { PageNavbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useStorage } from "../contexts/StorageContext";
import { Link, useHistory } from "react-router-dom";


export const ViewUserProducts = () => {
    const history = useHistory()
    const { getAllUserRecipes, deleteRecipe } = useStorage()
    const [userRecipes, setUserRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const { currentUser } = useAuth()

    const showAllUserRecipes = useCallback(() => {
        getAllUserRecipes().then((snapshot)=>{
            setLoading(true)
            let arr = []
           snapshot.forEach((docs)=>{
               let fetchRecipe = {
                   recipeId: docs.id,
                   recipeData: docs.data()
               }
               arr.push(fetchRecipe)
           }) 
           setUserRecipes(arr)
           setLoading(false)
       })
    },[getAllUserRecipes])

    useEffect( ()=>{
        showAllUserRecipes()
    },[showAllUserRecipes])

    function clickToDelete(recipeId) {
        try {
            deleteRecipe(recipeId)
            console.log('Recipe deleted successfully')
            setUserRecipes([])
            showAllUserRecipes()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div style={{backgroundColor: '#f3f3f3', minHeight: '100vh'}}>
                <PageNavbar />
                <Container>
                    <Row>
                        <Col xs='12' className="d-flex justify-content-center">
                            <Card className="mt-3"  style={{minWidth: '400px'}}>
                                <div className="text-center mt-3">
                                    <i className=" fas fa-user-circle fa-10x " />
                                    <h4>{currentUser.displayName}</h4>
                                    <Button variant="success" size="sm" className="mb-3" onClick={()=>{history.push('my-recipes/add')}} >
                                        <i className="fas fa-plus" /> 
                                         <span> Add Recipe</span>
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                        <Col xs="12">
                            <Table variant="light" bordered className="mt-2" >
                                <thead>
                                    <tr>
                                        <th>Recipe Name</th>
                                        <th className="text-right">Actions</th>                                     
                                    </tr>
                                </thead>
                                <tbody>
                                    { !loading && userRecipes.map((doc,index)=>{
                                        return (
                                        <tr key={`recipe-${index}`}>
                                            <td><Link to={`/recipe/${doc.recipeId}`}>{doc.recipeData.recipeName}</Link></td>
                                        <td>
                                            <div className="text-right">
                                                <Button  size="sm" variant="warning" key={doc.recipeId} className="mr-1" onClick={()=>{history.push(`my-recipes/update/${doc.recipeId}`)}}><i className="fas fa-pen" /></Button>
                                                <Button size="sm" variant="danger" onClick={()=>{clickToDelete(doc.recipeId)}}><i className="fas fa-trash"/></Button>
                                            </div>
                                         </td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    )
}
