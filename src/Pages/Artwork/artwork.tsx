import React, { Suspense } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ReactPaginate from "react-paginate";
import SkeletonCard from "../../Components/SkeletonCard/SkeletonCard";
import ReactSelect from "react-select";

const ArtworkList = React.lazy(
  () => import("../../Components/ArtworkList/ArtworkList")
);

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
  category_ids: string[];
};

const Artwork = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null); // Assuming you have a similar state for the title
  const [selectedCategory, setSelectedCategory] =
    useState<{ value: string; label: string } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(
          `https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=10`
        );
        const fetchedArtworks = response.data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          artist_display: item.artist_display,
          date_display: item.date_display,
          main_reference_number: item.main_reference_number,
          thumbnail: {
            url: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`,
            alt_text: item.thumbnail_alt_text,
          },
          dimensions: item.dimensions,
          category_ids: item.category_ids,
        }));
        setArtworks(fetchedArtworks);
        setFilteredArtworks(artworks);
        filterArtworksByCategory(selectedCategory?.value);
        const totalRecords = response.data.pagination.total;
        setTotalPages(Math.ceil(totalRecords / 10));
      } catch (error) {
        console.error("Failed to fetch artworks:", error);
      }
    };

    fetchArtworks();
  }, [currentPage]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        `https://api.artic.edu/api/v1/categories`
      );
      const fetchedCategories = response.data.data.map((category: any) => ({
        value: category.id,
        label: category.title,
      }));
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    filterArtworksByCategory(selectedCategory?.value);
  }, [selectedCategory, artworks]);

  const handleSelectCategoryChange = (selectedOption: any) => {
    setSelectedCategory(selectedOption);
  };

  const filterArtworksByCategory = (categoryId?: string) => {
    if (!categoryId) {
      setFilteredArtworks(artworks);
      return;
    }
    const filtered = artworks.filter(
      (artwork) =>
        artwork.category_ids && artwork.category_ids.includes(categoryId)
    );

    setFilteredArtworks(filtered);
  };

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1);
    setSelectedCategory(null);
    setSelectedTitle(null);
  };

  const artworkClicked = (id: Artwork["id"]) => {
    navigate(`/artwork/${id}`);
  };

  const handleSelectChange = (selectedOption: any) => {
    if (selectedOption) {
      setSelectedTitle(selectedOption);
      const selectedArtwork = artworks.find(
        (artwork) => artwork.id.toString() === selectedOption.value
      );
      if (selectedArtwork) {
        setFilteredArtworks([selectedArtwork]);
      }
    } else {
      setFilteredArtworks(artworks);
    }
  };

  const selectOptions = artworks.map((artwork) => ({
    value: artwork.id.toString(),
    label: artwork.title,
  }));

  return (
    <>
      <div className="ml-10 flex flex-col justify-center">
        <span className="text-lg font-bold">
          API calls for filter the categories and title are not working as
          expected, so i did a client side filter functionality.
        </span>
        <span className="text-lg font-bold">
          https://api.artic.edu/api/v1/artworks?category_ids="PC-9"&page=1&limit=10
          , https://api.artic.edu/api/v1/artworks?title="cat"&page=1&limit=10
        </span>
      </div>

      <div className="my-5 sm:mx-10 sm:my-10 md:mx-48 md:w-1/4">
        <ReactSelect
          options={selectOptions}
          onChange={handleSelectChange}
          isClearable={true}
          className="mb-4"
          value={selectedTitle}
          placeholder="Search by title..."
        />
        <ReactSelect
          options={categories}
          onChange={handleSelectCategoryChange}
          isClearable={true}
          className="mb-4"
          value={selectedCategory}
          placeholder="Filter by category..."
        />
      </div>
      <Suspense fallback={<SkeletonCard count={10} />}>
        {filteredArtworks.length > 0 ? (
          <ArtworkList
            artworks={filteredArtworks}
            onArtworkClicked={artworkClicked}
          />
        ) : (
          <div>No artworks found.</div> // Fallback content if no artworks are available
        )}
      </Suspense>
      <div className="flex justify-center my-5">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"flex list-none flex-wrap justify-center"}
          pageLinkClassName={
            "px-2 py-1 border rounded mx-1 hover:bg-gray-200 text-sm md:text-base"
          }
          previousLinkClassName={
            "px-2 py-1 border rounded mx-1 hover:bg-gray-200 text-sm md:text-base"
          }
          nextLinkClassName={
            "px-2 py-1 border rounded mx-1 hover:bg-gray-200 text-sm md:text-base"
          }
          activeLinkClassName={
            "bg-blue-500 text-white px-2 py-1 border rounded mx-1 text-sm md:text-base"
          }
          disabledLinkClassName={
            "opacity-50 cursor-not-allowed text-sm md:text-base"
          }
        />
      </div>
    </>
  );
};

export default Artwork;
