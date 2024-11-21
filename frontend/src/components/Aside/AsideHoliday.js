import React from "react";

const AsideHoliday = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // Tháng tính từ 0

    let imageSrc;
    let imageAlt;
    let imageTitle;

    if (month === 1) {
        // Nếu là tháng 1 (Tết Nguyên đán)
        imageSrc = "images/thantai.png";
        imageAlt = "Tết Nguyên đán";
        imageTitle = "Tết Nguyên đán";
    } else if (month === 2) {
        // Nếu là tháng 2 (Lễ Valentine)
        imageSrc = "images/valentine.png";
        imageAlt = "Lễ Valentine";
        imageTitle = "Lễ Valentine";
    } else if (month === 9) {
        // Nếu là tháng 9 (Ngày Quốc khánh)
        imageSrc = "images/independence.png";
        imageAlt = "Ngày Quốc khánh";
        imageTitle = "Ngày Quốc khánh";
    } else if (month === 11) {
        imageSrc = "images/blackfriday.png";
        imageAlt = "Ngày Hội";
        imageTitle = "Ngày Hội";
    } else if (month === 12) {
        // Nếu là tháng 12 (Ngày Giáng Sinh)
        imageSrc = "images/noel.png";
        imageAlt = "Lễ Giáng Sinh";
        imageTitle = "Lễ Giáng Sinh";
    } else {
        // Trường hợp còn lại
        // imageSrc = "images/blackfriday.png";
        // imageAlt = "Ngày Hội";
        // imageTitle = "Ngày Hội";
    }

    return (
        <div className="container-holiday">
            <img src={imageSrc} className="thantai" alt={imageAlt} title={imageTitle} />
        </div>
    );
};

export default AsideHoliday;
