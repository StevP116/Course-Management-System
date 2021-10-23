import {Navbar, Container, Nav} from 'react-bootstrap'

const Header = ({toggleCart, toggleCompletedCourses, toggleRecommendedCourses, toggleHelpPage}) => {

    return (
        <Navbar variant="dark" fixed="top" expand="lg" style={{backgroundColor: "#646464"}}>
  <Container>
    <Navbar.Brand href="#home">Course Management</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
          <Nav.Link onClick={toggleCart}>Cart</Nav.Link>
          <Nav.Link onClick={toggleCompletedCourses}>Completed Courses</Nav.Link>
          <Nav.Link onClick={toggleRecommendedCourses}>Recommended Courses</Nav.Link>
          <Nav.Link onClick={toggleHelpPage}>Help</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    )
}

export default Header