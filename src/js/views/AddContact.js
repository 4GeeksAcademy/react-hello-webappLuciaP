import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const AddContact = () => {
	const { store, actions } = useContext(Context);

	const [contactData, setContactData] = useState({
		name: "",
		phone: "",
		email: "",
		address: "",
		
		agenda_slug: "luciap"
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setContactData({
			...contactData,
			[name]: value
		});
	};

	const handleSave = () => {
		console.log(contactData);
		actions.createUser(contactData);
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Name"
							onChange={handleChange}
							name="name"
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							onChange={handleChange}
							name="phone"
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							onChange={handleChange}
							name="email"
						/>
					</div>
					
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							onChange={handleChange}
							name="address"
						/>
					</div>
					<button type="button" className="btn btn-primary form-control" onClick={handleSave}>
						{/* <button
						type="button"
						className="btn btn-primary form-control"
						onClick={e => {
							handleSave;
							window.location = "/";
						}}> */}
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
