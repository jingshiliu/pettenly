import React from 'react';
import styled from "styled-components";


const StyledList = styled.div`
  position: absolute;
  left: 10px;
  top: 70px;
  width: fit-content;
  display: flex;
  
  .ListCard{
    margin-right: 10px;
  }
`;


function List({children}) {
    return (
        <StyledList className={'List'}>
            {children}
        </StyledList>
    );
}

export default List;