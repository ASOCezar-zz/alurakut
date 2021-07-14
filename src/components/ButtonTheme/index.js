import StyledCheckBox from './style'

const ButtonTheme = () => {
    return (
        <StyledCheckBox>
            <input type="checkbox" className="checkbox" id="chk" onChange={() => {
                document.body.classList.toggle('dark');
            }}/>
            <label className="label" for="chk">
                <i className="fas fa-moon"></i>
                <i className="fas fa-sun"></i>
                <div className="ball"></div>
            </label>
        </StyledCheckBox>
    )
}

export default ButtonTheme;