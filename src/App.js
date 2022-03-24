import './App.css';
import { useState } from 'react';
import validator from 'validator';
import passwordValidator from 'password-validator';

function App() {

  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setInputValue({
      ...inputValue,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var schema = new passwordValidator();
    schema
    .is().min(4)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2);

    if(!validator.isEmail(inputValue.email)){
      setError('Email is invalid');
    } else if(!schema.validate(inputValue.password)){
      setError('password must contain uppercase, lowercase, 2 digits and 3 or more characters');
    } else if(inputValue.password!==inputValue.confirmPassword) {
      setError(`The passwords doesn't match. Please try again`);
    } else {
      setError('');
    }
  }

  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className='form-label'>
            Email address
          </label>
          <input type='email' id='email' name='email' className='form-control' value={inputValue.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className='form-label'>
            Password
          </label>
          <input type='password' id='password' name='password' className='form-control' value={inputValue.password} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className='form-label'>
            Confirm Password
          </label>
          <input type='password' id='confirmPassword' name='confirmPassword' className='form-control' value={inputValue.confirmPassword} onChange={handleChange} />
        </div>
        {error && <p className='text-danger'>{error}</p>}
        <button type='submit' className='btn btn-primary' onClick={handleSubmit} >Submit</button>
      </form>
    </div>
  );
}

export default App;
