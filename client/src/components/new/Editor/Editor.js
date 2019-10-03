import React, { Component } from 'react';
import styles from './Editor.scss';
import classNames from 'classnames/bind';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List  from '@editorjs/list';
import Embed  from '@editorjs/embed';
import SimpleImage from '@editorjs/image';

const cx = classNames.bind(styles);

class Editor extends Component {
  state = {
    articleHTML: ''
  }

  componentDidMount() {
    this.editor = new EditorJS({
      holderId: 'editorjs',
      autofocus: true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link']
        },
        list: {
          class: List,
          inlineToolbar: [
            'link',
            'bold'
          ]
        },
        image: {
          class: SimpleImage,
          inlineToolbar: [
            'link'
          ]
        },
        embed: {
          class: Embed,
          inlineToolbar: false,
          config: {
            services: {
              youtube: true,
              coub: true
            }
          }
        }
      }
    });
  }

  handleSave = (event) => {
    this.editor.save().then((outputData) => {
      outputData.blocks.map(obj => {
        switch (obj.type) {
          case 'paragraph':
            this.articleHTML += `<div class="ce-block">
              <div class="ce-block__content">
                <div class="ce-paragraph cdx-block">
                  <p>${obj.data.text}</p>
                </div>
              </div>
            </div>\n`;
            break;
          case 'image':
            this.articleHTML += `<div class="ce-block">
              <div class="ce-block__content">
                <div class="ce-paragraph cdx-block">
                  <img src="${obj.data.url}" alt="${obj.data.caption}" />
                  <div class="text-center">
                    <i>${obj.data.caption}</i>
                  </div>
                </div>
              </div>
            </div>\n`;
            break;
          case 'header':
            this.articleHTML += `<div class="ce-block">
              <div class="ce-block__content">
                <div class="ce-paragraph cdx-block">
                  <h${obj.data.level}>${obj.data.text}</h${obj.data.level}>
                </div>
              </div>
            </div>\n`;
            break;
          case 'raw':
            this.articleHTML += `<div class="ce-block">
            <div class="ce-block__content">
              <div class="ce-code">
                <code>${obj.data.html}</code>
              </div>
            </div>
          </div>\n`;
            break;
          case 'code':
            this.articleHTML += `<div class="ce-block">
              <div class="ce-block__content">
                <div class="ce-code">
                  <code>${obj.data.code}</code>
                </div>
              </div>
            </div>\n`;
            break;
          case 'list':
            if (obj.data.style === 'unordered') {
              const list = obj.data.items.map(item => {
                return `<li class="cdx-list__item">${item}</li>`;
              });
              this.articleHTML += `<div class="ce-block">
                <div class="ce-block__content">
                  <div class="ce-paragraph cdx-block">
                    <ul class="cdx-list--unordered">${list.join('')}</ul>
                  </div>
                  </div>
                </div>\n`;
            } else {
              const list = obj.data.items.map(item => {
                return `<li class="cdx-list__item">${item}</li>`;
              });
              this.articleHTML += `<div class="ce-block">
                <div class="ce-block__content">
                  <div class="ce-paragraph cdx-block">
                    <ol class="cdx-list--ordered">${list}</ol>
                  </div>
                  </div>
                </div>\n`;
            }
            break;
          case 'delimeter':
            this.articleHTML += `<div class="ce-block">
              <div class="ce-block__content">
                <div class="ce-delimiter cdx-block"></div>
              </div>
            </div>\n`;
            break;
          default:
            return '';
        }
      });
      this.setState({
        articleHTML: this.articleHTML
      })
      console.log(this.articleHTML);
    }).catch((error) => {
      console.log(error);
    })
  }



  render() {
    return (
      <div>
        <h5>상세 설명</h5>
        <div id="editorjs"></div>
        <button onClick={this.handleSave}>Submit</button>
      </div>
    )
  }
}


export default Editor;
