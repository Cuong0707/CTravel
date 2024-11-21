import { Link } from "react-router-dom";

function HeaderListRegion() {
    return <ul className="dropdown-menu " aria-labelledby="navbarDropdownMenuLink">
        <li>
            <Link className="dropdown-item h6">
                Miền Bắc &raquo;
            </Link>
            <ul className="dropdown-menu dropdown-submenu">
                <li>
                    <Link className="dropdown-item h6">Đồng Bằng Sông Hồng &raquo; </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                        <li>
                            <Link className="dropdown-item" to="#" value="24">Hà Nội <span className="badge rounded-pill bg-danger">Hot</span></Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="222">Bắc Ninh</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="226">Hà Nam</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="220">Hải Dương</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="221">Hưng Yên</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="225">Hải Phòng</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="228">Nam Định</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="229">Ninh Bình</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="227">Thái Bình</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="211">Vĩnh Phúc</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link className="dropdown-item h6">Tây Bắc Bộ &raquo; </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                        <li>
                            <Link className="dropdown-item" to="#" value="214">Lào Cai</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="216">Yên Bái</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#">Điện Biên</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#">Hòa Bình</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="213">Lai Châu</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="212">Sơn La</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link className="dropdown-item">Đông Bắc Bộ &raquo; </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                        <li>
                            <Link className="dropdown-item" to="#" value="219">Hà Giang</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="206">Cao Bằng</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="209">Bắc Kạn</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="205">Lạng Sơn</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="207">Tuyên Quang</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="208">Thái Nguyên</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="210">Phú Thọ</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="204">Bắc Giang</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="203">Quảng Ninh</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
        <li>
            <Link className="dropdown-item h6">
                Miền Nam &raquo;
            </Link>
            <ul className="dropdown-menu dropdown-submenu">
                <li>
                    <Link className="dropdown-item h6">Đông Nam Bộ &raquo; </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                        <li>
                            <Link className="dropdown-item" to="#" value="28">Hồ Chí Minh <span className="badge rounded-pill bg-danger">Hot</span></Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="271">Bình Phước</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="274">Bình Dương</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="251">Đồng Nai</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="276">Tây Ninh</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="254">Bà Rịa-Vũng Tàu</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link className="dropdown-item h6">Tây Nam Bộ &raquo; </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                        <li>
                            <Link className="dropdown-item" to="#" value="292">Cần Thơ</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="272">Long An</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="277">Đồng Tháp</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="273">Tiền Giang</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="296">An Giang</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="275">Bến Tre</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="270">Vĩnh Long</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="294">Trà Vinh</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="293">Hậu Giang</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="297">Kiên Giang</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="299">Sóc Trăng</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="291">Bạc Liêu</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="290">Cà Mau</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link className="dropdown-item">Đông Bắc Bộ &raquo; </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                        <li>
                            <Link className="dropdown-item" to="#" value="219">Hà Giang</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="206">Cao Bằng</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="209">Bắc Kạn</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="205">Lạng Sơn</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="207">Tuyên Quang</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="208">Thái Nguyên</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="210">Phú Thọ</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="204">Bắc Giang</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="232">Quảng Ninh</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
        <li>
            <Link className="dropdown-item h6">
                Miền Trung &raquo;
            </Link>
            <ul className="dropdown-menu dropdown-submenu">
                <li>
                    <Link className="dropdown-item h6">Bắc Trung Bộ &raquo; </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                        <li>
                            <Link className="dropdown-item" to="#" value="234">Thừa Thiên-Huế <span className="badge rounded-pill bg-danger">Hot</span></Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="237">Thanh Hoá</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="238">Nghệ An</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="239">Hà Tĩnh</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="232">Quảng Bình</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="233">Quảng Trị</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link className="dropdown-item h6">Nam Trung Bộ &raquo; </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                        <li>
                            <Link className="dropdown-item" to="#" value="236">Đà Nẵng <span className="badge rounded-pill bg-danger">Hot</span></Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="235">Quảng Nam</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="255">Quảng Ngãi</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="256">Bình Định</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="257">Phú Yên</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="258">Khánh Hoà</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="259">Ninh Thuận</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="252">Bình Thuận</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link className="dropdown-item">Tây Nguyên &raquo; </Link>
                    <ul className="dropdown-menu dropdown-submenu">
                        <li>
                            <Link className="dropdown-item" to="#" value="260">Kon Tum</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="269">Gia Lai</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="262">Đắk Lắk</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="261">Đắc Nông</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="#" value="263">Lâm Đồng</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>;
}

export default HeaderListRegion;