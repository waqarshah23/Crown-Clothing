import {  useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const resetFormFields = () => {
         setFormFields(defaultFormFields);
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert('passwords do not match');
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        }
        catch(err){
            if(err.code === 'auth/email-already-in-use'){
                alert('account already exists');
            }
            if(err.code === 'auth/weak-password'){
                alert('password should be atleast 6 characters long');
            }
            else{
                console.log('error occured while creating user: ', err);
            }
        }
    }
    return(
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign Up with your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Display Name'
                    type='text' 
                    name="displayName" 
                    onChange={handleChange} 
                    value={displayName} 
                    required
                />
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

                <FormInput 
                    label='Confirm Password'
                    type='password' 
                    name="confirmPassword" 
                    onChange={handleChange} 
                    value={confirmPassword} 
                    required
                />
                <Button type='submit' name='Sign Up' ></Button>
            </form> 
        </div>
    );
}

export default SignUpForm;