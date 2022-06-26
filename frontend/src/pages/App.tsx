import { useState } from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Routes from '.'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-4">
        <Navbar.Brand href="/" className="font-weight-bold text-muted">
          Scratch
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            <LinkContainer to="/signup">
              <Nav.Link>Signup</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  )
}

export default App
