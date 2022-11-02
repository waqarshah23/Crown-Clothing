import {baseButton, GoogleSignInButton, InvertedButton} from './button.styles.jsx';

export const Button_Type_Classes = {
    google: 'GoogleSignInButton',
    inverted: 'InvertedButton',
    base: 'baseButton'
}

const getButton = (buttonType = Button_Type_Classes.base) => (
    {
        [Button_Type_Classes.base]: baseButton,
        [Button_Type_Classes.google]: GoogleSignInButton,
        [Button_Type_Classes.inverted]: InvertedButton
    }[buttonType]
);

const Button = ({buttonType, name, ...otherProps}) => {

    const CustomButton = getButton(buttonType);
    return (
        <CustomButton 
             
            {...otherProps}>
            {name}
        </CustomButton>
    );
}

export default Button;