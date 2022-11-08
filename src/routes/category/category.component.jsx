import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCart from '../../components/product-cart/product-cart.component';
import { SelectCategoriesMap } from '../../store/category/category.selector';
import { CategoryContainer, CategoryTitle } from './category.styles.jsx';

const Category = () => {
    const {category} = useParams();
    //const {CategoriesMap} = useContext(CategoriesContext);
    const CategoriesMap = useSelector(SelectCategoriesMap);
    const [products, setProducts] = useState(CategoriesMap[category]);
    useEffect(() => {
        setProducts(CategoriesMap[category]);
    }, [category, CategoriesMap])

    return (
        <Fragment>
            <CategoryTitle>{category}</CategoryTitle>
            <CategoryContainer>
                {
                    products &&  products.map((product) => 
                    <ProductCart key={product.id} product={product} />
                    )
                }
            </CategoryContainer>
        </Fragment>
    )
}

export default Category;