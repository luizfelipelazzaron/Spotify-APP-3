import React from 'react';
import './App.css';
import SelectSongs from './SelectSongs.js';

class Songs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			recents: ''
			// track: "",
		};
	}

	componentWillMount() {
		const requestOptions = {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + this.props.token
			}
		};

		fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log('data', data);
				this.setState({ recents: data.items });
			})
			.catch((error) => console.log(error));
	}

	refresh() {
		this.forceUpdate();
	}

	render() {
		console.log('this.state.recents', this.state.recents);
		if (this.state.recents !== '') {
			return (
				<div>
					<h1 className="titulos">Músicas ouvidas recentementes</h1>

					{this.state.loading ? (
						<h1>Carregando</h1>
					) : (
						<div>
							<SelectSongs SongsList={this.state.recents} token={this.props.token} />
						</div>
					)}
				</div>
			);
		} else {
			return <h1 className="titulos">Carregando</h1>;
		}
	}
}
export default Songs;
