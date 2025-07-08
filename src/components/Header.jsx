import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="static-header">
      <div className="header">
        <a href="#" className="walmart-logo-text">
          Walmart
        </a>
        <section className="location-set">
          <div className="blue-button">
            <button>
              <div><p>Enter your location</p></div>
              <svg width="20" height="20" fill="#ffffff" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </button>
          </div>
        </section>
        <div className="change-page">
          <a href="index.html"><button>Home</button></a>
        </div>
        <div className="search-bar">
          <form>
            <input type="text" placeholder="search everything at Walmart online and in-store" />
            <button id="clear-button">
              <svg width="20" height="20" fill="#000000" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            <button id="search-button">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.51 6.51 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </form>
        </div>
        <nav className="account-and-cart">
          <ul className="acc">
            <div id="group1"><li id="reorder-my-items">
              <svg width="20" height="20" fill="#ffb81c" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <div>Reorder</div>
              <div><b>my items</b></div>
            </li></div>
            <div id="group2">
              <li id="sign-in">
                <svg width="20" height="20" fill="#ffb81c" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
                <div>Sign In</div>
                <div><b>account</b></div>
              </li>
            </div>
            <div id="group3">
              <svg width="20" height="20" fill="#ffb81c" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8.36-2H16V6H7v1.36l1.47 1.47c1.41-.91 3.27-.91 4.67 0l1.41-1.41C12.63 5.69 9.78 5 7 5v2.07c-2.84 0-5.76 1.14-7.45 3.09l1.42 1.42C3.52 10.09 5.64 9 7.64 9zm-1.41-6.38l2.12 2.12-2.12 2.12V5.86zm8.82 2.12l-2.12-2.12 2.12-2.12v4.24z"/>
              </svg>
              <li id="my-cart">
                <div>My cart</div>
                <div><b>$99.99</b></div>
              </li>
            </div>
          </ul>
        </nav>
      </div>
      <div className="menu-bar">
        <div className="nav-bar">
          <nav className="dept-services">
            <ul>
              <li>Departments</li>
              <li>Services</li>
            </ul>
          </nav>
          <nav className="nav-content">
            <ul>
              <li>Get it fast</li>
              <li>New arrivals</li>
              <li>4th of July</li>
              <li>Dinner made easy</li>
              <li>Pharmacy delivery</li>
              <li>Trending</li>
              <li>Swim shop</li>
              <li>My items</li>
              <li>Auto Service</li>
              <li>Only at Walmart</li>
              <li>Registry</li>
              <li>Walmart+</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;