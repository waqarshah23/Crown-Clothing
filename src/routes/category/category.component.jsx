import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCart from '../../components/product-cart/product-cart.component';
import { CategoriesContext } from '../../contexts/categories.context';
import { CategoryContainer, CategoryTitle } from './category.styles.jsx';

const Category = () => {
    const {category} = useParams();
    const {CategoriesMap} = useContext(CategoriesContext);
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