import { useState } from "react";
import "./MyForm.css";

const MyForm = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(inputs);
    postData("https://send-nodemailer.herokuapp.com/emailer", { inputs }).then(
      (data) => {
        console.log(data);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Enter your name:
        <input
          type="text"
          name="username"
          value={inputs.username || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Enter your age:
        <input
          type="number"
          name="age"
          value={inputs.age || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Enter your email:
        <input
          type="email"
          name="email"
          value={inputs.email || ""}
          onChange={handleChange}
        />
      </label>
      <input type="submit" />
    </form>
  );
};

export default MyForm;
