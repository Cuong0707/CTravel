import React from "react";
import '../../style/Main/style.scss';

class Aside extends React.Component {
    render() {

        return (

            <aside className="col-3">
                <div className="card shadow p-3 mb-5 bg-white rounded">
                    <div className="card-body">
                        <h5 className="card-title">Lọc</h5>
                        <label htmlFor="Location">Miền<span className="text-danger">*</span></label>
                        <select id="Location" name="Location" className="form-control mt-2">
                            <option value="bac">Miền Bắc</option>
                            <option value="trung">Miền Trung</option>
                            <option value="nam">Miền Nam</option>
                        </select>
                        <label className="mt-2" htmlFor="Location">Tỉnh<span className="text-danger">*</span></label>

                    </div>
                </div>
            </aside>

        )
    }
}

export default Aside;