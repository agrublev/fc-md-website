"use strict";

const marked = require("marked"),
  highlightjs = require("highlight.js");

function highlight(code, lang) {
  return highlightjs.highlightAuto(code).value;
}

function translate(src, option) {
  return new Promise((resolve, reject) => {
    marked(
      src,
      {
        gfm: true,
        highlight: highlight
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          let rsz = data.match(/ id="(.*?)"/g);
          rsz.map(e => {
            let ze = e.replace(/\-/g, "");
            data = data.replace(e, ze);
            return e;
          });

          data = data.replace(/\<code\>/g, "<pre><code class='bash'>");
          data = data.replace(/\<\/code\>/g, "</code></pre>");
          resolve(data);
        }
      }
    );
  });
}

module.exports = translate;
