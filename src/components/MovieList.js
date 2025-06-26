import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectMovie, setSelectMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //tmdb info
  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjZjYjBmYTlhN2FhN2NhMmQ5ZDliNjkxMDA2ODU1MyIsIm5iZiI6MTc1MDgxMzA4NS42OTYsInN1YiI6IjY4NWI0OTlkN2E0Nzg2OTVkNzk0ZTA5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JXFAVnq22mEnt5nFwpAJE3HdRP-gzOG4CikQVUpFJOw";
  const URL = `https://api.themoviedb.org/3/movie/popular?`;
  //비동기 요청
  const fetchMovies = async () => {
    try {
      const response = await axios.get(URL, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        params: {
          language: "ko-KR",
          region: "KR",
          page: 1,
        },
      });
      const movie = response.data.results.slice(0, 10);
      if (movie) {
        setIsLoading(false);
        setMovies(movie);
      } else {
        setError("테이터를 가져오지 못했습니다.");
      }
    } catch (error) {
      setError("에러 발생. 데이터 패치를 하지 못하였음");
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetchMovies();
  }, []);

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className={"btn-next"} onClick={onClick}>
        <MdArrowForwardIos />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className={"btn-prev"} onClick={onClick}>
        <MdArrowBackIosNew />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      }
      // {
      //   breakpoint: 960,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 2,
      //     initialSlide: 2
      //   }
      // },
      // {
      //   breakpoint: 600,
      //   settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1,
      //   }
      // }
    ]
  };

  return (
    <div className="movie-list">
      <h2>지금 뜨는 콘텐츠</h2>
      <Slider {...settings}>
        {movies.map((item, idx) => {
          return (
            <div
              key={idx}
              className="movie-card"
              onClick={() => {
                setSelectMovie(item);
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
              />
              <p>{idx + 1}</p>
            </div>
          );
        })}
      </Slider>
      {/* 상세 설명 팝업 */}
      {selectMovie && (
        <div className="movie-popup">
          <button
            onClick={() => {
              setSelectMovie(null);
            }}
          >
            ×
          </button>
          {console.log(selectMovie)}
          <img
            src={`https://image.tmdb.org/t/p/w500${selectMovie.backdrop_path}`}
          />
          <div className="dark"></div>
          <h3>{selectMovie.title}</h3>
          <p>{selectMovie.release_date}</p>
          <p>{selectMovie.overview}</p>
        </div>
      )}
    </div>
  );
};

export default MovieList;
