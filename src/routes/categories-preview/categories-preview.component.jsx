import { Fragment, useContext } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { CategoriesContext } from '../../contexts/categories.context';

const CategoriesPreview = () => {
    const {CategoriesMap} = useContext(CategoriesContext);
    console.log(CategoriesMap);
    return (
        <Fragment>
        {
             Object.keys(CategoriesMap).map(title => {
                const product = CategoriesMap[title];
                return <CategoryPreview key={title} title={title} products={product} />
             })
        }
        </Fragment>
    );
}

export default CategoriesPreview;