import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ReactHtmlParser from "react-html-parser";
import Styles from "modules/common/components/markdown-renderer/markdown-renderer.styles";

const Remarkable = require('remarkable');

const md = new Remarkable({
  linkify: false,
});
md.core.ruler.enable([]);
md.block.ruler.enable([]);
md.inline.ruler.enable([
  'emphasis',
]);
md.inline.ruler.disable([
  'autolink',
  'links',
  'backticks',
]);
md.block.ruler.disable([ 'table', 'footnote', 'blockquote', 'code', 'fences', 'htmlblock', 'lheading' ]);


export default class MarkdownRenderer extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    hideLabel: PropTypes.bool,
  };

  static defaultProps = {
    className: undefined,
    hideLabel: false,
  };

  render() {
  	const { className, text, hideLabel } = this.props;

  	if (hideLabel) {
  		return ReactHtmlParser(md.render(text));
  	}

  	return (
		<label className={classNames(Styles.MarkdownRenderer, className)}>
        	{ReactHtmlParser(md.render(text))}
        </label>
  	);
  }
}