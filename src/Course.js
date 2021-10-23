import React from 'react';
import './App.css';
import Section from './Section'
import {Accordion, Button} from 'react-bootstrap';
import {merge, intersection, isEqual} from 'lodash';

export function checkRequisites(addedCourse, completedCourses) {
    let flattenedRequisites = addedCourse.requisites.flat();
    if(!isEqual(intersection(flattenedRequisites, completedCourses), flattenedRequisites)) {
        alert("Warning: you have not met the requisites for this course.")
    }
}

// React Class component
class Course extends React.Component {

  render() {

    const bigInline = {
        display: "inline",
        float: "left",
        fontSize: 40,
    }

    const leftAlign = {
        float: "left"
    }

    const requisitePadding = {
        fontWeight: "bold",
        paddingTop: 30
    }
    
    const normalFont = {
        fontWeight: "normal"
    }

    const padding = {
        paddingTop: 60
    }

    const buttonInLine = {
        display: "inline",
        float: "right"
    }

    const underline = {
        textDecoration: "underline",
        display: "inline"
    }

    var requisites = this.props.data.requisites
    var newReqs = ""

    if(requisites.length > 0){
        for(let i = 0; i < requisites.length; i++) {
            if(requisites[i].length > 0){
                newReqs += "("
                for(let j = 0; j < requisites[i].length; j++){
                    newReqs += requisites[i][j]
                    if(j === (requisites[i].length-1)){
                        newReqs += ")"
                        break
                    } else {
                        newReqs += " OR "
                    }
                }
            }
            if(i === requisites.length-1) {
                break
            } else {
                newReqs += " AND "
            }
        }
    } else {
        newReqs = "None"
    }

    var keywords = this.props.data.keywords
    var newKeys = ""
    for(let i = 0; i < keywords.length; i++) {
        newKeys += keywords[i]
        if(i === keywords.length-1) {
            break
        } else {
            newKeys += ", "
        }
    }

    return (
        <Accordion defaultActiveKey="course">
        <Accordion.Item eventKey="1">
          <Accordion.Header>({this.props.data.number}) {this.props.data.name} | ({this.props.data.credits} credits)</Accordion.Header>
          <Accordion.Body>
            <div style={bigInline}>{this.props.data.name}</div>
            <Button variant={this.props.cartMode ? "danger" : "success"} id="addCourse" style={buttonInLine} onClick={() => this.courseButtonClick(this.props.data)}>{this.props.cartMode ? "Remove" : "Add"} Course</Button>
            {this.props.cartMode ? "" : 
            <div>
            <br/>
            <br/>
            <br/><h6 style={leftAlign}>Subject: {this.props.data.subject}</h6>
            </div>
            }
            {this.props.cartMode ? <div><br/><br/><br/></div> : 
            <div>
                <div style={padding}>{this.props.data.description}</div>
            <h6 style={requisitePadding}>Requisites: <span style={normalFont}>{newReqs}</span></h6>
            <span style={normalFont}><p style={underline}>Keywords:</p> {newKeys}</span>
            <br/>
            <br/>
            </div>
            }
            <h3>Sections:</h3>
            <Section  data={this.props.data} cartMode={this.props.cartMode} cartItems={this.props.cartItems} completedCourses={this.props.completedCourses} setCartItemsGrandchild={this.setCartItemsGrandchild.bind(this)} toggleCourseSuccessGrandchild={this.toggleCourseSuccessGrandchild.bind(this)}/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  }

  setCartItemsGrandchild(cartItems){
      this.props.setCartItemsParent(cartItems)
  }

  toggleCourseSuccessGrandchild(mode) {
      this.props.toggleCourseSuccess(mode)
  }

  courseButtonClick(addedCourse){
    if(this.props.cartMode){
        delete this.props.cartItems[addedCourse.number];
        this.props.setCartItemsParent(this.props.cartItems);
        this.props.toggleCourseSuccess()
    } else {
        checkRequisites(addedCourse, this.props.completedCourses);
        const newItems = {
            [addedCourse.number]: addedCourse.sections.reduce((acc, section) => {
              acc[section.number] = section.subsections.reduce((subAcc, subSec) => {
                subAcc[subSec.number] = true;
                return subAcc;
              }, {});
              return acc;
            }, {})
          }
    
          this.props.setCartItemsParent(merge({}, this.props.cartItems, newItems));
          this.props.toggleCourseSuccess("Success")
          return
    }
  }
}

export default Course;
