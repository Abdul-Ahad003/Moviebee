import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addFav } from '../redux/favorites/favSlice'
import Navbar from './Navbar';
import { Link } from 'react-scroll';
import FadeLoader from "react-spinners/FadeLoader"

const Details = () => {

    const dispatch = useDispatch()

    const id = useSelector((state) => state.id.value)
    const favlist = useSelector((state) => state.favlist.value)
    const type = useSelector((state) => state.type.value)



    const fav = useRef()
    const [loading, setloading] = useState(false)


    const [getmovie, setgetmovie] = useState([])
    const [backdrop, setbackdrop] = useState('')
    const [moviename, setmoviename] = useState('')
    const [release, setrelease] = useState('')
    const [genre, setgenre] = useState([])
    const [trailer, settrailer] = useState('')
    const [desc, setdesc] = useState('')
    const [votes, setvotes] = useState('')
    const [rating, setrating] = useState('')
    const [movieform, setmovieform] = useState({})
    const [isfav, setisfav] = useState(false)


    const getmoviebyid = async () => {
        setloading(true)
        const url = `https://movies-api14.p.rapidapi.com/${type}/${id}`;
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
                setgetmovie(result)

                if (type == 'show') {
                    const { show } = result
                    const { backdrop_path, poster_path, genres, title, overview, first_aired, vote_count, vote_average, youtube_trailer, _id } = show
                    const genre_arr = genres
                    setbackdrop(backdrop_path)
                    settrailer(convertToEmbed(youtube_trailer))
                    setvotes(vote_count)
                    setrating(vote_average)
                    setdesc(overview)
                    setmoviename(title)
                    setrelease(first_aired)
                    setgenre(genre_arr)
                    setmovieform( { 'poster_path': poster_path, '_id': _id, 'title': title, 'first_aired': first_aired, 'contentType': 'show' } )
                    
                }
                else {
                    const { movie } = result
                    const { backdrop_path, poster_path, genres, title, overview, release_date, vote_count, vote_average, youtube_trailer, _id } = movie
                    const genre_arr = genres
                    setbackdrop(backdrop_path)
                    settrailer(convertToEmbed(youtube_trailer))
                    setvotes(vote_count)
                    setrating(vote_average)
                    setdesc(overview)
                    setmoviename(title)
                    setrelease(release_date)
                    setgenre(genre_arr)
                    setmovieform( { 'poster_path': poster_path, '_id': _id, 'title': title, 'release_date': release_date, 'contentType': 'movie' } )
                }
            }


        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getmoviebyid()
    }, [])

    const handleFavorites = () => {
        if (checkFavorites() == false){
            fav.current.src = './fav1.svg'
            dispatch(addFav(movieform))
        }
    }

    
    const img = ['./fav1.svg','./fav2.svg']

    const checkFavorites = () => {

        let b = false

        if (favlist.lenght != 0){
            favlist.map(i => {
                
                if (i._id === id){
                    setisfav(true)
                    b = true
                }
            })
        }
        return b
    }

    const convertToEmbed = (url) => {
        const videoIdMatch = url.match(/[?&]v=([^&#]*)/);
        if (videoIdMatch && videoIdMatch[1]) {
            const videoId = videoIdMatch[1];
            return `https://www.youtube.com/embed/${videoId}`;
        } else {
            return 'Invalid YouTube URL';
        }
    }

    return (
        <>
            <Navbar />

            <section className=' md:px-10 md:pb-4 px-4 pb-3 '>
                {loading &&
                    <div className='relative h-[90vh]'>
                        <div className=' absolute md:top-1/2 md:left-1/2 top-[45vh] left-[45%]'>
                            <FadeLoader
                                color="#8000ff"
                                loading={loading}
                                size={15}
                            />
                        </div>
                    </div>
                }
                {loading == false &&
                    <div className="modal-box text-white">
                        <div className=' relative md:max-w-[86vw] max-w-[95vw] mx-auto mt-1.5'>
                            <div className=' bg-black absolute md:w-[86vw] md:h-[80vh] h-80 mx-auto w-[95vw] opacity-30 '></div>
                            <div className=' absolute top-[56%]  left-[5%] z-20  py-1'>
                                <span className=' font-Ops md:text-[28px] text-[20px]'>{moviename}</span>
                            </div>
                            <div className=' absolute top-[67%]  left-[5%] flex items-center gap-2 z-20 py-1'>
                                {genre.map((item,index) => {
                                    return (
                                        <>
                                            <div key={index} className=' outline-none  font-semibold bg-gray-700   opacity-90 rounded-[2px] py-[1px] px-[1px] md:text-[13px] text-[9px]' >{item}</div>
                                        </>
                                    )
                                })}
                            </div>

                            <Link to='trailer' offset={-70} activeClass="active" smooth={true} duration={500}><div className=' hover:cursor-pointer absolute md:top-[75%] top-[77%] left-[5%] flex items-center gap-3 py-1'>
                                <div className=' bg-white rounded-full flex justify-center items-center w-7 h-7 outline-none'>
                                    <img className=' md:w-10 md:h-10 w-8 h-8' src='play.svg' alt='play' />
                                </div>
                                <div><span className=' md:text-[22px]  text-[18px] font-semibold'>Watch trailer</span></div>
                            </div></Link>

                            <div className=''><img src={backdrop} className=' md:w-[86vw] md:h-[77vh] h-80 mx-auto w-[95vw] ' /></div>
                        </div>
                        <div className=' pt-6 md:px-10 font-abee'>
                            <div className=" flex items-center justify-between ">
                                <div className=' w-[90%]'><span className='font-semibold md:text-[30px] text-[22px] text-[#8000ff] '>{moviename}</span></div>
                                <div onClick={handleFavorites}> <img ref={fav} className=' w-5 h-5' src='./fav2.svg' alt='fav' /> </div>
                            </div>
                            <div className=' flex flex-col  gap-1'>
                                <p className='py-4 md:text-[18px] text-[15px]'>{desc}</p>
                            </div>
                            <div className='  flex  items-center  gap-2 py-1'>
                                {type == 'movie' && <span className=' font-semibold'>Release Date:</span>}
                                {type == 'show' && <span className=' font-semibold'>First Aired:</span>}
                                <span>{release}</span>
                            </div>
                            <div className='  flex  items-center  gap-2 py-1'>
                                <span className=' font-semibold '>Genre:</span>
                                <span>{genre.join(",")}</span>
                            </div>
                            <div className='  flex  items-center  gap-2 py-1'>
                                <span className=' font-semibold '>Ratings:</span>
                                <span>{rating}</span>
                            </div>
                            <div className='  flex  items-center  gap-2 py-1'>
                                <span className=' font-semibold '>Votes:</span>
                                <span>{votes}</span>
                            </div>
                        </div>
                        <div>
                            <div className=' mt-4 py-2.5 md:px-12'>
                                <span className=' md:text-[30px] text-[22px] font-semibold  text-[#8000ff]'>Trailer</span>
                            </div>
                            <div name='trailer' className='md:max-w-[92vw] mx-auto my-2'>
                                <iframe src={trailer} className=' md:w-[86vw] md:h-[77vh]  w-[92vw] h-72 mx-auto  ' allowFullScreen title="description"></iframe>
                            </div>
                        </div>
                    </div>}
            </section>
        </>
    )
}

export default Details