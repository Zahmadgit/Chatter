import React from "react"
import {render, fireEvent} from "@testing-library/react-native"
import EmailAndPassword from "@/app/components/EmailAndPassword"

describe("EmailAndPassword Component", ()=>{
    //test1
    it("renders component",()=>{
        const {getByPlaceholderText, getByText} = render(
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
        expect(getByPlaceholderText("Enter your email")).toBeTruthy();
        expect(getByPlaceholderText("Enter your password")).toBeTruthy();
        expect(getByText("Login")).toBeTruthy();

    })
    //test 2
    it("updating email and password",()=>{
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
        fireEvent.changeText(getByPlaceholderText("Enter your email"), "test@test.com");
        fireEvent.changeText(getByPlaceholderText("Enter your password"), "123456");
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
        const eyeButton = getByTestId("toggle-password-visibility");
        //initially hidden
        expect(passwordInput.props.secureTextEntry).toBe(true);
        fireEvent.press(eyeButton);
        //should be visible now
        expect(passwordInput.props.secureTextEntry).toBe(false); 
    });

    //test 4
    it("calls onSubmit when the button is pressed", () => {
        const onSubmitMock = jest.fn();
        const { getByText } = render(
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
        fireEvent.press(getByText("Login"));
        expect(onSubmitMock).toHaveBeenCalled();
    });
})