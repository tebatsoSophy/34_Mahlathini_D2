import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userId', data.user._id);
        this.props.navigate('/home');
      } else {
        this.setState({ errorMessage: data.message || 'Invalid credentials.' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      this.setState({ errorMessage: 'An unexpected error occurred.' });
    }
  }

  render() {
    const { email, password, errorMessage } = this.state;

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-6">Log In</h2>
          <form className="space-y-6" onSubmit={this.handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder="Email"
                required
                className="w-full p-4 text-gray-900 placeholder-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="Password"
                required
                className="w-full p-4 text-gray-900 placeholder-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Log In
            </button>
            {errorMessage && (
              <div className="text-red-500 text-center mt-4">{errorMessage}</div>
            )}
          </form>
          <p className="mt-6 text-center text-gray-700">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-700 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

function LoginFormWithNavigate(props) {
  const navigate = useNavigate();
  return <LoginForm {...props} navigate={navigate} />;
}

export default LoginFormWithNavigate;
