import React, { useContext } from 'react'
import { appStorage, appFirestore } from "../firebase";
import { useAuth } from "./AuthContext";

const StorageContext = React.createContext()

export const useStorage = () => {
    return useContext(StorageContext);
}

export const StorageProvider = ({children}) => {

    const {currentUser} = useAuth()

     async function uploadImg(imgFile) {
        const storageRef = appStorage.ref()
        const fileRef = storageRef.child(`/recipeImg/${imgFile.name}`)
        await fileRef.put(imgFile)
        return fileRef.getDownloadURL();
         
    }

     async function uploadRecipe(recipeName, recipeIngridients, recipeDescription, recipeImg) {
        try {
            await appFirestore.collection('recipes').add({
            createdBy: currentUser.uid,
            recipeName,
            recipeIngridients,
            recipeDescription,
            recipeImg,
            createdAt: Date.now()
        })
        } catch (error) {
                console.log(error)
        }
    }   
        function getAllRecipes() {
            return appFirestore.collection('recipes').get()
        }
    
        function getAllUserRecipes() {
          return appFirestore.collection('recipes').where('createdBy', '==', currentUser.uid).get();
        }

        function getOneRecipe(recipeId) {
          return appFirestore.collection('recipes').doc(recipeId).get();            
        }

        function updateRecipe(recipeId, infoToUpdate) {
            return appFirestore.collection('recipes').doc(recipeId).update(infoToUpdate);
        }

        function deleteRecipe(recipeId) {
            return appFirestore.collection('recipes').doc(recipeId).delete();
        }

    const value = {
        uploadImg,
        uploadRecipe,
        getAllUserRecipes,
        getOneRecipe,
        updateRecipe,
        deleteRecipe,
        getAllRecipes
    }

      return(
        <StorageContext.Provider value={value}>
            {children}
        </StorageContext.Provider>
    )
}
