import React from "react";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
  };
  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("All feilds are mandatory");
    } else {
      this.props.addContactHandler(this.state);
      this.setState({ name: "", email: "" });
      console.log(this.state);
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div className="ui main mt-5">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={this.add}>
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
          <button className="ui button blue"> Submit</button>
        </form>
      </div>
    );
  }
}

export default AddContact;
