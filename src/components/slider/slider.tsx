import React, { useState } from 'react';
import './slider.scss';

interface Props {
  size: number;
  onItem: (index: number) => void
}

export const Slider = ({ size, onItem }: Props) => {
  const [active, setActive] = useState<number>(0);

  return (
    <div className="slider" style={{top: `calc(50% - ${size * 30}px)`}}>
      {
        [...Array(size)].map((_, index) => {
          return (
            <div
              key={index}
              className={`slider__item ${index === active ? 'slider__item-active' : ''}`}
              onClick={() => {
                setActive(index);
                onItem(index);
              }}
            >
            </div>
          )
        })
      }
    </div>
  )
}
