import React from 'react'
import {Form} from 'react-bootstrap'

class CourseRater extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.setRating(e.target.value, this.props.data)
    }

    render() {
        return(
            <Form.Control as="select" style={{ height: '2.5rem' }} onChange={this.handleChange} defaultValue={this.props.rating}>
                <option value={"No Rating"}>No Rating</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </Form.Control>
        )
    }
}

export default CourseRater

