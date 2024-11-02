import React from "react";
import { Link, Navigate } from "react-router-dom";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      pronouns: '',
      errors: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      redirect: false,
    };
  }

  validateForm = () => {
    const { username, email, password, confirmPassword } = this.state;
    let isValid = true;
    let errors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!username.trim()) {
      errors.username = 'Username is required.';
      isValid = false;
    }
    if (!email.trim()) {
      errors.email = 'Email is required.';
      isValid = false;
    } else if (!email.includes('@')) {
      errors.email = 'Email must contain "@" symbol.';
      isValid = false;
    }
    if (!password.trim()) {
      errors.password = 'Password is required.';
      isValid = false;
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      const { username, email, password, gender, pronouns } = this.state;

      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
            gender,
            pronouns,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          this.setState({ redirect: true });
        } else {
          this.setState({
            errors: {
              ...this.state.errors,
              email: data.message || 'Registration failed.',
            },
          });
        }
      } catch (error) {
        this.setState({
          errors: {
            ...this.state.errors,
            email: 'An unexpected error occurred.',
          },
        });
      }
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, password, confirmPassword, gender, pronouns, errors, redirect } = this.state;

    if (redirect) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Sign Up</h2>
          <form onSubmit={this.handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Username"
                onChange={this.handleChange}
                className="w-full p-4 text-gray-900 placeholder-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.username && <div className="text-red-500 text-sm mt-1">{errors.username}</div>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
                className="w-full p-4 text-gray-900 placeholder-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
                className="w-full p-4 text-gray-900 placeholder-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
            </div>
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={this.handleChange}
                className="w-full p-4 text-gray-900 placeholder-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
            </div>
            <div>
              <select
                name="gender"
                value={gender}
                onChange={this.handleChange}
                className="w-full p-4 text-gray-900 placeholder-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="pronouns"
                value={pronouns}
                placeholder="Pronouns (optional)"
                onChange={this.handleChange}
                className="w-full p-4 text-gray-900 placeholder-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition-colors"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4 text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-gray-800 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default SignUp;
