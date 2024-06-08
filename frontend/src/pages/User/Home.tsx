import React from "react";
import Navbar from "../../components/user/Header/Navbar";
import BannerSlider from "../../components/user/BannerSlider";
import Card from "../../components/user/cards/cardsList";
import Footer from "../../components/user/Footer/footer";
const Home: React.FC = ()=>{
    return (
        <>
        <Navbar/>
        <BannerSlider/>
        <Card/>
        <Footer/>
        </>
    )
}

export default Home