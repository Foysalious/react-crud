import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Create = () => {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [discountedPrice, setDiscountedPrice] = useState("");
	const [description, setDescription] = useState("");
	const [productImage, setProductImage] = useState("");
	const [thumbNailImage, setthumbNailImage] = useState("");
	const [shortImage, setshortImageImage] = useState("");
	const [variant, setVariant] = useState([]);
	const [color, setColor] = useState([]);
	const history = useNavigate();
	useEffect(() => {
		if (localStorage.getItem("access_token") == null) {
			history("/login");
		}
	}, []);
	const handleSubmit = (e) => {

		e.preventDefault();
		const data = { title: title, price: price, discounted_price: discountedPrice, description: description, variant: JSON.stringify( variant), color: JSON.stringify(color), product_image: productImage, thumbnail_image: thumbNailImage, short_image: shortImage }
		console.log(data);
		axios
			.post("http://127.0.0.1:8000/api/products", data, {
				headers: {
					"Authorization": `Bearer ${localStorage.getItem('access_token')}`,
				}
			})
			.then(() => {
				history("/read");
			});
	};

	const setVariantArray = (e) => {
		variant.push(e)
	};

	const setColorArray = (e) => {
		color.push(e)
	};
	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file)
			fileReader.onload = () => {
				return resolve(fileReader.result);
			}
			fileReader.onerror = (error) => {
				console.log(1);
				reject(error);
			}
		})
	}
	async function buffer(e) {
		const file = e.target.files[0]
		const base64 = await convertBase64(file)
		setProductImage(base64)

	}

	async function thumbNailImageBuffer(e) {
		const file = e.target.files[0]
		const base64 = await convertBase64(file)
		setthumbNailImage(base64)

	}

	async function shortImageBuffer(e) {
		const file = e.target.files[0]
		const base64 = await convertBase64(file)
		setshortImageImage(base64)
		console.log(shortImage);
	}

	return (
		<>
			<div className="d-flex justify-content-between m-2">
				<h2>Create Product</h2>
				<Link to="/read">
					<button className="btn btn-primary">Show Data</button>
				</Link>
			</div>
			<form>
				<div className="mb-3">
					<label className="form-label">Title</label>
					<input
						type="text"
						className="form-control"
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Price</label>
					<input
						type="text"
						className="form-control"
						aria-describedby="emailHelp"
						onChange={(e) => setPrice(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Discounted Price</label>
					<input
						type="text"
						className="form-control"
						aria-describedby="emailHelp"
						onChange={(e) => setDiscountedPrice(e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Description</label>
					<input
						type="text"
						className="form-control"
						aria-describedby="emailHelp"
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Variant</label>
					<select class="form-select" aria-label="Default select example" onChange={(e) => setVariantArray(e.target.value)}>
						<option selected>Open this select variant</option>
						<option value="XL">XL</option>
						<option value="L">L</option>
						<option value="S">S</option>
					</select>
				</div>

				<div className="mb-3">
					<label className="form-label">Color</label>
					<select class="form-select" aria-label="Default select example" onChange={(e) => setColorArray(e.target.value)}>
						<option selected>Open this select color</option>
						<option value="red">Red</option>
						<option value="green">Green</option>
						<option value="blue">Blue</option>
					</select>
				</div>

				<div className="mb-3">
					<label className="form-label">Product Image</label>
					<input
						type="file"
						className="form-control"
						aria-describedby="emailHelp"
						onChange={e => buffer(e)}
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">2nd Image</label>
					<input
						type="file"
						className="form-control"
						aria-describedby="emailHelp"
						onChange={(e) => thumbNailImageBuffer(e)}
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">3rd Image</label>
					<input
						type="file"
						className="form-control"
						aria-describedby="emailHelp"
						onChange={(e) => shortImageBuffer(e)}
					/>
				</div>

				<button
					type="submit"
					className="btn btn-primary"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</form>
		</>
	);
};

export default Create;
