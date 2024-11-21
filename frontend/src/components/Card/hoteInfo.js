import React, { useState } from "react";
import { EyeFill, GeoAltFill } from "react-bootstrap-icons";
import '../../style/Search.scss'
const hotelInfo = (searchResults) => {

  return (
    <div className="container-search">
      <div className="mt-5">
        <p className="fw-bold h3">Các kết quả liên quan: </p>
      </div>
      {searchResults.searchResults.map((hotel, index) => (
        <div key={index} className="card-search">
          <div className="card mb-3 border-0">
            <div className="row g-0">
              <div className="col-md-3 img-search">
                <img src={hotel.photosOfHotels[0].image} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-9">
                <div className="card-body row">
                  <h5 className="card-title fw-bold col-10">{hotel.nameOfHotel}</h5>
                  <p className="card-text col-2 text-info text-end fw-bold"><EyeFill /> {hotel.view}</p>
                  <p className="card-text fw-bold">Mô tả: {hotel.description !== 'null' ? hotel.description : "Không có mô tả"} </p>
                  <p className="card-text">
                    <span className="badge bg-warning text-dark text-secondary">Excluded</span>
                    <span className="badge bg-warning text-dark text-secondary ms-2">{hotel.typeOfHotel}</span>
                    <span className="badge bg-warning text-dark text-secondary ms-2">{hotel.standard}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

};

export default hotelInfo;