describe('todo component', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have .add-app', function () {
    var addTodos = element(by.css('.add-todo'));
    expect(addTodos.isPresent()).toEqual(true);
  });

  it('should allow you to add a todo item', function () {
  });

});
