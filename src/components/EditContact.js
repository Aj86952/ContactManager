import React from "react";

class EditContact extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, email } = props.location.state.contact;
    this.state = {
      id: id,
      name: name,
      email: email,
    };
  }

  state = {
    name: "",
    email: "",
  };
  update = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All feilds are mandatory");
    } else {
      this.props.updateContactHandler(this.state);
      this.setState({ name: "", email: "" });
      console.log(this.state);
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div className="ui main mt-5">
        <h2>Edit Contact</h2>
        <form className="ui form" onSubmit={this.update}>
          <div className="field">
            <label>Name :</label>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Email :</label>
            <input
              type="text"
              placeholder="Enter email"
              name="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <button className="btn btn-primary ">Edit</button>
        </form>
      </div>
    );
  }
}

export default EditContact;
