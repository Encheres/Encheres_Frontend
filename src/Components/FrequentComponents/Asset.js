
import {Badge} from 'react-bootstrap';
import {FaPalette, FaMusic, FaFootballBall, 
    FaWallet} from 'react-icons/fa';
import {GrDomain } from 'react-icons/gr';
import {GiCardRandom, GiBearFace} from 'react-icons/gi';
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