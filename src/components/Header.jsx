import styled from "styled-components";
import {AiOutlineSearch} from 'react-icons/ai'
import UserAuth from "./Auth/UserAuth.jsx";
import Icon from "./Icon.jsx";


const StyledHeader = styled.header`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1;
  height: 50px;
  display: flex;
  
  justify-content: space-between;
  align-items: center;
  overflow: visible;
  
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
  
  .authContainer{
    width: 50px;
    height: 50px;
    background-color: ${({theme}) => theme.colors.deepGreenBlue};
    margin-left: 5px;
    border-radius: 0.6em;
    
    
    .UserAuth{
      width: inherit;
      height: inherit;
      
    }
  }
  
  h4{
    font-weight: normal;
  }

  .searchContainer{
    display: flex;
    align-items: center;
  }
  
  .Autocomplete{
    display: flex;
  }
  
  #searchBar{
    border: none;
    font-size: 14px;
    padding: 4px 6px;
    width: 12vw;
    background-color: transparent;
  }
  
  #searchBar:focus-visible{
    outline: none;
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

function Header() {
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

            <div className="authContainer">
                <UserAuth />
            </div>

        </StyledHeader>
    );
}

export default Header;