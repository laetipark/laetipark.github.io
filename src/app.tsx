import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelopeSquare,
  faRssSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { Summary } from './component/summary/summary.tsx';
import { Project } from './component/project/project.tsx';
import Education from './component/education/education.tsx';
import Experience from './component/experience/experience.tsx';

import './app.css';
import Skill from './component/skill/skill.tsx';

function App() {
  return (
    <React.Fragment>
      <div className={'title'}>
        <h1>
          <span>박동훈 🙂</span>
        </h1>
        <div>
          <span>
            <FontAwesomeIcon icon={faEnvelopeSquare} width={16} fontSize={16} />{' '}
            이메일:
          </span>
          <a href={'mailto:creator98@naver.com'}>creator98@naver.com</a>
        </div>
        <div>
          <span>
            <FontAwesomeIcon icon={faGithubSquare} width={16} fontSize={16} />{' '}
            깃허브:
          </span>
          <a href={'https://github.com/laetipark'} target={'_blank'}>
            github.com/laetipark
          </a>
        </div>
        <div>
          <span>
            <FontAwesomeIcon icon={faRssSquare} width={16} fontSize={16} />{' '}
            블로그:
          </span>
          <a href={'https://blex.me/@laetipark'} target={'_blank'}>
            blex.me/@laetipark
          </a>
        </div>
      </div>
      <Summary />
      <Project />
      <Skill />
      <Education />
      <Experience />
    </React.Fragment>
  );
}

export default App;
