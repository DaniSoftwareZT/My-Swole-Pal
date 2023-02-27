import { React, useState } from "react";
import { useToken } from "./Accounts/Auth";
import { useNavigate } from "react-router-dom";
import { useCreateAccountsMutation } from "./store/Api"

function SignupForm() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accountUrl = `${process.env.REACT_APP_API_API_HOST}/api/accounts`;

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(accountUrl, fetchConfig);

    if (response.ok) {
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    }
  }

  const handleChangeInput = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit} id="create-account-form">
            <div className="mb-2">
              <label htmlFor="username" className="form-label">
                username
              </label>
              <input
                value={formData.username}
                onChange={handleChangeInput}
                type="text"
                name="username"
                id="username"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="form-label">
                email
              </label>
              <input
                value={formData.email}
                onChange={handleChangeInput}
                type="text"
                name="email"
                id="email"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="form-label">
                password
              </label>
              <input
                value={formData.password}
                onChange={handleChangeInput}
                type="text"
                name="password"
                id="password"
                className="form-control"
              />
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
