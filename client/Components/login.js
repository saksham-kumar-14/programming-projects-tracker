import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid"
import * as EmailValidator from 'email-validator';
import { useRouter } from "next/router";
import axios from "axios";
 
const Login = () => {

    const [pwdType, setPwdType] = useState("password");
    const [pwd, setPwd] = useState("");
    const [email, setEmail] = useState("");

    const [isEmailValid, setIsEmailValid] = useState(false);

    const router = useRouter();

    const login = async (e) => {
        e.preventDefault();
        if (isEmailValid) {
            const res = await axios.post("http://localhost:3001/login", {
                password: pwd,
                email: email  
            });
            const data = await res.data;

            if(data.user){
                localStorage.setItem("token", data.user);
                router.push("../")
            }else{
                alert("User not found!")
            }
        }else{
            alert("Invalid Email");
        }
    }

    return(
        <div className="bg-[rgb(40,40,40)] text-white py-5 px-2 w-[90%]">

            <h1 className="text-[2rem] font-bold underline italic">Login</h1>

            <div className="flex flex-col">
                <label>Email</label>
                <input className="text-black rounded-md p-1"  onChange={(e)=>{
                    setEmail(e.target.value)
                    if(EmailValidator.validate(e.target.value)) {
                        setIsEmailValid(true)
                    } else {
                        setIsEmailValid(false)
                    }
                }} type="text" />
            </div>

            {!isEmailValid && 
            <div>
                Your Email address is not valid.
            </div>}

            <div className="flex flex-col">
                <label>Password</label>
                <div className="flex items-center rounded-md p-1 bg-white">
                    <input
                    className="text-black w-[90%]" 
                    onChange={(e)=>{
                        setPwd(e.target.value)
                    }}
                    type={pwdType} />

                    <div className="flex items-center justify-center w-[10%]">
                        {pwdType === "password"?
                        <EyeIcon onClick={()=>{
                            setPwdType("text")
                        }} className="w-[1.5rem] cursor-pointer text-black"/>:
                        <EyeOffIcon onClick={()=>{
                            setPwdType("password")
                        }} className="w-[1.5rem] cursor-pointer text-black"/>}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center py-4">
                <button 
                className="bg-[rgb(100,200,100)] hover:bg-[rgb(64,166,64)] text-[1.2rem] font-semibold p-2 rounded-xl" 
                onClick={login}>Login</button>
            </div>

        </div>
    )
}

export default Login;