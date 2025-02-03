"use client";
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Inline styles for various components
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f7f7f7',
    },
    formWrapper: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      margin: '0 1rem',
    },
    heading: {
      fontSize: '1.8rem',
      textAlign: 'center',
      color: '#333',
      marginBottom: '1.5rem',
    },
    input: {
      width: '100%',
      padding: '0.8rem',
      margin: '0.8rem 0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '1rem',
      boxSizing: 'border-box',
      outline: 'none',
      color:'black',
    },
    inputFocus: {
      borderColor: '#007BFF',
      boxShadow: '0 0 5px rgba(0, 123, 255, 0.2)',
    },
    button: {
      width: '100%',
      padding: '0.8rem',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonDisabled: {
      backgroundColor: '#c0c0c0',
      cursor: 'not-allowed',
    },
    success: {
      color: '#28a745',
      textAlign: 'center',
      fontSize: '1rem',
    },
    error: {
      color: '#dc3545',
      textAlign: 'center',
      fontSize: '1rem',
    },
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Sending the registration data to the backend
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
      });

      // On success, show a success message
      setMessage(response.data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Handle errors (e.g., user already exists)
      if (error.response) {
        setMessage(error.response.data.message || 'Registration failed');
      } else {
        setMessage('An error occurred');
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.heading}>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#007BFF'}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#007BFF'}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#007BFF'}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        {message && (
          <p style={message.includes('success') ? styles.success : styles.error}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default Register;
