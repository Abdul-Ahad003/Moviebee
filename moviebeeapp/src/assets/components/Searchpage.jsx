import React from 'react'
import { useState, useEffect } from 'react'
import Moviecard from './Moviecard'
import Showcard from './Showcard'
import Navbar from './Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { setSearch } from '../redux/search/searchSlice'
import FadeLoader from "react-spinners/FadeLoader"

const Searchpage = () => {

  const searchval = useSelector((state) => state.searchval.value)
  const dispatch = useDispatch()



  const [searchresult, setsearchresult] = useState([])
  const [loading, setloading] = useState(false)

  const getdata = async () => {
    setloading(true)
    const url = `https://movies-api14.p.rapidapi.com/search?query=${searchval}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '824e999803msh00569934219e0cdp1eb9b1jsncf9e4db86c1f',
        'x-rapidapi-host': 'movies-api14.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result) {
        setloading(false)
        setsearchresult(result.contents)
      }


    } catch (error) {
      console.error(error);
    }
  }



  useEffect(() => {
    getdata()
  }, [searchval])



  return (
    <>
      <Navbar />
      <section className=' md:px-10 md:py-5 px-6 py-2.5 text-white'>
        {loading &&
          <div className='relative h-[90vh]'>
            <div className=' absolute md:top-1/2 md:left-1/2 top-[51vh] left-[42vw]'>
              <FadeLoader
                color="#8000ff"
                loading={loading}
                size={15}
              />
            </div>
          </div>
        }
        <div className=' py-4'>
          {loading == false && <div className=' flex flex-wrap items-center justify-center gap-4 py-6'>
            {searchresult.map((movie) => {
              return (
                <>
                  <div key={movie._id} className=' py-5 '>
                    {(Object.keys(movie).includes('release_date')) && <Moviecard poster={movie.poster_path} title={movie.original_title} content_type={movie.contentType} desc={movie.overview} genre={movie.genres} date={movie.release_date} background={movie.backdrop_path} Id={movie._id} />}
                    {(Object.keys(movie).includes('first_aired')) && <Showcard poster={movie.poster_path} title={movie.original_title} content_type={movie.contentType} desc={movie.overview} genre={movie.genres} date={movie.first_aired} background={movie.backdrop_path} Id={movie._id} />}
                  </div>
                </>
              )
            })}
          </div>}
        </div>
      </section>
    </>
  )
}

export default Searchpage