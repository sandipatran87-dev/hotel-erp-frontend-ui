import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function TopNavbar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand>Hotel ERP System</Navbar.Brand>
        <Navbar.Text>Admin</Navbar.Text>
      </Container>
    </Navbar>
  );
}