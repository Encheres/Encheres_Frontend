import React from 'react'
import './auctionRoom.css'

/*
Messages can be:
start -> item up for auction
sold -> item sold
general -> person bidding
warn -> countdown
*/


export const Message = (props) =>{
    const data = props.data;
    const {type, message} = data;
    const class_name = `message_div  ${type}_box`;
    return(
        <>
            <div style={{color:'#888'}}>18:21:25</div>
            <div>
            <div className={class_name}>
                <span className='message_text'>
                    {message}

                </span>

            </div>        
            </div>

        </>
    )
}