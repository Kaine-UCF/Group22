import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/add-contact" className="btn btn-light">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Contacts Page
      </Link>
    </div>
  );
};

export default ProfileActions;
