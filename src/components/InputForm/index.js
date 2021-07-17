import styled from "styled-components";

export const InputForm = styled.input`

    &:required {
        &:invalid {
            &:focus{
                border: solid 2px red;
            }
        }
    }
`