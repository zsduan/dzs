/*
 * @Author: zs.duan
 * @Date: 2021-08-06 13:35:35
 * @LastEditTime: 2022-03-03 11:30:33
 * @LastEditors: zs.duan
 * @Description: In User Settings Edit
 * @FilePath: \blog_show\src\components\banner\banner.js
 */
// Import Swiper React components
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "./style.css";
import React from "react";

SwiperCore.use([Autoplay]);
class swiper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerList: [],
      itemList: [],
    };
  }

  componentDidMount() {
    
  }
  
  render() {
    return (
      <div className="swiper-wrop">
        {this.props.bannerList && !this.props.bannerTitle ? (
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            autoplay={true}
            loop={true}
            delay="5000"
          >
            {this.props.bannerList.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  {
                    <a href={`${item.path ? item.path:''}`} className="slider">
                      {item.is_text ? (
                        <div className="title">
                          {item.list.map((itm, idx) => {
                            return <div key={idx}>{itm}</div>;
                          })}
                        </div>
                      ) : (
                        <div className="img-box">
                          <img src={item.ImgUrl} alt={item.title}></img>
                        </div>
                      )}
                      <div className="watermark">@zd.duan</div>
                    </a>
                  }
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          ""
        )}
        {JSON.stringify(this.props.bannerList) === "[]" && !this.props.bannerTitle ? (
          <div className="slider">
            <div>欢迎来到我的博客</div>
            <div className="watermark">@zd.duan</div>
          </div>
        ) : (
          ""
        )}
        {this.props.bannerTitle ? (
          <div className="slider">
            <div>{this.props.bannerTitle}</div>
            <div className="watermark">@zd.duan</div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default swiper;
