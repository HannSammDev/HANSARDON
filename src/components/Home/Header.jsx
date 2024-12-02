import React from "react";
function Header() {
    const list = [
        { text: 'Home', href: '/' },
        { text: 'Rooms', href: '/rooms' },
        { text: 'About', href: '/about' }
    ];

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img style={{ width: '250px' }} src="/img/logo2.png" alt="Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            {list.map((item, index) => (
                                <li className="nav-item" key={index}>
                                    <a className="nav-link" href={item.href}>{item.text}</a>
                                </li>
                            ))}
                            <li className="nav-item">
                                <a className=" btn btn-primary" id='a' href="/login">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
