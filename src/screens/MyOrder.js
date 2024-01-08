import { useState,useEffect } from 'react';
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
export default function MyOrder() {
  
    const [orderData, setorderData] = useState("");

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/myOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>

                    {orderData !== {} ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {  //resverse is used to print recent order first
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>{/*we reached order_data in database*/}

                                                        {data = arrayData.Order_date}
                                                        <hr />{/*if order date exist in object of array of order_data in database then return date else return order data */}
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                {/*<img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />*/}
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        {/*<span className='m-1'>{data}</span>*/}
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : <div className='m-5 w-100 text-center fs-3'>
                                    <br></br>
                                    <h1>No orders yet</h1><br></br>
                                    <img src='https://cdn2.iconfinder.com/data/icons/food-delivery-crayons-vol-2/256/Not_Taking_Orders-512.png'/>
                                    </div>
                        )
                    }) : ""}
                </div>


            </div>

            <Footer />
        </>
    )
}