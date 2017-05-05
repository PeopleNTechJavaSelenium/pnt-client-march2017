import { PntClientPage } from './app.po';

describe('pnt-client App', function() {
  let page: PntClientPage;

  beforeEach(() => {
    page = new PntClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
