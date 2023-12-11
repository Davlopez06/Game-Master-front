import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Create.scss';
import ImgDefault from '@/asets/images/game-default.png';
import { platform } from 'os';
import { ContextState } from '@/context/context';
import { createGame } from '@/utils/createGame';
import { useRouter } from 'next/router';

const Create = () => {
  const { types } = ContextState();
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fecha: '',
    rating: '',
    plataformas: [],
    generos: [],
    img: '',
  });

  let platforms = ['Xbox One', 'Switch', 'Xbox x|s', 'PlayStation 5', 'PlayStation 4', 'PlayStation 3', 'PC', 'Xbox 360'];

  const getError = (input: string) => {
    if (isError) {
      if (input === 'name') {
        if (formData.name === '') {
          return '*This field is required';
        }
      }

      if (input === 'description') {
        if (formData.description === '') {
          return '*This field is required';
        }
      }

      if (input === 'fecha') {
        if (formData.fecha === '') {
          return '*This field is required';
        }
      }

      if (input === 'rating') {
        if (formData.rating === '') {
          return '*This field is required';
        }

        if (parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 5) {
          return '*This field must be 0 - 5';
        }
      }

      if (input === 'plataformas') {
        if (formData.plataformas.length === 0) {
          return '*This field is required';
        }
      }

      if (input === 'generos') {
        if (formData.generos.length === 0) {
          return '*This field is required';
        }
      }

      if (input === 'image') {
        if (formData.img === '') {
          return '*This field is required';
        }
      }
    }

    return '';
  };

  const validateError = () => {
    if (formData.name === '') {
      return true;
    }

    if (formData.description === '') {
      return true;
    }

    if (formData.fecha === '') {
      return true;
    }

    if (formData.rating === '') {
      return true;
    }

    if (parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 5) {
      return true;
    }

    if (formData.plataformas.length === 0) {
      return true;
    }

    if (formData.generos.length === 0) {
      return true;
    }

    if (formData.img === '') {
      return true;
    }

    return false;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeNumber = (e: any) => {
    const { name, value } = e.target;
    if (!isNaN(value))
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
  };

  const handleImageError = (e: any) => {
    e.target.onerror = null;
    e.target.src = ImgDefault?.src;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validateError()) {
      try {
        createGame(formData);
        setFormData({
          name: '',
          description: '',
          fecha: '',
          rating: '',
          plataformas: [],
          generos: [],
          img: '',
        });
        setIsError(false);
        router.push('/home');
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsError(true);
    }
  };

  const handleList = (plataform: any) => {
    if (formData.plataformas.includes(plataform)) {
      const newData = formData?.plataformas?.filter(data => data !== plataform);
      setFormData(prevData => ({
        ...prevData,
        plataformas: newData,
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        plataformas: [...formData?.plataformas, plataform],
      }));
    }
  };

  const handleType = (type: any) => {
    if (formData?.generos?.includes(type)) {
      const newData = formData?.generos?.filter(data => data !== type);
      setFormData(prevData => ({
        ...prevData,
        generos: newData,
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        generos: [...formData?.generos, type],
      }));
    }
  };

  const getPlataformClass = (plataform: string) => {
    if (formData?.plataformas?.includes(plataform)) return 'selected';

    return 'plataform';
  };

  const getGenderClass = (type: string) => {
    if (formData?.generos?.includes(type)) return 'selected';

    return 'gender';
  };

  const getPlataforms = () =>
    platforms.map(plataform => (
      <p className={getPlataformClass(plataform)} onClick={() => handleList(plataform)}>
        {plataform}
      </p>
    ));

  const getGenders = () =>
    types?.map(type => (
      <p className={getGenderClass(type.name)} onClick={() => handleType(type.name)}>
        {type.name}
      </p>
    ));

    const validateImg = () => {
      if (formData?.img === '') return ImgDefault?.src
  
      return formData?.img
    }

  return (
    <div className="create">
      <div className="create-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            <p>{getError('name')}</p>
          </div>
          <div>
            <label htmlFor="description">Summary:</label>
            <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
            <p>{getError('description')}</p>
          </div>
          <div>
            <label htmlFor="fecha">Date:</label>
            <input type="date" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} />
            <p>{getError('fecha')}</p>
          </div>
          <div>
            <label htmlFor="rating">Rating (0 - 5):</label>
            <input type="text" id="rating" name="rating" value={formData.rating} onChange={handleChangeNumber} />
            <p>{getError('rating')}</p>
          </div>
          <div>
            <label htmlFor="plataformas">Platforms:</label>
            <div className="plataforms">{getPlataforms()}</div>
            <p>{getError('plataformas')}</p>
          </div>
          <div>
            <label htmlFor="generos">Genders:</label>
            <div className="genders">{getGenders()}</div>
            <p>{getError('generos')}</p>
          </div>
          <div>
            <label htmlFor="img">Image (url):</label>
            <input type="text" id="img" name="img" value={formData.img} onChange={handleChange} />
            <p>{getError('image')}</p>
          </div>
          <div className="preview-image">
            <label htmlFor="img">Preview image:</label>
            <img src={validateImg()} alt="Priview" onError={handleImageError} />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

Create.propTypes = {};

export default Create;
