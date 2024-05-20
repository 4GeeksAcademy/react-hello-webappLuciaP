import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const Modal = props => {
    const { actions } = useContext(Context);
    const [newContactData, setNewContactData] = useState({
        full_name: props.contact?.name || "",
        email: props.contact?.email || "",
        phone: props.contact?.phone || "",
        address: props.contact?.address || "",
        agenda_slug: "luciap"
    });
    let modalContent;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewContactData({ ...newContactData, [name]: value });
    };

    const handleUpdateContact = () => {
        actions.updateContact(props.contact.id, newContactData);
        props.onClose();
    };

    if (props.modalId === "delete") {
        modalContent = (
            <>
                <div className="modal-header">
                    <h5 className="modal-title">Are you sure?</h5>
                    {props.onClose && (
                        <button
                            onClick={props.onClose}
                            type="button"
                            className="close"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    )}
                </div>
                <div className="modal-body">
                    <p>Warning: unknown consequences after this point... Kidding!</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={props.onClose}>
                        Oh no!
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                            actions.deleteContact(props.contact.id, props.contact);
                            props.onClose();
                        }}>
                        Do it!
                    </button>
                </div>
            </>
        );
    } else if (props.modalId === "update") {
        modalContent = (
            <>
                <div className="modal-header">
                    <h5 className="modal-title">Update contact data</h5>
                    {props.onClose && (
                        <button
                            onClick={props.onClose}
                            type="button"
                            className="close"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    )}
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="full_name"
                                value={newContactData.full_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={newContactData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="phone"
                                className="form-control"
                                name="phone"
                                value={newContactData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={newContactData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleUpdateContact}>
                        Save!
                    </button>
                </div>
            </>
        );
    }

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">{modalContent}</div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
    contact: PropTypes.object,
    modalId: PropTypes.string
};

Modal.defaultProps = {
    show: false,
    onClose: null
};
