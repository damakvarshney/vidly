import React from "react";

import Form from "./common/form";
import Joi from "joi-browser";

class MovieForm extends Form {
  state = {
    genres: [],
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    //update the state errors
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in stock"),
    dailyRentalRate: Joi.number().required().min(1).max(10),
  };

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log("Errors", errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  doSubmit = () => {
    //call the server
    console.log("Submitted");
    this.props.history.push("/movies");
  };
  render() {
    return (
      <div style={{ marginTop: 30 }}>
        <h2>MovieForm</h2>
        <Form>
          {this.renderInput("title", "Title")}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </Form>
      </div>
    );
  }
}

export default MovieForm;
