export const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT_STEP':
      return { ...state, step: state.step + 1 };
    case 'DECREMENT_STEP':
      return { ...state, step: state.step - 1 };
    case 'CHANGE_INPUT':
      return { ...state, [action.payload.input]: action.payload.value };
    case 'CHANGE_CHECKBOX': {
      const { input, value } = action.payload;
      const checked = state[input];
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      return { ...state, [action.payload.input]: newChecked };
    }
    case 'CREATE_QUESTION': {
      const newFormData = Object.assign({}, state.formData);
      let targeted_step = newFormData[`step_${action.payload.step}`] || {};
      const stepLength = Object.keys(targeted_step).length;
      if (stepLength > 0) {
        targeted_step[`question_${stepLength + 1}`] = {
          id: `${action.payload.step}${stepLength + 1}`,
          question_text: action.payload.questionText,
          answers: action.payload.answers.split(', '),
          correct_answer: [action.payload.correctAnswer],
          type: action.payload.type,
        };
        console.log(targeted_step);
      } else {
        targeted_step['question_1'] = {
          id: `${action.payload.step}1`,
          question_text: action.payload.questionText,
          answers: action.payload.answers.split(','),
          correct_answer: [action.payload.correctAnswer],
          type: action.payload.type,
        };
        newFormData[`step_${action.payload.step}`] = targeted_step;
      }

      return {
        ...state,
        formData: newFormData,
        nbOfSteps: Object.keys(newFormData).length,
        [`step_${action.payload.step}_question_${stepLength + 1}`]: '',
      };
    }

    case 'EDIT_QUESTION': {
      const newFormData = Object.assign({}, state.formData);
      Object.keys(newFormData).forEach((step) => {
        let questions = newFormData[step];
        Object.keys(questions).forEach((questionKey) => {
          if (questions[questionKey].id === action.payload.questionId) {
            questions[questionKey].question_text = action.payload.questionText;
            questions[questionKey].answers = action.payload.answers.split(', ');
            questions[questionKey].correct_answer =
              action.payload.correctAnswer;
            questions[questionKey].type = action.payload.type;
          }
        });
      });
      return { ...state, formData: newFormData };
    }

    case 'DELETE_QUESTION': {
      const newFormData = Object.assign({}, state.formData);

      Object.keys(newFormData).forEach((step) => {
        let questions = newFormData[step];
        Object.keys(questions).forEach((questionKey) => {
          if (questions[questionKey].id === action.payload.questionId) {
            delete newFormData[step][questionKey];
          }
        });
      });
      console.log(newFormData);
      return { ...state, formData: newFormData };
    }
    default:
      throw new Error();
  }
};
