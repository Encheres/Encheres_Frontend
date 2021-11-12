import React, {Component} from 'react';
import { Accordion } from 'react-bootstrap';
import { Button, CardText } from 'reactstrap';
import { GrDomain } from 'react-icons/gr';
import swal from 'sweetalert';
import * as ipfsClient  from 'ipfs-http-client';
import { ipfs_base_url } from '../../apis_redux/apis/encheres';

//Declare IPFS
const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });


class AiGenAsset extends Component{
    constructor(props){

        super(props);
        this.state={
            content_file_hash: '',
            style_file_hash: '',
            generated_asset_file_hash: '',
            content_uploading: false,
            style_uploading: false
        }
    }

    onFileChange = (e) => {

        e.preventDefault()
        const file = e.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)

        reader.onloadend = () => {
        this.setState({ buffer: Buffer(reader.result) })
        console.log('buffer', this.state.buffer)
        }

        console.log("Submitting file to ipfs...")
    };

    async uploadContentFile(){
        try {
            
            this.setState({
                content_uploading: true
            })

            const file = await ipfs.add(this.state.buffer)
            this.setState({
                content_file_hash: file.path,
                content_uploading: false
            })

            console.log(file.path)

        } catch (error) {

            this.setState({
                content_uploading: false,
                buffer: null
            })

            swal({
                title: "OOPS!!",
                text: 'Something Went Wrong. Try again!!',
                icon: "error"
            })

        }
    }

    async uploadStyleFile(){
        try {
            
            this.setState({
                style_uploading: true
            })

            const file = await ipfs.add(this.state.buffer)
            this.setState({
                style_file_hash: file.path,
                style_uploading: false
            })

            console.log(file.path)

        } catch (error) {

            this.setState({
                style_uploading: false,
                buffer: null
            })

            swal({
                title: "OOPS!!",
                text: 'Something Went Wrong. Try again!!',
                icon: "error"
            })

        }
    }

    render(){
        return(
            <Accordion className='mt-4'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header style={{whiteSpace: 'pre'}}><span className='fa fa-lg fa-paint-brush' />   Use AI Art Generator</Accordion.Header>
                    <Accordion.Body style={{backgroundColor: '#0B1126'}}>
                        <CardText className='mt-2 new-item-card-text'>
                            ADD CONTENT IMAGE
                        </CardText>
                        <div className='new-item-card-button-div'>
                            <input 
                                type="file"
                                onChange={this.onFileChange}
                                className='new-item-card-button'
                            />
                        </div>
                        <div className='row justify-content-center'>
                            <Button 
                                disabled={!this.state.buffer || this.state.content_uploading}
                                onClick={() => this.uploadContentFile()}
                                className='mt-4' style={{height:40, width: 40, borderRadius: 20}}>
                            {   
                                this.state.content_uploading ?
                                <span className='fa fa-spinner'/>:
                                <span className='fa fa-plus-circle'/>
                            }
                            </Button>
                        </div>
                        <CardText className='mt-2 new-item-card-text'>
                            ADD STYLE IMAGE
                        </CardText>
                        <div className='new-item-card-button-div'>
                            <input 
                                type="file"
                                onChange={this.onFileChange}
                                className='new-item-card-button'
                            />
                        </div>
                        <div className='row justify-content-center'>
                            <Button 
                                disabled={!this.state.buffer || this.state.style_uploading}
                                onClick={() => this.uploadStyleFile()}
                                className='mt-4' style={{height:40, width: 40, borderRadius: 20}}>
                            {   
                                this.state.style_uploading ?
                                <span className='fa fa-spinner'/>:
                                <span className='fa fa-plus-circle'/>
                            }
                            </Button>
                        </div>
                        <div className='mt-4 new-item-card-button-div'> 
                            <Button className='mt-2 new-item-card-button'
                                onClick={() => this.createItem()}
                            >
                                GENERATE ART ASSET FILE
                            </Button>   
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header style={{whiteSpace: 'pre'}}><span className='fa fa-lg fa-music' />   Use AI Music Generator</Accordion.Header>
                    <Accordion.Body style={{backgroundColor: '#0B1126'}}>
                    {/*  */}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header style={{whiteSpace: 'pre'}}><span className='fa fa-lg fa-book' />   Use AI Literature Generator</Accordion.Header>
                    <Accordion.Body style={{backgroundColor: '#0B1126'}}>
                    {/*  */}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header style={{whiteSpace: 'pre'}}><GrDomain style={{backgroundColor: 'white'}}/>   Use AI Domain Names Generator</Accordion.Header>
                    <Accordion.Body style={{backgroundColor: '#0B1126'}}>
                    {/*  */}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion> 
        );
    }
}

export default AiGenAsset;