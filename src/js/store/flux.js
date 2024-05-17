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
            getAgenda: () => {
                fetch("https://playground.4geeks.com/contact/agendas/luciap/", {
                    method: "GET",
                    redirect: "follow"
                })
                    .then(response => response.json())
                    .then(result => {
                        console.log("Fetched agenda:", result); // Verificar la respuesta
                        setStore({ agenda: result });
                    })
                    .catch(error => console.error("Error fetching agenda:", error));
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
                        return response.json();
                    })
                    .then(result => {
                        console.log("Contact deleted:", result);
                        getActions().getAgenda();
                    })
                    .catch(error => console.error("Error deleting contact:", error));
            },
            updateContact: (contactId, contact) => {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify(contact);

                const requestOptions = {
                    method: "PUT",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };

                fetch(`https://playground.4geeks.com/contact/agendas/luciap/contacts/${contactId}`, requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(result => {
                        console.log("Contact updated:", result);
                        getActions().getAgenda();
                    })
                    .catch(error => console.error("Error updating contact:", error));
            }
        }
    };
};

export default getState;
