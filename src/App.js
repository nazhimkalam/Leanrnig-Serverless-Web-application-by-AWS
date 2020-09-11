import React, { useState, useEffect } from 'react';
import './App.css';
import ContactsIcon from '@material-ui/icons/Contacts';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Edit from './Edit/Edit';

function App() {
	const [loading, setLoading] = useState(true);
	const [inputName, setInputName] = useState('');
	const [inputAge, setInputAge] = useState(0);
	const [fetchedData, setFetchedData] = useState([]);
	const [clicked, setClicked] = useState(false);
	const [selectedRowEdit, setSelectedRowEdit] = useState();

	useEffect(() => {
		// have to use a UseEffect for fetching data purposes
		const fetchData = async () => {
			const response = await fetch('https://xl28ge6f91.execute-api.us-east-1.amazonaws.com/dev')
				.then((res) => res.json())
				.catch((err) => console.log(err + ' <---- error message'));
			setLoading(false);
			setFetchedData(
				response.sort(function (a, b) {
					// sorting the collected data according to the Id
					return a.Id - b.Id;
				})
			);
			console.log(response);
		};

		setLoading(true);
		if (clicked) {
			setClicked(false);
		}

		fetchData();
		setInputAge(0);
		setInputName('');
	}, [clicked]);

	console.log(fetchedData);

	// This functions fires when the submit button is clicked
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(inputName, inputAge);

		// POSTING the entered data
		fetch('https://xl28ge6f91.execute-api.us-east-1.amazonaws.com/dev', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				Id: fetchedData.length + 1,
				name: inputName,
				age: inputAge,
			}),
		});

		// This delay is set because we should give some time for the data to be posted into the DynamoDB
		// Then only the GET function is able to exact the updated data, else if the data sent is not yet
		// posted then we won't be GETTING the updated data from the DynamoDB

		setTimeout(() => {
			setClicked(true);
		}, 500);
	};

	return (
		<div className="app">
			{loading ? (
				<div className="app__loading">
					<img src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" alt="" />
				</div>
			) : (
				<div className="container mt-5">
					<Router>
						<h2 className="mb-4 d-flex">
							Details of Students
							<div className="ml-2">
								<ContactsIcon fontSize="large" />
							</div>
						</h2>

						<Switch>
							<Route path="/edit/:Id">
								<Edit />
							</Route>

							<Route path="/">
								<div>
									<table className="table table-striped">
										<thead>
											<tr>
												<th scope="col">ID</th>
												<th scope="col">Name</th>
												<th scope="col">Age</th>
											</tr>
										</thead>
										<tbody>
											{fetchedData?.map((data) => (
												<tr key={data.Id}>
													<th scope="row">{data.Id}</th>
													<td>{data.name}</td>
													<td>
														{data.age}
														<Link to={`edit/${data.Id}`}>
															<button className="edit btn btn-primary" key={data.Id}>
																Edit
															</button>
														</Link>
													</td>
												</tr>
											))}
											<tr>
												<th scope="row">{fetchedData?.length + 1}</th>
												<td>
													<input
														type="text"
														value={inputName}
														onChange={(e) => setInputName(e.target.value)}
													/>
												</td>
												<td>
													<input
														size={2}
														type="number"
														value={inputAge}
														onChange={(e) => setInputAge(e.target.value)}
													/>
												</td>
											</tr>
										</tbody>
									</table>
									<button
										type="submit"
										className="btn btn-success btn-lg float-right "
										onClick={handleSubmit}
									>
										Submit
									</button>
								</div>
							</Route>
						</Switch>
					</Router>
				</div>
			)}
		</div>
	);
}

export default App;
