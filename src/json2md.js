const sanitize = require('sanitize-html');
const { sanitizeHtmlConfig } = require('./sanitizeConfig');
const TurndownService = require('turndown');

const turndownService = new TurndownService({ emDelimiter: '*' });

const json2md = data => {
  let html = '';
  if (!data || !data.blocks) return '';
  data.blocks.forEach(b => {
    if (b.type === 'tableOfContents') {
      let lastHeadingLevel;
      let lastIsSubheading = false;
      const newHeadings = [];
      let hash1 = false;
      data.blocks.forEach(block => {
        if (
          block.type === 'header' &&
          (block.data.level === 1 ||
            block.data.level === 2 ||
            block.data.level === 3 ||
            (!hash1 && block.data.level === 4)) &&
          block.data.text
        ) {
          const { level } = block.data;
          const title = block.data.text
            .replace(/\n/, ' ')
            .replace(/"/g, '”')
            .replace(/'/g, '’');
          if (level === 1) hash1 = true;
          const newHeading = {
            title,
            subheadings: [],
          };
          if (
            lastHeadingLevel &&
            (level === lastHeadingLevel + 1 ||
              (lastIsSubheading && level === lastHeadingLevel))
          ) {
            if (!lastIsSubheading || level === lastHeadingLevel)
              newHeadings[newHeadings.length - 1].subheadings.push(newHeading);
            else {
              const subheads = newHeadings[newHeadings.length - 1].subheadings;
              subheads[subheads.length - 1].subheadings.push(newHeading);
            }
            lastIsSubheading = true;
          } else {
            newHeadings.push(newHeading);
            lastIsSubheading = false;
          }
          lastHeadingLevel = level;
        }
      });
      // eslint-disable-next-line no-param-reassign
      b.data = { headings: newHeadings };
      html += `\n\n<div json='${JSON.stringify(
        b,
      )}'><h2>Table of contents</h2><p><em>Displaying the table of contents is not supported by your current frontend. View this post on TravelFeed.io for the full experience.</em></p></div>\n\n`;
    } else if (b.type === 'paragraph') {
      html += `${turndownService.turndown(b.data.text)}\n\n`;
    } else if (b.type === 'code') {
      html += `${sanitize(
        b.data.code,
        sanitizeHtmlConfig({
          secureLinks: false,
          allLinksBlank: false,
        }),
      )}\n\n`;
    } else if (b.type === 'header') {
      html += `<h${b.data.level}>${b.data.text.replace(/\n/, ' ')}</h${
        b.data.level
      }>\n\n`;
    } else if (b.type === 'list') {
      if (b.data.style === 'ordered') {
        b.data.items.forEach((i, index) => {
          html += `${index + 1}. ${i}\n`;
        });
      } else {
        b.data.items.forEach(i => {
          html += `- ${i}\n`;
        });
      }
      html += '\n\n';
    } else if (b.type === 'image') {
      html += `<img alt="${sanitize(b.data.caption, {
        allowedTags: [],
      })
        .replace(/\n/, ' ')
        .replace(/"/g, '”')
        .replace(/'/g, '’')}" src="${b.data.file.url}" ${
        b.data.file.width ? `width="${b.data.file.width}"` : ''
      } ${b.data.file.height ? `height="${b.data.file.height}"` : ''} />\n\n`;
    } else if (b.type === 'quote') {
      html += `> ${b.data.text}\n\n`;
    } else if (b.type === 'delimiter') {
      html += `<hr/>\n\n`;
    } else if (b.type === 'embed') {
      // Source is automatically rendered when parsing
      html += `${b.data.source}\n\n`;
    } else if (b.type === 'table') {
      // html += '<table>';
      b.data.content.forEach((c, index) => {
        html += '| ';
        if (index === 0) {
          c.forEach(t => {
            html += `${t} |`;
          });
          html += '\n|';
          c.forEach(() => {
            html += ` --- |`;
          });
        } else {
          c.forEach(t => {
            html += `${t} |`;
          });
        }
        html += '\n';
      });
      html += '\n\n';
    } else if (b.type === 'linkTool' && b.data.meta) {
      html += `\n\n<div json='${JSON.stringify(b)}'><a href='${
        b.data.link
      }'><center><img src='${b.data.meta.image}' alt='${
        b.data.meta.title
      }'/><h3>Read "${
        b.data.meta.title
      }" on TravelFeed.io</h3></center></a></div>\n\n`;
    } else if (b.type === 'imageGallery' && b.data.images) {
      html += `\n\n<div json='${JSON.stringify(
        b,
      )}'><p><em>Image galleries are not supported by your current frontend. View this post on TravelFeed.io for the full experience.</em></p>${
        b.data && b.data.images && b.data.images.length > 0
          ? b.data.images
              .map(({ url }) => `<center><img src="${url}" /></center>`)
              .join('')
          : ''
      }</div>\n\n`;
    }
  });
  return html;
};

module.exports = { json2md };
