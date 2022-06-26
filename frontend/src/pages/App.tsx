import {Auth} from 'aws-amplify'
import { useEffect, useState } from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {useNavigate} from 'react-router-dom'
import Routes from '.'
import {AppContext} from '../lib/contextLib'
import './App.css'

function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const nav = useNavigate()

  async function handleLogout() {
    await Auth.signOut()
    setIsAuthenticated(false);
  }

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      setIsAuthenticated(true);
      nav('/')
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }
  
  return (
    <>
      {!isAuthenticating && (
        <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-4">
          <Navbar.Brand href="/" className="font-weight-bold text-muted">
            Scratch
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
            {
              isAuthenticated ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )
            }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
        <Routes />
        </AppContext.Provider>
      </div>
      )}
    </>
  )
}

export default App
