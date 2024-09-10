import React from 'react'
import { useState, useEffect } from 'react'
import FadeLoader from "react-spinners/FadeLoader";
import Showcard from './Showcard';


const Shows = () => {

  const [showsdata, setshowsdata] = useState([])
  const [loading, setloading] = useState(false)


  const getdata = async () => {
    setloading(true)
    const url = `https://movies-api14.p.rapidapi.com/shows`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'ac38813551msh32ad8e47f370f61p1e77c5jsnf56648b88da4',
        'x-rapidapi-host': 'movies-api14.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result) {
        setloading(false)
        const { movies } = result
        setshowsdata(movies)
      }

    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getdata()
  }, [])


  return (
    <>
      <section className=' md:px-10 px-2 md:py-5 py-3  text-white'>
        {loading && <div className='relative h-[90vh]'>
          <div className=' absolute md:top-1/2 md:left-1/2 top-[45vh] left-[45%]'>
            <FadeLoader
              color="#8000ff"
              loading={loading}
              size={15}
            />
          </div>
        </div>}

        {loading == false && <div className=' py-4'>
          <div className=' flex flex-wrap items-center justify-center gap-4 py-6'>
            {showsdata && showsdata.map((movie) => {
              return (
                <>
                  <div key={movie._id} className=' py-5 '>
                    <Showcard poster={movie.poster_path} title={movie.original_title} content_type={movie.contentType} desc={movie.overview} genre={movie.genres} date={movie.first_aired} Id={movie._id} />
                  </div>
                </>
              )
            })}
          </div>
        </div>}
      </section>
    </>
  )
}

export default Shows