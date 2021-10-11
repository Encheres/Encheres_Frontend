
import {Badge} from 'react-bootstrap';
import {FaPalette, FaMusic, FaFootballBall, 
    FaWallet, FaCarSide, FaBuilding} from 'react-icons/fa';
import {GrDomain } from 'react-icons/gr';
import {GiCardRandom, GiBearFace, GiClockwork, 
    GiVendingMachine, GiSofa, GiClothes} from 'react-icons/gi';
import { BiWorld } from "react-icons/bi";

export const renderAssetCategories = (categories) => {
    return(
        categories.map((c) => {

            var icon;

            if(c === "Art")
                icon = <FaPalette/>
            else if(c === "Music")
                icon = <FaMusic/>
            else if(c === "Domain Names")
                icon = <GrDomain/>
            else if(c === "Virtual Worlds")
                icon = <BiWorld/>
            else if(c === "Trading Cards")
                icon = <GiCardRandom/>
            else if(c === "Collectibles")
                icon = <GiBearFace/>
            else if(c === "Sports")
                icon = <FaFootballBall/>
            else if(c === "Documents")
                icon = <span className='fa fa-file'/>
            else if(c === "Utility")
                icon = <FaWallet/>

            return(
                    <Badge className='new-item-badge' pill bg="light" text="dark">
                        <span>{icon}</span>{" "+c}
                    </Badge>
            )
        })
    );
}

export const renderPhysicalAssetCategories = (categories) => {
    return(
        categories.map((c) => {

            var icon;

            if(c === "Art")
                icon = <FaPalette/>
            else if(c === "Antiques")
                icon = <GiClockwork/>
            else if(c === "Electronics")
                icon = <GiVendingMachine/>
            else if(c === "Vehicles")
                icon = <FaCarSide/>
            else if(c === "Households")
                icon = <GiSofa/>
            else if(c === "Collectibles")
                icon = <GiBearFace/>
            else if(c === "Sports")
                icon = <FaFootballBall/>
            else if(c === "Fashion")
                icon = <GiClothes/>
            else if(c === "Real Estate")
                icon = <FaBuilding/>
            else if(c === "Miscellaneous")
                icon = <FaWallet/>

            return(
                    <Badge className='new-item-badge' pill bg="light" text="dark">
                        <span>{icon}</span>{" "+c}
                    </Badge>
            )
        })
    );
}