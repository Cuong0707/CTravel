import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { set } from 'date-fns';
import { Alert } from '@mui/material';
import useAppContext from '../hook/useAppContext';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const profile = useAppContext();
  const token = localStorage.getItem('access_token');

  // useEffect(() => {
  //   const token = localStorage.getItem('access_token');
  //   if (token) {
  //     fetchUserData(token);
  //   }
  // }, []);

  // const fetchUserData = async (token) => {
  //   try {
  //     const response = await axios.get(`http://localhost:8080/api/v1/users/token/${token}`);
  //     const userData = response.data.data;
  //     setUser(userData);
  //     if (userData !== null) {
  //       localStorage.setItem('infoUser', JSON.stringify(userData));
  //     } else {
  //       localStorage.removeItem('infoUser');
  //       localStorage.removeItem('token');
  //       setUser(null);
  //     }
  //   } catch (error) {
  //     console.error('Failed to fetch user data:', error);
  //     setUser(null);
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('infoUser'); // Remove infoUser from localStorage if fetching fails
  //   }
  // };

  // const signIn = async (email, password) => {
  //   try {
  //     const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
  //       email,
  //       password,
  //     });
      
  //     const token = response.data.token;
  //     localStorage.setItem('token', token);
  //     fetchUserData(token);
  //   } catch (error) {
  //     console.error('Failed to sign in:', error);
  //     throw new Error("Failed to sign in");
  //   }
  // };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      let email = '';
      if (profile) {
        email = profile.email;
      } else {
        throw new Error('Email not found');
      }
      // const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:8080/api/v1/auth/change-password',
        {
          email,
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Password changed successfully:', response.data);
    } catch (error) {
      console.error('Failed to change password:', error);
      throw new Error('Failed to change password');
    }
  };

  
  const updateUserInfo =  async (updatedInfo) => {
    console.log(updatedInfo);
    try {
      // const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8080/api/v1/users/update`,
        updatedInfo,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        // Update user data in context after successful update
        setUser({ ...user, ...updatedInfo });
        console.log('User information updated successfully:', response.data);
      } else {
        console.log('Failed to update user information:', response);
        throw new Error('Failed to update user information');
      }
    } catch (error) {
      console.error('Error occurred while updating user information:', error);
      throw new Error('Error occurred while updating user information');
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/auth/forgot-password?email=${email}`
      );
      console.log('Password changed successfully:', response.data);
    } catch (error) {
      console.error('Failed to forgot password:', error);
      throw new Error('Failed to forgot password');
    }
  };
  const resetPassword = async (token, password) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/reset-password',
        {
          token,
          password,
        }
      );
      console.log('Password changed successfully:', response.data);
    } catch (error) {
      console.error('Failed to reset password:', error);
      throw new Error('Failed to reset password');
    }
  };

  // const logout = () => {
  //   setUser(null); // Clear user state
  //   localStorage.removeItem('token'); // Remove token from localStorage
  //   localStorage.removeItem('infoUser'); // Remove infoUser from localStorage
  // };

  return (
    <AuthContext.Provider value={{ user, changePassword, resetPassword, forgotPassword, updateUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
