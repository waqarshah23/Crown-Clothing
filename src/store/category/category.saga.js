import { all, call, put, takeLatest  } from "@redux-saga/core/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { FetchCategoriesFailed, FetchCategoriesSuccess } from "./category.action";
import { Categories_Action_Type } from "./category.types";


export function* FetchCategoriesAsync() {
    try{
        const categoriesArray = yield call(getCategoriesAndDocuments);
        yield put(FetchCategoriesSuccess(categoriesArray));
    }
    catch(err){
        yield put(FetchCategoriesFailed(err));
    }
}

export function* onFetchCategories() {
    yield takeLatest(Categories_Action_Type.Fetch_Categories_Start, FetchCategoriesAsync)
}
export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}