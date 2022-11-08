// import { createContext, useEffect, useState } from 'react';
// import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';
// export const CategoriesContext = createContext({
//     CategoriesMap: {},
// });

// export const CategoriesProvider = ({children}) => {
//     const [CategoriesMap, setCategoriesMap] = useState({});

//     useEffect(() => {
//         const getCategoryMap = async () => {
//             const categoryMap = await getCategoriesAndDocuments();
//             setCategoriesMap(categoryMap);
//         };
//         getCategoryMap();   
//     }, []);

//     const value = {CategoriesMap};
//     return (
//         <CategoriesContext.Provider value={value}>
//             {children}
//         </CategoriesContext.Provider>
//     )
// }