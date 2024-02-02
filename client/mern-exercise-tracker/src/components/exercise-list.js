import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';


const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
    <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExerciseList extends Component {

  constructor(props) {

    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [] };//here we calling each user info "exercises" inside the array of all user exercises
   }//this.state = { exercises: [] }//this will give error

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((err) => { console.log(err) })
  }//runs whenever the page loads

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/' + id)
    .then( res => {console.log(res.data)})
    .catch(err => console.log(err))

    this.setState({
      exercises:this.state.exercises.filter(el => el._id !== id)
    })//whenever we set the state react update the page
    //this.state is array of exercises, taking  exercises from each element in array and passing it should not be equal to deleted id
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })//this.state.exerices is each user info
  }

  render() {
    return (
      <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { this.exerciseList() }
        </tbody>
      </table>
    </div>
    )
  }
}

