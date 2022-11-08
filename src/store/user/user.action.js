import { User_Action_Types } from "./user.types";

export const setCurrentUser = (user) => 
    (
        {
            type: User_Action_Types.Set_Current_user,
            payload: user
        }
    )

export const CheckUserSession = () => (
    {
        type: User_Action_Types.Check_User_Session, 
    }
)

export const SignUpStart = (email, password, displayName) => (
    {
        type:User_Action_Types.Sign_Up_Start,
        payload: {
            email, password, displayName
        }
    }
)

export const SignUpSuccess = (user, AdditionalDetail) => ({
    type: User_Action_Types.Sign_Up_Success,
    payload: {
        user, AdditionalDetail
    }
})

export const SignUpFailure = (error) => (
    {
        type: User_Action_Types.Sign_Up_Failure,
        payload: error
    }
)
export const EmailSignIn = (email, password) => (
    {
        type: User_Action_Types.Email_Sign_In_Start,
        payload: {
            email,password
        } 
    }
)

export const GoogleSignIn = () => (
    {
        type: User_Action_Types.Google_Sign_In_Start, 
    }
)

export const SignInSuccess = (user) => (
    {
        type: User_Action_Types.Sign_In_Success,
        payload: user
    }
)

export const SignInFailure = (err) => (
    {
        type: User_Action_Types.Sign_In_Failure,
        payload: err
    }
)

export const SignOutStart = () => (
    {
        type: User_Action_Types.Sign_Out_Start
    }
)
export const SignOutSuccess = () => (
    {
        type: User_Action_Types.Sign_Out_Success
    }
)
export const SignOutFailure = () => (
    {
        type: User_Action_Types.Sign_Out_Failure
    }
)