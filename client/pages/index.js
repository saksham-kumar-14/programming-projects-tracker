import Head from "next/head";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from 'axios';
import { useRouter } from "next/router";

import TrackBody from "../Components/trackBody";


const Home = () => {

  const [userInfo, setUserInfo] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();

  async function verifyUser(token){
    const res = await axios.get("http://localhost:3001/verifyUser", {
      headers: {
        "user-token": token
      }
    });
    const user = await res.data.user;
    if (user) {
      setUserInfo({
        name: user.name,
        email: user.email,
        track: user.track
      });
      setLoggedIn(true);
    }else{
      router.push("/authentication");
    }
  }

  useEffect(()=>{
    const token = localStorage.getItem("token");
    const decoded = jwt.decode(token)

    if (decoded) {
      verifyUser(token);
    }else{
      router.push("/authentication")
    }

  },[])

  function logout(e){
    e.preventDefault();
    localStorage.clear();
    location.reload();
  }

  async function deleteUser(e){
    e.preventDefault();
    localStorage.clear();
    const res = await axios.post("http://localhost:3001/deleteUser", {
      email: userInfo.email
    });
    const data = await res.data;
    if (data.deleted){
      location.reload();
    }else{
      alert("some problem occured while deleting your account. Try again after sometime.")
    }

  }

  return(
    <div>
      <Head>
        <title>Track Your Programming Projects! - Programming Projects Tracker</title>
      </Head>

      
      <div>
        {loggedIn &&  
        <div>
          <div className="flex items-center justify-end px-5 py-3">
            <button className="px-3 py-2 mx-2 font-semibold text-blue-500 hover:text-blue-400 duration-100" onClick={logout}>Logout</button>
            <button className="px-3 py-2 rounded-md mx-2 font-semibold bg-red-500 hover:bg-red-600 duration-100" onClick={deleteUser}>Delete User</button>
          </div>
          <TrackBody userInfo={userInfo} setUserInfo={setUserInfo} />
        </div>}


      </div>

    </div>
  )
}

export default Home;