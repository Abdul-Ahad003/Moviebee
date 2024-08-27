import React from 'react'
import { useState, useEffect } from 'react'
import Moviecard from './Moviecard'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Movies from './Movies';
import Shows from './Shows';
import Favorites from './Favorites';
import Showcard from './Showcard';
import FadeLoader from "react-spinners/FadeLoader";

const Home = ({ showcategory }) => {

    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)

    var settings = {
        dots: true,
        infinite: false,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 3,
        initialSlide: 0,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: "1024px",
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: "800px",
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,

                }
            },
            {
                breakpoint: "480px",
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const getdata = async () => {
        setloading(true)
        const url = 'https://movies-api14.p.rapidapi.com/home';
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
                setdata(result)
                console.log(result)
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
            <section className=' movies md:px-10 md:py-5 px-5 py-2.5 text-white'>
                {(showcategory == "Home" && loading) && <div className='relative h-[90vh]'>
                    <div className=' absolute md:top-1/2 md:left-1/2 top-[47vh] left-[45vw]'>
                        <FadeLoader
                            color="#8000ff"
                            loading={loading}
                            size={15}
                        />
                    </div>
                </div>}
                {(showcategory == "Home" && loading == false) &&
                    <div className=' py-4'>
                        {data.length != 0 && data.map((item,index) => {
                            return (
                                <>
                                    <div  key={index} className=' flex flex-col  gap-8 py-4'>
                                        <div className=' py-2 bg-[#111111] font-Ops'><span className='md:text-[23px] text-[18px] text-[#8000ff] md:px-3 px-1.5' >{item.title}</span></div>

                                        <Slider {...settings}>

                                            {item.movies.map((movie) => {
                                                return (
                                                    <>
                                                        <div className=' flex  justify-center py-5 ' key={movie._id}>
                                                            {(Object.keys(movie).includes('release_date')) && <Moviecard poster={movie.poster_path} title={movie.original_title} content_type={movie.contentType} desc={movie.overview} genre={movie.genres} date={movie.release_date} background={movie.backdrop_path} Id={movie._id} />}
                                                            {(Object.keys(movie).includes('first_aired')) && <Showcard poster={movie.poster_path} title={movie.original_title} content_type={movie.contentType} desc={movie.overview} genre={movie.genres} date={movie.first_aired} background={movie.backdrop_path} Id={movie._id} />}
                                                        </div>
                                                    </>
                                                )
                                            })}

                                        </Slider>
                                    </div>
                                </>
                            )
                        })}
                    </div>}

                {showcategory == "Movies" && <Movies />}

                {showcategory == "Shows" && <Shows />}

                {showcategory == "Favorites" && <Favorites />}

            </section>
        </>
    )
}

export default Home