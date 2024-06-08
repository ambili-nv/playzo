import React from "react";
import Navbar from "../../components/user/Header/Navbar";
import SearchBar from "../../components/user/SearchBar";
import Card from "../../components/user/cards/cardsList";
import Footer from "../../components/user/Footer/footer";

const Book :React.FC = () =>{
    return (
        <>
        <Navbar/>
        <SearchBar/>
        <Card/>
        <Footer/>

        </>
    )
}

export default Book