import React, { useEffect, useRef, useState } from 'react';
import './landing.scss';
import { Animal } from '../../interfaces/animals';
import { SliderEffect } from '../../utils/effect';
import { TweenLite } from 'gsap';
import { Effects } from '../../interfaces/effects';

interface Props {
  item: number;
  animals: Animal[];
}

export const Landing = ({ item, animals }: Props) => {
  const [effects, setEffects] = useState<Effects>();
  const lastIndex = useRef<number>(0);

  useEffect(() => {
    const parent = document.querySelector('.landing') as HTMLElement;
    const images = document.querySelectorAll('.landing__image');

    if (parent && images) {
      const effects = SliderEffect({
        parent,
        images: Array.from(images)
      });
      setEffects(effects);
    }
  }, []);

  useEffect(() => {
    if (effects) {
      effects.material.uniforms.nextImage.value = effects.images[item];
      TweenLite.to(effects.material.uniforms.dispFactor, 1, {
        value: 1,
        ease: 'Expo.easeOut',
        onComplete: () => {
          effects.material.uniforms.currentImage.value = effects.images[item];
          effects.material.uniforms.dispFactor.value = 0.0;
        }
      });
    }

    lastIndex.current = item;
  }, [item, effects]);

  return (
    <div className="landing">
      { animals.map((animal, index) => {
        return (
          <div style={{ width: '100%', height: '100%' }} key={index} hidden={index !== item}>
            <img src={animal.url} className="landing__image" alt="Animal"></img>
            <div className="landing__details">
              <div className="landing__details__label">
                SPECIES
                <span className="landing__details__label-bar"></span>
              </div>
              <span id="title" className="landing__details__text landing__details__text-hidden">{animal.species}</span>
              <div className="landing__details__label">
                AGE
                <span className="landing__details__label-bar"></span>
              </div>
              <span id="age" className="landing__details__text landing__details__text-small">{animal.age}</span>
              <div className="landing__details__label">
                BIO
                <span className="landing__details__label-bar"></span>
              </div>
              <span id="bio" className="landing__details__text landing__details__text-small">{animal.bio}</span>
            </div>
          </div>
        );
      })}
    </div>
  )
}