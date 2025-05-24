import { useState } from "react";
import "./App.css";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  phoneCode: "+91",
  phoneNumber: "",
  country: "",
  city: "",
  pan: "",
  aadhar: ""
};

const citiesByCountry = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "San Francisco", "Chicago"],
  UK: ["London", "Manchester", "Birmingham"]
};

function App() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Valid email is required";
    if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!form.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!form.country) newErrors.country = "Select a country";
    if (!form.city) newErrors.city = "Select a city";
    if (!form.pan.trim()) newErrors.pan = "PAN number is required";
    if (!form.aadhar.trim() || form.aadhar.length !== 12) newErrors.aadhar = "Aadhar must be 12 digits";
    return newErrors;
  };

  const [touched, setTouched] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      alert("Form submitted successfully!"); // Popup message on submit
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          padding: "20px",
          maxWidth: "500px",
          margin: "40px auto",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}
      >
        <h2>Submission Successful</h2>
        <pre>{JSON.stringify(form, null, 2)}</pre>
        <button
          onClick={() => {
            setForm(initialState);
            setSubmitted(false);
          }}
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px"
          }}
        >
          Fill New Form
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // prevent clipping vertically
        background: "#f0f0f0",
        padding: "20px",
        overflowY: "auto" // allow scrolling if content too tall
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "20px",
          maxWidth: "500px",
          width: "100%",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          marginTop: "20px"
        }}
      >
        <h2>Registration Form</h2>

        {[
          ["First Name", "firstName"],
          ["Last Name", "lastName"],
          ["Username", "username"],
          ["Email", "email"],
          ["PAN No", "pan"],
          ["Aadhar No", "aadhar"]
        ].map(([label, name]) => (
          <div key={name} style={{ marginBottom: "12px" }}>
            <label>{label}</label>
            <input
              type="text"
              name={name}
              value={form[name]}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            />
            <div style={{ color: "red", fontSize: "0.9em" }}>{errors[name]}</div>
          </div>
        ))}

        <div style={{ marginBottom: "12px" }}>
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ marginTop: "6px", cursor: "pointer" }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          <div style={{ color: "red", fontSize: "0.9em" }}>{errors.password}</div>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Phone Number</label>
          <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
            <select name="phoneCode" value={form.phoneCode} onChange={handleChange} style={{ padding: "8px" }}>
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              style={{ flex: 1, padding: "8px" }}
            />
          </div>
          <div style={{ color: "red", fontSize: "0.9em" }}>{errors.phoneNumber}</div>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Country</label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          >
            <option value="">-- Select Country --</option>
            {Object.keys(citiesByCountry).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <div style={{ color: "red", fontSize: "0.9em" }}>{errors.country}</div>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>City</label>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          >
            <option value="">-- Select City --</option>
            {(citiesByCountry[form.country] || []).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <div style={{ color: "red", fontSize: "0.9em" }}>{errors.city}</div>
        </div>

        <button
          type="submit"
          disabled={touched && Object.keys(validate()).length > 0}
          style={{
            marginTop: "20px",
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            width: "100%",
            borderRadius: "4px"
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default App;