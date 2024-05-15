import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const AddContact = () => {
	const { store, actions } = useContext(Context);

	const [contactData, setContactData] = useState({
		full_name: "",
		email: "",
		address: "",
		phone: "",
		agenda_slug: "luciap"
	});

	// Este efecto se ejecutará cada vez que full_name cambie
	// useEffect(() => {
	// 	if (contactData.full_name) {
	// 		// Calcular agenda_slug a partir de full_name
	// 		const agenda_slug = contactData.full_name.toLowerCase().replace(/\s+/g, "");
	// 		// Actualizar contactData con el nuevo valor de agenda_slug
	// 		setContactData({ ...contactData, agenda_slug });
	// 	}
	// }, [contactData.full_name]); // Dependencia del efecto: contactData.full_name

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
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							onChange={handleChange}
							name="full_name"
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
