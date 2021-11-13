import React, {Component} from 'react';
import { Accordion, Form } from 'react-bootstrap';
import { Button, CardText } from 'reactstrap';
import { GrDomain } from 'react-icons/gr';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { fetchAiGeneratedAsset } from '../../apis_redux/actions/aiGeneratedAsset';
import * as ipfsClient  from 'ipfs-http-client';

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
            style_uploading: false,

            literature: '',
            literatureLength: 0,
            errors: {
                literature: '',
                literatureLength: ''
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
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

    async generateAsset(){

        await this.props.fetchAiGeneratedAsset(this.state.content_file_hash, this.state.style_file_hash);

        if(this.props.generatedAssets.errMess){

            this.setState({
                content_file_hash: '',
                style_file_hash: ''
            });

            swal({
                title: "OOPS!!",
                text: 'Asset Generation Unsuccessful. Try again!!',
                icon: "error"
            })
        }
        else if(this.props.generatedAssets.generatedAsset){
            
            this.props.setAssetFileHash(this.props.generatedAssets.generatedAsset)
            swal({
                title: "Success!!",
                text: "Your AI generated Asset File Created Sucessfully!!\n Now Provide other details in form and Create Asset",
                icon: "success"
            })
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: event.target.value
        });
    }

    formValidattion() {

        const { literatureLength } = this.state;
        let literatureLengthError = "", error;

        if(literatureLength && isNaN(literatureLength) || literatureLength - this.state.literature <= 0){
            literatureLengthError = "Literature's Length must be greater than literature's begining length.";
            error = true
        }

        this.setState(prevState => ({
            errors:{
                literatureLength: literatureLengthError
            }
        }))
        
        return !error;
    }

    generateLiteratureAsset(){

        if(!this.formValidattion())
            return;
        
        alert('Form Submitted!!')
    }

    render(){
        var assetGenButton;

        if(!this.state.content_file_hash || !this.state.style_file_hash){
            assetGenButton = <Button className='mt-2 new-item-card-button'
                                disabled
                            >
                                GENERATE ASSET FILE
                            </Button>
        }
        else if(this.state.content_file_hash && this.state.style_file_hash && this.props.generatedAssets.isProcessing){
            assetGenButton = <Button className='mt-2 new-item-card-button'
                                disabled
                            >
                                GENERATING YOUR ASSET FILE
                            </Button>
        }
        else{
            assetGenButton = <Button className='mt-2 new-item-card-button'
                                onClick={() => this.generateAsset()}
                            >
                                GENERATE ASSET FILE
                            </Button>
        }

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
                            {
                                assetGenButton
                            } 
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
                        <Form className='mt-4'>
                            <div className='row'>
                                <div className='col-8'>
                                    <Form.Group className="mb-3" controlId="literature">
                                        <Form.Control
                                            name='literature'
                                            onChange={this.handleInputChange}
                                            className='new-item-form-field' 
                                            style={{backgroundColor: '#03091F', 
                                                borderWidth: 0,
                                                color: 'white'
                                                }}
                                            placeholder="Enter Literature's Begining" />
                                        <div className='mb-4' id='new-item-form-error'>{this.state.errors.literature}</div>
                                    </Form.Group>
                                </div>
                                <div className='col-4'>
                                    <Form.Group className="mb-3" controlId="literatureLength">
                                        <Form.Control
                                            type='number'
                                            name='literatureLength'
                                            onChange={this.handleInputChange}
                                            className='new-item-form-field' 
                                            style={{backgroundColor: '#03091F', 
                                                borderWidth: 0,
                                                color: 'white'
                                                }}
                                            placeholder="Length (words)"
                                            />
                                        <div className='mb-4' id='new-item-form-error'>{this.state.errors.literatureLength}</div>
                                    </Form.Group>
                                </div>
                            </div>
                        </Form>
                        <div style={{textAlign: 'center'}}>
                        <Button className='mt-2 mb-4 new-item-card-button'
                            onClick={() => this.generateLiteratureAsset()}
                        >
                            GENERATE LITERATURE ASSET FILE
                        </Button>
                        </div>
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

const  mapStateToProps = (state) => {
    return{
        generatedAssets: state.generatedAssets
    };
}

const mapDispatchToProps = dispatch => {
    
    return {
        fetchAiGeneratedAsset: (contentHash, styleHash) => dispatch(fetchAiGeneratedAsset(contentHash, styleHash))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AiGenAsset);
