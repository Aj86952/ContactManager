import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

function ContactList(props) {
  const inputRef = useRef("");
  console.log(props);

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };
  const renderList = props.contacts.map((contact) => (
    <ContactCard
      contact={contact}
      clickHandler={deleteContactHandler}
      key={contact.id}
    />
  ));

  const getSearchTerm = (e) => {
    // props.setTerm.setSearchTerm(props.term(...searchTerm), [e.target.value]);
    // console.log(inputRef.current.value);
    props.searchKeyword(inputRef.current.value);
  };
  return (
    <div className="container border border-2 mt-3 ">
      <div className="d-flex justify-content-between">
        <h2>Contact List</h2>
        <Link to="/add">
          <button className="btn btn-outline-warning mr-5">Add Contact</button>
        </Link>
      </div>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputRef}
            type="text"
            placeholder="seach contacts"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>

      <div className="ui celled list">
        {renderList.length > 0 ? renderList : "No contacts available..."}
      </div>
    </div>
  );
}

export default ContactList;
