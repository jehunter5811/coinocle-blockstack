import React from 'react';
import ImageUploadButton from './image_upload_button';
import TagForm from '../../tags/tag_form';
import SubmitBlogButton from './submit_blog_button';

export default class BlogFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ showBlogFormModal: nextProps.state.showBlogFormModal });
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  closeModal(e) {
    this.props.toggleBlogFormModal(e);
  }

  render() {
    return !this.state.showBlogFormModal ? <div></div> : (
      <div id='blog-form-modal' className='modal' onClick={this.closeModal.bind(this)}>
        <div className='blog-form-modal-content' onClick={this.stopPropagation.bind(this)}>
          <div><label>Enter the type of coin <br/>
          <select value={this.props.state.blogIntro} onChange={ this.props.handleChange('blogIntro') }>
            <option value="Bitcoin">Bitcoin</option>
            <option value="Bitcoin Cash">Bitcoin Cash</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Ethereum classic">Ethereum classic</option>
            <option value="Litecoin">Litecoin</option>
            <option value="Monero">Monero</option>
            <option value="Zcash">Zcash</option>
            <option value="Ripple">Ripple</option>
          </select>


          </label></div>

          <div><label>Add some tags to your blog (limited to 5)
            <TagForm
              blogId={ this.state.id }
              blogTags={ this.state.tags }
              setTags={ this.props.setTags }
            />
          </label></div>

          <SubmitBlogButton
            handleSubmit={ this.props.handleSubmit }
            actionType={ this.props.actionType }
            isActive={ this.props.state.isSubmitButtonActive }
          />
        </div>
      </div>
    );
  }
}

//<input
  //type='text'
  //id='blog-intro-input'
  //className='blog-input black'
  //onChange={ this.props.handleChange('blogIntro') }
  //value={ this.props.state.blogIntro }
  //placeholder='Coin type (bitcoin, litecoin, etc)'
  //maxLength='50' />