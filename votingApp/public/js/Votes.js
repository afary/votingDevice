(function($){

    window.Vote = Backbone.Model.extend({
        defaults:{
          question: 'Backbone.js is fun!',
        }
    });

    window.Votes = Backbone.Collection.extend({
        model: Vote,
        url: '/votes'

    });
    window.myVote = new Vote();

  $(document).ready(function() {


    window.VoteView = Backbone.View.extend({
        

        initialize: function(){
            _.bindAll(this, 'render');
            this.model.bind('change',this.render);
            this.template = _.template($('#vote-template').html());
        },
        render: function(){
            var renderedContent = this.template(this.model.toJSON());
            $(this.el).html(renderedContent);
            return this;
        },
        events: {
            "click input[type=button]": "createModel"
        },

        createModel: function(){
	    var res = $('input[name=vote]:radio:checked').val();
	    this.model.set({response:res});
            $('#conversation').empty();
            $('#conversation').append("Thanks for voting  "+res + "<br />");
            
	},


    });

    window.ClickerApp = Backbone.Router.extend({
        routes: {
         '': 'votingapp',
         'votingapp': 'votingapp'
        },

        initialize: function(){
            this.myVoteView = new VoteView({
              model: window.myVote
            });
        },

        votingapp: function(){
            var $container = $('#container');
            $container.empty();
            $container.append(this.myVoteView.render().el);
        }

    });

    $(function(){
        window.App = new ClickerApp();
        Backbone.history.start({pushState: true});
    });


  });
})(jQuery);
