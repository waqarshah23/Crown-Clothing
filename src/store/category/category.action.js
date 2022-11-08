import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { Categories_Action_Type } from "./category.types";

export const SetCategoriesMap = (categories) => (
    {
        type: Categories_Action_Type.Set_Categories,
        payload: categories
    }
)

export const FetchCategoriesStart = () => (
    {
        type: Categories_Action_Type.Fetch_Categories_Start
    }
)

export const FetchCategoriesSuccess = (categories) => (

    {
        type: Categories_Action_Type.Fetch_Categories_Success,
        payload: categories
    }
)

export const FetchCategoriesFailed = (error) => (

    {
        type: Categories_Action_Type.Fetch_Categories_Failed,
        payload: error
    }
)

export const FetchCategoriesAsync = () => async (dispatch) => {
    dispatch(FetchCategoriesStart());       
    try{
        const categoriesArray = await getCategoriesAndDocuments();
        dispatch(FetchCategoriesSuccess(categoriesArray));
    }
    catch(err){
        dispatch(FetchCategoriesFailed(err));
        //throw new Error('error occured while fetching categories, Error: ', {err});
    }
}