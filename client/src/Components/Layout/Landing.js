import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Login from '../Auth/Login'

const Landing = ({isAuthenticated}) => {
  if(isAuthenticated){
    return <Navigate to='/Dashboard'/>
  }

  return (
    <section className="landing">
    <div className="dark-overlay">
      <div className="landing-inner">
        <h1 className="x-large">Pony Club</h1>
        <p className="lead">
          Sign up for your role at our next show jumping event!
          <br></br>
          July 27th-30th
        </p>
        <div className="buttons">
          <Link to="/register" className="btn btn-primLinkry">Sign Up</Link>
          <Link to="/login" element={<Login/>} className="btn btn-light">Login</Link>
        </div>
      </div>
    </div>
  </section>
  )
}


Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps)(Landing)