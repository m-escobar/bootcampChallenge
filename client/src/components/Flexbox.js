import styled from 'styled-components';

export const Grid = styled.div`
  padding-left: 50px;
  padding-right: 50px;
  font-size: 1em;
`;

export const Row = styled.div`
  display: flex;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  padding: 5px;

`;

export const Col = styled.div`
  flex: ${(props) => props.size};
  text-align: ${(props) => props.align};
  
`;
  