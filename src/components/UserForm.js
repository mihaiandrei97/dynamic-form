import React from 'react';
import { reducer } from './reducer';

import FormStep from './FormStep';
import formData from '../formData.json';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import AddQuestion from './AddQuestion';
import EditQuestion from './EditQuestion';
import DeleteQuestion from './DeleteQuestion';
import Success from './Success';

const initialState = {
  step: 1,
  nbOfSteps: 0,
  formData,
};

// read json data and make state
Object.keys(formData).forEach((step) => {
  let questions = formData[step];
  Object.keys(questions).forEach((question) => {
    if (questions[question].type === 'checkbox') {
      initialState[`${step}_${question}`] = [];
    } else initialState[`${step}_${question}`] = '';
  });
  initialState['nbOfSteps'] += 1;
});

const UserForm = ({ isAdmin, setIsAdmin }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [btnPressed, setBtnPressed] = React.useState('');
  const [isFormSubmited, setIsFormSubmited] = React.useState(false);

  const nextStep = (e) => {
    e.preventDefault();
    dispatch({ type: 'INCREMENT_STEP' });
  };

  const prevStep = (e) => {
    e.preventDefault();
    dispatch({ type: 'DECREMENT_STEP' });
  };

  // method for each field for every step/question
  const handleFieldsChange = (input, value, type = 'default') => {
    dispatch({
      type: type === 'checkbox' ? 'CHANGE_CHECKBOX' : 'CHANGE_INPUT',
      payload: { input, value },
    });
  };

  // form was submitted in the end
  const onSubmitForm = () => {
    setIsFormSubmited(true);
  };

  // Methods for add/edit/delete
  const onAddSubmit = (step, questionText, answers, correctAnswer, type) => {
    dispatch({
      type: 'CREATE_QUESTION',
      payload: { step, questionText, answers, correctAnswer, type },
    });
    setBtnPressed('');
  };

  const onEditSubmit = (
    questionId,
    questionText,
    answers,
    correctAnswer,
    type
  ) => {
    dispatch({
      type: 'EDIT_QUESTION',
      payload: { questionId, questionText, answers, correctAnswer, type },
    });
    setBtnPressed('');
  };

  const onDeleteSubmit = (questionId) => {
    dispatch({
      type: 'DELETE_QUESTION',
      payload: { questionId },
    });
  };

  // render the final page
  if (isFormSubmited) {
    return <Success state={state} />;
  }

  // show admin panel
  if (isAdmin) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'space-evenly', padding: 50 }}
      >
        <div>
          <h2>Form data preview</h2>
          <TextareaAutosize
            style={{ width: 300 }}
            aria-label="form data"
            rowsMax={50}
            value={JSON.stringify(state.formData, null, 2)}
            disabled
          />
        </div>
        <div>
          <h2>Form Actions</h2>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setBtnPressed('add')}
            >
              Add Question
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setBtnPressed('edit')}
              style={{ margin: '0px 20px' }}
            >
              Edit Question
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setBtnPressed('delete')}
            >
              Delete Question
            </Button>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsAdmin(false)}
                style={{ marginTop: 30 }}
              >
                Generate Form
              </Button>
            </div>
          </div>
          <div>
            {btnPressed === 'add' && (
              <AddQuestion
                onAddSubmit={onAddSubmit}
                nbOfSteps={state.nbOfSteps}
              />
            )}
            {btnPressed === 'edit' && (
              <EditQuestion onEditSubmit={onEditSubmit} />
            )}
            {btnPressed === 'delete' && (
              <DeleteQuestion onDeleteSubmit={onDeleteSubmit} />
            )}
          </div>
        </div>
      </div>
    );
  }

  // return form with steps
  return Object.keys(formData).map((step) => {
    if (+step.split('_')[1] === state.step) {
      return (
        <FormStep
          key={step}
          step={step}
          stepData={formData[step]}
          state={state}
          handleFieldsChange={handleFieldsChange}
          prevStep={prevStep}
          nextStep={nextStep}
          isLastStep={state.step === state.nbOfSteps ? true : false}
          isFirstStep={state.step === 1 ? true : false}
          onSubmitForm={onSubmitForm}
          setIsAdmin={setIsAdmin}
        />
      );
    } else {
      return '';
    }
  });
};

export default UserForm;
