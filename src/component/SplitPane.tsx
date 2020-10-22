import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, Grid, Paper } from '@material-ui/core';

const useStyle = makeStyles((t: Theme) => ({
  root: {
    flexGrow: 1,
  },
  section: {
    maxWidth: 960,
    width: '100%',
  },
  sectionLeft: {
    marginRight: 6,
  },
  sectionRight: {
    paddingRight: '10px',
    paddingLeft: '10px',
  }
}));

interface Props {
  left: React.ReactChild;
  right: React.ReactChild;
  children?: undefined;
}

export function SplitPane({
  left,
  right,
}: Props) {
  const cls = useStyle();
  return (
    <div className={cls.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper>
            {left}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={cls.sectionRight}>
            {right}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
