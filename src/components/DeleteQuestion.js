import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const DeleteQuestion = ({ onDeleteSubmit }) => {
  const [questionId, setQuestionId] = React.useState('11');

  return (
    <form
      noValidate
      autoComplete="off"
      style={{ display: 'flex', flexDirection: 'column', marginTop: 30 }}
    >
      <p>
        Please check the JSON in order to find what Question you want to delete.
      </p>
      <TextField
        label="Question Id"
        style={{ marginBottom: 20 }}
        value={questionId}
        onChange={(e) => setQuestionId(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={() => {
          onDeleteSubmit(questionId);
          setQuestionId('11');
        }}
      >
        Submit
      </Button>
    </form>
  );
};

export default DeleteQuestion;
