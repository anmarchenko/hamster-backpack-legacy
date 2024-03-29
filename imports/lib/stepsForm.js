/**
 * stepsForm.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
var transEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd',
    'transition': 'transitionend'
  },
  transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
  support = { transitions: Modernizr.csstransitions };

function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

function stepsForm(el, options) {
  this.el = el;
  this.options = extend({}, this.options);
  extend(this.options, options);
  this._init();
}

stepsForm.prototype.options = {
  onSubmit: function () {
    return false; }
};

stepsForm.prototype._init = function () {
  // current question
  this.current = 0;

  // questions
  this.questions = [].slice.call(this.el.querySelectorAll('ol.questions > li'));
  // total questions
  this.questionsCount = this.questions.length;
  // show first question
  classie.addClass(this.questions[0], 'current');

  // next question control
  this.ctrlNext = this.el.querySelector('button.next');
  this.ctrlNextMobile = this.el.querySelector('button.button-next');

  // progress bar
  this.progress = this.el.querySelector('div.progress');

  // question number status
  this.questionStatus = this.el.querySelector('span.number');
  // current question placeholder
  this.currentNum = this.questionStatus.querySelector('span.number-current');
  this.currentNum.innerHTML = Number(this.current + 1);
  // total questions placeholder
  this.totalQuestionNum = this.questionStatus.querySelector('span.number-total');
  this.totalQuestionNum.innerHTML = this.questionsCount;

  // error message
  this.error = this.el.querySelector('span.error-message.empty');
  this.error_number = this.el.querySelector('span.error-message.number-error');

  // init events
  this._initEvents();

  //focus on first question
  this.questions[this.current].querySelector('input').focus();
};

stepsForm.prototype._initEvents = function () {
  var self = this,
    // first input
    firstElInput = this.questions[this.current].querySelector('input'),
    // focus
    onFocusStartFn = function () {
      firstElInput.removeEventListener('focus', onFocusStartFn);
      classie.addClass(self.ctrlNext, 'show');
    };

  // show the next question control first time the input gets focused
  firstElInput.addEventListener('focus', onFocusStartFn);

  // show next question
  this.ctrlNext.addEventListener('click', function (ev) {
    ev.preventDefault();
    self._nextQuestion();
  });

  this.ctrlNextMobile.addEventListener('click', function (ev) {
    ev.preventDefault();
    self._nextQuestion();
  });

  // pressing enter will jump to next question
  this.el.addEventListener('keydown', function (ev) {
    var keyCode = ev.keyCode || ev.which;
    // enter
    if (keyCode === 13) {
      $(ev.target).trigger('blur');
      $(ev.target).trigger('change');
      ev.preventDefault();
      self._nextQuestion();
    }
  });

  // on tab - go next
  this.el.addEventListener('keydown', function (ev) {
    var keyCode = ev.keyCode || ev.which;
    // tab
    if (keyCode === 9) {
      ev.preventDefault();
      self._nextQuestion();
    }
  });
};

stepsForm.prototype._nextQuestion = function () {
  if (!this._validade()) {
    return false;
  }

  // check if form is filled
  if (this.current === this.questionsCount - 1) {
    this.isFilled = true;
  }

  // clear any previous error messages
  this._clearError();

  // current question
  var currentQuestion = this.questions[this.current];

  // increment current question iterator
  ++this.current;

  // update progress bar
  this._progress();

  if (!this.isFilled) {
    // change the current question number/status
    this._updateQuestionNumber();

    // add class "show-next" to form element (start animations)
    classie.addClass(this.el, 'show-next');

    // remove class "current" from current question and add it to the next one
    // current question
    var nextQuestion = this.questions[this.current];
    classie.removeClass(currentQuestion, 'current');
    classie.addClass(nextQuestion, 'current');
  }

  // after animation ends, remove class "show-next" from form element and change current question placeholder
  var self = this,
    onEndTransitionFn = function (ev) {
      if (support.transitions) {
        this.removeEventListener(transEndEventName, onEndTransitionFn);
      }
      if (self.isFilled) {
        self._submit();
      } else {
        classie.removeClass(self.el, 'show-next');
        self.currentNum.innerHTML = self.nextQuestionNum.innerHTML;
        self.questionStatus.removeChild(self.nextQuestionNum);
        // force the focus on the next input
        nextQuestion.querySelector('input').focus();
      }
    };

  if (support.transitions) {
    this.progress.addEventListener(transEndEventName, onEndTransitionFn);
  } else {
    onEndTransitionFn();
  }
};

// updates the progress bar by setting its width
stepsForm.prototype._progress = function () {
  this.progress.style.width = this.current * (100 / this.questionsCount) + '%';
};

// changes the current question number
stepsForm.prototype._updateQuestionNumber = function () {
  // first, create next question number placeholder
  this.nextQuestionNum = document.createElement('span');
  this.nextQuestionNum.className = 'number-next';
  this.nextQuestionNum.innerHTML = Number(this.current + 1);
  // insert it in the DOM
  this.questionStatus.appendChild(this.nextQuestionNum);
};

// submits the form
stepsForm.prototype._submit = function () {
  // hide form
  classie.addClass(theForm.querySelector('.simform-inner'), 'hide');

  this.options.onSubmit(this.el);
};

// the validation function
stepsForm.prototype._validade = function () {
  // current question´s input
  var el = this.questions[this.current].querySelector('input');
  var input_value = el.value;
  if (input_value === '') {
    this._showError('empty');
    return false;
  }

  if (el.type === 'number') {
    input_num = Number.parseInt(input_value);
    min = Number.parseInt(el.min);
    if (input_value < min) {
      this._showError('number');
      return false;
    }
  }

  return true;
};

stepsForm.prototype._showError = function (err) {
  this._clearError();
  if (err === 'empty') {
    classie.addClass(this.error, 'show');
  }
  if (err === 'number') {
    classie.addClass(this.error_number, 'show');
  }
};

// clears/hides the current error message
stepsForm.prototype._clearError = function () {
  classie.removeClass(this.error, 'show');
  classie.removeClass(this.error_number, 'show');
};

// add to global namespace
export default stepsForm;
