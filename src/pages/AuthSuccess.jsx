import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { supabase, supabaseAvailable } from '../supabase/client';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (!supabaseAvailable) {
        navigate('/login', { replace: true });
        return;
      }

      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        navigate('/login', { replace: true });
        return;
      }

      try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/supabase`, {
          accessToken: session.access_token,
        });

        const { token, user: userData } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        window.location.href = '/';
      } catch {
        navigate('/login', { replace: true });
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#000' }}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22c55e] mx-auto"></div>
        <p className="mt-4" style={{ color: '#888' }}>Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;