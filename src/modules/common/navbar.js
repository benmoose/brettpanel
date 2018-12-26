import React from "react"
import styled from "styled-components"
import {Alignment, Navbar} from "@blueprintjs/core"
import Logo from "../../static/logo.svg"

const NavbarLogo = styled.img`
  height: 32px;
  object-fit: contain;
  margin-right: 5px;
`

export default () => (
    <Navbar className="bp3-dark">
        <div className="container">
          <div className="row">
            <Navbar.Group align={Alignment.LEFT}>
                <NavbarLogo src={Logo} />
                <div className="bp3-navbar-heading"><strong>Brettpanel</strong></div>
            </Navbar.Group>
          </div>
        </div>
    </Navbar>
)
