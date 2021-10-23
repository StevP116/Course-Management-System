import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import CourseArea from "./CourseArea";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'
import {Modal, Button} from 'react-bootstrap'
import CompletedCourse from './CompletedCourse'
import {isEqual, uniq, intersection} from 'lodash'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      completedCourses: {},
      filteredCourses: {},
      subjects: [],
      cartItems: {},
      showCart: false,
      showCompletedCourses: false,
      recommendedCourses: {},
      showRecommendedCourses: false,
      showHelpPage: false,
      rating1: 0,
      rating2: 0,
      rating3: 0,
      rating4: 0,
      rating5: 0,
      rating6: 0, 
      addCourseSuccess: false, 
      successMessage: ""
    };
  }

  componentDidMount() {
    fetch("http://cs571.cs.wisc.edu:53706/api/react/classes")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          allCourses: data,
          filteredCourses: data,
          subjects: this.getSubjects(data),
        }),
      );
    fetch("http://cs571.cs.wisc.edu:53706/api/react/students/5022025924/classes/completed")
    .then((res) => res.json())
    .then((data) => 
       this.setState({
         completedCourses: data
        }),
    );
  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for (const course of Object.values(data)) {
      if (subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCourses(courses) {
    this.setState({ filteredCourses: courses });
  }

    setCartItemsGrandparent(cartItems) {
      this.setState({cartItems: cartItems});
  }

  toggleCart = () => {
      this.setState({showCart: !this.state.showCart})
  }

  toggleCompletedCourses = () => {
      this.setState({showCompletedCourses: !this.state.showCompletedCourses})
  }

  toggleHelpPage = () => {
      this.setState({showHelpPage: !this.state.showHelpPage})
  }

  toggleRecommendedCourses = () => {
    this.setState({showRecommendedCourses: !this.state.showRecommendedCourses})
}

  toggleCourseSuccess = (mode) => {
      if(mode) {
        this.setState({addCourseSuccess: !this.state.addCourseSuccess, successMessage: "Successfully added to your cart."})
      } else {
        this.setState({addCourseSuccess: !this.state.addCourseSuccess, successMessage: "Successfully removed from your cart."})
      }
      setTimeout(() => {
          if(this.state.addCourseSuccess) {
            this.setState({addCourseSuccess: !this.state.addCourseSuccess})
          }
      }, 2000)
  }  

  setRatingParent(rating, courseNum) {
      if(isEqual(courseNum, "PSYCH 202")) {
          this.setState({rating1: rating});
      } else if(isEqual(courseNum, "COMP SCI 200")) {
        this.setState({rating2: rating});
      } else if(isEqual(courseNum, "COMP SCI 300")) {
        this.setState({rating3: rating});
      } else if(isEqual(courseNum, "CHEM 103")) {
        this.setState({rating4: rating});
      } else if(isEqual(courseNum, "MATH 114")) {
        this.setState({rating5: rating});
      } else if(isEqual(courseNum, "MATH 221")) {
        this.setState({rating6: rating});
      }
}

   getRecommendedCourses(completedCoursesArrayNames) {
       let recommendedCourses = [];
       let recommendedComponents = []
       let ratedCourses = [];
       if(this.state.rating1 >= 4) {
           ratedCourses.push("PSYCH 202");
       }
       if(this.state.rating2 >= 4) {
        ratedCourses.push("COMP SCI 200");
    }
    if(this.state.rating3 >= 4) {
        ratedCourses.push("COMP SCI 300");
    }
    if(this.state.rating4 >= 4) {
        ratedCourses.push("CHEM 103");
    }
    if(this.state.rating5 >= 4) {
        ratedCourses.push("MATH 114");
    }
    if(this.state.rating6 >= 4) {
        ratedCourses.push("MATH 221");
    }

    let highlyRatedKeywords = [];
    Object.values(this.state.allCourses).forEach(course => {
         // Checking if the current course exists in the rated courses array
         if(ratedCourses.includes(course.number)) {
            // Getting the rated all of the courses' keywords and putting them into an array
            highlyRatedKeywords = highlyRatedKeywords.concat(course.keywords);
        }
    })
    
    // Making the keywords array unique 
    highlyRatedKeywords = uniq(highlyRatedKeywords);
    Object.values(this.state.allCourses).forEach(course => {
        // Checking if the course is not completed and that the intersection of the highly rated courses' keywords and the current course's keywords is not 0
        if(!completedCoursesArrayNames.includes(course.number) && intersection(highlyRatedKeywords, course.keywords).length !== 0) {
            recommendedCourses.push(course.number);
            recommendedComponents.push(
                <>
                <CompletedCourse data={course.number} courseName={course.name} credits={course.credits + " credits"} recommendationMode={true}></CompletedCourse>
                </>
            );
        }
    })
    return recommendedComponents;

   }

  render() {
    let completedCoursesArray = []
    let completedCoursesArrayNames = []
      Object.values(this.state.completedCourses).map(([course1, course2, course3, course4, course5, course6]) => (
        completedCoursesArray.push(
              <>
              <CompletedCourse data={course1} courseName={"Introduction to Psychology"} credits={"3 credits"} setRatingParent={this.setRatingParent.bind(this)} rating={this.state.rating1} recommendationMode={false}></CompletedCourse>
              <CompletedCourse data={course2} courseName={"Programming 1"} credits={"3 credits"} setRatingParent={this.setRatingParent.bind(this)} rating={this.state.rating2} recommendationMode={false}></CompletedCourse>
              <CompletedCourse data={course3} courseName={"Programming 2"} credits={"3 credits"} setRatingParent={this.setRatingParent.bind(this)} rating={this.state.rating3} recommendationMode={false}></CompletedCourse>
              <CompletedCourse data={course4} courseName={"General Chemistry I"} credits={"4 credits"} setRatingParent={this.setRatingParent.bind(this)} rating={this.state.rating4} recommendationMode={false}></CompletedCourse>
              <CompletedCourse data={course5} courseName={"Algebra and Trigonometry"} credits={"5 credits"} setRatingParent={this.setRatingParent.bind(this)} rating={this.state.rating5} recommendationMode={false}></CompletedCourse>
              <CompletedCourse data={course6} courseName={"Calculus and Analytic Geometry 1"} credits={"5 credits"} setRatingParent={this.setRatingParent.bind(this)} rating={this.state.rating6} recommendationMode={false}></CompletedCourse>
              </>
          )
      ))
      Object.values(this.state.completedCourses).map(([course1, course2, course3, course4, course5, course6]) => (
        completedCoursesArrayNames.push(course1, course2, course3, course4, course5, course6)
      ))


    return (
      <>
      <Header toggleCart={this.toggleCart} toggleCompletedCourses={this.toggleCompletedCourses} toggleRecommendedCourses={this.toggleRecommendedCourses} toggleHelpPage={this.toggleHelpPage}/>
    
            <Sidebar
              setCourses={(courses) => this.setCourses(courses)}
              courses={this.state.allCourses}
              subjects={this.state.subjects}
            />
            <div style={{ marginLeft: "20vw", marginTop: "60px" }}>
              <CourseArea
                data={this.state.filteredCourses}
                allData={this.state.allCourses}
                cartMode={false}
                cartItems={this.state.cartItems}
                setCartItemsGrandparent={this.setCartItemsGrandparent.bind(this)}
                completedCourses={completedCoursesArrayNames}
                addCourseSuccess={this.state.addCourseSuccess}
                toggleCourseSuccess={this.toggleCourseSuccess.bind(this)}
              />
            </div>
          
          
          <Modal size="xl" show={this.state.showCart} onHide={this.toggleCart}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{ marginLeft: "5vw" }}></div>
            <CourseArea 
            data={this.state.allCourses}
            cartItems={this.state.cartItems}
            cartMode={true}
            completedCourses={completedCoursesArrayNames}
            setCartItemsGrandparent={this.setCartItemsGrandparent.bind(this)}
            addCourseSuccess={this.state.addCourseSuccess}
            toggleCourseSuccess={this.toggleCourseSuccess.bind(this)}
              />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.toggleCart}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="xl" show={this.state.showCompletedCourses} onHide={this.toggleCompletedCourses}>
        <Modal.Header closeButton>
          <Modal.Title>Completed Courses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{ marginLeft: "5vw" }}></div>
            {completedCoursesArray}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.toggleCompletedCourses}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="xl" show={this.state.showRecommendedCourses} onHide={this.toggleRecommendedCourses}>
        <Modal.Header closeButton>
          <Modal.Title>Recommended Courses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{ marginLeft: "5vw" }}></div>
            {this.getRecommendedCourses(completedCoursesArrayNames)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.toggleRecommendedCourses}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={this.state.addCourseSuccess} onHide={this.toggleCourseSuccess}>
        <Modal.Body style={{ backgroundColor: "#f0f0f0", boxShadow: "2px 2px 15px 5px rgba(0,0,0,0.46)" }}>
        <div style={{ marginLeft: "5vw" }}></div>
            <h2>
                {this.state.successMessage}
            </h2>
            <Button variant="secondary" onClick={this.toggleCourseSuccess}>
            Close
          </Button>
        </Modal.Body>
      </Modal>

      <Modal size="xl" show={this.state.showHelpPage} onHide={this.toggleHelpPage}>
        <Modal.Header closeButton>
          <Modal.Title>Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{ marginLeft: "5vw" }}></div>
        <div>
        <h2>Adding Courses</h2>
        <p>To add a course to your cart, navigate to the "search" screen, which is also the home screen. From there, you may find courses you want to add to your cart by using the search and 
        filter tool on the left side of the screen to filter courses by keyword, subject, interest area and credits. 
        </p>
        <p>Once you have found a course you would like to add to your cart, open the course simply by clicking on it. You will see the option to add a course shown by the
            "Add Course" button. This will add the course, all of its sections and all of its subsections to your cart. If you would like to add a specific section, simply
            click on the "Add Section" button located inside of the course. This will add the course, that course's specific section, and all of that section's subsections to your cart. 
            Finally, to add a specific subsection to your cart, once inside of the opened course, click on a course's section to open it. Inside of the section resides all of
            that specific section's subsections. From there, you can click the "Add Subsection" button to add the course, that specific section, and that specific subsection to your cart.
        </p>
        </div>

        <div>
        <h2>Removing Courses</h2>
        <p> To remove a course from your cart, first navigate to your cart by clicking on "Cart" located on the menu bar at the top of the screen. 
        </p>
        <p> This is where all of the courses that you have added to your cart will be. To remove a course, simply open the course by clicking on it. Inside, you will see the option
            to remove a course from your cart shown by the "Remove Course" button. This will remove the entire course, including all of its sections and subsections. To remove a specific 
            section from your cart, click the "Remove Section" button located inside of the course. If there are other sections of the course in the cart, this will only remove this section. If the section
            you are removing is the only section for that course in the cart, the entire course will be removed from your cart. Te remove a specific subsection from your cart, once inside 
            of the opened course, click on a course's section to open it. Inside of the section resides all of that specific section's subsections. From there, you can click the "Remove Subsection" button
            to remove that specific subsection from the cart. If there are other subsections for that section in the cart, only this subsection will be removed. If the subsection you are removing 
            is the only subsection for this section in the cart, the whole section will be removed. Additionally, if the section that was removed was the only section in the cart for that course, the whole course 
            will be removed.  
        </p>
        </div>

        <div>
        <h2>Completed Courses</h2>
        <p> The completed courses component displays courses that you have completed. Here, you can rate completed courses to generate recommended courses that you may like. 
        </p>
        </div>

        <div>
        <h2>Recommended Courses</h2>
        <p> The recommended courses component displays courses that you may be interested in taking. These courses are recommended to you because you gave one or more completed courses a rating of 4 or higher.
            The recommended courses will be courses that have similar interest areas as the completed courses that you rated highly.
        </p>
        </div>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.toggleHelpPage}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
}

export default App;
