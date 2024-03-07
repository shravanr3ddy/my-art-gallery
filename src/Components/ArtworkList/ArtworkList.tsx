import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Artwork = {
  id: string | number;
  title: string;
  artist_display: string;
  date_display: string;
  main_reference_number: string;
  thumbnail: {
    url: string;
    alt_text?: string;
  };
  dimensions: string;
};

type ArtworkListProps = {
    artworks: Artwork[];
    onArtworkClicked: (id: Artwork['id']) => void;
  };

const ArtworkList: React.FC<ArtworkListProps> = ({ artworks, onArtworkClicked }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {artworks?.map((artwork) => (
        <div
          key={artwork.id}
          className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 md:max-w-md lg:max-w-lg"
        >
          <div className="px-4 pt-4">
            <div className="flex flex-col items-center pb-10">
              <div className={"cursor-pointer contents"}  onClick={() => onArtworkClicked(artwork.id)}>
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg md:w-32 md:h-32 lg:w-40 lg:h-40"
                  src={artwork.thumbnail.url}
                  alt={artwork.thumbnail.alt_text || "Artwork image"}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {artwork.title}
                </h5>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {artwork.artist_display}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtworkList;
