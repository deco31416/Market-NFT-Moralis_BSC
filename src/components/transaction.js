import { useMoralis } from "react-moralis";
import { Navbar, Container, Nav, Dropdown, Modal } from "react-bootstrap";
import { useState } from "react";

export default function Transaction() {

  const [balance, setBalance] = useState();
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
  const login = async () => {

    if (!isAuthenticated) {

      await authenticate({signingMessage: "Log in using Moralis" })
        .then(function (user) {

          

          console.log(user);
          
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const logOutButton = async () => {
    await logout();
    console.log("logged out");
  }

  return (
    <>
      <Nav.Link onClick={ login }>Metamask Login</Nav.Link>
      <Nav.Link onClick={ logOutButton }>Logout</Nav.Link>
      <Nav.Item>
        { balance }
      </Nav.Item>
    </>
  );
}