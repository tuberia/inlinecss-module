import parse from 'css-parse';
import dom from 'cheerio';

/**
 * Mix the given `css` and `html`.
 *
 * @param {String} html
 * @param {String} css
 * @return {String}
 * @api public
 */

export default function mixture(html, css) {
  let styl = parse(css).stylesheet,
      $ = dom.load(html);

  styl.rules.forEach(function (rule) {
    if (!rule || !rule.selectors) {
      return;
    }
    $(rule.selectors.join(', ')).each(function (_, el) {
      var styles = $(el).attr('style') || '';

      // add styles
      rule.declarations.forEach(decl => {
        styles += '' +
          (styles ? ' ' : '') +
          decl.property +
          ': ' +
          decl.value +
          ';';
      });

      // append
      $(el).attr('style', styles);
    });
  });

  // all done.
  return $.html();
}