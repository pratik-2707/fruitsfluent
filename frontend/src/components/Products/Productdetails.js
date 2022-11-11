import './Productdetails.css'
import Carousel from "react-material-ui-carousel";
import React, { useEffect } from 'react'
import Photo from '../../images/almonds.avif'
import Footer from '../layout/Footer/Footer';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useContext } from 'react';
import Notecontext from '../context/notecontext';


const Productdetails = () => {

    const [data,setdata] = useState({})

    let a = useContext(Notecontext)

    let id = useParams().id

    const show = async (e) =>{
        let fetchstring = "/products/all/" + id
        console.log("fetchstr" , fetchstring);
        const res =  await fetch(fetchstring, {
            method : "GET"  
        })
    
        const resdata = await res.json();
        setdata(resdata.data)  
        console.log(data);
    }

    useEffect(()=>{
        show();
    },[])

    const navigate = useNavigate();

    const addtocart = async (e) =>{
        console.log(a.name);
        let fetchstring = "/user/cart/addproduct/" + a.name + "/" + data._id 
        console.log("fetchstr" , fetchstring);
        // const res =  await fetch(fetchstring, {
        //     method : "GET"  
        // })
        // console.log(data._id);
        // navigate("/cart/") 
    }

    return (
        <>
           <div className="ProductDetails">
                <div>
                    <img src={data.imgsrc}
                        className="CarouselImage"
                    />
                </div>

                <div>
                    <div className="detailsBlock-1">
                        <h2>{data.productname}</h2>
                    </div>
                    <div className="detailsBlock-2">
                        <span className="detailsBlock-2-span">
                            {" "}
                            {/* (125 Reviews) */}
                        </span>
                    </div>
                    <div className="detailsBlock-3">
                        <h1>{data.price}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button >-</button>
                                <input readOnly type="number" />
                                <button >+</button>
                            </div>
                            <button onClick={addtocart}
                            >
                                Add to Cart
                            </button>
                        </div>

                        <p>
                            {}:
                            <b className="greenColor">
                                In Stock
                            </b>
                        </p>
                    </div>

                    <div className="detailsBlock-4">
                        Description : <p>{data.productname}</p>
                    </div>

                    {/* <button className="submitReview">
                        Submit Review
                    </button> */}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Productdetails