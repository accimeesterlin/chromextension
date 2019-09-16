import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
    width: 300
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.4
  }
});

export default function SimpleCard({ title, isEnable, status, integrateService }) {
  const classes = useStyles();
  const disabledClass = !isEnable ? classes.disabled : '';

  return (
    <Card className={`${classes.card} ${disabledClass}`}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          Enable your {title} to send email to your students
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() =>integrateService()}>{status}</Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
    title: PropTypes.string.isRequired,
    isEnable: PropTypes.bool,
    integrateService: PropTypes.func,
    status: PropTypes.string,
}
