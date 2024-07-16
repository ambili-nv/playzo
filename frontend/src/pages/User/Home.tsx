import React,{useState} from "react";
import Navbar from "../../components/user/Header/Navbar";
import BannerSlider from "../../components/user/BannerSlider";
import Card from "../../components/user/cards/cardsList";
import Footer from "../../components/user/Footer/footer";
const Home: React.FC = ()=>{
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <>
        <Navbar/>
        <BannerSlider/>
        {/* <Card/> */}
        <Card searchQuery={searchQuery} />
        <Footer/>
        </>
    )
}

export default Home