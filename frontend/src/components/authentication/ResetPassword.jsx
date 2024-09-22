import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { updatePassword } from '../utils/apiFunctions';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [disabled, setDisabled] = useState(false);

  const token = new URLSearchParams(location.search).get('token');

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing token.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true)

    if (!newPassword || newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setDisabled(false)
      return;
    }

    try {
      const response = await updatePassword(token, newPassword);
      setMessage(response.data);
      setTimeout(() => {
        navigate('/login/client'); 
      }, 3000);
    } catch (err) {
        setDisabled(false)
      setErrorMessage('Failed to reset password. Please try again.');
    }
  };

  return (

    <section >
    <div className="flex items-center justify-center my-10">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h2 className="text-center text-2xl font-LakesNeueDemiBold leading-tight text-[#00634D]">
          Reset Password
        </h2>
        
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="space-y-5">
            <div>
              <label htmlFor="" className="text-base font-medium text-[#00634D]">
                {' '}
                New Password{' '}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  id="newPassword"
                  name="newPassword" 
                  type="password"
                  value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required                 
                ></input>
              </div>
            </div>
            <div>
              <label htmlFor="" className="text-base font-medium text-[#00634D]">
                {' '}
                Confirm Password{' '}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  id="confirmPassword"
                  name="confirmPassword" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
            required                 
                ></input>
              </div>
            </div>
            {
              errorMessage && 
              <p className="mt-2 text-center text-sm font-TypewcondRegular text-gray-600 ">
              {errorMessage}
            </p>
            }
            {
              message && 
              <p className="mt-2 text-center text-sm font-TypewcondRegular text-gray-600 ">
              {message}
              </p>
            }
            <div>
              <button
                type="submit"
                disabled={disabled}
                className="inline-flex w-full items-center justify-center rounded-md bg-[#00634D] hover:bg-[#16473d] focus:bg-[#00634D] px-3.5 py-2.5 font-semibold leading-7 text-[#EFEDE7] "
              >
                Reset Password 
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
  );
};

export default ResetPassword;
