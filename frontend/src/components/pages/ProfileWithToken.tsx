import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ProfileWithToken = () => {
  const { accessToken, user } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken || !user) return;

    localStorage.setItem('github_access_token', String(accessToken));
    localStorage.setItem('github_username', String(user));

    navigate('/profile');
  }, [accessToken, user]);

  return <div>Loading</div>;
};

export { ProfileWithToken };
