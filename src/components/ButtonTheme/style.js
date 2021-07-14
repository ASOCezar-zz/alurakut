import styled from 'styled-components';

const StyledCheckBox = styled.div`

    @import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

.checkbox {
	opacity: 0;
	position: absolute;
}

.label {
	background-color: #111;
	border-radius: 50px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	position: relative;
	height: 10px;
	width: 45px;
	transform: scale(1.5);
    margin: 15px 15px 0 0;
}

.label .ball {
	background-color: #fff;
	border-radius: 50%;
	position: absolute;
	top: 2px;
	left: 2px;
	height: 17px;
	width: 17px;
	transform: translateX(0px);
	transition: transform 0.2s linear;
}

.checkbox:checked + .label .ball {
	transform: translateX(24px);
}


.fa-moon {
	color: #f1c40f;
}

.fa-sun {
	color: #f39c12;
}
`
export default StyledCheckBox;