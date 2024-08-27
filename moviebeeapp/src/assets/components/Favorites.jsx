import React from 'react'
import { addFav,clearFav } from '../redux/favorites/favSlice'
import { useSelector, useDispatch } from 'react-redux'
import Moviecard from './Moviecard'
import Showcard from './Showcard'


const Favorites = () => {

  const favlist = useSelector((state) => state.favlist.value)
  const dispatch = useDispatch()

  const clearFavlist = () => { 
    dispatch(clearFav())
   }

  return (
    <>
      <section className=' px-10 py-5 text-white '>
          <div className=''>
            { favlist == 0 && <div className=' flex justify-center items-center'>
              No items to added to favorites
            </div>}

            <div className=' flex flex-wrap items-center justify-center gap-4 py-6'>
            { favlist != 0 && <div onClick={clearFavlist} className=' cursor-pointer w-full flex justify-end px-2 py-1  text-[#8000ff]'> <span className=' font-semibold'>Clear List</span> </div>}
            { favlist != 0 && favlist.map((movie, index) => {
              return (
                <>
                  <div className=' flex items-center py-5 ' key={index}>
                    {(Object.keys(movie).includes('release_date')) && <Moviecard poster={movie.poster_path} title={movie.title} content_type={movie.contentType} Id={movie._id} />}
                    {(Object.keys(movie).includes('first_aired')) && <Showcard poster={movie.poster_path} title={movie.title} content_type={movie.contentType} Id={movie._id} />}
                  </div>
                </>
              )
            })}
            </div>
            
            <div>
            </div>
          </div>

      </section>
    </>
  )
}

export default Favorites