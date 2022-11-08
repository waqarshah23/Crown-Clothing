// import { createContext, useReducer } from 'react';
// import { useEffect } from 'react';
// import { onAuthStateChangeListener,createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';
// //the actual value we want to access
// export const UserContext = createContext({
//     currentUser: null,
//     setCurrentUser: () => null,

// });

// //Initial State
// const Initial_State = {
//     currentUser: null
// }
// //Actions
// export const User_Action_Types = {
//     Set_Current_user: 'SET_CURRENT_USER',
// }
// //Reducer
// const UserReducer = (state, action) => {
//     const {type, payload} = action;

//     switch(type)
//     {
//         case User_Action_Types.Set_Current_user: 
//         return {
//             ...state,
//             currentUser: payload
//         }
//         default: 
//             throw new Error('Unhandled Type: ', {type});
//     }

// }
// //provider
// export const UserProvider = ({children}) => {
//     //const [currentUser, setCurrentUser] = useState(null);
//     const [state, dispatch] = useReducer(UserReducer, Initial_State);
//     const {currentUser} = state;
//     const setCurrentUser = (user) => {
//         dispatch({type: User_Action_Types.Set_Current_user, payload: user});
//     }
//     const value = {currentUser, setCurrentUser};

//     useEffect( () => {
//         const unsubscribe = onAuthStateChangeListener((user) => {
//             if(user){
//                  createUserDocumentFromAuth(user);
//             }
//             setCurrentUser(user);
//         }); 
//         return unsubscribe;
//     }, [])
//     return <UserContext.Provider value={value}>{children}</UserContext.Provider>
// }