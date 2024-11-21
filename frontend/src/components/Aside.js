import React from "react";
import '../style/style.scss';

const Aside = () => {
        return (

            <aside className="col-5">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Lọc</h5>
                        <label htmlFor="Location">Tỉnh<span className="text-danger">*</span></label>
                        <select id="Location" name="Location" className="form-control mt-2">
                            <option value="hcm">Hồ Chí Minh</option>
                            <option value="hanoi">Ha Noi</option>
                            <option value="hcm">Hai Phong</option>
                            <option value="danang">Da Nang</option>
                        </select>
                    </div>
                </div>
                
            </aside>

        )
}

export default Aside;