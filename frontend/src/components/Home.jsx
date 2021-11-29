import React from "react";
import { useParams} from "react-router-dom";
import NavSideBar from "./NavSideBar/NavSideBar"
import RowContainer from "./RowContainer/RowContainer";
function Home() {
    const {username} = useParams()
    return<RowContainer>        
        <NavSideBar username={username}/>       
        <div>
        <h1> hi {username}! welcome to Alon`s Chat!</h1>  
        <p> here you can enjoy talking with people all over the world with public chat!!</p>
        <p> enjoy!</p>  
        </div>
        </RowContainer>

}
export default Home;