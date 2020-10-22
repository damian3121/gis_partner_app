import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

const useStyle = makeStyles(() => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  actionsWrapper: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
}));

interface Props {
  children?: React.ReactNode;
  actions?: React.ReactNode;
  subTitle?: string;
  className?: string;
}

export function TableHeader({
  children,
  subTitle,
  actions,
  className
}: Props) {
  const cls = useStyle();
  return (
    <div className={classNames(cls.root, className)}>
      <div>
        <Typography variant='h5'>{children}</Typography>
        <Typography variant='subtitle1'>{subTitle}</Typography>
      </div>
      <div className={cls.actionsWrapper}>
        {actions}
      </div>
    </div>
  )
}
