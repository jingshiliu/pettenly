import React, {useMemo} from 'react';
import styled from "styled-components";
import {VscChromeClose} from 'react-icons/vsc'

const StyledListCard = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
  
  .closeButtonContainer{
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 9999;
    
    button{
      width: 30px;
      height: 30px;
      font-size: 25px;
      color: ${({theme}) => theme.colors.lightGreen};
    }
    
    button:hover{
      filter: brightness(90%);
    }
  }
`
function ListCard({removeFromTheList, children}) {
    return (
        <StyledListCard className={'ListCard'}>
            {children}
            <div className="closeButtonContainer"
                 onClick={removeFromTheList}
            >
                <button>
                    <VscChromeClose />
                </button>
            </div>
        </StyledListCard>
    );
}

export default ListCard;