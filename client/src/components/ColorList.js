import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Formik, Field, Form } from 'formik';
import { TextField, Button } from '@material-ui/core';

const initialColor = {
  color: '',
  code: { hex: '' }
};

const ColorList = ({ colors, updateColors, toggle, setToggle }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        console.log(res);
        setToggle(!toggle);
      });
  };

  const deleteColor = (color) => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then((res) => {
        console.log(res);
        setToggle(!toggle);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <Formik
        initialValues={{
          color: '',
          code: { hex: '' },
          id: Date.now()
        }}
        onSubmit={(data, { resetForm }) => {
          axiosWithAuth()
            .post('/api/colors', data)
            .then((res) => {
              console.log('added color:', res);
              setToggle(!toggle);
            });
        }}
      >
        {({ values }) => (
          <Form>
            <Field
              name="color"
              values={values.color}
              variant="outlined"
              label="Color Name"
              as={TextField}
            />
            <Field
              name="code.hex"
              values={values.code.hex}
              variant="outlined"
              label="Hex Code"
              as={TextField}
            />
            <Button variant="contained" color="primary" type="submit">
              Add Color
            </Button>
          </Form>
        )}
      </Formik>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
