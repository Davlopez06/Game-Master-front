import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '@/components/navbar';
import Create from '@/components/create';

const CreateLayout = () => {
  return (
    <div className="create-layout">
      <Navbar isHome={false} />
      <Create />
    </div>
  );
};

export default CreateLayout;
