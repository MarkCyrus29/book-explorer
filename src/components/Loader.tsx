import React from 'react';

const SKELETON_COUNT = 12;

const SkeletonCard: React.FC<{ index: number }> = ({ index }) => (
  <div className="flex flex-col items-center" style={{ animationDelay: `${index * 50}ms` }}>
    <div
      className="skeleton w-full rounded-xl"
      style={{ aspectRatio: '2 / 3', animationDelay: `${index * 50}ms` }}
    />
    <div
      className="skeleton h-2.5 rounded-full mt-3"
      style={{ width: `${70 + (index % 4) * 8}%`, animationDelay: `${index * 50 + 80}ms` }}
    />
    <div
      className="skeleton h-2 rounded-full mt-2 opacity-60"
      style={{ width: `${50 + (index % 3) * 10}%`, animationDelay: `${index * 50 + 140}ms` }}
    />
  </div>
);

export const Loader: React.FC = () => {
  return (
    <div aria-busy="true" aria-label="Loading books…">
      <div className="skeleton h-2.5 w-16 rounded-full mb-8 opacity-50 mx-auto" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-10">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <SkeletonCard key={i} index={i} />
        ))}
      </div>
    </div>
  );
};
