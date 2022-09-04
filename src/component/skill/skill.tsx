import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

const Skill = () => {
  return (
    <div className={'skill'}>
      <h2>
        <span>스킬</span>
      </h2>
      <div>
        <div>
          <h3>
            <FontAwesomeIcon icon={faCaretRight} width={16} fontSize={16} />{' '}
            <span>언어 :</span>
          </h3>
          <p>
            <img
              src={
                'https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=000000'
              }
              alt={'Javascript'}
            />
            <img
              src={
                'https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=FFFFFF'
              }
              alt={'Typescript'}
            />
          </p>
        </div>
        <div>
          <h3>
            <FontAwesomeIcon icon={faCaretRight} width={16} fontSize={16} />{' '}
            <span>런타임 및 프레임워크 :</span>
          </h3>
          <p>
            <img
              src={
                'https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=FFFFFF'
              }
              alt={'Node.js'}
            />
            <img
              src={
                'https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=NestJS&logoColor=FFFFFFF'
              }
              alt={'NestJS'}
            />
            <img
              src={
                'https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=000000'
              }
              alt={'React'}
            />
          </p>
        </div>
        <div>
          <h3>
            <FontAwesomeIcon icon={faCaretRight} width={16} fontSize={16} />{' '}
            <span>도구 :</span>
          </h3>
          <p>
            <img
              src={
                'https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=FFFFFF'
              }
              alt={'MySQL'}
            />
            <img
              src={
                'https://img.shields.io/badge/OCI-F80000?style=for-the-badge&logo=oracle&logoColor=FFFFFF'
              }
              alt={'OCI'}
            />
            <img
              src={
                'https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=FFFFFF'
              }
              alt={'AWS'}
            />
            <img
              src={
                'https://img.shields.io/badge/WebStorm-0870EF?style=for-the-badge&logo=WebStorm&logoColor=FFFFFF'
              }
              alt={'WebStorm'}
            />
            <img
              src={
                'https://img.shields.io/badge/VSCODE-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=FFFFFF'
              }
              alt={'VisualStudio'}
            />
            <img
              src={
                'https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=Ubuntu&logoColor=FFFFFF'
              }
              alt={'Ubuntu'}
            />
            <img
              src={
                'https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=FFFFFF'
              }
              alt={'Github'}
            />
            <img
              src={
                'https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=FFFFFF'
              }
              alt={'Docker'}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Skill;
