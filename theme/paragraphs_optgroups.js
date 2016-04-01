!function($){
  "use strict";

  var separator = ' - ';
  var sLength = separator.length;

  Drupal.behaviors.paragraphsOptgropus = {
    attach: function(context, settings) {
      var $select = $('.field-type-paragraphs', context).find('select');

      $select.each(function() {
        var $inst = $(this);
        var renderData = getFormattedData($inst);

        renderSelect($inst, renderData);
      });
    }
  };

  function getFormattedData(select) {
    var items = {};

    select.find('option').each(function() {
      var optText = $(this).text();
      var splitIndex = optText.indexOf(separator);

      if (splitIndex > -1) {
        var group = optText.slice(0, splitIndex);
        var itemName = optText.slice(splitIndex + sLength);

        if (!(group in items)) {
          items[group] = [];
        }

        items[group].push(itemName);
      }
    });

    return items;
  }

  function renderSelect($select, groupedItems) {
    $select.html('');

    $.each(groupedItems, function(key, val) {
      var $group = $('<optgroup label="' + key + '"></optgroup>');

      $select.append($group);

      $.each(val, function(i, itemVal) {
        $group.append('<option>' + itemVal + '</option>');
      });
    });
  }
}(jQuery);
