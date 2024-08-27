import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, Link, Navigate } from "react-router-dom";
import Details from './Details';
import { useSelector, useDispatch } from 'react-redux'
import { setId } from '../redux/movieid/idSlice';
import { addFav } from '../redux/favorites/favSlice'
import {setType} from '../redux/type/typeSlice'


const Moviecard = ({ poster, title, content_type, desc, date, genre, background, Id }) => {

    const dispatch = useDispatch()

    const id = useSelector((state) => state.id.value)
    const type = useSelector((state) => state.type.value)
    

    const navigate = useNavigate()

    const handleDetail = () => {
        dispatch(setType(content_type))
        dispatch(setId(Id))
        navigate("/details")
    }

    const [animation, setanimation] = useState(false)

    return (
        <>
            
                {/* <div  className=' h-66 '>
                <div className=' py-2 md:w-44 w-36'>
                    <img className='w-44 h-60 ' src={poster} alt='poster' /> */}
                {/* <div className=' absolute '>
                        <button className=' bg-red-600 top-0 left-0'>press</button>
                    </div> */}
                {/* <div className=' flex justify-between items-center px-2 py-2 text-white'>
                        <div className=' text-ellipsis  '>
                            <div className=' text-white h-5 text-ellipsis overflow-hidden  my-1 ' >{title}</div>
                            
                        </div>
                    </div>
                </div>
            </div> */}
            
            <div onClick={handleDetail} onMouseOver={() => { setanimation(true) }} onMouseLeave={() => { setanimation(false) }} className=' h-66 w-fit bg-[#111111] '>
                <div className=' md:w-44 w-36 relative hover:opacity-80 hover:cursor-pointer'>
                    {animation &&
                        <div className=' absolute  top-[45%] left-[48%]'>
                            <img className=' w-6 h-6' src='./playbutton.svg' />
                        </div>}
                    <img className='w-44 h-60 ' src={poster} alt='poster' />
                    {/* <div className=' absolute '>
                        <button className=' bg-red-600 top-0 left-0'>press</button>
                    </div> */}
                    <div className=' flex  justify-center items-center px-2 py-1 text-white'>
                        <div className=' text-ellipsis'>
                            <div className=' text-white text-[14px] h-5 text-ellipsis overflow-hidden  my-1 font-semibold '>{title}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Moviecard