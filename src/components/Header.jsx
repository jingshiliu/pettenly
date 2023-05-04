import styled from "styled-components";
import {AiOutlineSearch} from 'react-icons/ai'
import UserAuth from "./Auth/UserAuth.jsx";


const StyledHeader = styled.header`
  padding: 0 10%;
  background-color: ${({theme}) => theme.colors.blue};
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1b263b;
  overflow: visible;
  
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
  
  input{
    border: none;
    font-size: 14px;
    padding: 4px 6px;
    width: 12vw;
    background-color: transparent;
  }
  
  input:focus-visible{
    outline: none;
  }
  
  .search{
    margin-left: 10px;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 4px 6px;
    border-radius: 4px;
  }
  
  .search .searchIcon{
    display: flex;
    align-items: center;
    font-size: 20px;
    border-right:1px solid ${({theme}) => theme.colors.blue};
  }
  
  .UserAuth{
    position: absolute;
    right: 5em;

  }
`;

function Header() {
    return (
        <StyledHeader>
            <div className={'icon'}>
                Pettenly
            </div>

            <div className={'searchContainer'}>
                <h4>
                    Explore Pets
                </h4>

                <div className="Autocomplete">
                    <div className={'search'}>
                        <div className={'searchIcon'}>
                            <AiOutlineSearch />
                        </div>

                        <input placeholder={'Search...'} />
                    </div>
                </div>

                <UserAuth />

            </div>


        </StyledHeader>
    );
}

export default Header;