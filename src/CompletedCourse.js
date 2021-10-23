import React from 'react'
import {Card} from 'react-bootstrap'
import CourseRater from './CourseRater'

class CompletedCourse extends React.Component {
    setRating(rating, courseNum) {
        this.props.setRatingParent(rating, courseNum);
    }

    render() {
        return(
            <Card style={{ width: '65rem' }}>
  <Card.Body>
    <Card.Title>{this.props.data}</Card.Title>
    <div style={{ marginBottom: "1vw" }}>
    <h2 style={{ display: "inline" }}>
        {this.props.courseName}
    </h2>
    <span style={{ display: "inline", marginLeft: '1vw'}}>
        {this.props.credits}
    </span>
    </div>
    {!this.props.recommendationMode ?
    <>
    <h6>Please rate this course:</h6>
    <CourseRater data={this.props.data} rating={this.props.rating} setRating={this.setRating.bind(this)}></CourseRater>
    </>
    :
    ""
    }
  </Card.Body>
</Card>
        );
    }
}

export default CompletedCourse;