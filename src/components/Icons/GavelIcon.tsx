import React from 'react'
import styled from 'styled-components'
import { color, Box } from '@artsy/palette'

export const GavelIcon = (props: { fill: string }) => (
  <GavelContainer fill={props.fill}>
    <svg
      id="Layer_1"
      x="0px"
      y="0px"
      width="40px"
      height="40px"
      viewBox="0 0 32 32"
      fill={props.fill}
    >
      <g>
        <rect
          x={8.572}
          y={13.5}
          transform="matrix(0.4541 -0.891 0.891 0.4541 -6.8465 20.8261)"
          width={10}
          height={5}
        />
        <rect
          x={16.308}
          y={18.179}
          transform="matrix(0.891 0.4541 -0.4541 0.891 10.8683 -6.903)"
          width={7.001}
          height={1.999}
        />
      </g>
    </svg>
  </GavelContainer>
)

const GavelContainer = styled(Box)`
  background: transparent;
  border: 2px solid ${(props) => color(props.fill)};
  border-radius: 30px;
  display: table-cell;
  height: 36px;
  margin-top: 2px;
  width: 36px;

  svg {
    fill: ${(props) => color(props.fill)};
    width: 37px;
    position: relative;
    top: -4px;
  }
`
