import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

export const Modal = props => {
	const { store, actions } = useContext(Context);
	const [newContactData, setNewContactData] = useState({
		full_name: props.contact && props.contact.full_name ? props.contact.full_name : "",
		email: props.contact && props.contact.email ? props.contact.email : "",
		phone: props.contact && props.contact.phone ? props.contact.phone : "",
		address: props.contact && props.contact.address ? props.contact.address : "",
		agenda_slug: "luciap"
	});
	let modalContent;

	function handleInputChange(e) {
		const { name, value } = e.target;
		setNewContactData({ ...newContactData, [name]: value });
	}

	if (props.modalId === "delete") {
		modalContent = (
			<>
				<div className="modal-header">
					<h5 className="modal-title">Are you sure?</h5>
					{props.onClose ? (
						<button
							onClick={() => props.onClose()}
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					) : (
						""
					)}
				</div>
				<div className="modal-body">
					<p>Warning: unknown consequences after this point... Kidding!</p>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-primary">
						Oh no!
					</button>
					<button
						type="button"
						className="btn btn-secondary"
						data-dismiss="modal"
						onClick={() => {
							actions.deleteContact(props.contact.id, props.contact);
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
					{props.onClose ? (
						<button
							onClick={() => props.onClose()}
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					) : (
						""
					)}
				</div>
				<div className="modal-body">
					<form>
						<div className="form-group">
							<label>Full Name</label>
							<input
								type="text"
								className="form-control"
								placeholder={props.contact.full_name}
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
								placeholder={props.contact.email}
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
								placeholder={props.contact.phone}
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
								placeholder={props.contact.address}
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
						data-dismiss="modal"
						onClick={() => {
							actions.updateContact(props.contact.id, newContactData);
						}}>
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

/**
 * Define the data-types for
 * your component's properties
 **/
Modal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool,
	contact: PropTypes.object,
	modalId: PropTypes.string
};

/**
 * Define the default values for
 * your component's properties
 **/
Modal.defaultProps = {
	show: false,
	onClose: null
};
