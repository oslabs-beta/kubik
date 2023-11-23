import React from 'react';
// import { useDrag } from 'react-dnd';

const Panel = ({ grafanaPanelUrl }) => {
  return (
    <>
      <iframe
        src={grafanaPanelUrl}
        className="panel"
        loading="lazy"
        width="450"
        height="300"
      />
    </>
  );
};

export default Panel;
