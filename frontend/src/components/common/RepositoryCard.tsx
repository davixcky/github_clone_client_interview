import { ExternalLinkIcon, FilledStarIcon, UnfilledStarIcon } from '../icons';

export type RepositoryLanguagesDefinition = {
  name: string;
  color: string;
};

export type RepositoryCardProps = {
  url: string;
  name: string;
  description: string;
  languages: RepositoryLanguagesDefinition[];
  isFavorite?: boolean;
  onFavoriteChange?: (status: boolean, name: string) => void;
};

const RepositoryCard = ({
  url,
  name,
  description,
  languages,
  isFavorite,
  onFavoriteChange
}: RepositoryCardProps) => {
  return (
    <div className="bg-white rounded-xl min-h-[200px] w-[300px] px-5 py-4 flex-grow flex justify-between flex-col">
      <div>
        <div className="flex justify-between">
          <p className="font-bold">{name}</p>
          <button
            className="w-[15px] h-[15px] text-[#48D398]"
            onClick={() => onFavoriteChange && onFavoriteChange(!isFavorite, name)}
          >
            {isFavorite ? <FilledStarIcon /> : <UnfilledStarIcon />}
          </button>
        </div>
        <p className="font-light">{description}</p>
      </div>
      <button
        onClick={() => window.open(url, '_blank')}
        className="flex gap-2 justify-center items-baseline"
      >
        Open in github{' '}
        <div className="w-[15px] h-[15px]">
          <ExternalLinkIcon />
        </div>
      </button>
    </div>
  );
};

export { RepositoryCard };
