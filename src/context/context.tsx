/* eslint-disable */
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

type ContextType = {
  games: Array<{ _id: ''; id: 0; name: ''; description: ''; fecha: ''; rating: 0; plataformas: []; generos: Array<string>; img: ''; __v: 0 }>;
  game: Object;
  types: Array<{
    _id: '';
    id: 0;
    name: '';
    __v: 0;
  }>;
  sort: string;
  filter: string;
  getTypes: (
    data: Array<{
      _id: '';
      id: 0;
      name: '';
      __v: 0;
    }>,
  ) => void;
  getGames: (
    data: Array<{ _id: ''; id: 0; name: ''; description: ''; fecha: ''; rating: 0; plataformas: []; generos: Array<string>; img: ''; __v: 0 }>,
  ) => void;
  getSort: (sort: string) => void;
  getFilter: (filter: string) => void;
};

const Context = createContext<ContextType | undefined>(undefined);

const ContextProvider = ({ children = <></> }) => {
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [game, setGame] = useState<Object>({});
  const [games, setGames] = useState<
    Array<{ _id: ''; id: 0; name: ''; description: ''; fecha: ''; rating: 0; plataformas: []; generos: Array<string>; img: ''; __v: 0 }>
  >([]);
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

  const getGames = (
    data: Array<{ _id: ''; id: 0; name: ''; description: ''; fecha: ''; rating: 0; plataformas: []; generos: Array<string>; img: ''; __v: 0 }>,
  ) => {
    setGames(data);
  };

  const getSort = (sort: string) => {
    setSort(sort);
  };

  const getFilter = (filter: string) => {
    setFilter(filter);
  };

  const contextValue: ContextType = {
    game,
    games,
    types,
    sort,
    filter,
    getTypes,
    getGames,
    getSort,
    getFilter,
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
