import React, { useMemo } from 'react';
import { Avatar } from '@material-ui/core';

const AvatarOrInitials = ({ imageUrl, displayName, ...props }) => {
  const initials = useMemo(
    () =>
      displayName
        .split(' ')
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join(''),
    [displayName],
  );

  return (
    <>
      {imageUrl ? (
        <Avatar src={imageUrl} {...props} />
      ) : (
        <Avatar {...props}>{initials}</Avatar>
      )}
    </>
  );
};

export default AvatarOrInitials;
