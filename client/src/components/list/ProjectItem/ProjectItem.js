import React from 'react';
import styles from './ProjectItem.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tag from 'components/common/Tag';

const cx = classNames.bind(styles);



const ProjectItem = ({ address, project_image, title, tags }) => {
  const tagList = tags.map(
    tag => <Tag key={tag} to={`/tag/${tag}`} tag={tag} />
  );

  return (
    <div className={cx('column')}>
      <Link className={cx('link')} to={`/project/${address}`}>
        <div class="card project-item">
            <img class="card-img-top" src={project_image} alt={title} />
            <div class="card-body">
              <h5 class="card-title">{title}</h5>
              <div class="card-text">
                <p class="tags">
                  {tagList}
                </p>
              </div>
              <div class="card-text">hi</div>
          </div>
        </div>
      </Link>
    </div>
  )
};

export default ProjectItem;
