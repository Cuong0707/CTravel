import React from 'react';
import '../../style/Page404/Page404.scss'
import { Link } from 'react-router-dom';


const Page404 = () => {
    return (
        <div className="page_404">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-10 col-sm-offset-1 text-center">
                            <div className="four_zero_four_bg">
                            </div>

                            <div className="contant_box_404">
                                <h3 className="h2">Tính năng này chúng tôi hiện đang phát triển</h3>
                                <p>Vui lòng quay lại sau!</p>
                                <Link to="/" className="link_404">
                                    Quay lại trang chủ
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page404;
