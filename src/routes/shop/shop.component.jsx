import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { FetchCategoriesStart } from '../../store/category/category.action';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import './shop.styles.scss';
const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
            //const categoriesArray = await getCategoriesAndDocuments();
            dispatch(FetchCategoriesStart());   
    }, [dispatch]);
    return (
        <Routes>
            <Route index path='' element={<CategoriesPreview /> } />
            <Route path=':category' element={<Category />} />
        </Routes>
    ); 
}

export default Shop;