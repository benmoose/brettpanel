import React from "react"
import styled from "styled-components"
import Logo from "../../static/logo.svg"

const NavbarLogo = styled.img`
  height: 32px;
  object-fit: contain;
  margin-right: 5px;
`

export default () => (
    <nav className="bp3-navbar bp3-dark">
        <div className="container">
            <div className="bp3-navbar-group bp3-align-left">
                <NavbarLogo src={Logo} />
                <div className="bp3-navbar-heading"><strong>Brettpanel</strong></div>
            </div>
        </div>
    </nav>
)
