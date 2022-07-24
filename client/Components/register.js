import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid"
import * as EmailValidator from 'email-validator';
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {

    const [pwdType, setPwdType] = useState("password");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [isEmailValid, setIsEmailValid] = useState(false);

    const router = useRouter();

    async function emailExists(){
        const res = await axios.get("http://localhost:3001/getUsers");
        const allUsers = await res.data;
        let result = false;
        allUsers.map((e)=>{
            if(e.email === email){
                result= true;
            }
        });
        return result;
    }

    const createUser = async (e) => {
        e.preventDefault();
        if(await emailExists()){
            alert("Your email already exists. Try to Login ...")
        }else{
            if(name.length>1 && pwd.length>4){
                const res = await axios.post("http://localhost:3001/createUser", {
                    name: name,
                    email: email,
                    password: pwd
                });
                const data = await res.data;

                if(data.user){
                    localStorage.setItem("token", data.user);
                    router.push("../")
                }else{
                    alert("Some problem occured while registering user.")
                }
            }else{
                alert("Either your name is too short or your password is weak")
            }
        }
    }

    return(
        <div className="bg-[rgb(40,40,40)] text-white py-5 px-2 w-[90%]">

            <h1 className="text-[2rem] font-bold underline italic">Register</h1>
            <div className="flex flex-col">
                <label>Full Name</label>
                <input className="text-black rounded-md p-1" onChange={(e)=>{setName(e.target.value)}} type="text" />
            </div>

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
                onClick={createUser}>Register</button>
            </div>

        </div>
    )
}

export default Register;