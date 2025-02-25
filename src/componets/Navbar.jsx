import React from "react";


const Navbar = () => (

<nav className="navbar navbar-expand-lg navbar-light bg-light">
{/*
<a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  */}
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link active" href="./">Home <span className="sr-only"></span></a>
      <a className="nav-item nav-link" href="https://github.com/JCJetz">GitHub</a>
      <a className="nav-item nav-link" href="https://docs.thecatapi.com/example-by-breed">The Cat Api</a>
      
    </div>
  </div>
</nav>
)
export default Navbar;

/* 
function Navbar() {
  return (
    <nav>
      <div className="nav">
        <div className="link">
          <a href="./">Home</a>
          <a href="https://github.com/JCJetz">GitHub</a>
          <a href="https://docs.thecatapi.com/example-by-breed">The Cat Api</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
*/