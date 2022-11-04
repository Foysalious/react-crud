import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Login from "./Login";

const Read = () => {
	const [data, setData] = useState([]);
	const [tabledark, setTableDark] = useState("");

	function getData() {
		if (localStorage.getItem('access_token') != null) {
			axios
				.get("http://127.0.0.1:8000/api/products", { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } })
				.then((res) => {
					setData(res.data.products);
				});
		}
		else {
			<Login></Login>
		}
	}

	function handleDelete(id) {
		axios
			.delete(
				`https://62a59821b9b74f766a3c09a4.mockapi.io/crud-youtube/${id}`
			)
			.then(() => {
				getData();
			});
	}
	const moodColor = useCallback(() => {
		if (tabledark === "table-dark") setTableDark("");
		else setTableDark("table-dark");
	}, [tabledark])

	const setToLocalStorage = (id, name, email) => {
		localStorage.setItem("id", id);
		localStorage.setItem("name", name);
		localStorage.setItem("email", email);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<div className="form-check form-switch">
				<input
					className="form-check-input"
					type="checkbox"
					onClick={moodColor}
				/>
			</div>
			<div className="d-flex justify-content-between m-2">
				<h2>All Product</h2>
				<Link to="/">
					<button className="btn btn-secondary">Create</button>
				</Link>
			</div>
			<table className={`table ${tabledark}`}>
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Title</th>
						<th scope="col">Price</th>
						<th scope="col">Discounted Price</th>
						<th scope="col"></th>
						<th scope="col"></th>
					</tr>
				</thead>
				{data.map((eachData) => {
					return (

						<tbody key={eachData.id}>
							<tr>
								<th scope="row">{eachData.id} </th>
								<td>{eachData.title}</td>
								<td>{eachData.price}</td>
								<td>{eachData.discounted_price}</td>
								<td>
									<Link to="/update">
										<button
											className="btn-success"
											onClick={() =>
												setToLocalStorage(
													eachData.id,
													eachData.title,
													eachData.price
												)
											}
										>
											Edit
										</button>
									</Link>
								</td>
								<td>
									<button
										className="btn-danger"
										onClick={() =>
											handleDelete(eachData.id)
										}
									>
										Delete
									</button>
								</td>
							</tr>
						</tbody>

					);
				})}
			</table>
		</>
	);
};

export default Read;
