import styled from "styled-components";
import { boxStyle } from "../../styles/commonStyles";

const Wrapper = styled.form`
  width: 70vw;
  padding: 30px;
  ${boxStyle}
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function Login() {
  return (
    <Wrapper>
      <form></form>
    </Wrapper>
  );
}
