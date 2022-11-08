import { User_Action_Types } from "./user.types";

//Initial State
const Initial_State = {
    currentUser: null,
    isLoading: false,
    error: null
}
//Reducer
export const UserReducer = (state = Initial_State, action) => {
    const {type, payload} = action;

    switch(type)
    {
        case User_Action_Types.Set_Current_user: 
        return {
            ...state,
            currentUser: payload
        }
        case User_Action_Types.Sign_In_Success:
            return{
                ...state,
                currentUser: payload
            }
        case User_Action_Types.Sign_In_Failure:
        case User_Action_Types.Sign_Up_Failure:
        case User_Action_Types.Sign_Out_Failure:
            return{
                ...state,
                error: payload
            }
        case User_Action_Types.Sign_Out_Success:
            return {
                ...state,
                currentUser: null
            }
        default: 
            return state;
    }

}