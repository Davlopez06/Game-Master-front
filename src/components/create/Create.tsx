import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Create.scss';
import ImgDefault from '@/asets/images/game-default.png';

const Create = () => {
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

  const getError = (input: string) => {
    if (isError) {
      if (input === 'name') {
        if (formData.name === '') {
          console.log('No nombre');
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
        console.log('Entra 1');
        if (formData.rating === '') {
          return '*This field is required';
        }

        if (parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 5) {
          console.log('Entra 2');
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

    console.log(formData.rating);
    if (parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 5) {
      console.log('Entra 3');
      return true;
    }

    if (formData.plataformas.length === 0) {
      return true;
    }

    if (formData.generos.length === 0) {
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

    console.log('Validate', validateError(), formData);

    if (!validateError()) {
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
    } else {
      setIsError(true);
    }
  };

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
            <input type="text" id="plataformas" name="plataformas" value={formData.plataformas} onChange={handleChange} />
            <p>{getError('plataformas')}</p>
          </div>
          <div>
            <label htmlFor="generos">Genders:</label>
            <input type="text" id="generos" name="generos" value={formData.generos} onChange={handleChange} />
            <p>{getError('generos')}</p>
          </div>
          <div>
            <label htmlFor="img">Image (url):</label>
            <input type="text" id="img" name="img" value={formData.img} onChange={handleChange} />
          </div>
          <div className="preview-image">
            <label htmlFor="img">Preview image:</label>
            <img src={formData.img ?? ImgDefault?.src} alt="Priview" onError={handleImageError} />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

Create.propTypes = {};

export default Create;
