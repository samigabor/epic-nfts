import React, { useState } from "react";
import "./SignMessage.css";

function SignMessage({ signer }) {
    const [message, setMessage] = useState("");
    const [signedMessage, setSignedMessage] = useState("");

    const handleSignMessage = async () => {
        try {
            if (signer && message) {
                // Sign the message with the user's wallet private key
                const signature = await signer.signMessage(message);
                setSignedMessage(signature);
            }
        } catch (error) {
            console.error("Error signing message:", error.message);
        }
    };

    return (
        <div className="form-container">
            <div className="form">
                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    className="custom-data"
                    placeholder="Type your message to sign..."
                    rows="3"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />

                <label>Signed Message</label>
                <textarea
                    className="signed-message"
                    rows="3"
                    readOnly
                    value={signedMessage}
                />

                <button className="sign-button" onClick={handleSignMessage}>
                    Sign Message
                </button>
            </div>
        </div>
    );
}

export default SignMessage;
