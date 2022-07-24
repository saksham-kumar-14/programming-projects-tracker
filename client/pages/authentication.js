import Login from "../Components/login";
import Register from "../Components/register";

import Head from "next/head"

const Authentication = () => {

    return(
        <div className="grid grid-cols-2 place-items-center py-6">

            <Head>
                <title>Login / Register</title>
            </Head>

            <Login />
            <Register />

        </div>
    )
}

export default Authentication;