import React from "react"
import {render, fireEvent} from "@testing-library/react-native"
import EmailAndPassword from "@/app/components/EmailAndPassword"




describe("EmailAndPassword Component", ()=>{

    //test1
    it("renders component",()=>{
        const {getByPlaceholderText, getByText} = render(
            //render component
            <EmailAndPassword
                email = ""
                password=""
                setEmail={()=>{}}
                setPassword={()=>{}}
                onSubmit={()=>{}}
                buttonText="Login"
                loading={false}
            ></EmailAndPassword>
        )
        //scans the rendered text with getByPlaceholderText and getByText and it is expected
        //making sure it all rendered
        //tobeTruthy works for everything that isnt returned  false, 0, '', null, undefined, NaN
        expect(getByPlaceholderText("Enter your email")).toBeTruthy();
        expect(getByPlaceholderText("Enter your password")).toBeTruthy();
        expect(getByText("Login")).toBeTruthy();

    })
    //test 2
    it("updating email and password",()=>{
        //tracking calls to setEmail and setPassword with mock functions
        const setEmailMock = jest.fn();
        const setPasswordMock = jest.fn();
        const {getByPlaceholderText} = render(
            <EmailAndPassword
                email = ""
                password=""
                setEmail={setEmailMock}
                setPassword={setPasswordMock}
                onSubmit={()=>{}}
                buttonText="Login"
                loading={false}
            ></EmailAndPassword>
        )
        //simulate the typing
        fireEvent.changeText(getByPlaceholderText("Enter your email"), "test@test.com");
        fireEvent.changeText(getByPlaceholderText("Enter your password"), "123456");
        //make sure the function is called with correct values
        expect(setEmailMock).toHaveBeenCalledWith("test@test.com");
        expect(setPasswordMock).toHaveBeenCalledWith("123456")
    })

    //test 3
    it("toggles password visibility when clicking the eye icon",()=>{
        const { getByPlaceholderText, getByTestId } = render(
            <EmailAndPassword
                email=""
                password=""
                setEmail={() => {}}
                setPassword={() => {}}
                onSubmit={() => {}}
                buttonText="Login"
                loading={false}
            ></EmailAndPassword>
        );
    
        const passwordInput = getByPlaceholderText("Enter your password");
        //getting a reference to the eyeButton through a test id
        const eyeButton = getByTestId("toggle-password-visibility");
        //initially hidden
        expect(passwordInput.props.secureTextEntry).toBe(true);
        fireEvent.press(eyeButton);
        //should be visible now because secureTextEntry is false
        expect(passwordInput.props.secureTextEntry).toBe(false); 
    });

    //test 4
    /*{it("calls onSubmit when the button is pressed", () => {
        const onSubmitMock = jest.fn();
        const { getByText, getByTestId } = render(
            <EmailAndPassword
                email="test@test.com"
                password="123456"
                setEmail={() => {}}
                setPassword={() => {}}
                onSubmit={onSubmitMock}
                buttonText="Login"
                loading={false}
            ></EmailAndPassword>
        );
        const chatScreen = getByTestId("chat-screen")
        //simulate a click
        fireEvent.press(getByText("Login"));
        //make sure the function was called when clicked
        expect(onSubmitMock).toHaveBeenCalled();
        expect(chatScreen).toBeOnTheScreen();
    });

    it("calls onSubmit when the button is pressed", () => {
        const mockNavigate = jest.fn();
        const { getByText, getByTestId } = render(
        
        );

        //simulate a click
        fireEvent.press(getByText("Login"));

    });*/
})