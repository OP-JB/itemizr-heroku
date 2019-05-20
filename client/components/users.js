import React, {Component} from 'react'
import {withRouter, Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
const axios = require('axios')
import CreateUserForm from './create-user-form'
import ColHeaders from './col-headers'
import User from './user'
import {getUsers, removeUser} from '../store'

const Users = withRouter(class extends Component {
  state = {
    deletePrivileges: this.props.loggedInUser.isAdmin
  }

  componentDidMount = async () => {
    const {loggedInUser, history, loadUsers} = this.props
    if(!loggedInUser.id) history.push('/')
    loadUsers()
  }

  render() {
    const {deletePrivileges} = this.state
    const {users, deleteUser} = this.props
    return (
      <div id='users-container'>
        <Link to='/lists'>Back To Lists</Link>
        <CreateUserForm />
        <h2>My Users</h2>
         <ColHeaders
          col_1={'Date'}
          col_2={'Name'}
          col_3={'Email'}
          col_4={'isAdmin'}
         />
        {!deletePrivileges ? <h5> Admin privileges required to delete a user </h5> : null}
        {users.length < 1 ? <h2> No Users </h2>
        :users.map((user, index) => <User key={user.id + user.date}
            id={user.id}
            date={user.date}
            name={user.name}
            email={user.email}
            isAdmin={user.isAdmin}
            remove={deleteUser}
          />
        )}
      </div>
    )
  }
})

const mapStateToProps = state => ({
  loggedInUser: state.user,
  users: state.users
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadUsers: () => dispatch(getUsers()),
  deleteUser: id => dispatch(removeUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
