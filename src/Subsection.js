import React from 'react'
import './App.css'
import {Accordion, Button} from 'react-bootstrap';
import {merge} from 'lodash'
import {checkRequisites} from './Course';

class Subsection extends React.Component {



	

	render() {

        const buttonInLine = {
            display: "inline",
            float: "right"
        }

        var subsections = this.props.data

		return (
            subsections.map((subsection) => this.props.cartMode && !this.props.cartItems[this.props.course.number][this.props.section.number][subsection.number] ? "" : <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
            <Accordion.Header>{subsection.number}<p>&nbsp;</p><Button variant={this.props.cartMode ? "danger" : "success"} id="addCourse" style={buttonInLine} onClick={() => this.addSectionButtonClick(this.props.course, this.props.section, subsection)}>{this.props.cartMode ? "Remove Subsection" : "Add Subsection"}</Button></Accordion.Header>
                <Accordion.Body>
                    <div>
                    <ul>
                    <li>Location: {subsection.location}</li>
                    <li>Meeting Times:</li>
                    {Object.keys(subsection.time).map((key) => 
                       <ul>
                           <li>{key}:&nbsp;{subsection.time[key]}</li>
                       </ul>
                       )}
                    </ul>
                    </div>
                </Accordion.Body>
             </Accordion.Item>
        </Accordion>)
		)
	}

    setCartItemsGreatGreatGrandchild(cartItems){
        this.props.setCartItemsGreatGrandchild(this.props.cartItems)
    }

    addSectionButtonClick(course, section, addedSubsection){
        if(this.props.cartMode) {
            delete this.props.cartItems[course.number][section.number][addedSubsection.number];
            if(Object.keys(this.props.cartItems[course.number][section.number]).length === 0) {
                delete this.props.cartItems[course.number][section.number];
            }
            if(Object.keys(this.props.cartItems[course.number]).length === 0) {
                delete this.props.cartItems[course.number];
            }
            this.props.setCartItemsGreatGrandchild(this.props.cartItems);
            this.props.toggleCourseSuccessGreatGrandchild()
        } else {
            checkRequisites(course, this.props.completedCourses);
            const newItems = {
                [course.number]: {
                  [section.number]: {
                      [addedSubsection.number] : addedSubsection.number
                  }
                }
              }

              this.props.setCartItemsGreatGrandchild(merge({}, this.props.cartItems, newItems));
              this.props.toggleCourseSuccessGreatGrandchild("Success")
              return
        }
    }
}

export default Subsection;