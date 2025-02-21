import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContentStore } from '../../store/content';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const WatchPage = () => {
    const {id} = useParams();
    const [trailers, setTrailer] = useState([]);
  	const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState({});
    const [similarContent, setSimilarContent] = useState([])
    const {contentType} = useContentStore();

    useEffect(()=> {
      const getTrailer = async()=> {
        try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailer(res.data.trailers);
        }catch(error) {
          if(error.message.includes("404")) {
            setTrailer([])
          }
        }
      };
      getTrailer();
    }, [contentType, id]);
    useEffect(()=> {
      const getSimilarContent = async()=> {
        try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
        }catch(error) {
          if(error.message.includes("404")) {
            setSimilarContent([])
          }
        }
      };
      getSimilarContent();
    }, [contentType, id]);    
    
    useEffect(()=> {
      const getContentDetails = async()=> {
        try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.content);
        }catch(error) {
          if(error.message.includes("404")) {
            setContent(null)
          }
        }
      };

      getContentDetails();
    }, [contentType, id]);

    // console.log("trailers",trailers)
    // console.log("similarContent",similarContent)
    // console.log("content",content)
    
    const handleNext = () => {
      if (currentTrailerIdx < trailers.length - 1) setCurrentTrailerIdx(currentTrailerIdx + 1);
    };
    const handlePrev = () => {
      if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
    };
  return (
    <div className='bg-black min-h-screen text-white'>
      <div className='mx-auto container px-4 py-8 h-full'>
        <Navbar/>

          {trailers.length > 0 && (
            <div className='flex justify-between items-center mb-4'>
             	<button
							className={`
							bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
								currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed " : ""
							}}
							`}
							disabled={currentTrailerIdx === 0}
							
						>
							<ChevronLeft size={24} onClick={handlePrev}/>
						</button>
              <button
							className={`
							bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
								currentTrailerIdx === trailers.length - 1 ? "opacity-50 cursor-not-allowed " : ""
							}}
							`}
							disabled={currentTrailerIdx === trailers.length - 1}
						
						>
							<ChevronRight size={24} onClick={handleNext}/>
              
						</button>
              </div>
          )}
        </div>
      </div>
    
  )
}