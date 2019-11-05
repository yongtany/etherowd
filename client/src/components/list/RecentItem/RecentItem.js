import React from 'react';
import styles from './RecentItem.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tag from 'components/common/Tag';

const cx = classNames.bind(styles);


const RecentItem = ({ address, project_image, title, tags }) => {
  const tagList = tags.map(
    tag => <Tag key={tag} to={`/tag/${tag}`} tag={tag} />
  );

  return (
      <div className={cx('column')}>
        <Link className={cx('link')} to={`/project/${address}`}>
          <div className="card recent-item">
              <img className="card-img-top" src={project_image} alt={title} />
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <div className="card-text">
                  <p>{tagList}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
  )
};

export default RecentItem;
