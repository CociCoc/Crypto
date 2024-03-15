import React, { useState } from "react";

export default function Home(){
    const access = localStorage.getItem("accessToken");
    console.log("access", access)
    return(
        <div>this is home page</div>

    )
}