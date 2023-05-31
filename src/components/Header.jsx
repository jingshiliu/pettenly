import styled from "styled-components";
import {AiOutlineSearch} from 'react-icons/ai'
import Icon from "./Icon.jsx";
import React from "react";


const StyledHeader = styled.header`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1;
  height: 50px;
  display: flex;
  
  justify-content: start;
  align-items: center;
  
  .mainHeaderContainer{
    border-radius: 1em;
    height: inherit;
    padding: 0 10%;
    background-color: ${({theme}) => theme.colors.deepGreenBlue};
    opacity: 0.95;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .icon{
      width: 100px;
      color: ${({theme}) => theme.colors.lightGreen};
      
      .Icon{
        margin-right: 8px;
      }
    }
  }
  
  h4{
    font-weight: normal;
  }

  .searchContainer{
    display: flex;
    align-items: center;
  }
  
  #searchBar{
    border: none;
    font-size: 14px;
    padding: 4px 6px;
    width: 12vw;
    background-color: transparent;
  }
  
  .search{
    margin-left: 10px;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 4px 6px;
    border-radius: 0.6em;
  }
  
  .search .searchIcon{
    display: flex;
    align-items: center;
    font-size: 20px;
    border-right:1px solid ${({theme}) => theme.colors.blue};
  }
`;

function Header({children}) {
    return (
        <StyledHeader>
            <div className="mainHeaderContainer">
                <div className={'icon'}>
                    <Icon />
                    Pettenly
                </div>

                <div className={'searchContainer'}>
                    <div className="Autocomplete">
                        <div className={'search'}>
                            <div className={'searchIcon'}>
                                <AiOutlineSearch />
                            </div>

                            <input id={'searchBar'} placeholder={'Search...'} />
                        </div>
                    </div>

                </div>
            </div>

            {children}

        </StyledHeader>
    );
}

export default Header;