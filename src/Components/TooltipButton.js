import { useState } from "react";
import styled from "styled-components";
import { solidBtnStyle, stokeBtnStyle } from "../styles/commonStyles";
import { motion } from "framer-motion";

const SolidBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  ${solidBtnStyle}
`;

const StrokeBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  ${stokeBtnStyle}
`;

const TooltipContainer = styled.div`
  position: relative;
`;

const Tooltip = styled(motion.div)`
  white-space: nowrap;
  position: absolute;
  top: 20%;
  left: 100%;
  transform: translate(10px, -50%);
  background-color: #fff;
  color: #333;
  font-size: 12px;
  padding: 8px;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent #fff transparent transparent;
  }
`;

const TooltipButton = ({ text, onClick, icon, btnType }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <TooltipContainer>
      {btnType === "solid" && (
        <SolidBtn
          onClick={onClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {icon}
        </SolidBtn>
      )}
      {btnType === "stroke" && (
        <StrokeBtn
          onClick={onClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {icon}
        </StrokeBtn>
      )}
      {showTooltip && (
        <Tooltip
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 10 }}
          exit={{ opacity: 0, x: 20 }}
        >
          {text}
        </Tooltip>
      )}
    </TooltipContainer>
  );
};

export default TooltipButton;
