
console.log('HOLA HAY ALGUIEN AQUI???????????????????????????????????????????????????????????????????????????');

setTimeout(function(){



interact('#resizable-element')
  .styleCursor(false)
  .resizable({
    manualStart: true,
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {

  console.log(event.rect);
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

    moveHandler(event, document.getElementById('resize-handle'));
  });


interact('#resize-handle').on('down', function (event) {
  var interaction = event.interaction,
      handle = event.currentTarget;

  interaction.start({
      name: 'resize',
      edges: {
        top   : handle.dataset.top,
        left  : handle.dataset.left,
        bottom: handle.dataset.bottom,
        right : handle.dataset.right,
      }
    },
    interact('#resizable-element'),               // target Interactable
    document.getElementById('resizable-element'));   // target Element
});


  function moveHandler (event, handlerElement) {
    var target = handlerElement,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + event.rect.right + 'px, ' + event.rect.bottom + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }



}, 100)
