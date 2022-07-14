import React from 'react';
import './style.css';

type Props = {
  text: string;
  iconName?: string;
  iconPosition?: 'left' | 'right';
};

function Error(props: Props) {
  const { text, iconName, iconPosition = 'right' } = props;
  const iconClassName = `material-icons error__icon ${iconPosition}`;

  return (
    <div className="error">
      <span className="error__text">
        <i className={iconClassName}>{iconName}</i>
        {text}
      </span>
    </div>
  );
}

export default Error;

Error.defaultProps = {
  iconName: '',
  iconPosition: 'right'
};