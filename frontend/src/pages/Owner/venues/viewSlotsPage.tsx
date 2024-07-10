import React from "react";
import OwnerNavbar from "../../../components/owner/Header/OwnerNavbar";
// import ViewSlots from "../../../components/owner/viewSlots";
import TimeSlotsComponent from "../../../components/owner/viewSlots";
import Footer from "../../../components/owner/Footer/footer";

const ViewSlotPage : React.FC = ()=>{
    return (
        <>
        <OwnerNavbar/>
        <TimeSlotsComponent/>
        {/* <Footer/> */}
        </>
    )
}

export default ViewSlotPage