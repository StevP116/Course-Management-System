import React from 'react';
import './App.css';
import Course from './Course';

class CourseArea extends React.Component {
    setCartItemsParent(cartItems) {
        this.props.setCartItemsGrandparent(cartItems)
    }

    getCourses() {
    let courses = [];
    if(this.props.cartMode === false){
        for(const course of Object.values(this.props.data)) {
            courses.push (
            <Course key={course.name} data={course} cartItems={this.props.cartItems} completedCourses={this.props.completedCourses} setCartItemsParent={this.setCartItemsParent.bind(this)} toggleCourseSuccess={this.props.toggleCourseSuccess}/>
            )
        }
        return courses;

    } else if(this.props.cartMode === true) {
        for(const course of Object.values(this.props.data)) {
            if (this.props.cartItems[course.number]) {
          courses.push (
          <Course key={course.number} data={course} cartMode={this.props.cartMode} cartItems={this.props.cartItems} setCartItemsParent={this.setCartItemsParent.bind(this)} toggleCourseSuccess={this.props.toggleCourseSuccess}/>
          )
          }
      }
      return courses;
    }
  }

  render() {
    return (
      <div style={{margin: '20px'}}>
        {this.getCourses()}
      </div>
    )
  }
}

export default CourseArea;
