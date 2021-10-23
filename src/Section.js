import React from 'react'
import './App.css'
import {checkRequisites} from './Course.js'
import Subsection from './Subsection.js'
import {Accordion, Button} from 'react-bootstrap';
import {merge} from 'lodash';

class Section extends React.Component {


	render() {

        const buttonInLine = {
            display: "inline",
            float: "right"
        }
        
        var sections = this.props.data.sections

       
		return (
            sections.map((section) => this.props.cartMode && !this.props.cartItems[this.props.data.number][section.number] ? null : <Accordion defaultActiveKey="section">
            <Accordion.Item eventKey="0">
                <Accordion.Header>{section.number}<p>&nbsp;</p><Button variant={this.props.cartMode ? "danger" : "success"} id="addCourse" style={buttonInLine} onClick={() => this.addSectionButtonClick(this.props.data, section)}>{this.props.cartMode ? "Remove Section" : "Add Section"}</Button></Accordion.Header>
                <Accordion.Body>
                   <div>
                       <ul>
                       <li>Instructor: {section.instructor}</li>
                       <li>Location: {section.location}</li>
                       <li>Meeting Times:</li>
                       {Object.keys(section.time).map((key) => 
                       <ul>
                           <li>{key}:&nbsp;{section.time[key]}</li>
                       </ul>
                       )}
                   </ul>
                   </div>
                   <h4>Subsections:</h4>
                   <Subsection data={section.subsections} cartMode={this.props.cartMode} completedCourses={this.props.completedCourses} course={this.props.data} section={section} cartItems={this.props.cartItems}  setCartItemsGreatGrandchild={this.setCartItemsGreatGrandchild.bind(this)} toggleCourseSuccessGreatGrandchild={this.toggleCourseSuccessGreatGrandchild.bind(this)}/>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>)
		)
	}

    setCartItemsGreatGrandchild(cartItems){
        this.props.setCartItemsGrandchild(cartItems)
    }

    toggleCourseSuccessGreatGrandchild(mode) {
        this.props.toggleCourseSuccessGrandchild(mode)
    }


    addSectionButtonClick(course, sectionData){
        if(this.props.cartMode) {
            delete this.props.cartItems[course.number][sectionData.number];
            if(Object.keys(this.props.cartItems[course.number]).length === 0){
                delete this.props.cartItems[course.number]
            }
            this.props.setCartItemsGrandchild(this.props.cartItems)
            this.props.toggleCourseSuccessGrandchild()
        } else {
            checkRequisites(course, this.props.completedCourses)
        const newItems = {
            [course.number]: {
              [sectionData.number]: sectionData.subsections.reduce((subAcc, subSec) => {
                subAcc[subSec.number] = true;
                return subAcc;
              }, {})
            }
          }
          this.props.setCartItemsGrandchild(merge({}, this.props.cartItems, newItems));
          this.props.toggleCourseSuccessGrandchild("Success")
          return;
        }
    }
}

export default Section;