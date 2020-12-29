import React, {useState, useEffect} from 'react'
import { Container } from "react-bootstrap";
import { PageNavbar } from "../components/Navbar";
import { ProductView } from "../components/ProductView";
import { useStorage } from "../contexts/StorageContext";
import { Footer } from "../components/Footer";

export const ViewItem = ({match}) => {
    const { getOneRecipe } = useStorage()
    const [errMsg, setErrMsg] = useState()
    const [foodName, setFoodName] = useState()
    const [ingredientes, setIngredientes] = useState([])
    const [imgUrl, setImgUrl] = useState()
    const [description, setDescription] = useState()

    useEffect(()=>{
        function showRecipe() {
        getOneRecipe(match.params.id).then((doc)=>{
            setFoodName(doc.data().recipeName)
            setIngredientes(doc.data().recipeIngridients)
            setDescription(doc.data().recipeDescription)
            setImgUrl(doc.data().recipeImg)
        }).catch((err)=>{
            setErrMsg(err)
        })
        setTimeout(() => {
        setErrMsg()
        }, 1000);
    }
        showRecipe()
    },[getOneRecipe, match.params.id])


    
    
    return (
        <>
            <div className="basicBg pb-4">
                <PageNavbar />
                <Container className="mt-4">
                    <ProductView errMsg={errMsg} recipeImg={imgUrl} ingridients={ingredientes} foodName={foodName} description={description} />
                </Container >               
            </div>
            <Footer />
        </>
    )
}
