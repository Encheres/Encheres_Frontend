
import {Badge} from 'react-bootstrap';
import {FaPalette, FaMusic, FaFootballBall, 
    FaWallet, FaCarSide, FaBuilding} from 'react-icons/fa';
import {GrDomain } from 'react-icons/gr';
import {GiCardRandom, GiBearFace, GiClockwork, 
    GiVendingMachine, GiSofa, GiClothes, GiWatch} from 'react-icons/gi';
import { BiWorld } from "react-icons/bi";

const numToCatMap = [
    "Art",
    "Music",
    "Domain Names",
    "Virtual Worlds",
    "Collectibles",
    "Sports",
    "Documents",
    "Utility"
]

export const renderAssetCategories = (categories) => {
    return(
        categories.map((c) => {

            var icon;

            if(c === "Art" || c == 0)
                icon = <FaPalette/>
            else if(c === "Music" || c == 1)
                icon = <FaMusic/>
            else if(c === "Domain Names" || c == 2)
                icon = <GrDomain/>
            else if(c === "Virtual Worlds" || c == 3)
                icon = <BiWorld/>
            else if(c === "Trading Cards" || c == 4)
                icon = <GiCardRandom/>
            else if(c === "Collectibles" || c == 5)
                icon = <GiBearFace/>
            else if(c === "Sports" || c == 6)
                icon = <FaFootballBall/>
            else if(c === "Documents" || c == 7)
                icon = <span className='fa fa-file'/>
            else if(c === "Utility" || c == 8)
                icon = <FaWallet/>

            return(
                    <Badge className='new-item-badge' pill bg="light" text="dark">
                        <span>{icon}</span>{" "+ c}
                    </Badge>
            )
        })
    );
}

export const renderAssetCategoriesFromIds = (categories) => {
    return(
        categories.map((c) => {

            var icon;

            if(c === "Art" || c == 0)
                icon = <FaPalette/>
            else if(c === "Music" || c == 1)
                icon = <FaMusic/>
            else if(c === "Domain Names" || c == 2)
                icon = <GrDomain/>
            else if(c === "Virtual Worlds" || c == 3)
                icon = <BiWorld/>
            else if(c === "Trading Cards" || c == 4)
                icon = <GiCardRandom/>
            else if(c === "Collectibles" || c == 5)
                icon = <GiBearFace/>
            else if(c === "Sports" || c == 6)
                icon = <FaFootballBall/>
            else if(c === "Documents" || c == 7)
                icon = <span className='fa fa-file'/>
            else if(c === "Utility" || c == 8)
                icon = <FaWallet/>

            return(
                    <Badge className='new-item-badge' pill bg="light" text="dark">
                        <span>{icon}</span>{" "+ numToCatMap[parseInt(c)]}
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
            else if(c === "Mini Items")
                icon = <GiWatch />
            return(
                    <Badge className='new-item-badge' pill bg="light" text="dark">
                        <span>{icon}</span>{" "+c}
                    </Badge>
            )
        })
    );
}