this.ckan.module('reject', function (jQuery) {
  return {
    /* An object of module options */
    options: {
      content: '',
      i18n: {
        content: '',
      },

      template: [
        '<div class="modal fade">',
        '<div class="modal-dialog">',
        '<div class="modal-content">',
        '<div class="modal-header">',
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>',
        '<h3 class="modal-title"></h3>',
        '</div>',
        '<div class="modal-body"></div>',
        '<div class="modal-footer">',
        '<button class="btn btn-default btn-cancel"></button>',
        '<button class="btn btn-primary"></button>',
        '</div>',
        '</div>',
        '</div>',
        '</div>'
      ].join('\n')
    },

    initialize: function () {
      jQuery.proxyAll(this, /_on/);
      this.el.on('click', this._onClick);
    },
  confirm: function () {
      this.sandbox.body.append(this.createModal());
      this.modal.modal('show');

      // Center the modal in the middle of the screen.
      this.modal.css({
        'margin-top': this.modal.height() * -0.5,
        'top': '50%'
      });
    },

    performAction: function () {
      // create a form and submit it to confirm the deletion
      var feedback = this.modal.find('#feedback').val();
      var form = jQuery('<form/>', {
        action: this.el.attr('href') + '?feedback=' + feedback,
        method: 'POST',
      });
      form.appendTo('body').submit();
    },

    createModal: function () {
      if (!this.modal) {
        var element = this.modal = jQuery(this.options.template);
        element.on('click', '.btn-primary', this._onConfirmSuccess);
        element.on('click', '.btn-cancel', this._onConfirmCancel);
        element.modal({show: false});

        element.find('.modal-title').text(this._('Please Confirm Action'));
        var content = this.options.content ||
                      this.options.i18n.content || /* Backwards-compatibility */
                      this._('Are you sure you want to perform this action?');
          element.find('.modal-body').html(
          content + '<br><br><textarea id="feedback" cols="70" rows="4" required></textarea>');
        // element.find('.modal-body').text(content);
        element.find('.btn-primary').text(this._('Reject'));
        element.find('.btn-cancel').text(this._('Cancel'));
      }
      return this.modal;
    },

    /* Event handler that displays the confirm dialog */
    _onClick: function (event) {
      event.preventDefault();
      this.confirm();
    },

    /* Event handler for the success event */
    _onConfirmSuccess: function (event) {
      this.performAction();
    },

    /* Event handler for the cancel event */
    _onConfirmCancel: function (event) {
      this.modal.modal('hide');
    }
  };
});
