import React from 'react';

type SkeletonCardProps = {
  count?: number;
};

const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 1 }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 md:max-w-md lg:max-w-lg p-4 my-2">
          <div className="animate-pulse">
            <div className="rounded-full bg-gray-300 h-24 w-24 mx-auto"></div>
            <div className="mt-2 h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <div className="mt-2 h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;
