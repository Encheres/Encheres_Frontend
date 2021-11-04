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
    const chat = props.chat;
    const {message_type, message, time} = chat;
    const date_time = new Date(time);
    let year = date_time.getFullYear();
    let month = date_time.getMonth()+1;
    let day = date_time.getDate();
    let hour = date_time.getHours();
    let minutes = date_time.getMinutes();
    let seconds = date_time.getSeconds();
    if(hour<10){
        hour = '0'+hour;
    }
    if(minutes<10){
        minutes = '0'+minutes;
    }
    if(seconds<10){
        seconds = '0'+seconds;
    }
    const class_name = `message_div  ${message_type}_box`;
    return(
        <>
            <div style={{color:'#888'}}>{hour}:{minutes}:{seconds}</div>
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