import React, { useState, useEffect } from "react";
import AddContact from "./components/AddContact";
import ContactCard from "./components/ContactCard";
import ContactList from "./components/ContactList";
import Header from "./components/Header";
import { uuid } from "uuidv4";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ContactDetails from "./components/ContactDetails";
import api from "../src/api/contact";
import EditContact from "./components/EditContact";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    console.log(response);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    // console.log(response.data);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...response.data } : contact
      )
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((currentEle) => {
      return currentEle.id !== id;
    });
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    // console.log(searchTerm);
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResult(newContactList);
    } else {
      setSearchResult(contacts);
    }
  };
  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact>
            <ContactList
              contacts={searchTerm.length < 1 ? contacts : searchResult}
              getContactId={removeContactHandler}
              term={searchTerm}
              setTerm={setSearchTerm}
              searchKeyword={searchHandler}
            />
          </Route>
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
          <Route path="/contact/:id" component={ContactDetails} />
          {/* <Route path="/add">
            <AddContact addContactHandler={addContactHandler} />
          </Route> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
