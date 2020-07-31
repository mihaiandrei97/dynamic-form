import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';

const FormStep = ({
  step,
  stepData,
  state,
  handleFieldsChange,
  nextStep,
  prevStep,
  isFirstStep,
  isLastStep,
  onSubmitForm,
  setIsAdmin,
}) => {
  // method to build a specific type of question (button_radio, checkbox, input, datepicker, dropdown)
  const buildQuestion = (question, questionIndex) => {
    let ind = `${step}_${questionIndex}`;
    if (question.type === 'button_radio') {
      return (
        <FormControl component="fieldset">
          <RadioGroup
            aria-label={question.question_text}
            name={question.question_text}
            value={state[ind]}
            onChange={(e) => handleFieldsChange(ind, e.target.value)}
          >
            {question.answers.map((ans, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={ans}
                  control={<Radio />}
                  label={ans}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      );
    } else if (question.type === 'checkbox') {
      return (
        <List>
          {question.answers.map((ans, index) => {
            return (
              <ListItem
                key={index}
                role="listitem"
                button
                onClick={(e) => handleFieldsChange(ind, ans, question.type)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={state[ind].indexOf(ans) !== -1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': ans }}
                  />
                </ListItemIcon>
                <ListItemText id={ans} primary={ans} />
              </ListItem>
            );
          })}
        </List>
      );
    } else if (question.type === 'input') {
      return (
        <TextField
          style={{ width: '100%' }}
          //label="LastName"
          onChange={(e) => handleFieldsChange(ind, e.target.value)}
          defaultValue={state[ind]}
        />
      );
    } else if (question.type === 'datepicker') {
      return (
        <TextField
          id="date"
          style={{ width: '100%' }}
          type="date"
          defaultValue={state[ind]}
          onChange={(e) => handleFieldsChange(ind, e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      );
    } else if (question.type === 'drop_down') {
      return (
        <FormControl style={{ width: '100%' }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state[ind]}
            onChange={(e) => handleFieldsChange(ind, e.target.value)}
          >
            {question.answers.map((ans, index) => {
              return (
                <MenuItem key={index} value={ans}>
                  {ans}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    }
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            style={{ cursor: 'pointer' }}
            onClick={() => setIsAdmin(true)}
          >
            Dynamic form
          </Typography>
          <Typography variant="h6">Made by Andrei Mihai</Typography>
        </Toolbar>
      </AppBar>
      <Typography
        variant="h4"
        component="h4"
        style={{ color: '#3f51b5', marginTop: '20px' }}
      >
        Step {state.step} / {state.nbOfSteps}
      </Typography>

      <div className="form-container">
        {Object.keys(stepData).map((questionIndex) => {
          let question = stepData[questionIndex];
          return (
            <Paper key={question.id}>
              <div className="form-row">
                <p>{question.question_text}</p>
                <div className="form-row-question">
                  {buildQuestion(question, questionIndex)}
                </div>
              </div>
            </Paper>
          );
        })}
      </div>
      <div className="button-container">
        {!isFirstStep && (
          <Button
            onClick={prevStep}
            variant="contained"
            color="primary"
            style={{ marginRight: '20px' }}
          >
            Back
          </Button>
        )}
        {!isLastStep ? (
          <Button onClick={nextStep} variant="contained" color="primary">
            Continue
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={onSubmitForm}>
            Submit form
          </Button>
        )}
      </div>
    </>
  );
};

export default FormStep;
