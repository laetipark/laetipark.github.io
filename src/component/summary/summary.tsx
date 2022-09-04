import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export const Summary = () => {
  const [checked, setChecked] = useState(false);
  const arrowRotate = {
    transform: checked ? 'rotate(90deg)' : '',
    transition: 'transform 0.3s ease',
  };

  return (
    <div>
      <h2>
        <span>소개</span>
      </h2>
      <div className={'summary'}>
        <div>
          <div className={'summary_title'}>
            <h3>
              <div>
                <span>
                  데이터를 통해 일상을 편하고
                </span>
                <span>
                  즐겁게 만드는 것을 좋아합니다.
                </span>
              </div>
            </h3>
          </div>
          <div className={'summary_content'}>
            <div>
              <p>
                <div>
                  <span>
                    • 데이터를 구조화하고 서비스 기능이 수행되도록 구현하는{' '}
                    <span className={'mark'}>백엔드</span> 개발에 관심 있어요.
                  </span>
                </div>
              </p>
              <p>
                <div>
                  <span>
                    • 평소 즐기던 모바일게임 전적 데이터를 제공하는 서비스를{' '}
                    <span className={'mark'}>개발</span>(BRAWL TREE)하여{' '}
                    <span className={'mark'}>배포</span>한 경험이 있습니다.
                  </span>
                </div>
                <div>
                  <span>• 해당 게임사의 공식</span>
                  <span className={'mark'}>API</span>
                  <span>를 활용하였으며</span>
                  <span>실제 게임 플레이어들의 피드백을 받으며</span>
                  <span>안정화 작업과 고도화 작업을 진행합니다.</span>
                </div>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className={'summary_title'}>
            <h3>
              <div>
                <span>자기개발과 자기계발을 위해</span>
                <span>적극적으로 참여하는 것을 좋아합니다.</span>
              </div>
            </h3>
          </div>
          <div className={'summary_content'}>
            <p>
              <div>
              <span>
                • 다양한 알고리즘이나 문제들을 풀이해가며 알게된 사실 혹은
                프로젝트하면서 배운 것들을{' '}
                <span className={'mark'}>블로그</span>와{' '}
                <span className={'mark'}>깃허브</span>에{' '}
                <span className={'mark'}>기록</span>하는 것을 좋아합니다.
              </span>
                <span></span>
                <span></span>
              </div>
              <div>
              <span>
                • 평소 <span className={'mark'}>소통</span>하는 것을 좋아해,
                코드에 관한 의견을 주고 받고 서비스 목표를 달성하기 위해 꾸준히{' '}
                <span className={'mark'}>생각</span>하는 습관이 있습니다.
              </span>
              </div>
            </p>
            <div>
              <label form={'check'}>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  width={12}
                  style={arrowRotate}
                />
                <strong style={{ fontSize: 18 }}>학습 기록 목록</strong>
                <input
                  id={'check'}
                  type={'checkbox'}
                  onChange={({ target: { checked } }) => setChecked(checked)}
                />
              </label>
              {checked && (
                <p className={'label_content'}>
                  <p>
                    <strong>• 코딩 테스트</strong>:
                    <a
                      href={'https://github.com/laetipark/coding-test'}
                      style={{ color: '#11324D', padding: 0 }}
                      target={'_blank'}
                    >
                      github
                    </a>
                    <a
                      href={'https://blex.me/@laetipark/series/coding-test'}
                      style={{ color: '#11324D', padding: 0 }}
                      target={'_blank'}
                    >
                      blex
                    </a>
                  </p>
                  <p>
                    <strong>• 웹 프로그래밍</strong>:
                    <a
                      href={'https://github.com/laetipark/web-programming'}
                      style={{ color: '#11324D', padding: 0 }}
                      target={'_blank'}
                    >
                      github
                    </a>
                  </p>
                  <p>
                    <strong>• Node.js</strong>:
                    <a
                      href={'https://github.com/laetipark/node_js-textbook'}
                      style={{ color: '#11324D', padding: 0 }}
                      target={'_blank'}
                    >
                      github
                    </a>
                    <a
                      href={'https://blex.me/@laetipark/series/node_js'}
                      style={{ color: '#11324D', padding: 0 }}
                      target={'_blank'}
                    >
                      blex
                    </a>
                  </p>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
