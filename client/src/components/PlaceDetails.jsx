import React from 'react';
import styled from "styled-components";

const StyledDiv = styled.div`
    
`;

function PlaceDetails({place}) {
    return (
        <StyledDiv>
            {place.name}
        </StyledDiv>
    );
}

export default PlaceDetails;