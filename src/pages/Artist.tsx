import React from 'react';
import { useParams } from 'react-router-dom';

const Artist: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return <h1>Artist Page - ID: {id}</h1>;
};

export default Artist;
