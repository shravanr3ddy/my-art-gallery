import { useEffect, useState } from 'react';
import ArtworkDetails from '../../Components/ArtworkDetails/artworkDetails';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

const Artwork = () => {

    const [artwork, setArtwork] = useState<Artwork | null>(null);
    const { id } = useParams();
  
    useEffect(() => {
        const fetchArtworkDetail = async () => {
          if (!id) return;
          try {
            const response = await axios.get(`https://api.artic.edu/api/v1/artworks/${id}`);
            const item = response.data.data;
            const fetchedArtwork = {
              id: item.id,
              title: item.title,
              artist_display: item.artist_display,
              date_display: item.date_display,
              main_reference_number: item.main_reference_number,
              thumbnail: {
                url: item.image_id ? `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg` : '', // Check if image_id exists
                alt_text: item.thumbnail_alt_text,
              },
              dimensions: item.dimensions,
            };
            setArtwork(fetchedArtwork);
          } catch (error) {
            console.error("Failed to fetch artwork details:", error);
            
          }
        };
      
        fetchArtworkDetail();
      }, [id]);
      

    
    return (<ArtworkDetails artwork={artwork}/>)
}

export default Artwork;