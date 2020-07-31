import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const EditQuestion = ({ onEditSubmit }) => {
  const [questionId, setQuestionId] = React.useState('11');
  const [questionText, setQuestionText] = React.useState('Question text');
  const [answers, setAnswers] = React.useState('Answer1, Answer2, Answer3');
  const [correctAnswer, setCorrectAnswer] = React.useState('Answer1');
  const [type, setType] = React.useState('button_radio');

  return (
    <form
      noValidate
      autoComplete="off"
      style={{ display: 'flex', flexDirection: 'column', marginTop: 30 }}
    >
      <p>
        Please check the JSON in order to find what Question you want to edit.
      </p>
      <TextField
        label="Question Id"
        style={{ marginBottom: 20 }}
        value={questionId}
        onChange={(e) => setQuestionId(e.target.value)}
      />
      <TextField
        label="Question Text"
        value={questionText}
        style={{ marginBottom: 20 }}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <TextField
        value={answers}
        label="Answers splited by comma"
        style={{ marginBottom: 20 }}
        onChange={(e) => setAnswers(e.target.value)}
      />
      <TextField
        value={correctAnswer}
        label="Correct answer"
        style={{ marginBottom: 20 }}
        onChange={(e) => setCorrectAnswer(e.target.value)}
      />
      <Select
        labelId="demo-simple-select-label"
        label="Type of question"
        id="demo-simple-select"
        style={{ marginBottom: 20 }}
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <MenuItem value="button_radio">Button Radio</MenuItem>
        <MenuItem value="checkbox">Checkbox</MenuItem>
        <MenuItem value="input">Text Input</MenuItem>
        <MenuItem value="datepicker">Date Picker</MenuItem>
        <MenuItem value="drop_down">Drop down</MenuItem>
      </Select>
      <Button
        variant="contained"
        onClick={() => {
          onEditSubmit(questionId, questionText, answers, correctAnswer, type);
          setQuestionId('1');
          setQuestionText('Question text');
          setAnswers('Answer1, Answer2, Answer3');
          setCorrectAnswer('Answer1');
          setType('button_radio');
        }}
      >
        Submit
      </Button>
    </form>
  );
};

export default EditQuestion;
