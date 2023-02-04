import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import ReactStars from "react-stars";
import { useState } from "react";
import MainTitle from "./Main_title";
export default function CarouselComponent() {
  const [slider] = useState([
    {
      id: 1,
      star: 4,
      title: "Excellent App!",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius ea delectus pariatur, numquam aperiam dolore nam optio dolorem facilis itaque voluptatum recusandae deleniti minus animi, provident voluptates consectetur maiores quos.",
      img: "images/carousel/avatar1.png",
      name: "Jean Doe",
      jop: "App User",
    },
    {
      id: 2,
      star: 5,
      title: "Excellent App!",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius ea delectus pariatur, numquam aperiam dolore nam optio dolorem facilis itaque voluptatum recusandae deleniti minus animi, provident voluptates consectetur maiores quos.",
      img: "images/carousel/avatar2.png",
      name: "Jean Doe",
      jop: "App User",
    },
    {
      id: 3,
      star: 3,
      title: "Excellent App!",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius ea delectus pariatur, numquam aperiam dolore nam optio dolorem facilis itaque voluptatum recusandae deleniti minus animi, provident voluptates consectetur maiores quos.",
      img: "images/carousel/avatar3.png",
      name: "Jean Doe",
      jop: "App User",
    },
  ]);

  const options = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    slickPlay: true,
  };
  return (
    <div className="Testimonals py-5 ">
      <MainTitle name="Testimonals" styles="fs-2" />
      <Container className="text-center">
        <Slider {...options}>
          {slider.map((item) => {
            return (
              <div className="pt-5" key={item.id}>
                <div className="row align-items-center justify-content-center">
                  <div className="text-center col-lg-6">
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                    <img
                      src={item.img}
                      alt=""
                      width={100}
                      height={100}
                      className="mx-auto img-fluid mb-2 mt-2 rounded-5"
                    />
                    <span className="text-light">{item.name}</span>
                    <span className="text-light">{item.jop}</span>
                    <ReactStars
                      count={5}
                      value={item.star}
                      size={24}
                      emptyIcon={<i className="far fa-star"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                      edit={false}
                      className="d-flex justify-content-center w-100"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </Container>
    </div>
  );
}
