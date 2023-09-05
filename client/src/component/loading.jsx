import React from 'react';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  size:larger;
`;

const Loading = () => {
  return (
    <div  style={{marginTop:"20%",marginLeft:"45%"}}>
      <BeatLoader css={override} color={'orangered'} size={40} />
    </div>
  );
};

export default Loading;