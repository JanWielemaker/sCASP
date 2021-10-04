/*  Part of SWISH

    Author:        Jan Wielemaker
    E-mail:        J.Wielemaker@cs.vu.nl
    WWW:           http://www.swi-prolog.org
    Copyright (C): 2021, SWI-Prolog Solutions b.v.
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions
    are met:

    1. Redistributions of source code must retain the above copyright
       notice, this list of conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright
       notice, this list of conditions and the following disclaimer in
       the documentation and/or other materials provided with the
       distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
    "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
    LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
    FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
    COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
    INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
    BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
    LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
    ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
    POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * <Description of the File>
 *
 * @version 0.2.0
 * @author Jan Wielemaker, J.Wielemaker@vu.nl
 * @requires jquery
 */

if ( !define ) {
  function define(req, f) {
    f();
  }
}

define([ "jquery" ],
       function() {

		 /*******************************
		 *	    COLLAPSABLE		*
		 *******************************/

(function($) {
  var pluginName = 'collapsable';

  /** @lends $.fn.collapsable */
  var methods = {
    _init: function(options) {
      options = options||{};

      if ( options.tree ) {
	return this.each(function() {
	  var elem   = $(this);
	  var data   = {gdepth:1};		/* private data */

	  if ( options.buttons )
	    elem[pluginName]('buttons', options);
	  elem.find("li")[pluginName]('init_node', options);

	  elem.on("click", ".collapse-toggler", function(ev) {
	    var li = $(ev.target).closest(".collapsable");
	    li[pluginName]('toggle', options);
	  });

	  elem.data(pluginName, data);	/* store with element */
	});
      } else {
	return this.each(function() {
	  var elem   = $(this);
	  var button = addToggler(elem, ".collapsable-header", options);

	  button.click(function(ev) {
	    var div = $(ev.target).closest(".collapsable");
	    div[pluginName]('toggle', options);
	  });

	});
      }
    },

    init_node: function(options) {
      return this.each(function() {
	  addToggler($(this), ".collapsable-header", options);
      });
    },

    buttons: function(options) {
      var div = $('<div class="scasp-tree-buttons">');
      var elem = this;

      this.before(div);

      div.append('<button class="btn-expand">Expand All</button>\n' +
		 '<button class="btn-depth-incr">+1</button>\n' +
		 '<button class="btn-depth-decr">-1</button>\n' +
		 '<button class="btn-collapse">Collapse All</button>\n');

      div.find("button.btn-expand").on("click", function() {
	elem[pluginName]('expand_all');
      });
      div.find("button.btn-depth-incr").on("click", function() {
	elem[pluginName]('step_depth', {step:1, delay:500});
      });
      div.find("button.btn-depth-decr").on("click", function() {
	elem[pluginName]('step_depth', {step:-1, delay:500});
      });
      div.find("button.btn-collapse").on("click", function() {
	elem[pluginName]('collapse_all', {delay:500});
      });
    },

    toggle: function(options) {
      if ( this.hasClass("collapsed") )
	this[pluginName]('expand', options);
      else
	this[pluginName]('collapse', options);
    },

    collapse: function(options) {
      var c = this.find(">.collapsable-content");
      this.addClass("collapsed");

      if ( c.length > 0 ) {
	if ( options && options.delay )
	  c.slideUp(options.delay);
	c.hide();
      }
    },

    expand: function(options) {
      var c = this.find(">.collapsable-content");
      this.removeClass("collapsed");

      if ( c.length > 0 ) {
	if ( options && options.delay )
	  c.slideDown(options.delay);
	c.show();
      }
    },

    expand_all: function(options) {
      this.find(".collapsable")[pluginName]('expand', options);
      this.each(function() {
	var e = $(this);
	var data = e.data(pluginName);
	data.maxdepth = data.maxdepth || treeDepth(e);

	data.gdepth = data.maxdepth;
      });
    },

    collapse_all: function(options) {
      this.find(".collapsable")[pluginName]('collapse', options);
      this.each(function() {
	var e = $(this);
	var data = e.data(pluginName);

	data.gdepth = 1;
      });
    },

    depth: function(options) {
      options = options||{};
      options.depth = options.depth || 1;

      this.each(function() {
	var e = $(this);
	var data = e.data(pluginName);

	collapseBelow($(this).find(">li.collapsable"), 1, options);
	data.gdepth = options.depth;
      });
    },

    step_depth: function(options) {
      options = options||{};
      options.step = options.step || 1;

      this.each(function() {
	var e = $(this);
	var data = e.data(pluginName);
	var ndepth = data.gdepth + options.step;
	data.maxdepth = data.maxdepth || treeDepth(e);

	if ( ndepth < 1 ) ndepth = 1;
	if ( ndepth > data.maxdepth ) ndepth = data.maxdepth;

	e[pluginName]('depth', {
	  depth:ndepth,
	  delay:options.delay
	});
      });
    }
  }; // methods

  function collapseBelow(e, depth, options) {
    if ( depth < options.depth ) {
      if ( e.hasClass("collapsed") )
	e[pluginName]('expand', options);
    } else {
      if ( !e.hasClass("collapsed") )
	e[pluginName]('collapse', options);
    }

    e.find(">ul>li.collapsable").each(function() {
      collapseBelow($(this), depth+1, options);
    });
  }

  function treeDepth(e) {
    var depth = 0;

    e.find(".collapsable").each(function() {
      var d = treeDepth($(this));
      if ( d > depth )
	depth = d;
    });

    return depth+1;
  }

  function addToggler(elem, selector, options) {
    var hdr = selector ? elem.find(selector).eq(0) : elem;
    var btn = hdr.find(".collapse-toggler").eq(0);

    if ( options.collapsed )
      elem[pluginName]('collapse');

    if ( btn.length == 0 ) {
      btn = $('<span class="collapse-toggler">');
      hdr.prepend(btn);
    }

    return btn;
  }

  /**
   * <Class description>
   *
   * @class collapsable
   * @tutorial jquery-doc
   * @memberOf $.fn
   * @param {String|Object} [method] Either a method name or the jQuery
   * plugin initialization object.
   * @param [...] Zero or more arguments passed to the jQuery `method`
   */

  $.fn.collapsable = function(method) {
    if ( methods[method] ) {
      return methods[method]
	.apply(this, Array.prototype.slice.call(arguments, 1));
    } else if ( typeof method === 'object' || !method ) {
      return methods._init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.' + pluginName);
    }
  };
}(jQuery));

});