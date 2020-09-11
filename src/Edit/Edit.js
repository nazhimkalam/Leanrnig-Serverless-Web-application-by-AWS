import React, { useState, useEffect } from 'react';
import './Edit.css';
import { useParams, Link, useHistory } from 'react-router-dom';

function Edit({ fetchedData }) {
	const { Id } = useParams(); // this will fetch the parameters of the URL
	const data = fetchedData[Id - 1]; // Student's details

	const [inputName, setInputName] = useState();
	const [inputAge, setInputAge] = useState();
	const history = useHistory();

	useEffect(() => {
		setInputName(data?.name);
		setInputAge(data?.age);
	}, [data]);

	const handleUpdate = (e) => {
        e.preventDefault();
		history.push('/');

	};

	const handleExit = (e) => {
		e.preventDefault();
		history.push('/');
	};

	return (
		<div>
			<div className="container">
				<div className="card mt-5 p-4 ">
					<form>
						<div class="form-group">
							<label for="name">
								<h5>Name</h5>
							</label>
							<input
								type="text"
								class="form-control"
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
								class="form-control"
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
							<button className="btn btn-secondary float-right mr-2" onClick={handleExit}>
								Back
							</button>
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Edit;
