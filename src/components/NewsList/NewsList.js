import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadItems } from '../../reducers/news';
import './NewsList.css'

class NewsList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadItems());
  }

  render() {
    const { items, loading } = this.props;
    if (loading) {
      return 'Loading...'
    }

    return (
      <div>
        {items.map(item => (
          <div className="News-ListItem" key={item.id}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <h3>{item.title}</h3>
            </a>
            <div className="News-ListItem-secondary">
              {item.points} points {item.time_ago} by {item.user} | {item.comments_count} comments
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(
  state => ({
    items: state.news.items,
    loading: state.news.loading,
  }),
)(NewsList);
