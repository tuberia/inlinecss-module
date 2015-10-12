import * as file from 'file-oath';
import mixtur from './mixtur';

class InlineCssModule {
  constructor(locator) {
    this.locator = locator || function () {};
  }

  execute(docs, ctx) {
    return Promise.all(docs.map(doc => {
      let cssFile = this.locator.call(null, doc, ctx);
      if (!cssFile) {
        return doc;
      }
      return file.read(cssFile).then(css => {
        doc.content = mixtur(doc.content, css);
        return doc;
      });
    }));
  }
}

export default function inlineCss(locator) {
  let lfn = locator;
  if (typeof locator === 'string') {
    lfn = () => locator;
  }
  return new InlineCssModule(lfn);
}