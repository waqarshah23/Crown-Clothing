import { useState } from 'react';
import Button,{ Button_Type_Classes} from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import {
    signInWithGooglePopup,
    signInAuthWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';
const defaultFormFields = {
    email : '',
    password: '',
}
const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const signInWithGoogle = async () => {
         await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!password || !email) return;

        try{
            const {user} =  await signInAuthWithEmailAndPassword(email, password);
            resetFormFields();
        }
        catch(err){
            switch(err.code){
                case 'auth/user-not-found':
                    alert('User not found');
                    break;
                case 'auth/wrong-password':
                    alert('incorrect password');
                    break;
                default:
                    console.log('error occured while sign in: ', err);
            }
        }
    }
    return (
        <div className='sign-in-container'>
            <h2>already have a account?</h2>
            <span>Sign In with your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Email'
                    type='email' 
                    name="email" 
                    onChange={handleChange} 
                    value={email} 
                    required
                />
                <FormInput 
                    label='Password'
                    type='password' 
                    name="password" 
                    onChange={handleChange} 
                    value={password} 
                    required
                />
                <div className='buttons-container'>
                <Button 
                    type='submit' 
                    name='Sign In' >
                </Button>
                <Button 
                    type='button'
                    onClick={signInWithGoogle} 
                    buttonType={Button_Type_Classes.google} 
                    name='Google Sign In' >
                    </Button>
                </div>
            </form>

        </div>
    );
}

export default SignInForm;