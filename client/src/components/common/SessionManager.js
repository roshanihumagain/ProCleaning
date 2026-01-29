import React, { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const IDLE_TIMEOUT = 10 * 60 * 1000; // 10 minutes

const SessionManager = ({ children }) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const logout = useCallback(() => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/login');
  }, [navigate]);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(logout, IDLE_TIMEOUT);
  }, [logout]);

  useEffect(() => {
    // Only start timer if user is logged in
    const token = sessionStorage.getItem('token');
    if (token) {
      resetTimer();

      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
      events.forEach(event => {
        window.addEventListener(event, resetTimer);
      });

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        events.forEach(event => {
          window.removeEventListener(event, resetTimer);
        });
      };
    }
  }, [resetTimer]);

  return <>{children}</>;
};

export default SessionManager;
