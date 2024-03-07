import React from "react";
import { useNavigate } from "react-router-dom";
import CommentsForm from "../CommentsForm/commentsForm";

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

type ArtworkDetailsProps = {
  artwork: Artwork | null;
};

const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({ artwork }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mx-5 my-5">
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded self-start flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>
      <div className="flex justify-center">
      <span className="text-lg font-bold">Scroll down for the Comment form.</span>
      </div>
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-12 text-center lg:text-left">
            <div
              className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
              style={{
                backgroundImage: `url(${artwork?.thumbnail.url})`,
              }}
            ></div>

            <h1 className="text-3xl font-bold pt-8 lg:pt-0">
              {artwork?.title}
            </h1>
            <div className="mx-auto lg:mx-0 w-full pt-3 text-gray-600">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold">Artist Display:</span>
                  <span>{artwork?.artist_display}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-extrabold">Reference No:</span>
                  <span>{artwork?.main_reference_number}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-extrabold">Date Display:</span>
                  <span>{artwork?.date_display}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-extrabold">Dimensions:</span>
                  <span>{artwork?.dimensions}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5" style={{ height: "50%" }}>
          <img
            src={artwork?.thumbnail.url}
            className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block h-full"
          />
        </div>
      </div>

      <CommentsForm />
    </div>
  );
};

export default ArtworkDetails;
