import React from 'react'
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

export default class SetupDashboard extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: props.user,
	  events: [],
	  db: props.db,
    };
  }

  async componentDidMount() {
	let eventsTemp = [];
	// const querySnapshot = await getDocs(query(collection(this.state.db, "panic-events"), where("resolved", "==", false), orderBy("timestamp", "desc")));
	const q = query(collection(this.state.db, "panic-events"), where("resolved", "==", false));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		eventsTemp.push({
			...doc.data(),
			id: doc.id,
		});
	});
	this.setState({
		events: eventsTemp,
	});
  }

  render() {
	return (
		<div>
			{this.state.events.length > 0 ?
			<table>
				<tr>
					<td>Time</td>
					<td>People attending</td>
					<td>See more</td>
				</tr>
				{
					this.state.events.map((event) => 
					<tr>
						<td>{event.timestamp}</td>
						<td>{event.peopleAttending}</td>
						<td><a href={`/event/${event.id}`}>Details</a></td>
					</tr>)
				}
			</table>
			:
			<p>No events!</p>
			}
			<form onSubmit={this.sendData}>
              <input
                type="email"
                placeholder="email"
                onChange={e => this.setState({email: e.target.value})}
                value={this.state.email}
              />
              <input
                type="text"
                placeholder="Qualification ID"
                onChange={e => this.setState({qualId: e.target.value})}
                value={this.state.qualId}
              />
              <input
                type="text"
                placeholder="Phone"
                onChange={e => this.setState({phone: e.target.value})}
                value={this.state.phone}
              />
              <input type="submit" value="Join"/>
            </form>
		</div>
	);
  }
}
