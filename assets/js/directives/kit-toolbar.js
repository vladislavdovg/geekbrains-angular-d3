module.exports = ['d3Factory', function () {

  return {
    scope: true,
    restrict: 'A',
    link: function ($scope, $element, $attrs) {

      var button = document.createElement('button');
      button.className = 'new-editor';
      button.innerHTML = 'По центру';

      button.setAttribute('ng-click', 'click()');

      button.onclick(function () {
        console.log('click');
      });

      $element[0].appendChild(button);
    }
  }
}];
