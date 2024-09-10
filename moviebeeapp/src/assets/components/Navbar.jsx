import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setSearch } from '../redux/search/searchSlice'


const Navbar = ({ showcategory, setshowcategory }) => {

  const [val, setval] = useState('')
  const [menubar, setmenubar] = useState(false)
  const [showsearchbar, setshowsearchbar] = useState(false)

  const searchval = useSelector((state) => state.searchval.value)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSearch = () => {
    dispatch(setSearch(val))
    navigate('/search')
  }



  return (
    <header className=' sticky top-0 z-30 bg-black text-white'>
      <nav className=' flex items-center justify-between  md:py-2.5 md:px-20 pt-3 pb-1.5 px-2'>
        <Link to='/'><div className=' flex items-center gap-1'>
          <img src='./logo.svg' alt='search' className=' d:w-10 md:h-10 h-6 w-6' />
          <span className=' text-[#8000ff] md:text-[24px] text-[19px] font-Matemasie'>Movie Binge</span>
        </div>
        </Link>

        <div className=' text-white hidden md:flex items-center gap-3'>
          <Link to='/'><span className={` py-1.5 ${showcategory == 'Home' ? "border-b-[#8000ff] text-[#8000ff]" : " border-b-transparent text-white"} font-semibold font-Averia border-b-[3.5px] cursor-pointer `} onClick={() => { setshowcategory('Home') }}> Home</span></Link>
          <Link to='/'><span className={` py-1.5 ${showcategory == 'Movies' ? "border-b-[#8000ff] text-[#8000ff]" : " border-b-transparent text-white"} font-semibold font-Averia border-b-[3.5px] cursor-pointer `} onClick={() => { setshowcategory('Movies') }}>Movies</span></Link>
          <Link to='/'><span className={` py-1.5 ${showcategory == 'Shows' ? "border-b-[#8000ff] text-[#8000ff]" : " border-b-transparent text-white"} font-semibold font-Averia border-b-[3.5px] cursor-pointer `} onClick={() => { setshowcategory('Shows') }}>TV Shows</span></Link>
          <Link to='/'><span className={` py-1.5 ${showcategory == 'Favorites' ? "border-b-[#8000ff] text-[#8000ff]" : " border-b-transparent text-white"} font-semibold font-Averia border-b-[3.5px] cursor-pointer `} onClick={() => { setshowcategory('Favorites') }}>Favroites</span></Link>
        </div>
        <div className=' relative hidden md:flex items-center'>
          <div className=' absolute left-2 top-2.5'>
            <img src='./search.svg' alt='search' className=' w-6 h-6' />
          </div>
          <input onKeyDown={(e) => {
            if (e.key === "Enter")
              handleSearch();

          }} type='text' placeholder='Search..' onChange={(e) => { setval(e.target.value) }} value={val} className=' text-white bg-[#111212] rounded-3xl py-2.5 pl-10 w-[22vw] pr-9 outline-none border-none ' />
          <div className=' absolute right-2 top-2.5'>
            <img src='./filter.svg' alt='search' className=' w-6 h-6' />
          </div>
        </div>
        <div className='md:hidden flex items-center gap-3 '>
          <div onClick={() => { setshowsearchbar(!showsearchbar) }} className=''>
            <img src='./search.svg' className=' w-6 h-6' />
          </div>
          <div>
            <div className='relative z-40'>
              {menubar == true &&
                <div className=' fixed right-0 top-0 menu opacity-0 bg-black w-48 h-screen'>
                  <div onClick={() => { setmenubar(false) }} className='py-6 '>
                    <img className='  mx-3 my-3 absolute top-0 right-0 w-6 h-6' src='./close.svg' />
                  </div>
                  <ul className=' flex flex-col gap-4 px-8 text-[#8000ff]'>
                    <Link to='/'><li onClick={() => { setshowcategory('Home'); setmenubar(false) }} className='  cursor-pointer' >Home</li></Link>
                    <Link to='/'><li onClick={() => { setshowcategory('Movies'); setmenubar(false) }} className='  cursor-pointer'>Movies</li></Link>
                    <Link to='/'><li onClick={() => { setshowcategory('Shows'); setmenubar(false) }} className='  cursor-pointer'>Tv Shows</li></Link>
                    <Link to='/'><li onClick={() => { setshowcategory('Favorites'); setmenubar(false) }} className='  cursor-pointer'>Favorites</li></Link>
                  </ul>
                </div>}
            </div>
          </div>
          <div>
            <img src='./menu.svg' onClick={() => { setmenubar(true) }} className=' w-6 h-6 ' />
          </div>
        </div>

      </nav>

      {showsearchbar && <div className=' md:hidden w-full relative pb-[1.5px] px-2'>
        <input onKeyDown={(e) => {
          if (e.key === "Enter")
            handleSearch();

        }} type='text' placeholder='Search..' onChange={(e) => { setval(e.target.value) }} value={val} className=' text-white bg-[#111212] rounded-3xl py-1.5 pl-4  w-full pr-10 outline-none border-none ' />
        <div className=' absolute right-3 top-[7px]'>
          <img src='./filter.svg' alt='search' className=' w-5 h-5' />
        </div>
      </div>}

    </header>
  )
}

export default Navbar