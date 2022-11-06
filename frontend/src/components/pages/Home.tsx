import { useAuthContext } from '../../context/authContext';
import { Navigate } from 'react-router-dom';
import { Header, RepositoryCard } from '../common';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { createQueryForGetRepos } from '../../services/gql/github';

const Home = () => {
  const { getCurrentUser } = useAuthContext();
  const user = getCurrentUser();
  const { loading, error, data } = useQuery(createQueryForGetRepos('davixcky'));
  const [repos, setRepos] = useState([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    if (error || loading || !data) return;

    const edges = data.user.repositories.edges;
    const reposMap = edges.map((edge: { node: any }) => edge.node);
    setRepos(reposMap);
  }, [loading, error, data]);

  useEffect(() => {
    const rawFavorites = localStorage.getItem('favorites');
    console.log(rawFavorites);
    if (!rawFavorites) {
      setFavorites([]);
      return;
    }

    const data = JSON.parse(rawFavorites);
    setFavorites(data);
  }, []);

  useEffect(() => {
    if (favorites.length === 0) return;
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleOnChangeFavorite = (status: boolean, name: string) => {
    if (status) setFavorites((prev) => [...prev, name]);
    else {
      setFavorites(favorites.filter((fav) => fav !== name));
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 w-screen h-screen flex p-10 flex-col overflow-y-auto">
      <Header mainButtonHref="/profile" mainButtonTitle="Profile" />
      <div className="flex flex-col flex-1 mt-9 px-4">
        <p className="text-white text-3xl mb-2">My favorites repos</p>
        <div className="flex flex-wrap gap-5">
          {favorites.length === 0 && (
            <div className="flex justify-center items-center rounded-xl h-[200px] w-[300px] flex-grow bg-gradient-to-l from-white">
              No favorites yet. Start by clicking in the star of any repo!
            </div>
          )}
          {favorites.length !== 0 &&
            repos.map(
              (repo, index) =>
                favorites.includes((repo as any).name) && (
                  <RepositoryCard
                      key={index}
                    onFavoriteChange={handleOnChangeFavorite}
                    description={(repo as any).description || ''}
                    name={(repo as any).name}
                    languages={[]}
                    url={(repo as any).url}
                    isFavorite={true}
                  />
                )
            )}
        </div>
      </div>
      <div className="flex flex-col flex-1 mt-9 px-4">
        <p className="text-white text-3xl mb-6 top-0">All my repos</p>
        <div className="flex flex-wrap gap-5">
          {repos.map((repo, index) => (
            <RepositoryCard
                key={index}
              onFavoriteChange={handleOnChangeFavorite}
              description={(repo as any).description || ''}
              name={(repo as any).name}
              languages={[]}
              url={(repo as any).url}
              isFavorite={favorites.includes((repo as any).name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Home };
