const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            user: "",
            agenda: []
        },
        actions: {
            getUser: () => {
                const requestOptions = { method: "GET", redirect: "follow" };
                fetch("https://playground.4geeks.com/contact/agendas", requestOptions)
                    .then(response => response.json())
                    .then(result => console.log(result))
                    .catch(error => console.error("Error fetching user:", error));
            },
            createUser: contactData => {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify(contactData);

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };

                fetch("https://playground.4geeks.com/contact/agendas/luciap/contacts", requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(result => {
                        console.log("User created:", result);
                        getActions().getAgenda(); // Actualiza la agenda
                    })
                    .catch(error => console.error("Error creating user:", error));
            },
            getAgenda: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/luciap/contacts');
                    const data = await response.json();
                    setStore({ agenda: data.contacts }); // Almacenamos los contactos directamente
                } catch (error) {
                    console.error('Error fetching agenda:', error);
                    setStore({ agenda: [] });
                }
            },
            deleteContact: (contactId, contact) => {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify(contact);

                const requestOptions = {
                    method: "DELETE",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };

                fetch(`https://playground.4geeks.com/contact/agendas/luciap/contacts/${contactId}`, requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        // Verificar si la respuesta no está vacía antes de analizarla como JSON
                        if (response.status === 204) { // No Content
                            console.log("Contact deleted successfully.");
                            getActions().getAgenda();
                        } else {
                            return response.json();
                        }
                    })
                    .then(result => {
                        // Si la respuesta no está vacía, se ejecutará este bloque
                        if (result) {
                            console.log("Contact deleted:", result);
                            getActions().getAgenda();
                        }
                    })
                    .catch(error => console.error("Error deleting contact:", error));
            },
            updateContact: async (contactId, updatedContact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/luciap/contacts/${contactId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedContact)
                    });

                    if (!response.ok) {
                        throw new Error('Failed to update contact');
                    }

                    const data = await response.json();
                    const updatedAgenda = getStore().agenda.map(contact =>
                        contact.id === contactId ? data : contact
                    );

                    setStore({ agenda: updatedAgenda });
                } catch (error) {
                    console.error('Error updating contact:', error);
                }
            }
        }
    };
};

export default getState;
