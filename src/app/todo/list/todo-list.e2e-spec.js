describe('todo list component', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have .add-app', function () {
    expect(element(by.css('.todos-list')).isPresent()).toEqual(true);
  });

  it('should list all todos', function () {
    /*
      TODO - add mock backend when its available for Angular2.
      For now we'll pass thru to the real backend server.

      TODO - find replacement to by.repeater() for Angular2
      when it's available.
    */
    expect(element.all(by.css('ul.todos-list li')).count()).not.toEqual(0);
  });

});
