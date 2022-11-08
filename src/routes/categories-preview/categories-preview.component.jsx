import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { SelectCategoriesIsLoading, SelectCategoriesMap } from '../../store/category/category.selector';
import Spinner from '../../components/spinner/spinner.styles';
const CategoriesPreview = () => {
    //const {CategoriesMap} = useContext(CategoriesContext);
    const CategoriesMap = useSelector(SelectCategoriesMap);
    const isLoading = useSelector(SelectCategoriesIsLoading);
    console.log(CategoriesMap);
    return (
        <Fragment>
        {
            isLoading ? (
                <Spinner />
            ) : 
            (
                Object.keys(CategoriesMap).map(title => {
                    const product = CategoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={product} />
                 })
            )
        }
        </Fragment>
    );
}

export default CategoriesPreview;