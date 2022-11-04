import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAPIMap } from '../../redux/Reducers/productReducer';

export default function Map() {
    const { arrMap } = useSelector(state => state.productReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const action = getAPIMap();
        dispatch(action);
    }, [])

    console.log(arrMap)

    return (
        <div className='map'>
            <div className="container">
                <h3>The Shoe App</h3>
                <p>Nguyễn Hữu Tài - Bootcamp33</p>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Chi Nhánh 1</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Chi Nhánh 2</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Chi Nhánh 3</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="row">
                            <div className="col-6">
                                <h2>Store: {arrMap[0]?.name}</h2>
                                <p>Address: {arrMap[0]?.description}</p>
                                <img src={arrMap[0]?.image} className="w-100" alt="" />
                            </div>
                            <div className="col-6">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5171632938177!2d106.66740401531622!3d10.771645962226133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eddcd6f0e17%3A0x74de53608d69f206!2zMzc5IFPGsCBW4bqhbiBI4bqhbmgsIFBoxrDhu51uZyAxMiwgUXXhuq1uIDEwLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1667377867517!5m2!1svi!2s" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="row">
                            <div className="col-6">
                                <h2>Store: {arrMap[1]?.name}</h2>
                                <p>Address: {arrMap[1]?.description}</p>
                                <img src={arrMap[1]?.image} className="w-100" alt="" />
                            </div>
                            <div className="col-6">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5838916438634!2d106.66076442847411!3d10.766517537797203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ee632a70b45%3A0x5cb766dadcb8c43b!2zNTg5IMSQLiAzLzIsIFBoxrDhu51uZyA4LCBRdeG6rW4gMTAsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCA3MDAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1667378143897!5m2!1svi!2s" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                        <div className="row">
                            <div className="col-6">
                                <h2>Store: {arrMap[2]?.name}</h2>
                                <p>Address: {arrMap[2]?.description}</p>
                                <img src={arrMap[2]?.image} className="w-100" alt="" />
                            </div>
                            <div className="col-6">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.552030148179!2d106.66449301531618!3d10.768966562274867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ee788a2b2d7%3A0x7cec03e49b4f0268!2zNDYgxJAuIFRow6BuaCBUaMOhaSwgUGjGsOG7nW5nIDE0LCBRdeG6rW4gMTAsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1667378082792!5m2!1svi!2s" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
