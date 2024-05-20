// ContactCard.js
import React from "react";
import PropTypes from "prop-types";

export const ContactCard = ({ contact, onDelete, onUpdate }) => {
    return (
        <li className="list-group-item">
            <div className="row w-100">
                <div className="col-12 col-sm-6 col-md-3 px-0">
                    <h4>{contact.name}</h4>
                </div>
                <div className="col-12 col-sm-6 col-md-3 text-center">
                    <span className="fa fa-map-marker fa-fw text-muted" data-toggle="tooltip" title="" data-original-title={contact.address}></span>
                    <span className="text-muted small">{contact.address}</span>
                </div>
                <div className="col-12 col-sm-6 col-md-3 text-center">
                    <span className="fa fa-phone fa-fw text-muted" data-toggle="tooltip" title="" data-original-title={contact.phone}></span>
                    <span className="text-muted small">{contact.phone}</span>
                </div>
                <div className="col-12 col-sm-6 col-md-3 text-center">
                    <span className="fa fa-envelope fa-fw text-muted" data-toggle="tooltip" title="" data-original-title={contact.email}></span>
                    <span className="text-muted small text-truncate">{contact.email}</span>
                </div>
                <div className="col-12 col-sm-6 col-md-3 text-center">
                    <button className="btn btn-info" onClick={onUpdate}>Update</button>
                    <button className="btn btn-danger" onClick={onDelete}>Delete</button>
                </div>
            </div>
        </li>
    );
};

ContactCard.propTypes = {
    contact: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};
