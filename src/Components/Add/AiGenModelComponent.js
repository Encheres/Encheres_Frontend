import React, { Component } from "react";
import { Accordion, Form } from "react-bootstrap";
import { Button, CardText } from "reactstrap";
import { GrDomain } from "react-icons/gr";
import swal from "sweetalert";
import { connect } from "react-redux";
import {
    fetchAiGeneratedAsset,
    fetchAiGeneratedLiteratureAsset,
    fetchAiGeneratedMusicAsset,
} from "../../apis_redux/actions/aiGeneratedAsset";
import * as ipfsClient from "ipfs-http-client";

//Declare IPFS
const ipfs = ipfsClient.create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
});

const textToImage = require("text-to-image");

class AiGenAsset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content_file_hash: "",
            style_file_hash: "",
            generated_asset_file_hash: "",
            content_uploading: false,
            style_uploading: false,

            literature: "",
            literatureLength: 0,
            errors: {
                literature: "",
                literatureLength: "",
                note_count: "",
            },
            music: "100",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    onFileChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);

        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result) });
            console.log("buffer", this.state.buffer);
        };

        console.log("Submitting file to ipfs...");
    };

    async uploadContentFile() {
        try {
            this.setState({
                content_uploading: true,
            });

            const file = await ipfs.add(this.state.buffer);
            this.setState({
                content_file_hash: file.path,
                content_uploading: false,
            });

            console.log(file.path);
        } catch (error) {
            this.setState({
                content_uploading: false,
                buffer: null,
            });

            swal({
                title: "OOPS!!",
                text: "Something Went Wrong. Try again!!",
                icon: "error",
            });
        }
    }

    async uploadStyleFile() {
        try {
            this.setState({
                style_uploading: true,
            });

            const file = await ipfs.add(this.state.buffer);
            this.setState({
                style_file_hash: file.path,
                style_uploading: false,
            });

            console.log(file.path);
        } catch (error) {
            this.setState({
                style_uploading: false,
                buffer: null,
            });

            swal({
                title: "OOPS!!",
                text: "Something Went Wrong. Try again!!",
                icon: "error",
            });
        }
    }

    async generateAsset() {
        await this.props.fetchAiGeneratedAsset(
            this.state.content_file_hash,
            this.state.style_file_hash
        );

        if (this.props.generatedAssets.errMess) {
            this.setState({
                content_file_hash: "",
                style_file_hash: "",
            });

            swal({
                title: "OOPS!!",
                text: "Asset Generation Unsuccessful. Try again!!",
                icon: "error",
            });
        } else if (this.props.generatedAssets.generatedAsset) {
            this.props.setAssetFileHash(
                this.props.generatedAssets.generatedAsset
            );
            swal({
                title: "Success!!",
                text: "Your AI generated Asset File Created Sucessfully!!\n Now Provide other details in form and Create Asset",
                icon: "success",
            });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value,
        });
    }

    formValidattion() {
        const { literatureLength } = this.state;
        let literatureLengthError = "",
            error;

        if (
            (literatureLength && isNaN(literatureLength)) ||
            literatureLength <= 0
        ) {
            literatureLengthError = "Next Literature Words must be non zero.";
            error = true;
        }

        this.setState((prevState) => ({
            errors: {
                literatureLength: literatureLengthError,
            },
        }));

        return !error;
    }

    note_countValidate() {
        var note_count = this.state.music;
        for (var i = 0; i < note_count.length; i++) {
            if (
                note_count[i] != "0" &&
                note_count[i] != "1" &&
                note_count[i] != "2" &&
                note_count[i] != "3" &&
                note_count[i] != "4" &&
                note_count[i] != "5" &&
                note_count[i] != "6" &&
                note_count[i] != "7" &&
                note_count[i] != "8" &&
                note_count[i] != "9"
            ) {
                this.setState({
                    errors: {
                        literature: "",
                        literatureLength: "",
                        note_count: "this is not a number",
                    },
                });
                swal({
                    title: "WARNING!!",
                    text: "note_count is not a number: Try again!!",
                    icon: "error",
                });
                return false;
            }
        }
        return true;
    }

    async generateLiteratureAsset() {
        if (!this.formValidattion()) return;

        await this.props.fetchAiGeneratedLiteratureAsset(
            this.state.literature,
            this.state.literatureLength
        );

        if (this.props.generatedAssets.errMess) {
            this.setState({
                literature: "",
                literatureLength: 0,
            });

            swal({
                title: "OOPS!!",
                text: "Asset Generation Unsuccessful. Try again!!",
                icon: "error",
            });
        } else if (this.props.generatedAssets.generatedAsset) {
            this.literatureTextToAssetFile(
                this.props.generatedAssets.generatedAsset.generated_literature
            );
        }
    }
    async generateMusicAsset(e) {
        e.preventDefault();
        if (!this.note_countValidate()) {
            return;
        }
        console.log("about to download");
        await this.props.fetchAiGeneratedMusicAsset(this.state.music);
    }

    async literatureTextToAssetFile(literature) {
        textToImage
            .generate(literature, {
                bgColor: "#2A0944",
                textColor: "#BFA2DB",
                fontWeight: "bold",
                fontFamily: "cursive",
                margin: 30,
            })
            .then(async (imageUri) => {
                let buffer = new Buffer(imageUri.split(",")[1], "base64");
                let file = await ipfs.add(buffer);
                return file;
            })
            .then((file) => {
                alert(file.path);
                this.props.setAssetFileHash(file.path);
                swal({
                    title: "Success!!",
                    text: "Your AI generated Asset File Created Sucessfully!!\n Now Provide other details in form and Create Asset",
                    icon: "success",
                });
            })
            .catch((er) => {
                swal({
                    title: "OOPS!!",
                    text: "Asset Generation Unsuccessful. Try again!!",
                    icon: "error",
                });
            });
    }

    render() {
        var assetGenButton;

        if (!this.state.content_file_hash || !this.state.style_file_hash) {
            assetGenButton = (
                <Button className="mt-2 new-item-card-button" disabled>
                    GENERATE ASSET FILE
                </Button>
            );
        } else if (
            this.state.content_file_hash &&
            this.state.style_file_hash &&
            this.props.generatedAssets.isProcessing
        ) {
            assetGenButton = (
                <Button className="mt-2 new-item-card-button" disabled>
                    GENERATING YOUR ASSET FILE
                </Button>
            );
        } else {
            assetGenButton = (
                <Button
                    className="mt-2 new-item-card-button"
                    onClick={() => this.generateAsset()}
                >
                    GENERATE ASSET FILE
                </Button>
            );
        }

        return (
            <Accordion className="mt-4">
                <Accordion.Item eventKey="0">
                    <Accordion.Header style={{ whiteSpace: "pre" }}>
                        <span className="fa fa-lg fa-paint-brush" /> Use AI Art
                        Generator
                    </Accordion.Header>
                    <Accordion.Body style={{ backgroundColor: "#0B1126" }}>
                        <CardText className="mt-2 new-item-card-text">
                            ADD CONTENT IMAGE
                        </CardText>
                        <div className="new-item-card-button-div">
                            <input
                                type="file"
                                onChange={this.onFileChange}
                                className="new-item-card-button"
                            />
                        </div>
                        <div className="row justify-content-center">
                            <Button
                                disabled={
                                    !this.state.buffer ||
                                    this.state.content_uploading
                                }
                                onClick={() => this.uploadContentFile()}
                                className="mt-4"
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 20,
                                }}
                            >
                                {this.state.content_uploading ? (
                                    <span className="fa fa-spinner" />
                                ) : (
                                    <span className="fa fa-plus-circle" />
                                )}
                            </Button>
                        </div>
                        <CardText className="mt-2 new-item-card-text">
                            ADD STYLE IMAGE
                        </CardText>
                        <div className="new-item-card-button-div">
                            <input
                                type="file"
                                onChange={this.onFileChange}
                                className="new-item-card-button"
                            />
                        </div>
                        <div className="row justify-content-center">
                            <Button
                                disabled={
                                    !this.state.buffer ||
                                    this.state.style_uploading
                                }
                                onClick={() => this.uploadStyleFile()}
                                className="mt-4"
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 20,
                                }}
                            >
                                {this.state.style_uploading ? (
                                    <span className="fa fa-spinner" />
                                ) : (
                                    <span className="fa fa-plus-circle" />
                                )}
                            </Button>
                        </div>
                        <div className="mt-4 new-item-card-button-div">
                            {assetGenButton}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header style={{ whiteSpace: "pre" }}>
                        <span className="fa fa-lg fa-music" /> Use AI Music
                        Generator
                    </Accordion.Header>
                    <Accordion.Body style={{ backgroundColor: "#0B1126" }}>
                        {/*  */}
                        <Form
                            style={{
                                display: "flex",
                                alignContent: "center",
                                justifyContent: "center",
                                width: "100%",
                                margin: "0",
                            }}
                        >
                            <div className="row">
                                <div
                                    className="col-8"
                                    style={{ width: "100%" }}
                                >
                                    <Form.Group
                                        className="mb-3"
                                        controlId="music"
                                    >
                                        <Form.Control
                                            name="music"
                                            onChange={this.handleInputChange}
                                            className="new-item-form-field"
                                            style={{
                                                backgroundColor: "#03091F",
                                                borderWidth: 0,
                                                color: "white",
                                            }}
                                            placeholder="Enter Note Count (number)"
                                        />
                                        <div id="new-item-form-error">
                                            {this.state.errors.note_count}
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                        </Form>

                        <div style={{ textAlign: "center" }}>
                            <Button
                                className="mt-2 mb-4 new-item-card-button"
                                onClick={(e) => this.generateMusicAsset(e)}
                            >
                                GENERATE MUSIC FILE
                            </Button>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header style={{ whiteSpace: "pre" }}>
                        <span className="fa fa-lg fa-book" /> Use AI Literature
                        Generator
                    </Accordion.Header>
                    <Accordion.Body style={{ backgroundColor: "#0B1126" }}>
                        <Form className="mt-4">
                            <div className="row">
                                <div className="col-8">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="literature"
                                    >
                                        <Form.Control
                                            name="literature"
                                            onChange={this.handleInputChange}
                                            className="new-item-form-field"
                                            style={{
                                                backgroundColor: "#03091F",
                                                borderWidth: 0,
                                                color: "white",
                                            }}
                                            placeholder="Enter Literature's Begining"
                                        />
                                        <div
                                            className="mb-4"
                                            id="new-item-form-error"
                                        >
                                            {this.state.errors.literature}
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-4">
                                    <Form.Group
                                        className="mb-3"
                                        controlId="literatureLength"
                                    >
                                        <Form.Control
                                            type="number"
                                            name="literatureLength"
                                            onChange={this.handleInputChange}
                                            className="new-item-form-field"
                                            style={{
                                                backgroundColor: "#03091F",
                                                borderWidth: 0,
                                                color: "white",
                                            }}
                                            placeholder="Generation Words Count"
                                        />
                                        <div
                                            className="mb-4"
                                            id="new-item-form-error"
                                        >
                                            {this.state.errors.literatureLength}
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                        </Form>
                        <div style={{ textAlign: "center" }}>
                            <Button
                                className="mt-2 mb-4 new-item-card-button"
                                onClick={() => this.generateLiteratureAsset()}
                            >
                                GENERATE LITERATURE ASSET FILE
                            </Button>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        generatedAssets: state.generatedAssets,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAiGeneratedAsset: (contentHash, styleHash) =>
            dispatch(fetchAiGeneratedAsset(contentHash, styleHash)),
        fetchAiGeneratedLiteratureAsset: (seed_text, next_words_count) =>
            dispatch(
                fetchAiGeneratedLiteratureAsset(seed_text, next_words_count)
            ),
        fetchAiGeneratedMusicAsset: (note_count) =>
            dispatch(fetchAiGeneratedMusicAsset(note_count)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AiGenAsset);
