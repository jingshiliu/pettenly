import React, {useMemo} from 'react';
import styled from "styled-components";
import ListCard from "./ListCard.jsx";
import {nanoid} from "nanoid";

const StyledDoubleCard = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  
  .ListCard{
    margin-bottom: 1vh;
  }
`

function DoubleCard({removeFromTheList, components}) {
    const componentList = useMemo(()=>{
        return components.map((component, index) => <ListCard key={nanoid()}
                                                              removeFromTheList={()=> removeFromTheList(index)}
                                                    >{component}</ListCard>)
    }, [components])
    return (
        <StyledDoubleCard>
            {componentList}
        </StyledDoubleCard>
    );
}

export default DoubleCard;