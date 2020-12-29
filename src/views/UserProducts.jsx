import React, {useState, useRef, useEffect} from 'react'
import { Container, Row, Col, Form, Card, InputGroup, Button} from "react-bootstrap";
import { PageNavbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ProductView } from "../components/ProductView";
import { useStorage } from "../contexts/StorageContext";
import { Link } from 'react-router-dom';


export const UserProducts = (props) => {
    const { uploadImg, uploadRecipe, getOneRecipe, updateRecipe } = useStorage()
    const formRef = useRef()
    const inrgidientRef = useRef()
    const [errMsg, setErrMsg] = useState()
    const [successMsg, setSuccessMsg] = useState()
    const [updateStatus, setUpdateStatus] = useState()
    const [loading, setLoading] = useState()
    const [imgFile, setImgFile] = useState("http://placehold.jp/150x150.png")
    const [ingredientes, setIngredients] = useState([])
    const [foodName, setFoodName] = useState("Recipe Name")
    const [description, setDescription] = useState(`Please type in your description and steps...`)

    function verifyForm() {
        if(foodName.length <= 2 || foodName === 'Recipe Name'){
            setErrMsg('Your recipe name should have at least 3 characteres')
            return false
        }else if(description.length <= 0 || description === `Please type in your description and steps...` ){
            setErrMsg('Please type in a description for your recipe')
            return false
        }else if(ingredientes.length <= 0){
            setErrMsg('Please add at least 1 ingridient')
            return false
        }else{
            setErrMsg()
            return true
        }
    }

    function createRecipe() {
        if(updateStatus){
            setLoading(true)
            try {
                const updateInfo = {
                    recipeName: foodName,
                    recipeIngridients: ingredientes,
                    recipeDescription: description,
                    recipeImg: imgFile
                }
                updateRecipe(props.match.params.id, updateInfo)
                setSuccessMsg('Recipe updated successfully')
            } catch (error) {
                setErrMsg(error)
            }
            setTimeout(() => {
                setSuccessMsg()
                setErrMsg()
                setLoading(false)
            }, 1200);
        }else{
            setLoading(true)
            try {
                uploadRecipe(foodName, ingredientes, description, imgFile)
                formRef.current.reset()
                setSuccessMsg('Recipe added succesfully')
                setTimeout(() => {
                        setImgFile("http://placehold.jp/150x150.png")
                        setFoodName("Recipe Name")
                        setIngredients([])
                        setDescription(`Please type in your description and steps...`)
                }, 1200);
                
            } catch (error) {
                setErrMsg(error)
            }
            setTimeout(() => {
                        setErrMsg()
                        setSuccessMsg()
                        setLoading(false)
                    }, 1200);
        }
        
    }

    useEffect(()=>{
        function show() {
        if(props.match.params.id){
            setUpdateStatus(true)
            getOneRecipe(props.match.params.id).then((doc)=>{
                            setFoodName(doc.data().recipeName)
                            setIngredients(doc.data().recipeIngridients)
                            setDescription(doc.data().recipeDescription)
                            setImgFile(doc.data().recipeImg)
                    })
        }else return false

    }
    show()
    }, [props.match.params.id, getOneRecipe])
    
    return (
        <>
            <div style={{backgroundColor: "#F3F3F3", minHeight: '100vh'}}>
                <PageNavbar />
                <Container fluid="sm">
                    <Row > 
                        <Col lg="4">
                            <Card style={{padding: '30px 20px'}} className="mt-4">
                                <Card.Title>
                                    {updateStatus ? <h1>Update your Recipe</h1> : <h1>Add a Recipe</h1>}
                                </Card.Title>
                                <Form ref={formRef}>
                                <Form.Group>
                                    <Form.Label className='h5'>Add a picture</Form.Label>
                                    <Form.File onChange={async (e)=>{ 
                                        setLoading(true)
                                        setImgFile(await uploadImg(e.target.files[0]))
                                        setLoading(false)
                                    }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Recipe Name</Form.Label>
                                    <Form.Control size="sm" onChange={(e)=>{setFoodName(e.target.value)}} />
                                </Form.Group>
                                {/* Ingridients input */}
                                    <Form.Label>Add an ingredient</Form.Label>
                                <InputGroup className="pb-2">
                                    <Form.Control size="sm" ref={inrgidientRef} className="mt-2" />
                                    {/* Remove Ingridient */}
                                    <InputGroup.Append>
                                        <Button size='sm' variant="danger" onClick={()=>{
                                            setIngredients((prev)=>{
                                                return prev.slice(0,prev.length - 1)  
                                            })
                                        }}>
                                            <i className="fas fa-minus" />
                                        </Button>
                                    </InputGroup.Append>
                                    {/* Add ingridient */}
                                    <InputGroup.Append>
                                        <Button size="sm" onClick={ async (event) => {
                                               if(inrgidientRef.current.value.length <= 1){
                                                   setErrMsg('Your ingridient should have at least 3 characteres')
                                               }else{
                                                   await setIngredients( (prev)=>{
                                                    return [...prev, inrgidientRef.current.value ]
                                                } )
                                                inrgidientRef.current.value = ''
                                               }
                                            }
                                        } >
                                            <i className="fas fa-plus" />
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                {/* Description */}
                                <Form.Group className="mb-4">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} size="sm" onChange={(e)=> setDescription(e.target.value)} />
                                </Form.Group>
                                {!updateStatus ? (<Button block disabled={loading} onClick={()=>{
                                    verifyForm()
                                    if(verifyForm()){
                                        createRecipe()
                                    }
                                }} >Add Recipe</Button>) :
                                <Button variant="success" disabled={loading} block onClick={()=>{
                                    verifyForm()
                                    if(verifyForm()){
                                        createRecipe()
                                    }
                                }}>Update</Button>
                                }
                                <Link to="/my-recipes">View all recipes</Link>
                            </Form>
                            </Card>
                        </Col>
                       <Col className="mt-4" sm="12" lg="8">
                         <ProductView successMsg={successMsg} errMsg={errMsg} recipeImg={imgFile} ingridients={ingredientes} foodName={foodName} description={description} />
                       </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    )
}
