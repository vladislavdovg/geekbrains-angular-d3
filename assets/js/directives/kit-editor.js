module.exports = ['d3Factory', function (d3Factory) {

  // DDO - объект с описанием директивы
  return {
    scope: true,
    restrict: 'A', // Искать директивы в: A - атрибутах, E - тегах элементов
    link: function ($scope, $element, $attrs) {
      // $scope унаследована от $rootScope
      // $element - обертка в jqLite
      // $attrs - массив атрибутов для DOM-элемента

      d3Factory.d3().then(function (d3) {
        $scope.editor = {
          behavior: {
            dragging: false
          },
          grid: {
            sizeXmm: 5,
            sizeYmm: 5
          },
          position: {
            x: 0,
            y: 0
          },
          pageProporties: {
            widthMm: 297,
            heightMm: 210
          },
          svg: {},
          features: {}
        };

        $scope.editor.svg.rootNode = d3.select($element[0]).append('svg')
          .attr('id', 'svg-editor');

        var conversionRect = $scope.editor.svg.rootNode.append('rect')
          .attr('width', '1mm')
          .attr('height', '1mm');

        $scope.editor.features.pixelsPerMm = conversionRect.node().getBBox().width;
        conversionRect.remove();

        var g = $scope.editor.svg.rootNode.append('g')
          .attr('transform', 'translate(0,0)');

        $scope.editor.svg.underlay = g.append('rect')
          .attr('class', 'underlay')
          .attr('width', '100%')
          .attr('height', '100%');

        $scope.editor.svg.container = g.append('g')
          .attr('class', 'svg-container');

        var gGridX = $scope.editor.svg.container.append('g')
          .attr('class', 'x axis');

        var gGridY = $scope.editor.svg.container.append('g')
          .attr('class', 'y axis');

        var borderFrame = $scope.editor.svg.container.append('rect')
          .attr('class', 'svg-border')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 0)
          .attr('height', 0);

        var DURATION = 800;
        var pageWidth = $scope.editor.pageProporties.widthMm *
          $scope.editor.features.pixelsPerMm;
        var pageHeight = $scope.editor.pageProporties.heightMm *
          $scope.editor.features.pixelsPerMm;

        borderFrame
          .transition()
          .duration(DURATION)
          .attr('width', pageWidth)
          .attr('height', pageHeight);

        var linesX = gGridX.selectAll('line').data(d3.range(0, pageHeight,
          $scope.editor.features.pixelsPerMm * $scope.editor.grid.sizeXmm
        ));

        linesX.enter().append('line')
          .attr('x1', 0)
          .attr('x2', 0)
          .attr('y1', function (d) {
            return d;
          })
          .transition()
          .duration(DURATION)
          .attr('x2', pageWidth)
          .attr('y2', function (d) {
            return d;
          });

        var linesY = gGridY.selectAll('line').data(d3.range(0, pageWidth,
          $scope.editor.features.pixelsPerMm * $scope.editor.grid.sizeXmm
        ));

        linesY.enter().append('line')
          .attr('y1', 0)
          .attr('y2', 0)
          .attr('x1', function (d) {
            return d;
          })
          .transition()
          .duration(DURATION)
          .attr('y2', pageHeight)
          .attr('x2', function (d) {
            return d;
          });

        $scope.editor.behavior.d3 = {
          zoom: d3.behavior.zoom()
            .scale(1)
            .scaleExtent([.2, 10])
            .on('zoom', function () {
              var t = d3.event.translate;
              $scope.editor.svg.container
                .attr('transform', 'translate(' + t + ')scale(' + d3.event.scale + ')');

              t = t.toString().split(','); // 1, 2 -> [1, 2]
              $scope.editor.position.x = t[0];
              $scope.editor.position.y = t[1];
            })
        };

        g.call($scope.editor.behavior.d3.zoom);
        $scope.editor.behavior.d3.zoom.event($scope.editor.svg.container);

      })
    }
  }
}];
