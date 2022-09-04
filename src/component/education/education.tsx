import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

const Education = () => {
  return (
    <div>
      <h2>
        <span>학력</span>
      </h2>
      <div className={'experience'}>
        <div>
          <h3>
            <FontAwesomeIcon icon={faCaretRight} width={16} fontSize={16} />{' '}
            <span>한라대학교 (2017.03 - 2023. 02)</span>
          </h3>
          <p>• ICT융합공학부 컴퓨터공학전공 학사 졸업 (4.44 / 4.5)</p>
          <p>
          <span className={'highlight02'}>
            • 알고리즘, 데이터베이스, 웹 개발, 네트워크 등 과목 이수
          </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Education;
