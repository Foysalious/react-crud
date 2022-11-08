import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Login from "./Login";
import { useNavigate } from "react-router";

const ProductDetails = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState("");
    const [description, setDescription] = useState("");
    const [productImage, setProductImage] = useState("");
    const [thumbNailImage, setthumbNailImage] = useState("");
    const [shortImage, setshortImageImage] = useState("");
    const [variant, setVariant] = useState([]);
    const [color, setColor] = useState([]);
    const [data, setData] = useState([]);
    const { slug } = useParams();
    const history = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('access_token') != null) {
            const api = process.env.REACT_APP_API_URL+"/api/products/" + slug
            axios
                .get(api, { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } })
                .then((res) => {
                    setData(res.data.product);
                });
        }
        else {
            console.log(1);
			history("/login")
		}
    }, []);
    return (
        <>
            <div className="d-flex justify-content-between m-2">
                <h2>Product Details</h2>
                <Link to="/read">
                    <button className="btn btn-primary">Show Data</button>
                </Link>
            </div>

            <div className="d-flex justify-content-between">
                <div>
                    <div>
                        <div className="mb-3">
                            <img src={data.product_image} width="500" height="400" />
                        </div>
                        <div className="d-flex">
                            <div className="mb-3">
                                <img src={data.thumbnail_image} width="100" height="100" />
                            </div>
                            <div className="mb-3">
                                <img src={data.short_image} width="100" height="100" />
                            </div>
                        </div>

                    </div>
                </div>

                <div>

                    <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Title</td>
                                <td>{data.title}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>{data.price}</td>
                            </tr>
                            <tr>
                                <td>Discounted Price</td>
                                <td>{data.discounted_price}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{data.description}</td>
                            </tr>
                            <tr>
                                <td>Variant</td>
                                <td>{data.variant}</td>
                            </tr>
                            <tr>
                                <td>Color</td>
                                <td>{data.color}</td>
                            </tr>
                        </tbody>
                    </table>


                </div>


            </div>






        </>
    );
};

export default ProductDetails;
