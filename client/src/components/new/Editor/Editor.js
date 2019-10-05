import React, { Component } from 'react';
import styles from './Editor.scss';
import classNames from 'classnames/bind';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List  from '@editorjs/list';
import Embed  from '@editorjs/embed';

const cx = classNames.bind(styles);

class Editor extends Component {
  componentDidMount() {
    this.editor = new EditorJS({
      holderId: 'editorjs',
      autofocus: false,
      config: {
        placeholder: 'Paste image URL'
      },
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link'],
        },
        list: {
          class: List,
          inlineToolbar: [
            'link',
            'bold'
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
        },
      }
    });
  }

  handleSave =  async event => {
    event.preventDefault();
    let { body } = this.props;
    this.editor.save().then((outputData) => {
      outputData.blocks.map(obj => {
        switch (obj.type) {
          case 'paragraph':
            body += `<div class="ce-block">
              <div class="ce-block__content">
                <div class="ce-paragraph cdx-block">
                  <p>${obj.data.text}</p>
                </div>
              </div>
            </div>\n`;
            break;
          case 'image':
            body += `<div class="ce-block">
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
            body += `<div class="ce-block">
              <div class="ce-block__content">
                <div class="ce-paragraph cdx-block">
                  <h${obj.data.level}>${obj.data.text}</h${obj.data.level}>
                </div>
              </div>
            </div>\n`;
            break;
          case 'raw':
            body += `<div class="ce-block">
            <div class="ce-block__content">
              <div class="ce-code">
                <code>${obj.data.html}</code>
              </div>
            </div>
          </div>\n`;
            break;
          case 'code':
            body += `<div class="ce-block">
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
              body += `<div class="ce-block">
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
              body += `<div class="ce-block">
                <div class="ce-block__content">
                  <div class="ce-paragraph cdx-block">
                    <ol class="cdx-list--ordered">${list}</ol>
                  </div>
                  </div>
                </div>\n`;
            }
            break;
          case 'delimeter':
            body += `<div class="ce-block">
              <div class="ce-block__content">
                <div class="ce-delimiter cdx-block"></div>
              </div>
            </div>\n`;
            break;
          default:
            return '';
        }
      });
      this.props.onChange(body);
      this.props.handleIsSave();
    }).catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <h5>상세 설명</h5>
        <div id="editorjs"></div>
        <button className={cx('btn btn-danger save')} onClick={this.handleSave}>저장하기</button>
      </div>
    )
  }
}


export default Editor;
