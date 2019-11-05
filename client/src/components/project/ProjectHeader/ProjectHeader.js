import React from 'react';
import styles from './ProjectHeader.scss';
import classnames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

const cx = classnames.bind(styles);

const ProjectHeader = props => {
  const background = {
    backgroundImage: `url(${props.project_image})`,
  }
  return (
          <div className={cx('header text-center')}>
            <div className={cx('header-image')} style={background}>
              <div className={cx('header-overlay')}>
                <div className={cx('header-content')}>
                  <div className={cx('tags')}>
                    {
                      // tags가 존재하는 경우에만 map을 실행합니다.
                      props.tags && props.tags.map(
                        (tag, index) => (
                        <span className={index % 2 === 0 ? 'tag2' : 'tag1'} key={index}>#{tag}</span>)
                      )
                    }
                  </div>
                  <h1 className={cx('title')}>{props.title}</h1>
                </div>
              </div>
            </div>
            <div className={cx('header-underline')}></div>
            <div className={cx('link-wrapper')}>
              <NavLink className={cx('project-link')} activeClassName="active"  exact to={`/project/${props.address}`}>스토리</NavLink>
              <NavLink
                className={cx('project-link')}
                activeClassName="active"
                exact to={`/project/${props.address}/requests`}>
                요청사항 {props.requestsCount === "0" ? null : props.requestsCount}</NavLink>
              <NavLink className={cx('project-link')} activeClassName="active" to={`/project/${props.address}/investors`}>
                투자자 {props.approversCount === "0" ? null : props.approversCount}</NavLink>
            </div>
          </div>
  )
}


export default ProjectHeader;
