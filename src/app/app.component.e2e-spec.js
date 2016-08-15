describe('App', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have a title', function () {
    expect(browser.getTitle()).toEqual("Todo-App");
  });

  it('should have <main>', function () {
    expect(element(by.css('my-todo-app main')).isPresent()).toEqual(true);
  });

});
