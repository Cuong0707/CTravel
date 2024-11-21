
import React, { useState, memo } from "react";
// import '../style/style.scss'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import vnTopo from '../../geo_data/map.geojson'
//import images from '../assets/images/FeaturedImage/';
//import addressApi from '../api/address.api'
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,

} from 'react-simple-maps';

const ArticleMap = ({ setTooltipContent, setName }) => {
    //const [content, setContent] = useState("");
    const [position, setPosition] = useState({ coordinates: [104, 16], zoom: 1 });
    const navigate = useNavigate()
    // const handleSearch = (event) => {
    //     event.preventDefault()
    //     navigate({
    //         pathname: '/HotelList',
    //         search: createSearchParams({ id: existed.provinceID.toString() }).toString()
    //     })
    // }
    const handleZoomEnd = () => {
        // Không cho phép zoom bằng cách đặt lại giá trị zoom
        setPosition((prevPosition) => ({
          ...prevPosition,
          zoom: 1,
        }));
      };
    return (
        <article className="col-6">
            <div className="map">
                <ComposableMap data-tip=""
                    projection="geoMercator"
                    projectionConfig={{
                        scale: 2000,
                        center: [109, 12] // coordinate of VietNam [long, lat]
                    }}
                    style={{
                        width: "100%",
                        height: "auto"
                    }}
                >
                    {/* center={[104, 17]} */}

                    <ZoomableGroup center={position.coordinates} maxZoom={1} zoom={position.zoom} onZoomEnd={handleZoomEnd} >
                        {/* {vietnam.map((geoUrl) => (  */}
                        <Geographies /*key={geoUrl} */ geography={vnTopo}>
                            {({ geographies }) =>
                                geographies.map((geo) => (

                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onMouseEnter={() => {
                                            setTooltipContent(geo.properties.IMG);
                                            setName(geo.properties.name);
                                        }}
                                        onMouseLeave={() => {
                                            setTooltipContent("");
                                        }}
                                        onClick={()=>{
                                            navigate({
                                                pathname: '/HotelList',
                                                search: createSearchParams({ id: geo.properties.ProvinceID.toString() }).toString()
                                            })
                                        }}
                                        style={{
                                            default: {
                                                fill: geo.properties.color,
                                                stroke: '#212529',
                                                strokeWidth: 0.01,
                                                outline: 'none',
                                            },
                                            hover: {
                                                fill: '#e6dfd9',
                                                stroke: '#212529',
                                                strokeWidth: 0.01,
                                                outline: 'none',
                                            },
                                        }}
                                    />
                                ))
                            }
                        </Geographies>

                        {/* <Markers>
                            <Marker />
                        </Markers>
                        <Lines>
                            <Line />
                        </Lines>
                        <Annotation /> */}


                        {/* ))} */}
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        </article>
    )
}



export default memo(ArticleMap);