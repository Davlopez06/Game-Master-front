/* eslint-disable */
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

type ContextType = {
  games: Array<Object>;
  game: Object;
  types: Array<{
    _id: '';
    id: 0;
    name: '';
    __v: 0;
  }>;
  getTypes: (
    data: Array<{
      _id: '';
      id: 0;
      name: '';
      __v: 0;
    }>,
  ) => void;
};

const Context = createContext<ContextType | undefined>(undefined);

const ContextProvider = ({ children = <></> }) => {
  const [game, setGame] = useState<Object>({});
  const [games, setGames] = useState<Array<Object>>([]);
  const [types, setTypes] = useState<
    Array<{
      _id: '';
      id: 0;
      name: '';
      __v: 0;
    }>
  >([]);

  const getTypes = (
    data: Array<{
      _id: '';
      id: 0;
      name: '';
      __v: 0;
    }>,
  ) => {
    setTypes(data);
  };

  const contextValue: ContextType = {
    game,
    games,
    types,
    getTypes,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.element,
};

const ContextState = (): ContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useMyContext debe ser usado dentro de un MyContextProvider');
  }
  return context;
};

export { ContextProvider, ContextState };
