import {Autocomplete} from '@react-google-maps/api'
import styled from "styled-components";
import {AiOutlineSearch} from 'react-icons/ai'
import googleMapCredential from '../credentials/googleMapCredential.json'

const StyledHeader = styled.header`
  padding: 0 10%;
  background-color: ${({theme}) => theme.colors.blue};
  height: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1b263b;
  
  h4{
    font-weight: normal;
  }

  div:nth-child(2){
    display: flex;
    align-items: center;
    justify-content: space-between;
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
`;

function Header(props) {
    return (
        <StyledHeader>
            <div className={'icon'}>
                Travel Advisor
            </div>

            <div>
                <h4>
                    Explore new places
                </h4>

                <div className="Autocomplete">
                    <div className={'search'}>
                        <div className={'searchIcon'}>
                            <AiOutlineSearch />
                        </div>

                        <input placeholder={'Search...'} />
                    </div>
                </div>

                {/*<Autocomplete className={'Autocomplete'}>*/}
                {/*    <div className={'search'}>*/}
                {/*        <AiOutlineSearch className={'searchIcon'}/>*/}

                {/*        <input placeholder={'Search...'} />*/}
                {/*    </div>*/}
                {/*</Autocomplete>*/}
            </div>
        </StyledHeader>
    );
}

export default Header;