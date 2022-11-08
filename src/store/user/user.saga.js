import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { 
    createUserDocumentFromAuth, 
    getCurrentUser, 
    signInWithGooglePopup,
    signInAuthWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser
} from "../../utils/firebase/firebase.utils";
import { SignInFailure, SignInSuccess, SignOutFailure, SignOutSuccess, SignUpFailure, SignUpSuccess } from "./user.action";
import { User_Action_Types } from "./user.types";

export function* getSnapShotFromUserAuth(userAuth, AdditionalDetail) {
    console.log('getSnapShotFromUserAuth saga called');
    try{
        const userSnapShot = yield call(createUserDocumentFromAuth,userAuth, AdditionalDetail);
        yield put(SignInSuccess({id: userSnapShot.id, ...userSnapShot.data()}));
    }
    catch(err){
        yield put(SignInFailure(err));
    }
}

export function* isUserAuthenticated(){
    try{
        const authUser = yield call(getCurrentUser);
        if(!authUser) return;
        yield call(getSnapShotFromUserAuth, authUser);
    }
    catch(err){
        yield put(SignInFailure(err));
    }
}

export function* onCheckUserSession(){
    yield  takeLatest(User_Action_Types.Check_User_Session, isUserAuthenticated)
}

export function* SignInWithGoogle(){
    try{
        const {user} = yield call(signInWithGooglePopup);
        yield call(getSnapShotFromUserAuth, user);


    }
    catch(err){
        yield put(SignInFailure(err));
    }
}
export function* onGoogleSignInStart(){
    yield takeLatest(User_Action_Types.Google_Sign_In_Start, SignInWithGoogle)
}


export function* SignInWithEmail({payload: {email, password}}){
    try{
        const {user} = yield call(signInAuthWithEmailAndPassword, email, password);
        yield call(getSnapShotFromUserAuth, user);
    }
    catch(err){
        yield put(SignInFailure(err));
    }
}
export function* onEmailSignInStart(){
    yield takeLatest(User_Action_Types.Email_Sign_In_Start, SignInWithEmail)
}

export function* signUp({payload: {email, password, displayName}}){
    try{
        const {user} = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(SignUpSuccess(user, {displayName}))
    }
    catch(err){
        yield put(SignUpFailure(err));
    }
}

export function* onSignUpStart(){
    yield takeLatest(User_Action_Types.Sign_Up_Start, signUp)
}

export function* signInAfterSignUp({payload: {user, AdditionalDetail}}){
    try{
        yield call(getSnapShotFromUserAuth, user, AdditionalDetail);
    }
    catch(err){
        yield put(SignInFailure(err));
    }
}

export function* onSignUpSuccess(){
    yield takeLatest(User_Action_Types.Sign_Up_Success, signInAfterSignUp);
}

export function* SignOut(){
    try{
        yield call(signOutUser);
        yield put(SignOutSuccess());
    }
    catch(err){
        yield put(SignOutFailure(err));
    }
}

export function* onSignOutStart(){
    yield takeLatest(User_Action_Types.Sign_Out_Start,SignOut)
}
export function* UserSaga() {
    yield all(
        [
            call(onCheckUserSession), 
            call(onGoogleSignInStart),
            call(onEmailSignInStart),
            call(onSignUpStart),
            call(onSignUpSuccess),
            call(onSignOutStart)
        ]);
}