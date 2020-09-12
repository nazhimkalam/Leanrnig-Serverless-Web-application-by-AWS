import React, { useState, useEffect } from 'react';
import './Edit.css';
import '../App.css';
import { useParams, Link, useHistory } from 'react-router-dom';

function Edit({ fetchedData, setClicked }) {
	const { Id } = useParams(); // this will fetch the parameters of the URL
	const data = fetchedData[Id - 1]; // Student's details

	const [inputName, setInputName] = useState();
	const [inputAge, setInputAge] = useState();
	const history = useHistory();

	useEffect(() => {
		setInputName(data?.Sname);
		setInputAge(data?.age);
	}, [data]);

	const handleUpdate = async (e) => {
		e.preventDefault();

		// UPDATING the entered data
		await fetch('https://xl28ge6f91.execute-api.us-east-1.amazonaws.com/dev', {
			method: 'PUT', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				Id: parseInt(Id),
				Sname: inputName,
				age: parseInt(inputAge),
			}),
		});
		setClicked(true);
		history.push('/');
	};

	return (
		<div>
			<div className="container">
				<div className="card mt-5 p-4 ">
					<form>
						<div className="form-group">
							<label for="name">
								<h5>Name</h5>
							</label>
							<input
								type="text"
								className="form-control"
								id="name"
								placeholder="Name"
								value={inputName}
								onChange={(e) => setInputName(e.target.value)}
							/>
						</div>
						<div class="form-group">
							<label for="name">
								<h5>Age</h5>
							</label>
							<input
								type="number"
								className="form-control"
								id="age"
								placeholder="Age"
								value={inputAge}
								onChange={(e) => setInputAge(e.target.value)}
							/>
						</div>

						<button className="btn btn-warning float-right" onClick={handleUpdate}>
							Update
						</button>
						<Link to="/">
							<button className="btn btn-secondary float-right mr-2">Back</button>
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Edit;
