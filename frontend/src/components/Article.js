import React, { useState, memo } from "react";
import '../style/style.scss'
import vnTopo from '../geo_data/map.geojson';
//import images from '../assets/images/FeaturedImage/';
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
  
} from 'react-simple-maps';
import "../assets/images/28.jpg";
//const vietnam = [vnTopo, hs, ts];

// function searchImages(images, query) {
//     // Tạo mảng kết quả
//     const results = [];
  
//     // Duyệt qua mảng hình ảnh
//     for (const image of images) {
//       // Kiểm tra xem tên hình ảnh có chứa từ khóa hay không
//       if (image.name.toLowerCase().includes(query.toLowerCase())) {
//         // Thêm hình ảnh vào mảng kết quả
//         results.push(image);
//       }
//     }
  
//     // Trả về mảng kết quả
//     return results;
//   }

const Article = ({ setTooltipContent, setName }) => {
    //const [content, setContent] = useState("");
    const [position, setPosition] = useState({ coordinates: [104, 17], zoom: 1 });
    
    return (
        <article className="col-7">
            <div className="map">
                <ComposableMap data-tip=""
                    projection="geoMercator"
                    projectionConfig={{
                        scale: 1000,
                        center: [105, 15] // coordinate of VietNam [long, lat]
                    }}
                    style={{
                        width: "100%",
                        height: "auto"
                    }}
                >
                    {/* center={[104, 17]} */}

                    <ZoomableGroup center={position.coordinates} maxZoom={10} zoom={position.zoom} >
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



export default memo(Article);