import React, { Component } from 'react';
import firebase from 'firebase';
import uuid from 'uuid';

const config = {
  apiKey: "AIzaSyAIvk8L3iBY2qf9qPQaCL95Ez7p53xzUzw",
  authDomain: "usurvey-a6604.firebaseapp.com",
  databaseURL: "https://usurvey-a6604.firebaseio.com",
  projectId: "usurvey-a6604",
  storageBucket: "usurvey-a6604.appspot.com",
  messagingSenderId: "563575169604"
};
firebase.initializeApp(config);

export default class Usurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers: {
        answer1: '',
        answer2: '',
        answer3: ''
      },
      isSubmitted: false
    }
  }

  nameSubmit(e) {
    e.preventDefault();
    let studentName = this.refs.name.value;
    this.setState({ studentName }, () => {
      console.log(this.state);
    });
  }

  answerSelected(e) {
    let answers = this.state.answers;
    if (e.target.name === 'answer1') {
      answers.answer1 = e.target.value;
    } else if (e.target.name === 'answer2') {
      answers.answer2 = e.target.value;
    } else if (e.target.name === 'answer3') {
      answers.answer3 = e.target.value;
    }
    this.setState({ answers }, () => console.log(this.state.answers));
  }

  questionSubmit(e) {
    firebase.database().ref('uSurvey/'+this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });
    this.setState({
      isSubmitted: true
    })
  }

  render() {
    let studentName;
    let questions;
    if (this.state.studentName === '' && this.state.isSubmitted === false) {
      studentName = <div>
        <h1>Hey Student, please tell us your name: </h1>
        <form onSubmit={this.nameSubmit.bind(this)}>
          <input className="namy" type="text" placeholder="Enter your name" ref="name" />
        </form>
      </div>
    } else if (this.state.studentName !== '' && this.state.isSubmitted === false) {
      studentName = <h1>Welcome to U-Survey, {this.state.studentName}</h1>;
      questions = <div>
        <h2>Here are some questions</h2>
        <form onSubmit={this.questionSubmit.bind(this)}>
          <div className='card'>
            <label>What kind of courses do you enjoy?</label><br />
            <input type='radio' name='answer1' value='Technology' onChange={this.answerSelected.bind(this)}/>Technology
            <input type='radio' name='answer1' value='Design' onChange={this.answerSelected.bind(this)}/>Design
            <input type='radio' name='answer1' value='Marketing' onChange={this.answerSelected.bind(this)}/>Marketing
          </div>
          <div className='card'>
            <label>What are you?</label><br />
            <input type='radio' name='answer2' value='Student' onChange={this.answerSelected.bind(this)}/>Student
            <input type='radio' name='answer2' value='Professor' onChange={this.answerSelected.bind(this)}/>Professor
            <input type='radio' name='answer2' value='Graduate' onChange={this.answerSelected.bind(this)}/>Graduate
          </div>
          <div className='card'>
            <label>Was this helpful?</label><br />
            <input type='radio' name='answer3' value='Yes' onChange={this.answerSelected.bind(this)}/>Yes
            <input type='radio' name='answer3' value='No' onChange={this.answerSelected.bind(this)}/>No
            <input type='radio' name='answer3' value='Maybe' onChange={this.answerSelected.bind(this)}/>Maybeg
          </div>
          <input className='feedback-button' type='submit' value='submit' />
        </form>
      </div>
    } else if (this.state.isSubmitted === true) {
      studentName = <h1>Thanks, {this.state.studentName}</h1>
    }
    return(
      <div>
        {studentName}
        ---------------
        {questions}
      </div>
    );
  }
}