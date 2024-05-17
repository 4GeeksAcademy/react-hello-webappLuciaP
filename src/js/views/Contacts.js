import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

export const Contacts = () => {
    const [state, setState] = useState({
        showModal: false,
        contact: {},
        modalId: ""
    });

    const { store, actions } = useContext(Context);

    // useEffect para obtener la agenda cuando el componente se monta
    useEffect(() => {
        actions.getAgenda();
    }, []); // La dependencia vacía asegura que solo se llame una vez cuando el componente se monta

    console.log("Store agenda:", store.agenda); // Verificar el contenido del store

    return (
        <div className="container">
            <div>
                <p className="text-right my-3">
                    <Link className="btn btn-success" to="/add">
                        Add new contact
                    </Link>
                </p>
                <div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
                    <ul className="list-group pull-down" id="contact-list">
                        {Array.isArray(store.agenda) && store.agenda.length > 0 ? (
                            store.agenda.map(contact => (
                                <ContactCard
                                    key={contact.id}
                                    contact={contact}
                                    onDelete={() => {
                                        console.log("deleting...");
                                        setState(prevState => ({
                                            ...prevState,
                                            showModal: true,
                                            contact: contact,
                                            modalId: "delete"
                                        }));
                                    }}
                                    onUpdate={() => {
                                        console.log("updating...");
                                        setState(prevState => ({
                                            ...prevState,
                                            showModal: true,
                                            contact: contact,
                                            modalId: "update"
                                        }));
                                    }}
                                />
                            ))
                        ) : (
                            <p>No contacts available</p>
                        )}
                    </ul>
                </div>
            </div>
            <Modal
                show={state.showModal}
                onClose={() => setState({ showModal: false })}
                contact={state.contact}
                modalId={state.modalId}
            />
        </div>
    );
};
