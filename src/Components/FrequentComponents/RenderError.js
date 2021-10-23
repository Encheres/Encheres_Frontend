import React from 'react';
import {Card, CardBody, CardSubtitle, Button} from 'reactstrap';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ErrorImage from '../../assets/images/Error.png'


function refreshPage(){ 
    window.location.reload(); 
}

const RenderError = ({error}) => {

    return(
        <div className='container'>
            <div className='row justify-content-center mt-4 mb-4'>
                <h3 className='col-12 rainbow-lr new-item-heading'>
                    OOPS!! GOT AN ERROR
                </h3>
            </div>
            <div className='row mb-4'>
                <div className='col-12 col-md-6 mb-4'>
                    <Image src={ErrorImage} alt = "buying ans selling image"  className="section__side__image section__image--left"/>
                </div>
                <div className='col-12 col-md-6 mb-4'>
                    <Card id="new-item-card">
                        <CardBody >
                            <CardSubtitle tag="h4"
                                className="mt-3 mb-3"
                                id="new-item-card-info">
                                It Says {"< "+error+" />"}
                            </CardSubtitle>
                            <Button className='mt-2 new-item-card-button'>
                                <Link style={{color: 'white', textDecoration: 'none'}} to='/home'>
                                   SAFE ZONE
                                </Link>
                            </Button> 
                            <Button className='mt-2 new-item-card-button'
                                onClick={refreshPage}>
                                TRY AGAIN
                            </Button> 
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
        
    );
}

export default RenderError

