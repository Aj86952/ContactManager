import React from "react";
import { Link } from "react-router-dom";
import user from "./user.png";

function ContactDetails(props) {
  console.log(props);
  const { name, email } = props.location.state.contact;
  return (
    <div className="main mt-5">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Link to="/">
          <button className="btn btn-outline-primary">
            Back to Contact list
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ContactDetails;
