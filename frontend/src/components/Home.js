import React, { useState, useEffect } from "react";
import AsideFilter from '../components/Aside/AsideFilter.js'
import AsideHoLiday from '../components/Aside/AsideHoliday.js'
import TopDestination from "./TopDestination";
import Blogs from "./Blog/Blogs.js";
import Aos from "aos";
import Content from "./Content";
import Header from "./Header/Header.js";
import Member from "./Member";
import ArticleAds from "./Article/ArticleAds.js";
import ReactTooltip from "react-tooltip";
import ArticleMap from "./Article/ArticleMap.js";
import useAppContext from "../hook/useAppContext.js";

function Home() {
    useEffect(() => {
        Aos.init()
    }, [])
    const { profile } = useAppContext()
    const [content, setContent] = useState("");
    const [name, setName] = useState("");
    return (
        <>
            <div className="pyro">
                <div className="before">
                </div>
                <div className="after">
                </div>
            </div>

            <div className="App-header">
                <Header />
            </div>

            <div className="container-fluid">
                <div className="container-home">
                    <AsideFilter />
                    <AsideHoLiday />
                    <ArticleMap setTooltipContent={setContent} setName={setName} />
                    <ReactTooltip className="tooltip" place="right"  >
                        {content && content !== "" ? (
                            <div style={{ textAlign: 'center' }}>
                                <h2 style={{ margin: '0 auto' }}>{name}</h2>
                                <img src={content} width="300px" height="200px" alt="" />
                            </div>
                        ) : null}
                        {/* {filteredImages.map((image, index) => (
                        <img key={index} src={image.default} alt={`image-${index}`} />
                    ))} */}
                    </ReactTooltip>
                    <ArticleAds />
                </div>
            </div>
            <section className="destination">
                <TopDestination />
                <Blogs />
            </section>
            <section className="content" data-aos="fade-left"
                data-aos-offset="500">
                <Content />
            </section>
            <section className="testimonial" data-aos="zoom-out-up">
                <Member />
            </section>
        </>
    )

}
export default Home;