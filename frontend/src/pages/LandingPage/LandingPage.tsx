import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../utils/AuthContext";
import { Button, Col, Row, Typography } from "antd";

import { ROUTES } from "../../utils/routes.enum";
import "./style.css";

import grow10xName from "../../assets/grow10x-name.png";
import grow10xLogo from "../../assets/grow10xLogo.png";
import Image_1 from "../../assets/Image_1.png";
import middle_Image from "../../assets/middle_Image.png";
import search from "../../assets/search.png";

import getLandingPage from "./html";
const htmlData = getLandingPage();

const { Text, Title, Paragraph } = Typography;
type LandingPageProps = {};

const env = process.env.REACT_APP_ENV;
const { config } = require(`../../config/${env}.config`);

const LandingPage: React.FC<LandingPageProps> = () => {
  const navigate = useNavigate();
  const { authenticated } = useContext(AuthContext);
  const location = window.location.href;
  const basePath = "../../assets/";

  useEffect(() => {
    if (authenticated) {
      window.location.replace(ROUTES.HOME);
    }
  }, [authenticated]);

  return (
    <>
      <div>
        <div className="bee-page-container">
          <div className="bee-row bee-row-1">
            <div className="bee-row-content no_stack">
              <div className="bee-col bee-col-1 bee-col-w2">
                <div className="bee-block bee-block-1 bee-image">
                  <img
                    alt=""
                    className="bee-fixedwidth"
                    src="images/b7e8d070-bb3c-4414-80fc-41e40c5dd6e1.png"
                    style={{ maxWidth: "76px" }}
                  />
                </div>
              </div>
              <div className="bee-col bee-col-2 bee-col-w3">
                <div className="bee-block bee-block-1 bee-divider">
                  <div className="spacer" style={{ height: "1px" }}></div>
                </div>
                <div className="bee-block bee-block-2 bee-image">
                  <img
                    alt=""
                    className="bee-autowidth"
                    src="images/0c180f63-c4da-4b23-8fd4-44d89e6e4b34.png"
                    style={{ maxWidth: "167px" }}
                  />
                </div>
                <div className="bee-block bee-block-3 bee-divider">
                  <div className="spacer" style={{ height: "5px" }}></div>
                </div>
              </div>
              <div className="bee-col bee-col-3 bee-col-w7">
                <div className="bee-block bee-block-1 bee-divider">
                  <div className="spacer" style={{ height: "0px" }}></div>
                </div>
                <div className="bee-block bee-block-2 bee-image">
                  <img
                    alt=""
                    className="bee-right bee-autowidth"
                    src="images/VB_Logo_full.svg"
                    style={{ maxWidth: "216px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bee-row bee-row-2">
          <div className="bee-row-content">
            <div className="bee-col bee-col-1 bee-col-w6">
              <div className="bee-block bee-block-1 bee-divider">
                <div className="spacer" style={{ height: "10px" }}></div>
              </div>
              <div className="bee-block bee-block-2 bee-text">
                <div
                  className="bee-text-content"
                  style={{
                    lineHeight: "120%",
                    fontSize: "12px",
                    color: "#1f0b0b",
                    fontFamily: "inherit",
                  }}
                >
                  <p style={{ fontSize: "14px", lineHeight: "16px" }}>
                    <strong style={{}}>
                      <span style={{ fontSize: "46px", lineHeight: "55px" }}>
                        Welcome to Grow10x!
                      </span>
                    </strong>
                  </p>
                </div>
              </div>
              <div className="bee-block bee-block-3 bee-text">
                <div
                  className="bee-text-content"
                  style={{
                    fontSize: "12px",
                    lineHeight: "150%",
                    color: "#393d47",
                    fontFamily: "inherit",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      lineHeight: "18px",
                      textAlign: "right",
                    }}
                  >
                    <span style={{ fontSize: "14px", lineHeight: "21px" }}>
                      <span style={{ color: "#8a3b8f", lineHeight: "18px" }}>
                        <strong style={{}}>
                          <span
                            style={{ color: "#7c7676", lineHeight: "18px" }}
                          >
                            {" "}
                          </span>
                        </strong>
                      </span>
                    </span>
                  </p>
                </div>
              </div>
              <div className="bee-block bee-block-4 bee-button">
                <a
                  className="bee-button-content"
                  href={`${config.CLIENT_URL}/login`}
                  style={{
                    fontSize: "16px",
                    backgroundColor: "#5855bd",
                    borderBottom: "0px solid #8a3b8f",
                    borderLeft: "0px solid #8a3b8f",
                    borderRadius: "4px",
                    borderRight: "0px solid #8a3b8f",
                    borderTop: "0px solid #8a3b8f",
                    color: "#ffffff",
                    direction: "ltr",
                    fontFamily: "inherit",
                    fontWeight: 400,
                    maxWidth: "100%",
                    paddingBottom: "10px",
                    paddingLeft: "50px",
                    paddingRight: "45px",
                    paddingTop: "10px",
                    width: "auto",
                    display: "inline-block",
                  }}
                >
                  <span
                    style={{
                      wordBreak: "break-word",
                      fontSize: "16px",
                      lineHeight: "200%",
                    }}
                  >
                    <strong style={{ fontSize: "16px" }}>Get Started</strong>
                  </span>
                </a>
              </div>
            </div>
            <div className="bee-col bee-col-2 bee-col-w6">
              <div className="bee-block bee-block-1 bee-divider">
                <div className="spacer" style={{ height: "30px" }}></div>
              </div>
              <div className="bee-block bee-block-2 bee-image">
                <img
                  alt="Alternate text"
                  className="bee-center bee-autowidth"
                  src="images/Image_1.png"
                  style={{ maxWidth: "330px" }}
                />
              </div>
              <div className="bee-block bee-block-3 bee-divider">
                <div className="spacer" style={{ height: "30px" }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bee-row bee-row-3">
          <div className="bee-row-content">
            <div className="bee-col bee-col-1 bee-col-w12">
              <div className="bee-block bee-block-1 bee-divider">
                <div className="spacer" style={{ height: "35px" }}></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bee-row bee-row-4"
          style={{ backgroundColor: "#413ea1" }}
        >
          <div className="bee-row-content">
            <div className="bee-col bee-col-1 bee-col-w12">
              <div className="bee-block bee-block-1 bee-divider">
                <div className="spacer" style={{ height: "35px" }}></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bee-row bee-row-5"
          style={{ backgroundColor: "#413ea1" }}
        >
          <div className="bee-row-content">
            <div className="bee-col bee-col-1 bee-col-w4">
              <div className="bee-block bee-block-1 bee-text">
                <div
                  className="bee-text-content"
                  style={{
                    lineHeight: "120%",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    color: "#ffffff",
                  }}
                >
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: "19px",
                      textAlign: "left",
                    }}
                  >
                    <strong style={{}}>Links</strong>
                  </p>
                </div>
              </div>
              <div className="bee-block bee-block-2 bee-text">
                <div
                  className="bee-text-content"
                  style={{
                    lineHeight: "180%",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    color: "#d0d0d0",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "25px",
                      textAlign: "left",
                    }}
                  >
                    <a
                      href="https://www.valuebound.com/about"
                      rel="noopener"
                      style={{ textDecoration: "none", color: "#d0d0d0" }}
                      target="_blank"
                    >
                      About Us
                    </a>
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "25px",
                      textAlign: "left",
                    }}
                  >
                    <a
                      href="https://www.valuebound.com/resources/blogs"
                      rel="noopener"
                      style={{ textDecoration: "none", color: "#d0d0d0" }}
                      target="_blank"
                    >
                      Insights
                    </a>
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "25px",
                      textAlign: "left",
                    }}
                  >
                    <a
                      href="https://www.valuebound.com/success-stories"
                      rel="noopener"
                      style={{ textDecoration: "none", color: "#d0d0d0" }}
                      target="_blank"
                    >
                      Success stories
                    </a>
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "25px",
                      textAlign: "left",
                    }}
                  >
                    <a
                      href="https://www.valuebound.com/career"
                      rel="noopener"
                      style={{ textDecoration: "none", color: "#d0d0d0" }}
                      target="_blank"
                    >
                      Career
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="bee-col bee-col-2 bee-col-w4">
              <div className="bee-block bee-block-1 bee-text">
                <div
                  className="bee-text-content"
                  style={{
                    lineHeight: "120%",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    color: "#ffffff",
                  }}
                >
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: "19px",
                      textAlign: "left",
                    }}
                  >
                    <strong style={{}}>Contact Info</strong>
                  </p>
                </div>
              </div>
              <div className="bee-block bee-block-2 bee-text">
                <div
                  className="bee-text-content"
                  style={{
                    lineHeight: "180%",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    color: "#d0d0d0",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "25px",
                      textAlign: "left",
                    }}
                  >
                    <strong style={{}}>Indore, India</strong>
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "25px",
                      textAlign: "left",
                    }}
                  >
                    Benchmark Building, 216, Scheme No 54, Indore, Madhya
                    Pradesh 452010
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "25px",
                      textAlign: "left",
                    }}
                  >
                     
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "25px",
                      textAlign: "left",
                    }}
                  >
                    +91 80 88048711
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "25px",
                      textAlign: "left",
                    }}
                  >
                     
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "25px",
                      textAlign: "left",
                    }}
                  >
                    <a
                      href="https://www.valuebound.com/contact-us"
                      rel="noopener"
                      style={{ textDecoration: "underline", color: "#d0d0d0" }}
                      target="_blank"
                    >
                      Contact Us
                    </a>
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "25px",
                      textAlign: "left",
                    }}
                  >
                    <a
                      href="mailto:hello@valuebound.com"
                      style={{ textDecoration: "underline", color: "#d0d0d0" }}
                    >
                      hello@valuebound.com
                    </a>
                  </p>
                  <a
                    href="https://www.valuebound.com/contact-us"
                    rel="noopener"
                    style={{ textDecoration: "underline", color: "#d0d0d0" }}
                    target="_blank"
                  >
                    {" "}
                  </a>
                </div>
              </div>
            </div>
            <div className="bee-col bee-col-3 bee-col-w4">
              <div className="bee-block bee-block-1 bee-text">
                <div
                  className="bee-text-content"
                  style={{
                    lineHeight: "120%",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    color: "#ffffff",
                  }}
                >
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: "19px",
                      textAlign: "left",
                    }}
                  >
                    <strong style={{}}>Valuebound Services LLP</strong>
                  </p>
                </div>
              </div>
              <div className="bee-block bee-block-2 bee-text">
                <div
                  className="bee-text-content"
                  style={{
                    lineHeight: "180%",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    color: "#d0d0d0",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "25px",
                      textAlign: "left",
                    }}
                  >
                    <strong style={{}}>HQ, Bangalore, India</strong>
                    <br style={{}} />
                    815, 2nd Floor, 27th Main
                    <br style={{}} />
                    Sector 1, HSR Layout
                    <br style={{}} />
                    Bangalore - 560102.
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "25px",
                      textAlign: "left",
                    }}
                  >
                     
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "25px",
                      textAlign: "left",
                    }}
                  >
                    ©2022 Valuebound. All Rights Reserved
                  </p>
                </div>
              </div>
              <div className="bee-block bee-block-3 bee-social">
                <div className="content">
                  <span className="icon" style={{ padding: "0 2.5px 0 2.5px" }}>
                    <a href="https://www.facebook.com/valuebound/">
                      <img
                        alt="Facebook"
                        src="images/facebook2x.png"
                        title="Facebook"
                      />
                    </a>
                  </span>
                  <span className="icon" style={{ padding: "0 2.5px 0 2.5px" }}>
                    <a href="https://twitter.com/valuebound">
                      <img
                        alt="Twitter"
                        src="images/twitter2x.png"
                        title="Twitter"
                      />
                    </a>
                  </span>
                  <span className="icon" style={{ padding: "0 2.5px 0 2.5px" }}>
                    <a href="https://www.instagram.com/valuebound">
                      <img
                        alt="Instagram"
                        src="images/instagram2x.png"
                        title="Instagram"
                      />
                    </a>
                  </span>
                  <span className="icon" style={{ padding: "0 2.5px 0 2.5px" }}>
                    <a href="https://in.linkedin.com/company/valuebound">
                      <img
                        alt="LinkedIn"
                        src="images/linkedin2x.png"
                        title="LinkedIn"
                      />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bee-row bee-row-6"
          style={{
            textAlign: "center",
            backgroundColor: "#413ea1",
            color: "white",
          }}
        >
          <div className="bee-row-content">
            <div className="bee-col bee-col-1 bee-col-w12">
              <div className="bee-block bee-block-1 bee-paragraph">
                <p>© 2022 Valuebound. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const NavBar = styled.nav`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f9f9f9;

  img {
    height: 30px;
  }
`;
const StyledRow = styled(Row)`
  width: 70%;
  margin-top: 40px;
  text-align: center;
`;
const FlexCol = styled(Col)`
  display: flex;
`;
const ColCenter = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const HoriImg200 = styled.img`
  /* margin-top: 100px; */
  align-self: flex-end;
  height: 200px;
`;
const VeriImg250 = styled.img`
  height: 250px;
`;
const TextBox = styled.div``;
