"use client";
import React from 'react';
import QuestionOutlineIcon  from '@chakra-ui/icon';
import { Tooltip } from '@chakra-ui/react'

interface IconTooltipProps {
  tooltipMessage: string;
} 

const IconTooltip: React.FC<IconTooltipProps> = ({tooltipMessage}) => {
  return (
  
    <Tooltip label={tooltipMessage} >
        <QuestionOutlineIcon />
    </Tooltip>
    )
  
}

export default IconTooltip;