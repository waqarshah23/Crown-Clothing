import {DirectoryItemsContainer, Body, BackGroundImage} from './directory-items.styles.jsx';
import { useNavigate } from 'react-router-dom';
const DirectoryItems = ({category}) => {
    const {title, imageUrl, route} = category;
    const navigate = useNavigate();

    const navigationHandler = () => navigate(route);
    return (
        <DirectoryItemsContainer onClick={navigationHandler}>
          <BackGroundImage imageUrl={imageUrl} />

          <Body >
            <h2>{title}</h2>
            <p>Shop now</p>
          </Body>
        </DirectoryItemsContainer>
    );
}

export default DirectoryItems;