import React from 'react';
import {Badge} from 'react-bootstrap';
import { BiWorld } from 'react-icons/bi';
import {FaMusic, FaPalette, FaFootballBall, FaCarSide,
    FaWallet, FaBuilding} from 'react-icons/fa';
import {GiBearFace, GiClockwork, GiCardRandom,
    GiVendingMachine, GiSofa, GiClothes, GiWatch} from 'react-icons/gi';
import {GrDomain } from 'react-icons/gr';
import { FaFile } from 'react-icons/fa';

const getIcon = (category) => {
    switch(category) {
        case 'Art':
            return <FaPalette/>
        case 'Music':
            return <FaMusic/>
        case 'Domain Names':
            return <GrDomain/>
        case 'Virtual Worlds':
            return <BiWorld/>
        case 'Trading Cards':
            return <GiCardRandom/>
        case 'Collectibles':
            return <GiBearFace/>
        case 'Sports':
            return <FaFootballBall/>
        case 'Documents':
            return <FaFile/>
        case 'Utility':
            return <FaWallet/>
        case 'Antiques':
            return <GiClockwork/>
        case 'Electronics':
            return <GiVendingMachine/>
        case 'Vehicles':
            return <FaCarSide/>
        case 'Households':
            return <GiSofa/>
        case 'Fashion':
            return <GiClothes/>
        case 'Mini Items':
            return <GiWatch/>
        case 'Real Estate':
            return <FaBuilding/>
        case 'Miscellaneous':
            return <FaWallet/>
        default:
            return <FaWallet/>
    }
}

export const DisplayBadges = (props) => {
    const {category} = props;
    return(
        <>
            <Badge name={category} className='new-item-badge' pill text="dark"
             onClick={() => props.toggleCategory(category)} bg={props.selected_bg?"light":"secondary"}>
                <span>{getIcon(category)}</span> {" "} {category}   
            </Badge>
        </>
    )
}
