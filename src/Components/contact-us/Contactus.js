import './contactus.css';

const Contactus = () => {
    return (
        <div className="body_container" >
            <div className="contactus_container">
                <div className="form-container">
                    <div className="left-container">
                        <div className="left-inner-container">
                            <h2>Let's Chat</h2>
                            <p>Any Feedback from your side will be appreciated</p>
                            <br />
                            <p>Feel free to send any feedback</p>
                        </div>
                    </div>
                    <div className="right-container">
                        <div className="right-inner-container">
                            <form action="#">
                                <h2 className="lg-view">Contact</h2>
                                <h2 className="sm-view">Let's Chat</h2>
                                <p>* Required</p>
                                <input type="text" placeholder="Name *" />
                                <input type="email" placeholder="Email *" />
                                <p>Type</p>
                                <input type="radio" id="html" name="fav_language" value="HTML" />
                                <label for="html">HTML</label>
                                <input type="radio" id="html" name="fav_language" value="HTML" />
                                <label for="html">HTML</label>
                                <input type="radio" id="html" name="fav_language" value="HTML" />
                                <label for="html">HTML</label>
                                <textarea rows={4} placeholder="Message" defaultValue={""} />
                                <button>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Contactus;