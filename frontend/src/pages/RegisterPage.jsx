import React, { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  console.log("RegisterPage rendered!");
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setSuccess(true);
        setUsername("");
        setPassword("");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Something went wrong.");
    }
  };
  return (
    <div>
      <h1>Register</h1>

      {/* <p>Static content for debugging</p> */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green" }}>
          Registration successful! You can now log in.
        </p>
      )}
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
