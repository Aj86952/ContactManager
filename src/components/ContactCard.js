import React, { useState } from "react";
import { Link } from "react-router-dom";
import user from "./user.png";

function ContactCard(props) {
  const { id, name, email } = props.contact;
  return (
    <div style={{ background: "pink" }}>
      <div className="container d-flex justify-content-start mb-3">
        <img className="ui avatar image" src={user} alt="user" />
        {/* <Link to={`/contact/${id}`}> </Link> */}
        <Link
          to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}
          style={{
            textDecoration: "none",
            color: "navy",
            fontWeight: 600,
          }}
        >
          <div className="content ">
            <div className="header">{name}</div>
            <div>{email}</div>
          </div>
        </Link>

        <div className="container d-flex justify-content-end mt-3">
          <Link to={{ pathname: `/edit`, state: { contact: props.contact } }}>
            <i
              className="edit alternate outline icon"
              style={{ color: "green", marginRight: 30 }}
            ></i>
          </Link>

          <Link to="/">
            <i
              className="trash alternate outline icon"
              style={{ color: "red" }}
              onClick={() => props.clickHandler(id)}
            ></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
