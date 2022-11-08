import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "../button/button.component";
import { Button_Type_Classes } from "../button/button.component";
import {PaymentForContainer, FormContainer} from './payment-form.styles';
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
    const paymentHandler = async(e) => {
        e.preventDefault();

        if(!stripe || !elements) return;
        setIsPaymentProcessing(true);
        const response = await fetch('/./netlify/functions/create-payment-intent', { //http://localhost:8888/.netlify/functions/create-payment-intent
            method: 'post',
            headers: {
                'Content_Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amount*100
            })
        }).then(resp => resp.json());

        console.log(response);
        const {paymentIntent: {client_secret}} = response;

        const paymentResults = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser? currentUser.displayName : 'Guest'
                }
            }
        });
        setIsPaymentProcessing(false);
        if(paymentResults.error){
            alert(paymentResults.error);
        }
        else if(paymentResults.paymentIntent.status === 'succeeded'){
            alert('payment successful');
        }
    }

    return (
        <PaymentForContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement/>
                <Button disabled={isPaymentProcessing} buttonType={Button_Type_Classes.inverted} name='Pay Now'></Button>
            </FormContainer>
        </PaymentForContainer>
    );
} 

export default PaymentForm;